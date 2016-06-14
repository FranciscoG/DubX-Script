/*
    THE Q PUBLIC LICENSE version 1.0
    Copyright (C) 1999-2005 Trolltech AS, Norway.
    Everyone is permitted to copy and distribute this license document.
    The intent of this license is to establish freedom to share and change the software regulated by this license under the open source model.
    This license applies to any software containing a notice placed by the copyright holder saying that it may be distributed under the terms of the Q Public License version 1.0. Such software is herein referred to as the Software. This license covers modification and distribution of the Software, use of third-party application programs based on the Software, and development of free software which uses the Software.
    Granted Rights
    1. You are granted the non-exclusive rights set forth in this license provided you agree to and comply with any and all conditions in this license. Whole or partial distribution of the Software, or software items that link with the Software, in any form signifies acceptance of this license.
    2. You may copy and distribute the Software in unmodified form provided that the entire package, including - but not restricted to - copyright, trademark notices and disclaimers, as released by the initial developer of the Software, is distributed.
    3. You may make modifications to the Software and distribute your modifications, in a form that is separate from the Software, such as patches. The following restrictions apply to modifications:
    a. Modifications must not alter or remove any copyright notices in the Software.
    b. When modifications to the Software are released under this license, a non-exclusive royalty-free right is granted to the initial developer of the Software to distribute your modification in future versions of the Software provided such versions remain available under these terms in addition to any other license(s) of the initial developer.
    4. You may distribute machine-executable forms of the Software or machine-executable forms of modified versions of the Software, provided that you meet these restrictions:
    a. You must include this license document in the distribution.
    b. You must ensure that all recipients of the machine-executable forms are also able to receive the complete machine-readable source code to the distributed Software, including all modifications, without any charge beyond the costs of data transfer, and place prominent notices in the distribution explaining this.
    c. You must ensure that all modifications included in the machine-executable forms are available under the terms of this license.
    5. You may use the original or modified versions of the Software to compile, link and run application programs legally developed by you or by others.
    6. You may develop application programs, reusable components and other software items that link with the original or modified versions of the Software. These items, when distributed, are subject to the following requirements:
    a. You must ensure that all recipients of machine-executable forms of these items are also able to receive and use the complete machine-readable source code to the items without any charge beyond the costs of data transfer.
    b. You must explicitly license all recipients of your items to use and re-distribute original and modified versions of the items in both machine-executable and source code forms. The recipients must be able to do so without any charges whatsoever, and they must be able to re-distribute to anyone they choose.
    c. If the items are not available to the general public, and the initial developer of the Software requests a copy of the items, then you must supply one.
    Limitations of Liability
    In no event shall the initial developers or copyright holders be liable for any damages whatsoever, including - but not restricted to - lost revenue or profits or other direct, indirect, special, incidental or consequential damages, even if they have been advised of the possibility of such damages, except to the extent invariable law, if any, provides otherwise.
    No Warranty
    The Software and this license document are provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
    Choice of Law
    This license is governed by the Laws of Norway. Disputes shall be settled by Oslo City Court.
*/
// jQuery's getJSON kept returning errors so making my own with promise-like
// structure and added optional Event to fire when done so can hook in elsewhere
dubx.getJSON = (function (url, optionalEvent) {
    var doneEvent;
    function GetJ(_url, _cb){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _url);
        xhr.send();
        xhr.onload = function() {
            var resp = xhr.responseText;
            if (typeof _cb === 'function') { _cb(resp); }
            if (optionalEvent) { document.body.dispatchEvent(doneEvent); }
        };
    }
    if (optionalEvent){ doneEvent = new Event(optionalEvent); }
    var done = function(cb){
        new GetJ(url, cb);
    };
    return { done: done };
});
/**
 * pings for the existence of var/function for 5 seconds until found
 * runs callback once found and stop pinging
 * @param  {variable}   waitingFor Your global function, variable, etc
 * @param  {Function} cb         Callback function
 */
dubx.whenAvailable = function(waitingFor, cb) {
    var interval = 100; // ms
    var currInterval = 0;
    var limit = 50; // how many intervals

    var check = function () {
        if (waitingFor && typeof cb === "function") {
            console.log("available", waitingFor);
            cb();
        } else if (currInterval < limit) {
            currInterval++;
            console.log('waiting for', waitingFor);
            window.setTimeout(check, interval);
        }
    };

    window.setTimeout(check, interval);
};
dubx.snow = function() {
    if (!dubx.options.let_snow) {
        dubx.options.let_snow = true;
        dubx.saveOption('snow','true');
        dubx.on('.snow');
        $(document).snowfall({
            round: true,
            shadow: true,
            flakeCount: 50,
            minSize: 1,
            maxSize: 5,
            minSpeed: 5,
            maxSpeed: 5
        });
    } else {
        dubx.options.let_snow = false;
        dubx.saveOption('snow','false');
        dubx.off('.snow');
        $(document).snowfall('clear');
    }
};
dubx.autovote = function() {
  if (!dubx.options.let_autovote) {
      dubx.options.let_autovote = true;

      var song = Dubtrack.room.player.activeSong.get('song');
      var dubCookie = Dubtrack.helpers.cookie.get('dub-' + Dubtrack.room.model.get("_id"));
      var dubsong = Dubtrack.helpers.cookie.get('dub-song');

      if(!Dubtrack.room || !song || song.songid !== dubsong) {
          dubCookie = false;
      }

      //Only cast the vote if user hasn't already voted
      if(!$('.dubup, .dubdown').hasClass('voted') && !dubCookie) {
          dubx.advance_vote();
      }

      dubx.saveOption('autovote','true');
      dubx.on('.autovote');
      Dubtrack.Events.bind("realtime:room_playlist-update", dubx.voteCheck);
  } else {
      dubx.options.let_autovote = false;
      dubx.saveOption('autovote','false');
      dubx.off('.autovote');
      Dubtrack.Events.unbind("realtime:room_playlist-update", dubx.voteCheck);
  }
};
dubx.afk_chat_respond = function(e) {
    var content = e.message;
    var user = Dubtrack.session.get('username');
    if (content.indexOf('@'+user) >-1 && Dubtrack.session.id !== e.user.userInfo.userid) {
        if (dubx.options.let_active_afk) {
            if (localStorage.getItem('customAfkMessage')) {
                var customAfkMessage = localStorage.getItem('customAfkMessage');
                $('#chat-txt-message').val('[AFK] '+customAfkMessage);
            } else {
                $('#chat-txt-message').val("[AFK] I'm not here right now.");
            }
            Dubtrack.room.chat.sendMessage();
            dubx.options.let_active_afk = false;
            setTimeout(function() {
                dubx.options.let_active_afk = true;
            }, 180000);
        }
    }
};

dubx.saveAfkMessage =function() {
    var customAfkMessage = $('.input').val();
    dubx.saveOption('customAfkMessage', customAfkMessage);
    $('.onErr').remove();
};

dubx.createAfkMessage =function() {
    var current = localStorage.getItem('customAfkMessage');
    dubx.input('Custom AFK Message',current,'I\'m not here right now.','confirm-for315','255');
    $('.confirm-for315').click(dubx.saveAfkMessage);
};

dubx.afk = function(e) {
    if(e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil') return;

    if (!dubx.options.let_afk) {
        dubx.options.let_afk = true;
        Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
        dubx.on('.afk');
    } else {
        dubx.options.let_afk = false;
        Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
        dubx.off('.afk');
    }
};
dubx.emoji = {
    template: function(id) { return emojify.defaultConfig.img_dir+'/'+encodeURI(id)+'.png'; },
};
dubx.twitch = {
    template: function(id) { return "//static-cdn.jtvnw.net/emoticons/v1/" + id + "/3.0"; },
    specialEmotes: [],
    emotes: {},
    chatRegex : new RegExp(":([-_a-z0-9]+):", "ig")
};
dubx.bttv = {
    template: function(id) { return  "//cdn.betterttv.net/emote/" + id + "/3x";  },
    emotes: {},
    chatRegex : new RegExp(":([&!()\\-_a-z0-9]+):", "ig")
};
dubx.tasty = {
    template: function(id) { return dubx.tasty.emotes[id].url; },
    emotes: {}
};
dubx.shouldUpdateAPIs = function(apiName){
    var self = this;
    var day = 86400000; // milliseconds in a day

    var today = Date.now();
    var lastSaved = parseInt(localStorage.getItem(apiName+'_api_timestamp'));
    return isNaN(lastSaved) || today - lastSaved > day * 5 || !localStorage[apiName +'_api'];
};
/**************************************************************************
 * Loads the twitch emotes from the api.
 * http://api.twitch.tv/kraken/chat/emoticon_images
 */
dubx.loadTwitchEmotes = function(){
    var self = dubx;
    var savedData;
    // if it doesn't exist in localStorage or it's older than 5 days
    // grab it from the twitch API
    if (self.shouldUpdateAPIs('twitch')) {
        console.log('Dubx','twitch','loading from api');
        var twApi = new self.getJSON('//api.twitch.tv/kraken/chat/emoticon_images', 'twitch:loaded');
        twApi.done(function(data){
            localStorage.setItem('twitch_api_timestamp', Date.now().toString());
            localStorage.setItem('twitch_api', data);
            self.processTwitchEmotes(JSON.parse(data));
        });
    } else {
        console.log('Dubx','twitch','loading from localstorage');
        savedData = JSON.parse(localStorage.getItem('twitch_api'));
        self.processTwitchEmotes(savedData);
        savedData = null; // clear the var from memory
        var twEvent = new Event('twitch:loaded');
        document.body.dispatchEvent(twEvent);
    }

};

dubx.loadBTTVEmotes = function(){
    var self = dubx;
    var savedData;
    // if it doesn't exist in localStorage or it's older than 5 days
    // grab it from the bttv API
    if (self.shouldUpdateAPIs('bttv')) {
        console.log('Dubx','bttv','loading from api');
        var bttvApi = new self.getJSON('//api.betterttv.net/2/emotes', 'bttv:loaded');
        bttvApi.done(function(data){
            localStorage.setItem('bttv_api_timestamp', Date.now().toString());
            localStorage.setItem('bttv_api', data);
            self.processBTTVEmotes(JSON.parse(data));
        });
    } else {
        console.log('Dubx','bttv','loading from localstorage');
        savedData = JSON.parse(localStorage.getItem('bttv_api'));
        self.processBTTVEmotes(savedData);
        savedData = null; // clear the var from memory
        var twEvent = new Event('bttv:loaded');
        document.body.dispatchEvent(twEvent);
    }

};

dubx.loadTastyEmotes = function(){
    var self = dubx;
    var savedData;
    console.log('Dubx','tasty','loading from api');
    // since we control this API we should always have it load from remote
    var tastyApi = new self.getJSON(dubx.gitRoot + '/emotes/tastyemotes.json', 'tasty:loaded');
    tastyApi.done(function(data){
        localStorage.setItem('tasty_api', data);
        self.processTastyEmotes(JSON.parse(data));
    });
};

dubx.processTwitchEmotes = function(data) {
    var self = dubx;
    data.emoticons.forEach(function(el,i,arr){
        var _key = el.code.toLowerCase();

        // move twitch non-named emojis to their own array
        if (el.code.indexOf('\\') >= 0) {
            self.twitch.specialEmotes.push([el.code, el.id]);
            return;
        }

        if (emojify.emojiNames.indexOf(_key) >= 0) {
            return; // do nothing so we don't override emoji
        }

        if (!self.twitch.emotes[_key]){
            // if emote doesn't exist, add it
            self.twitch.emotes[_key] = el.id;
        } else if (el.emoticon_set === null) {
            // override if it's a global emote (null set = global emote)
            self.twitch.emotes[_key] = el.id;
        }

    });
    self.twitchJSONSLoaded = true;
    self.emojiEmotes = emojify.emojiNames.concat(Object.keys(self.twitch.emotes));
};

dubx.processBTTVEmotes = function(data){
    var self = dubx;
    data.emotes.forEach(function(el,i,arr){
        var _key = el.code.toLowerCase();

        if (el.code.indexOf(':') >= 0) {
            return; // don't want any emotes with smileys and stuff
        }

        if (emojify.emojiNames.indexOf(_key) >= 0) {
            return; // do nothing so we don't override emoji
        }

        if (el.code.indexOf('(') >= 0) {
            _key = _key.replace(/([()])/g, "");
        }

        self.bttv.emotes[_key] = el.id;

    });
    self.bttvJSONSLoaded = true;
    self.emojiEmotes = self.emojiEmotes.concat(Object.keys(self.bttv.emotes));
};

dubx.processTastyEmotes = function(data) {
    var self = dubx;
    self.tasty.emotes = data.emotes;
    self.tastyJSONLoaded = true;
    self.emojiEmotes = self.emojiEmotes.concat(Object.keys(self.tasty.emotes));
};
/**
 * previewList
 * 
 * In this JS file should only exist what's necessary to populate the
 * autocomplete preview list that popups up for emojis and mentions
 * 
 * It also binds the events that handle navigating through the list
 * and also placing selected text into the chat
 */

dubx.updateChatInput = function(str){
    var inputText = $("#chat-txt-message").val();
    var updatedText = inputText.split(' ').map(function(c,i,r){
        var fullStr = str.toLowerCase();
        var partialStr = c.toLowerCase();
        if (fullStr.indexOf(partialStr) === 0) { 
            return str;
        } else {
            return c;
        }
    });
    $('#autocomplete-preview').empty().removeClass('ac-show');
    $("#chat-txt-message").val(updatedText.join(' ') + ' ').focus();
};

dubx.displayBoxIndex = -1;
dubx.doNavigate = function(diff) {
  var self = dubx;
  self.displayBoxIndex += diff;
  var oBoxCollection = $(".ac-show li");
  
  // remove "press enter to select" span
  $('.ac-list-press-enter').remove();

  if (self.displayBoxIndex >= oBoxCollection.length){
      dubx.displayBoxIndex = 0;
  }
  if (self.displayBoxIndex < 0){
       self.displayBoxIndex = oBoxCollection.length - 1;
   }
  var cssClass = "selected";
  var enterToSelectSpan = '<span class="ac-list-press-enter">press enter to select</span>';
  dubx.oBoxCollection.removeClass(cssClass).eq(self.displayBoxIndex).addClass(cssClass).append(enterToSelectSpan).focus();
};

dubx.previewListKeyUp = function(e){
  e.preventDefault();
  switch(e.keyCode) {
      case 38:
          dubx.doNavigate(-1);
          break;
      case 40:
          dubx.doNavigate(1);
          break;
      case 39:
      case 13:
          var new_text = $('#autocomplete-preview li.selected').find('.ac-text')[0].textContent;
          dubx.updateChatInput(new_text);
          break;
      default:
          $("#chat-txt-message").focus();
          break;
  }
};

/**
 * Populates the popup container with a list of items that you can click/enter
 * on to autocomplete items in the chat box
 * @param  {Array} acArray  the array of items to be added.  Each item is an object:
 * {
 *   src : full image src,
 *   text : text for auto completion,
 *   cn : css class name for to be concat with '-preview',
 *   alt : OPTIONAL, to add to alt and title tag
 * }
 */
dubx.previewList = function(acArray) {
    var self = this;

    function makePreviewContainer(cn){
        var d = document.createElement('li');
        d.className = cn;
        return d;
    }
    function makeImg(src, altText) {
        var i = document.createElement('img');
        i.src = src;
        if (altText) {
            i.title = altText;
            i.alt = altText;
        }
        var div = document.createElement('div');
        div.className = "ac-image";
        div.appendChild(i);
        return div;
    }
    function makeNameSpan (name){
        var s = document.createElement('span');
        s.textContent = name;
        s.className = "ac-text"; // autocomplete text
        return s;
    }
    function makeLi (info){
        var container = makePreviewContainer("preview-item "+info.cn+"-previews");
        var span = makeNameSpan(info.text);
        var img;
        if (info.alt) {
            img = makeImg(info.src, info.alt);
        } else {
            img = makeImg(info.src);
        }
        container.appendChild(img);
        container.appendChild(span);
        container.tabIndex = -1;
        return container;
    }

    var aCp =  document.getElementById('autocomplete-preview');
    aCp.innerHTML = "";
    self.displayBoxIndex = -1;
    var frag = document.createDocumentFragment();

    acArray.forEach(function(val,i,arr){
        frag.appendChild(makeLi(val));
    });

    aCp.appendChild(frag);
    aCp.classList.add('ac-show');
};

dubx.previewListInit = function(){
    $('head').prepend('<link rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/autocomplete.css">');
    var acUL = document.createElement('ul');
    acUL.id = "autocomplete-preview";
    $('.pusher-chat-widget-input').prepend(acUL);

    $(document.body).on('click', '.preview-item', function(e){
        var new_text = $(this).find('.ac-text')[0].textContent;
        dubx.updateChatInput(new_text);
    });

    $(document.body).on('keyup', '.ac-show', dubx.previewListKeyUp);
};
/* global dubx, Dubtrack, emojify */

/**************************************************************************
 * Turn on/off the twitch emoji in chat
 */
dubx.optionTwitchEmotes =function(){
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

dubx.optionEmojiPreview =function(){
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
dubx.optionMentions = function(){
    if (!dubx.options.let_autocomplete_mentions) {
        dubx.options.let_autocomplete_mentions = true;
        dubx.saveOption('autocomplete_mentions', 'true');
        dubx.on('.autocomplete_mentions');
    } else {
        dubx.options.let_autocomplete_mentions = false;
        dubx.saveOption('autocomplete_mentions', 'false');
        dubx.off('.autocomplete_mentions');
    }
};

dubx.mentionNotifications = function(){
    var self = this;

    function startNotifications(permission) {
        if (permission === "granted") {
            Dubtrack.Events.bind("realtime:chat-message", self.notifyOnMention);
            dubx.options.let_mention_notifications = true;
            dubx.saveOption('mention_notifications', 'true');
            dubx.on('.mention_notifications');
        }
    }

    if (!dubx.options.let_mention_notifications) {
        this.isActiveTab = true;

        window.onfocus = function () {
          dubx.isActiveTab = true;
        };

        window.onblur = function () {
          dubx.isActiveTab = false;
        };

        if (!("Notification" in window)) {
            dubx.input("Mention Notifications", "Sorry this browser does not support desktop notifications.  Please use the latest version of Chrome or FireFox");
        } else {
            if (Notification.permission === "granted") {
                startNotifications("granted");
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(startNotifications);
            } else {
                dubx.input("Mention Notifications", "You have chosen to block notifications. Reset this choice by clearing your cache for the site.");
            }
        }
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.notifyOnMention);
        dubx.options.let_mention_notifications = false;
        dubx.saveOption('mention_notifications', 'false');
        dubx.off('.mention_notifications');
    }
};

dubx.notifyOnMention = function(e){
    var content = e.message;
    var user = Dubtrack.session.get('username').toLowerCase();
    var mentionTriggers = ['@'+user];

    if (dubx.options.let_custom_mentions && localStorage.getItem('custom_mentions')) {
        //add custom mention triggers to array
        mentionTriggers = mentionTriggers.concat(localStorage.getItem('custom_mentions').toLowerCase().split(','));
    }

    if (mentionTriggers.some(function(v) { return content.toLowerCase().indexOf(v.trim(' ')) >= 0; }) && !dubx.isActiveTab && Dubtrack.session.id !== e.user.userInfo.userid) {
        var notificationOptions = {
            body: content,
            icon: "https://res.cloudinary.com/hhberclba/image/upload/c_lpad,h_100,w_100/v1400351432/dubtrack_new_logo_fvpxa6.png"
        };
        var n = new Notification("Message from "+e.user.username,notificationOptions);

        n.onclick = function(x) {
            window.focus();
            n.close();
        };
        setTimeout(n.close.bind(n), 5000);
    }
};
/* global dubx */
dubx.saveOption = function(selector,value) {
  localStorage.setItem(selector,value);
};

dubx.sectionList = ['draw_general','draw_userinterface','draw_settings','draw_customize','draw_contact','draw_social','draw_chrome'];
dubx.drawSection = function(el) {
    $(el).next('ul').slideToggle('fast');
    var sectionClass = $(el).next('ul').attr('class');

    var clicked = $(el).find('.for_content_c i');

    if(clicked.hasClass('fi-minus')){
        clicked.removeClass('fi-minus').addClass('fi-plus');
        dubx.saveOption(sectionClass,'false');
        dubx.options[sectionClass] = 'false';
    }
    else{
        clicked.removeClass('fi-plus').addClass('fi-minus');
        dubx.saveOption(sectionClass,'true');
        dubx.options[sectionClass] = 'true';
    }

};
dubx.drawAll = function() {
    var allClosed = true;
    var i;
    for(i = 0; i < dubx.sectionList.length; i++) {
        if($('.'+dubx.sectionList[i]).css('display') === 'block'){
            allClosed = false;
        }
    }

    if(allClosed) {
        dubx.sectionList.forEach(function(section,i,arr){
          $('.'+section).slideDown('fast');
          $('.'+section).prev('li').find('i').removeClass('fi-plus').addClass('fi-minus');
          dubx.saveOption(section, 'true');
          dubx.options[section] = 'true';
        });
    }
    else {
        dubx.sectionList.forEach(function(section,i,arr){
          $('.'+section).slideUp();
          $('.'+section).prev('li').find('i').removeClass('fi-minus').addClass('fi-plus');
          dubx.saveOption(section,'false');
          dubx.options[section] = 'false';
        });
    }
};

dubx.slide = function() {
  $('.for_content').slideToggle('fast');
};

dubx.on = function(selector) {
  $(selector + ' .for_content_off i').replaceWith('<i class="fi-check"></i>');
};
dubx.off = function(selector) {
  $(selector + ' .for_content_off i').replaceWith('<i class="fi-x"></i>');
};

dubx.menu = {
  general: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'General',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_general">',
          '<li onclick="dubx.snow();" class="for_content_li for_content_feature snow">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Snow</p>',
          '</li>',
          '<li onclick="dubx.autovote();" class="for_content_li for_content_feature autovote">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Autovote</p>',
          '</li>',
          '<li onclick="dubx.afk(event);" class="for_content_li for_content_feature afk">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p onclick="dubx.createAfkMessage();" class="for_content_edit" style="display: inline-block;color: #878c8e;font-size: .85rem;font-weight: bold;float: right;"><i class="fi-pencil"></i></p>',
              '<p class="for_content_p">AFK Autorespond</p>',
          '</li>',
          '<li onclick="dubx.optionTwitchEmotes();" class="for_content_li for_content_feature twitch_emotes">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Emotes</p>',
          '</li>',
          '<li onclick="dubx.optionEmojiPreview();" class="for_content_li for_content_feature emoji_preview">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Autocomplete Emoji</p>',
          '</li>',
          '<li onclick="dubx.optionMentions();" class="for_content_li for_content_feature autocomplete_mentions">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Autocomplete Mentions</p>',
          '</li>',
          '<li onclick="dubx.customMentions(event);" class="for_content_li for_content_feature custom_mentions">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p onclick="dubx.createCustomMentions();" class="for_content_edit" style="display: inline-block;color: #878c8e;font-size: .85rem;font-weight: bold;float: right;"><i class="fi-pencil"></i></p>',
              '<p class="for_content_p">Custom Mention Triggers</p>',
          '</li>',
          '<li onclick="dubx.mentionNotifications();" class="for_content_li for_content_feature mention_notifications">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Notification on Mentions</p>',
          '</li>',
          '<li onclick="dubx.grabInfoWarning(); dubx.showDubsOnHover();" class="for_content_li for_content_feature dubs_hover">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Show Dub info on Hover</p>',
          '</li>',
          '<li onclick="dubx.downdubChat();" class="for_content_li for_content_feature downdub_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Downdubs in Chat (Mod Only)</p>',
          '</li>',
          '<li onclick="dubx.updubChat();" class="for_content_li for_content_feature updub_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Updubs in Chat</p>',
          '</li>',
          '<li onclick="dubx.grabChat();" class="for_content_li for_content_feature grab_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Grabs in Chat</p>',
          '</li>',
      '</ul>'
    ].join('');
  },
  ui : function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'User Interface',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_userinterface">',
          '<li onclick="dubx.fs();" class="for_content_li for_content_feature fs">',
              '<p class="for_content_off"><i class="fi-arrows-out"></i></p>',
              '<p class="for_content_p">Fullscreen Video</p>',
          '</li>',
          '<li onclick="dubx.split_chat();" class="for_content_li for_content_feature split_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Split Chat</p>',
          '</li>',
          '<li onclick="dubx.video_window();" class="for_content_li for_content_feature video_window">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Chat</p>',
          '</li>',
          '<li onclick="dubx.chat_window();" class="for_content_li for_content_feature chat_window">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Video</p>',
          '</li>',
          '<li onclick="dubx.hide_avatars();" class="for_content_li for_content_feature hide_avatars">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Avatars</p>',
          '</li>',
          '<li onclick="dubx.medium_disable();" class="for_content_li for_content_feature medium_disable">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Background</p>',
          '</li>',
      '</ul>'
    ].join('');
  }, 
  settings: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Settings',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_settings">',
          '<li onclick="dubx.spacebar_mute();" class="for_content_li for_content_feature spacebar_mute">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Spacebar Mute</p>',
          '</li>',
          '<li onclick="dubx.show_timestamps();" class="for_content_li for_content_feature show_timestamps">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Show Timestamps</p>',
          '</li>',
          '<li onclick="dubx.warn_redirect();" class="for_content_li for_content_feature warn_redirect">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Warn On Navigation</p>',
          '</li>',
      '</ul>'
    ].join('');
  },
  customize: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Customize',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_customize">',
          '<li onclick="dubx.nicole();" class="for_content_li for_content_feature nicole">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Plug.dj Theme</p>',
          '</li>',
          '<li onclick="dubx.css_for_the_world();" class="for_content_li for_content_feature css">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Community Theme</p>',
          '</li>',
          '<li onclick="dubx.css_modal();" class="for_content_li for_content_feature">',
              '<p class="for_content_off"><i class="fi-unlink"></i></p>',
              '<p class="for_content_p">Custom CSS</p>',
          '</li>',
          '<li onclick="dubx.medium_modal();" class="for_content_li for_content_feature">',
              '<p class="for_content_off"><i class="fi-unlink"></i></p>',
              '<p class="for_content_p">Custom Background</p>',
          '</li>',
      '</ul>'
    ].join('');
  },
  contact: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Contact',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_contact">',
          '<li onclick="dubx.report_modal();" class="for_content_li for_content_feature report">',
              '<p class="for_content_off"><i class="fi-comments"></i></p>',
              '<p class="for_content_p">Bug Report</p>',
          '</li>',
      '</ul>'
    ].join('');
  },
  social: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Social',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_social">',
          '<li class="for_content_li for_content_feature">',
              '<a href="https://www.facebook.com/DubXScript" target="_blank" style="color: #878c8e;">',
                  '<p class="for_content_off"><i class="fi-social-facebook"></i></p>',
                  '<p class="for_content_p">Like Us on Facebook</p>',
              '</a>',
          '</li>',
          '<li class="for_content_li for_content_feature">',
              '<a href="https://twitter.com/DubXScript" target="_blank" style="color: #878c8e;">',
                  '<p class="for_content_off"><i class="fi-social-twitter"></i></p>',
                  '<p class="for_content_p">Follow Us on Twitter</p>',
              '</a>',
          '</li>',
          '<li class="for_content_li for_content_feature">',
              '<a href="https://github.com/sinfulBA/DubX-Script" target="_blank" style="color: #878c8e;">',
                  '<p class="for_content_off"><i class="fi-social-github"></i></p>',
                  '<p class="for_content_p">Fork Us on Github</p>',
              '</a>',
          '</li>',
          '<li class="for_content_li for_content_feature">',
              '<a href="https://dubx.net" target="_blank" style="color: #878c8e;">',
                  '<p class="for_content_off"><i class="fi-link"></i></p>',
                  '<p class="for_content_p">Our Website</p>',
              '</a>',
          '</li>',
          '<li class="for_content_li for_content_feature">',
              '<a href="https://dubx.net/donate.html" target="_blank" style="color: #878c8e;">',
                  '<p class="for_content_off"><i class="fi-pricetag-multiple"></i></p>',
                  '<p class="for_content_p">Donate</p>',
              '</a>',
          '</li>',
      '</ul>'
    ].join('');
  },
  extension: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Chrome Extension',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_chrome">',
          '<li class="for_content_li for_content_feature">',
              '<a href="https://chrome.google.com/webstore/detail/dubx/oceofndagjnpebjmknefoelcpcnpcedm/reviews" target="_blank" style="color: #878c8e;">',
                  '<p class="for_content_off"><i class="fi-like"></i></p>',
                  '<p class="for_content_p">Give Us a Rating</p>',
              '</a>',
          '</li>',
      '</ul>'
    ].join('');
  }

};

dubx.makeMenu = function(){
    // add icon to the upper right corner
    var li = '<div class="for" onclick="dubx.slide();"><img src="'+dubx.gitRoot+'/params/params.svg" alt=""></div>';
    $('.header-right-navigation').append(li);

    $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/asset.css">');

    var html = [
        '<div class="for_content" style="display:none;">',
          '<span class="for_content_ver">DubX Settings</span>',
          '<span class="for_content_version" onclick="dubx.drawAll();" title="Collapse/Expand Menus">'+dubx.our_version+'</span>',
          '<ul class="for_content_ul">',
            dubx.menu.general(),
            dubx.menu.ui(),
            dubx.menu.settings(),
            dubx.menu.customize(),
            dubx.menu.contact(),
            dubx.menu.social(),
            dubx.menu.extension(),
          '</ul>',
        '</div>'
    ].join('');

    $('body').prepend(html);
    $('.for_content').perfectScrollbar();

};
var dubx = {
  our_version : '03.05.00 - Dub Vote Info',
  gitRoot: 'https://rawgit.com/FranciscoG/DubX-Script/dev',
  options : {
      let_autovote: false,
      let_split_chat: false,
      let_fs: false,
      let_medium_disable: false,
      let_warn_redirect: false,
      let_afk: false,
      let_active_afk: true,
      let_chat_window: false,
      let_css: false,
      let_hide_avatars: false,
      let_nicole: false,
      let_show_timestamps: false,
      let_video_window: false,
      let_twitch_emotes: false,
      let_emoji_preview: false,
      let_spacebar_mute: false,
      let_autocomplete_mentions: false,
      let_mention_notifications: false,
      let_downdub_chat_notifications: false,
      let_updub_chat_notifications: false,
      let_grab_chat_notifications: false,
      let_dubs_hover: false,
      let_custom_mentions: false,
      let_snow: false,
      draw_general: false,
      draw_userinterface: false,
      draw_settings: false,
      draw_customize: false,
      draw_contact: false,
      draw_social: false,
      draw_chrome: false
    },
    dubs : {
      upDubs: [],
      downDubs: [],
      grabs: []
    }

};

dubx.personalize = function() {
  $('.isUser').text(Dubtrack.session.get('username'));
};

dubx.dubinfoInit = function(){
    $('head').prepend('<link rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/dubinfo.css">');
};

dubx.init = function() {
  $('html').addClass('dubx');
  $.getScript('https://rawgit.com/loktar00/JQuery-Snowfall/master/src/snowfall.jquery.js');

  $('.player_sharing').append('<span class="icon-history eta_tooltip_t" onmouseover="dubx.eta();" onmouseout="dubx.hide_eta();"></span>');
  $('.player_sharing').append('<span class="icon-mute snooze_btn" onclick="dubx.snooze();" onmouseover="dubx.snooze_tooltip();" onmouseout="dubx.hide_snooze_tooltip();"></span>');
  $('.icon-mute.snooze_btn:after').css({"content": "1", "vertical-align": "top", "font-size": "0.75rem", "font-weight": "700"});

  dubx.makeMenu();
  dubx.personalize();
  dubx.previewListInit();
  dubx.userAutoComplete();
  dubx.dubinfoInit();

  //Ref 4:
  if (localStorage.getItem('autovote') === 'true') {
      dubx.autovote();
  }
  if (localStorage.getItem('split_chat') === 'true') {
      dubx.split_chat();
  }
  if (localStorage.getItem('medium_disable') === 'true') {
      dubx.medium_disable();
  }
  if (localStorage.getItem('warn_redirect') === 'true') {
      dubx.warn_redirect();
  }
  if (localStorage.getItem('chat_window') === 'true') {
      dubx.chat_window();
  }
  if (localStorage.getItem('hide_avatars') === 'true') {
      dubx.hide_avatars();
  }
  if (localStorage.getItem('show_timestamps') === 'true') {
      dubx.show_timestamps();
  }
  if (localStorage.getItem('video_window') === 'true') {
      dubx.video_window();
  }
  if (localStorage.getItem('css_world') === 'true') {
      dubx.css_for_the_world();
  }
  if (localStorage.getItem('nicole') === 'true') {
      dubx.nicole();
  }
  if (localStorage.getItem('twitch_emotes') === 'true') {
      dubx.optionTwitchEmotes();
  }
  if (localStorage.getItem('emoji_preview') === 'true') {
      dubx.optionEmojiPreview();
  }
  if (localStorage.getItem('autocomplete_mentions') === 'true') {
      dubx.optionMentions();
  }
  if (localStorage.getItem('mention_notifications') === 'true') {
      dubx.mentionNotifications();
  }
  if (localStorage.getItem('custom_mentions')) {
      dubx.customMentions();
  }
  if (localStorage.getItem('spacebar_mute') === 'true') {
      dubx.spacebar_mute();
  }
  if (localStorage.getItem('downdub_chat') === 'true') {
      dubx.downdubChat();
  }
  if (localStorage.getItem('updub_chat') === 'true') {
      dubx.updubChat();
  }
  if (localStorage.getItem('grab_chat') === 'true') {
      dubx.grabChat();
  }
  if (localStorage.getItem('dubs_hover') === 'true') {
      dubx.showDubsOnHover();
  }

  for(var i = 0; i < dubx.sectionList.length; i++){
    if (localStorage.getItem(dubx.sectionList[i]) === 'false') {
        $('.'+dubx.sectionList[i]).css('display', 'none');
        $('.'+dubx.sectionList[i]).prev('li').find('i').removeClass('fi-minus').addClass('fi-plus');
        dubx.options[dubx.sectionList[i]] = 'false';
    }
    else if(localStorage.getItem(dubx.sectionList[i]) === undefined) {
        dubx.option(dubx.sectionList[i], 'true');
        dubx.options[dubx.sectionList[i]] = 'true';
    }
    else {
        dubx.options[dubx.sectionList[i]] = 'true';
    }
  }

  $('document').ready(dubx.css_run);
  $('document').ready(dubx.medium_load);

  $('.for').click(function() {
      $('.for_content').show();
  });

  // Ref 5:
  $('.chat-main').on('DOMNodeInserted', function(e) {
      var itemEl = $(e.target);
      if(itemEl.prop('tagName').toLowerCase() !== 'li' || itemEl.attr('class').substring(0, 'user-'.length) !== 'user-') return;
      var user = Dubtrack.room.users.collection.findWhere({userid: itemEl.attr('class').split(/-| /)[1]});
      var role = !user.get('roleid') ? 'default' : Dubtrack.helpers.isDubtrackAdmin(user.get('userid')) ? 'admin' : user.get('roleid').type;
      itemEl.addClass('is' + (role.charAt(0).toUpperCase() + role.slice(1)));
  });
};


