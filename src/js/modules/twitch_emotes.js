/* global Dubtrack, emojify */
var options = require('../utils/options.js');
var dubx_emoji = require('../emojiUtils/prepEmoji.js');
var previewList = require('../emojiUtils/previewList.js');

var myModule = {};

myModule.id = "emotes";
myModule.moduleName = "Emotes";
myModule.description = "Toggle Twitch Emotes support.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = [
    '<li id="'+myModule.id+'" class="for_content_li for_content_feature twitch_emotes">',
        '<p class="for_content_off"><i class="fi-x"></i></p>',
        '<p class="for_content_p">Emotes</p>',
    '</li>',
].join('');

var previewSearchStr = "";


/**************************************************************************
 * A bunch of utility helpers for the emoji preview
 */
var emojiUtils = {
    createPreviewObj : function(type, id, name) {
        return {
            src : dubx_emoji[type].template(id),
            text : ":" + name + ":",
            alt : name,
            cn : type
        };
    },
    addToPreviewList : function(emojiArray) {
        var self = this;
        var listArray = [];
        var _key;

        emojiArray.forEach(function(val,i,arr){
            _key = val.toLowerCase();
            if (typeof dubx_emoji.twitch.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("twitch", dubx_emoji.twitch.emotes[_key], val));
            }
            if (typeof dubx_emoji.bttv.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("bttv", dubx_emoji.bttv.emotes[_key], val));
            }
            if (typeof dubx_emoji.tasty.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("tasty", _key, val));
            }
            if (emojify.emojiNames.indexOf(_key) >= 0) {
                listArray.push(self.createPreviewObj("emoji", val, val));
            }
        });

        previewList.previewList(listArray);
    },
    filterEmoji : function(str){
        var finalStr = str.replace(/([+()])/,"\\$1");
        var re = new RegExp('^' + finalStr, "i");
        var arrayToUse = emojify.emojiNames;
        if (myModule.optionState) {
            arrayToUse = dubx_emoji.emojiEmotes; // merged array
        }
        return arrayToUse.filter(function(val){
            return re.test(val);
        });
    }
};

/**************************************************************************
 * handles filtering emoji, twitch, and users preview autocomplete popup on keyup
 */
var chatInputKeyupFunc = function(e){
    var self = dubx;
    var currentText = this.value;
    var keyCharMin = 3; // when to start showing previews, default to 3 chars
    var cursorPos = $(this).get(0).selectionStart;
    // console.log("cursorPos", cursorPos);
    var strStart;
    var strEnd;
    var inputRegex = new RegExp('(:|@)([&!()\\+\\-_a-z0-9]+)($|\\s)', 'ig');
    var filterText = currentText.replace(inputRegex, function(matched, p1, p2, p3, pos, str){
        // console.dir( arguments );
        strStart = pos;
        strEnd = pos + matched.length;

        previewSearchStr = p2;
        keyCharMin = (p1 === "@") ? 1 : 3;

        if (cursorPos >= strStart && cursorPos <= strEnd) {
            // twitch and emoji
            if (p2 && p2.length >= keyCharMin && p1 === ":" && dubx.options.let_emoji_preview) {
                self.emojiUtils.addToPreviewList( self.emojiUtils.filterEmoji(p2) );
            }

            // users
            if (p2 && p2.length >= keyCharMin && p1 === "@" && dubx.options.let_autocomplete_mentions) {
                self.previewList( self.filterUsers(p2) );
            }
        }
        
    });

    var lastChar = currentText.charAt(currentText.length - 1);
    if (self.previewSearchStr.length < keyCharMin ||
        lastChar === ":" ||
        lastChar === " " ||
        currentText === "")
    {
        self.previewSearchStr = "";
        $('#autocomplete-preview').empty().removeClass('ac-show');
    }

    // automatically make first item selectable if not already
    if (!$('.ac-show li:first-child').find(".ac-list-press-enter").length) {
        var spanToEnter = '<span class="ac-list-press-enter">press enter to select</span>';
        $('.ac-show li:first-child').append(spanToEnter).addClass('selected');
    }

    if (e.keyCode === 13 && $('#autocomplete-preview li').length > 0) {
        var new_text = $('#autocomplete-preview li.selected').find('.ac-text')[0].textContent;
        previewList.updateChatInput(new_text);
        return;
    }

    if (e.keyCode === 38) {
        self.doNavigate(-1);
    }
    if (e.keyCode === 40) {
        self.doNavigate(1);
    }
    if (e.keyCode === 13 && currentText.length > 0){
        Dubtrack.room.chat.sendMessage();
    }
};

var emoji_preview =function(){
    var newOptionState;
    var optionName = 'emoji_preview';

    if (!dubx.options.let_emoji_preview) {
        newOptionState = true;
    } else {
        newOptionState = false;
    }

    dubx.options.let_emoji_preview = newOptionState;
    dubx.settings = options.toggleAndSave(optionName, newOptionState, dubx.settings);
};

/**********************************************************************
 * handles replacing twitch emotes in the chat box with the images
 */

var replaceTextWithEmote = function(){
    var self = dubx;
    var _regex = self.twitch.chatRegex;

    if (!self.twitchJSONSLoaded) { return; } // can't do anything until jsons are loaded

    function makeImage(type, src, name, w, h){
        return '<img class="emoji '+type+'-emote" '+
            (w ? 'width="'+w+'" ' : '') +
            (h ? 'height="'+h+'" ' : '') +
             'title="'+name+'" alt="'+name+'" src="'+src+'" />';
    }

    var $chatTarget = $('.chat-main .text').last();
    
    if (!$chatTarget.html()) { return; } // nothing to do

    if (self.bttvJSONSLoaded) { _regex = self.bttv.chatRegex; }

    var emoted = $chatTarget.html().replace(_regex, function(matched, p1){
        var _id, _src, _desc, key = p1.toLowerCase();

        if (typeof self.twitch.emotes[key] !== 'undefined'){
            _id = self.twitch.emotes[key];
            _src = self.twitch.template(_id);
            return makeImage("twitch", _src, key);
        } else if (typeof self.bttv.emotes[key] !== 'undefined') {
            _id = self.bttv.emotes[key];
            _src = self.bttv.template(_id);
            return makeImage("bttv", _src, key);
        } else if (typeof self.tasty.emotes[key] !== 'undefined') {
            _src = self.tasty.template(key);
            return makeImage("tasty", _src, key, self.tasty.emotes[key].width, self.tasty.emotes[key].height);
        } else {
            return matched;
        }

    });

    $chatTarget.html(emoted);
    // TODO : Convert existing :emotes: in chat on plugin load
};

/**************************************************************************
 * Turn on/off the twitch emoji in chat
 */
myModule.go = function(){
    document.body.addEventListener('twitch:loaded', this.loadBTTVEmotes);
    document.body.addEventListener('bttv:loaded', this.loadTastyEmotes);
    
    var newOptionState;
    var optionName = 'twitch_emotes';

    if (!myModule.optionState) {
        
        if (!dubx.twitchJSONSLoaded) {
            loadTwitchEmotes();
        } else {
            this.replaceTextWithEmote();
        }

        Dubtrack.Events.bind("realtime:chat-message", this.replaceTextWithEmote);
        newOptionState = true;
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.replaceTextWithEmote);
        newOptionState = false;
    }

    this.optionState = newOptionState;
    this.toggleAndSave(this.id, newOptionState);
};


module.exports = myModule;