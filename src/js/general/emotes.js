/* global dubx, Dubtrack, emojify */

/**************************************************************************
 * Turn on/off the twitch emoji in chat
 */
dubx.twitch_emotes =function(){
    document.body.addEventListener('twitch:loaded', this.loadBTTVEmotes);
    document.body.addEventListener('bttv:loaded', this.loadTastyEmotes);
    
    if (!dubx.options.let_twitch_emotes) {
        if (!dubx.twitchJSONSLoaded) {
            dubx.loadTwitchEmotes();
        } else {
            this.replaceTextWithEmote();
        }

        Dubtrack.Events.bind("realtime:chat-message", this.replaceTextWithEmote);
        dubx.options.let_twitch_emotes = true;
        dubx.saveOption('twitch_emotes', 'true');
        dubx.on('.twitch_emotes');
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.replaceTextWithEmote);
        dubx.options.let_twitch_emotes = false;
        dubx.saveOption('twitch_emotes', 'false');
        dubx.off('.twitch_emotes');
    }
};

dubx.previewSearchStr = "";


/**************************************************************************
 * A bunch of utility helpers for the emoji preview
 */
dubx.emojiUtils = {
    createPreviewObj : function(type, id, name) {
        return {
            src : dubx[type].template(id),
            text : ":" + name + ":",
            alt : name,
            cn : type
        };
    },
    addToPreviewList : function(emojiArray) {
        var self = dubx.emojiUtils;
        var listArray = [];
        var _key;

        emojiArray.forEach(function(val,i,arr){
            _key = val.toLowerCase();
            if (typeof dubx.twitch.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("twitch", dubx.twitch.emotes[_key], val));
            }
            if (typeof dubx.bttv.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("bttv", dubx.bttv.emotes[_key], val));
            }
            if (typeof dubx.tasty.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("tasty", _key, val));
            }
            if (emojify.emojiNames.indexOf(_key) >= 0) {
                listArray.push(self.createPreviewObj("emoji", val, val));
            }
        });

        dubx.previewList(listArray);
    },
    filterEmoji : function(str){
        var finalStr = str.replace(/([+()])/,"\\$1");
        var re = new RegExp('^' + finalStr, "i");
        var arrayToUse = emojify.emojiNames;
        if (dubx.options.let_twitch_emotes) {
            arrayToUse = dubx.emojiEmotes; // merged array
        }
        return arrayToUse.filter(function(val){
            return re.test(val);
        });
    }
};

/**************************************************************************
 * handles filtering emoji, twitch, and users preview autocomplete popup on keyup
 */
dubx.chatInputKeyupFunc = function(e){
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

        dubx.previewSearchStr = p2;
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
        dubx.updateChatInput(new_text);
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

dubx.emoji_preview =function(){
    if (!dubx.options.let_emoji_preview) {
        dubx.options.let_emoji_preview = true;
        dubx.saveOption('emoji_preview', 'true');
        dubx.on('.emoji_preview');
    } else {
        dubx.options.let_emoji_preview = false;
        dubx.saveOption('emoji_preview', 'false');
        dubx.off('.emoji_preview');
    }
};

/**********************************************************************
 * handles replacing twitch emotes in the chat box with the images
 */

dubx.replaceTextWithEmote = function(){
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