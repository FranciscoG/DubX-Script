    /************************************************************
        This is just used for testing
    *************************************************************/
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
                    if (optionalEvent) { document.dispatchEvent(doneEvent) };
                };
            }
            if (optionalEvent){ doneEvent = new CustomEvent(optionalEvent); }
            var done = function(cb){
                new GetJ(url, cb);
            };
            return { done: done };
        }),

        twitch : { 
            template: "//static-cdn.jtvnw.net/emoticons/v1/{image_id}/1.0",
            specialEmotes: [ [new RegExp(":([a-z0-9_-]+):", "i"), "named"] ],
            emotes: {},
            chatRegex : new RegExp(":([a-z0-9_-]+):", "ig"),
            megaRegex : new RegExp(":([a-z0-9_-]+):", "ig")
        },
        /**************************************************************************
         * Loads the twitch emotes from the api.  
         * http://api.twitch.tv/kraken/chat/emoticon_images
         */
        loadTwitchFromApi: function(){
            var self = this;

            // load Sub emotes first so that the global ones could override them
            this.getJSON('//api.twitch.tv/kraken/chat/emoticon_images')
                .done(function(data){
                    data.emoticons.forEach(function(el,i,arr){
                        var _key = el.code.toLowerCase();
                        
                        // move twitch non-named emojis to their own array
                        if (el.code.indexOf('\\') >= 0) {
                            self.twitch.specialEmotes.push([el.code, el.id]);
                            return;
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
                    // combined twitch and normal emoji names into one array for filtering later
                    self.emojiTwitch = emojify.emojiNames.concat(Object.keys(self.twitch.emotes));
                    
                    // create a big regex array
                    var mega = self.twitch.specialEmotes
                        .map(function(v) {
                            var re = v[0];
                            var val = re.source || re;
                            val = val.replace(/(^|[^\[])\^/g, '$1');
                            return "(" + val + ")";
                        })
                        .join('|');
                    self.twitch.megaRegex = new RegExp(mega, "gi");
                });
        },
        /**************************************************************************
         * handles replacing twitch emotes in the chat box with the images
         */
        getEmojiID: function(matchArray, matched){
            var self = hello;
            var _id, _src, _desc, key;

            function makeImage(src, name){
                return '<img class="emoji" title="'+name+'" alt="'+name+'" src="'+src+'" />';
            }
            
            if (matchArray[1] && matchArray[2]){
                key = matchArray[2].toLowerCase();
                console.log(matched, key, emojify.emojiNames.indexOf(key));
                if (emojify.emojiNames.indexOf(key) >= 0) { return matched; }

                if (typeof self.twitch.emotes[key] !== 'undefined'){
                    _id = self.twitch.emotes[key];
                    _src = self.twitch.template.replace("{image_id}", _id);
                    return makeImage(_src, key);
                }
            }

            for(var i = 3; i < matchArray.length - 1; i++) {
                if(matchArray[i]) {
                    _id = self.twitch.specialEmotes[i - 2][1];
                    _src = self.twitch.template.replace("{image_id}", _id);
                    return makeImage(_src, "special");
                }
            }
            return matched;
        },
        replaceTextWithEmote: function(){
            var self = hello;
            if (!self.twitchJSONSLoaded) { return; } // can't do anything until jsons are loaded
            
            var $last = $('.chat-main .text').last();
            
            var emoted = $last.html().replace(self.twitch.megaRegex, function(matched, p1){
                var matches = Array.prototype.slice.call(arguments, 0, -2);
                console.log('matches',matches);
                return self.getEmojiID(matches, matched);
            });
            $last.html(emoted);
        },
        /**************************************************************************
         * Turn on/off the twitch emoji in chat
         */
        optionTwitchEmotes: function(){
            if (!options.let_twitch_emotes) {
                this.replaceTextWithEmote();
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
            createTwitchImg : function(id, name) {
                var self = hello.emojiUtils;
                var _src = hello.twitch.template.replace("{image_id}", id);
                var img = self.makeEmoImage(_src);
                img.title = name; img.alt = name;
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
                        frag.appendChild(self.createTwitchImg(hello.twitch.emotes[_key], val));
                    } else if (emojify.emojiNames.indexOf(_key) >= 0) {
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
            var currentText = this.value;
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
        },
        optionEmojiPreview: function(){
            if (!$('#emoji-preview').length) {
                hello.emojiTwitchInit();
            }

            if (!options.let_emoji_preview) {
                $(document.body).on('keyup', "#chat-txt-message", this.emojiKeyUpFunction);
                $(document.body).on('keyup', '.emoji-grow', hello.emojiKeyNavFunction);
                options.let_emoji_preview = true;
                hello.option('emoji_preview', 'true');
                hello.on('.emoji_preview');
            } else {
                $(document.body).off('keyup', "#chat-txt-message", this.emojiKeyUpFunction);
                $(document.body).off('keyup', '.emoji-grow', hello.emojiKeyNavFunction);
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