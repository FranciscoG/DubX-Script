/* global emojify, Dubtrack, twitchObject */

var options = {
    let_twitch_emotes: false, // convert emotes in chat
    let_emoji_preview: false, // show emoji preview while typing
    let_twitch_emote_preview: false // show twitch emote preview while typing
};
var hello = {
    // stubbing so I don't get errors
    on: function(){},
    off: function(){},
    option: function(){},
    gitRoot: 'https://rawgit.com/FranciscoG/DubX-Script/dev',

    // jQuery's getJSON kept returning errors so making my own with promise-like
    // structure and added optional Event to fire when done so can hook in elsewhere
    getJSON : (function (url, optionalEvent) {
        var doneEvent;
        function GetJ(_url, _cb){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', _url);
            xhr.send();
            xhr.onload = function() {
                var resp = JSON.parse(xhr.responseText);
                if (typeof _cb === 'function') { _cb(resp); }
                document.dispatchEvent(doneEvent);
            };
        }
        if (optionalEvent){ doneEvent = new CustomEvent(optionalEvent); }
        var done = function(cb){
            new GetJ(url, cb);
        };
        return { done: done };
    }),

    twitch : { 
        template: "",
        emotes: {}
    },
    /**************************************************************************
     * Loads the twitch emotes from the api.  
     * API Source: twitchemotes.com
     */
    loadTwitchFromApi: function(){
        var self = this;

        // load Sub emotes first so that the global ones could override them
        this.getJSON('//twitchemotes.com/api_cache/v2/subscriber.json', 'emotes:subs:loaded')
            .done(function(data){ 
                self.twitch.template = data.template.small; // just in case global fails
                for (var channel in data.channels) {
                    for (var i in data.channels[channel]['emotes']) {
                        var emoteName = data.channels[channel]['emotes'][i].code;
                        self.twitch.emotes[emoteName.toLowerCase()] = {
                            "image_id" : data.channels[channel]['emotes'][i]["image_id"],
                            "description" : 'Twitch subscriber emote from ' + data.channels[channel].title + ' @ ' + data.channels[channel].link
                        };
                    }
                }
            });
        
        document.addEventListener('emotes:subs:loaded', function(e) {
           // Get the global emojis second so that they could override the sub ones if duplicates
           self.getJSON('//twitchemotes.com/api_cache/v2/global.json', 'emotes:global:loaded')
               .done(function(data){ 
                   self.twitch.template = data.template.small;
                   var key, keys = Object.keys(data.emotes);
                   var n = keys.length;
                   var newobj={};
                   while (n--) {
                     key = keys[n];
                     self.twitch.emotes[key.toLowerCase()] = data.emotes[key];
                   }
               });
        });

        // create our giant array of both emoji and twitch names
        this.twitchJSONSLoaded = false;
        document.addEventListener('emotes:global:loaded', function(e) {
            self.twitchJSONSLoaded = true; // if at least one is loaded we can start using it
            // creating a combined array of emojis and the twitch emote names
            hello.emojiTwitch = emojify.emojiNames.concat(Object.keys(hello.twitch.emotes));
        });
    },
    /**************************************************************************
     * handles replacing twitch emotes in the chat box with the images
     */
    replaceTextWithEmote: function(){
        var self = hello;

        if (!self.twitchJSONSLoaded) { return; } // can't do anything until jsons are loaded
        function makeImage(src, desc){
            return '<img class="emoji" title="'+desc+'" alt="'+desc+'" src="'+src+'" />';
        }
        
        var inChatEmojiRegex = new RegExp(":([+\\-_A-Za-z0-9]+):","ig");
        var $last = $('.chat-main .text').last();
        var emoted = $last.html().replace(inChatEmojiRegex, function(matched, p1){
            var _id, _src, _desc, key = p1.toLowerCase();

            if (typeof self.twitch.emotes[key] !== 'undefined'){
                _id = self.twitch.emotes[key].image_id;
                _src = self.twitch.template.replace("{image_id}", _id);
                _desc = self.twitch.emotes[key].description;
                return makeImage(_src, _desc);
            } else {
                return matched;
            }
        });
        $last.html(emoted);
    },
    /**************************************************************************
     * Turn on/off the twitch emoji in chat
     */
    optionTwitchEmotes: function(){
        if (!options.let_twitch_emotes) {
            Dubtrack.Events.bind("realtime:chat-message", this.replaceTextWithEmote);
            options.let_twitch_emotes = true;
            hello.option('twitch_emotes', 'true');
            hello.on('.twitch_emotes');
        } else {
            Dubtrack.Events.unbind("realtime:chat-message", this.replaceTextWithEmote);
            options.let_twitch_emotes = false;
            hello.option('twitch_emotes', 'false');
            hello.off('.twitch_emotes');
        }
    },
    /**************************************************************************
     * A bunch of utility helpers for the emoji preview
     */
    emojiUtils : {
        makePreviewContainer : function(cn){
            var d = document.createElement('li');
            d.className = cn;
            return d; 
        },
        makeEmoImage : function(src) {
            var i = document.createElement('img');
            i.src = src;
            return i;
        },
        makeNameSpan : function(name){
            var s = document.createElement('span');
           s.textContent = ":" + name + ":";
            return s;
        },
        makeLi: function(type, name, img){
            var self = hello.emojiUtils;
            var container = self.makePreviewContainer("preview-container "+type+"-previews");
            var span = self.makeNameSpan(name);
            container.appendChild(img);
            container.appendChild(span);
            container.tabIndex = -1;
            return container;
        },
        createTwitchImg : function(id, name, desc) {
            var self = hello.emojiUtils;
            var _src = hello.twitch.template.replace("{image_id}", id);
            var img = self.makeEmoImage(_src);
            img.title = desc;
            return self.makeLi('twitch', name, img);
        },
        createImg : function(name) {
            var self = hello.emojiUtils;
            var img = self.makeEmoImage(emojify.defaultConfig.img_dir+'/'+encodeURI(name)+'.png');
            img.title = ':'+name+':'; 
            return self.makeLi('emoji', name, img);
        },
        addToHelper : function(emojiArray) {
            var self = hello.emojiUtils;
            $('#emoji-preview').empty();
            var frag = document.createDocumentFragment();
            var _key;

            emojiArray.forEach(function(val,i,arr){
                _key = val.toLowerCase();
                if (typeof hello.twitch.emotes[_key] !== 'undefined') {
                    frag.appendChild(self.createTwitchImg(hello.twitch.emotes[_key].image_id, val, hello.twitch.emotes[_key].description));
                } else {
                    frag.appendChild(self.createImg(val));
                }
            });

            document.getElementById('emoji-preview').appendChild(frag);
            $('#emoji-preview').addClass('emoji-grow');
        },
        filterEmoji : function(str){
            var finalStr = str.replace("+","\\+");
            var re = new RegExp('^' + finalStr, "i");
            var arrayToUse = emojify.emojiNames;
            if (options.let_twitch_emote_preview) {
                arrayToUse = hello.emojiTwitch; // merged array
            }
            return arrayToUse.filter(function(val){
                return re.test(val);
            });
        },
        emojiSearchStr : ""
    },
    /**************************************************************************
     * This handles the emoji preview in the chat input as you type
     */
    optionTwitchEmotePreview: function(){
        if (!options.let_twitch_emote_preview) {
            options.let_twitch_emote_preview = true;
            hello.option('twitch_emote_preview', 'true');
            hello.on('.twitch_emote_preview');
        } else {
            options.let_twitch_emote_preview = false;
            hello.option('twitch_emote_preview', 'false');
            hello.off('.twitch_emote_preview');
        }
    },
    emojiKeyUpFunction: function(e){
        var self = hello.emojiUtils;
        var currentText = $('#chat-txt-message').val();
        var filteredEmoji = currentText.replace(/:([+\\-_a-z0-9]+)$/i, function(matched, p1){
            self.emojiSearchStr = p1;
            if (self.emojiSearchStr.length >= 3) { // change to set character limit
                self.addToHelper(self.filterEmoji(p1));
            }
        });
        
        var lastChar = currentText.charAt(currentText.length - 1);
        if (self.emojiSearchStr.length <= 2 || // change to set character limit
            lastChar === ":" ||
            lastChar === " " ||
            currentText === "")
        {
            self.emojiSearchStr = "";
            $('#emoji-preview').empty().removeClass('emoji-grow');
        }

        if (e.keyCode === 38 || e.keyCode === 40) {
            hello.doNavigate(-1);
        }
    },
    displayBoxIndex : -1,
    doNavigate : function(diff) {
        hello.displayBoxIndex += diff;
        var oBoxCollection = $(".emoji-grow li");
        if (hello.displayBoxIndex >= oBoxCollection.length){
            hello.displayBoxIndex = 0;
        }
        if (hello.displayBoxIndex < 0){
             hello.displayBoxIndex = oBoxCollection.length - 1;
         }
        var cssClass = "selected";
        oBoxCollection.removeClass(cssClass).eq(hello.displayBoxIndex).addClass(cssClass).focus();
    },
    emojiKeyNavFunction: function(e){
        if ( $('#emoji-preview').hasClass('emoji-grow')) {
           e.preventDefault();
           if (e.keyCode === 38) {
               hello.doNavigate(-1);
           }
           else if (e.keyCode === 40) {
               hello.doNavigate(1);
           }
           else if (e.keyCode === 13) {
               $('#emoji-preview li.selected').trigger('click');
               return false;
           }
        } 
    },
    updateChatInput: function(str){
        var _re = new RegExp(":"+hello.emojiUtils.emojiSearchStr + "$");
        var fixed_text = $("#chat-txt-message").val().replace(_re, str) + " ";
        $('#emoji-preview').empty().removeClass('emoji-grow');
        $("#chat-txt-message").val(fixed_text).focus();
    },
    emojiTwitchInit: function(){
        // this will only be run once
        $('head').prepend('<link rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/emoji.css">');
        var emojiPreview = document.createElement('ul');
        emojiPreview.id = "emoji-preview";
        $('.pusher-chat-widget-input').prepend(emojiPreview);

        $(document.body).on('click', '.preview-container', function(e){
            var new_text = $(this).find('span').text();
            hello.updateChatInput(new_text);
        });
        $(document.body).on('keyup', '.emoji-grow', hello.emojiKeyNavFunction);
    },
    optionEmojiPreview: function(){
        if (!$('#emoji-preview').length) {
            hello.emojiTwitchInit();
        }

        if (!options.let_emoji_preview) {
            $(document.body).on('keyup', "#chat-txt-message", this.emojiKeyUpFunction);
            options.let_emoji_preview = true;
            hello.option('emoji_preview', 'true');
            hello.on('.emoji_preview');
        } else {
            $(document.body).off('keyup', "#chat-txt-message", this.emojiKeyUpFunction);
            options.let_emoji_preview = false;
            hello.option('emoji_preview', 'false');
            hello.off('.emoji_preview');
        }
    }
};
hello.loadTwitchFromApi();

// check localStorage and run these if true.  
hello.optionTwitchEmotes();
hello.optionTwitchEmotePreview();
hello.optionEmojiPreview();