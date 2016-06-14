
var hello_run;
if (!hello_run && Dubtrack.session.id) {
    hello_run = true;

   
    //Ref 2: Options
    var hello = {
        //Ref 2.1: Initialize
        
        
        //Ref 2.3.1: Input
        input: function(title,content,placeholder,confirm,maxlength) {
            var textarea = '', confirmButton = '';
            if (placeholder) {
                var mx = maxlength || 999;
                textarea = '<textarea class="input" type="text" placeholder="'+placeholder+'" maxlength="'+ mx +'">'+content+'</textarea>';
            }
            if (confirm) {
                confirmButton = '<div class="'+confirm+' confirm"><p>Okay</p></div>';
            }
            var onErr = [
                '<div class="onErr">',
                    '<div class="container">',
                        '<div class="title">',
                            '<h1>'+title+'</h1>',
                        '</div>',
                        '<div class="content">',
                            '<p>'+content+'</p>',
                            textarea,
                        '</div>',
                        '<div class="control">',
                            '<div class="cancel" onclick="dubx.closeErr();">',
                                '<p>Cancel</p>',
                            '</div>',
                            confirmButton,
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');
            $('body').prepend(onErr);
        },
        
        closeErr: function() {
            $('.onErr').remove();
        },
        
        advance_vote: function() {
            $('.dubup').click();
        },
        voteCheck: function (obj) {
            if (obj.startTime < 2) {
                dubx.advance_vote();
            }
        },
        
        
        split_chat: function() {
            if (!dubx.options.let_split_chat) {
                dubx.options.let_split_chat = true;
                $('.chat-main').addClass('splitChat');
                dubx.saveOption('split_chat', 'true');
                dubx.on('.split_chat');
            } else {
                dubx.options.let_split_chat = false;
                $('.chat-main').removeClass('splitChat');
                dubx.saveOption('split_chat','false');
                dubx.off('.split_chat');
            }
        },
        eta: function() {
            var time = 4;
            var current_time = parseInt($('#player-controller div.left ul li.infoContainer.display-block div.currentTime span.min').text());
            var booth_duration = parseInt($('.queue-position').text());
            var booth_time = (booth_duration * time - time) + current_time;
            if (booth_time >= 0) {
                $('.eta_tooltip_t').append('<div class="eta_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">ETA: '+booth_time+' minutes</div>');
            } else {
                $('.eta_tooltip_t').append('<div class="eta_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">You\'re not in the queue</div>');
            }
        },
        hide_eta: function() {
            $('.eta_tooltip').remove();
        },
        snooze_tooltip: function() {
            $('.snooze_btn').append('<div class="snooze_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">Mute current song</div>');
        },
        hide_snooze_tooltip: function() {
            $('.snooze_tooltip').remove();
        },
        report_content: function() {
            var content = $('.input').val();

            if(!content || content.trim(' ').length === 0) return;

            var user = Dubtrack.session.get('username');
            var id = Dubtrack.realtime.dtPubNub.get_uuid();
            var href = location.href;
            var woosh = [
                ' *Username*: '+user+' | ',
                ' *Identification*: '+id+' | ',
                ' *Location*: `'+location+'` | ',
                ' *Content*: '+content+' | '
            ].join('');
            $.ajax({
                type: 'POST',
                url: 'https://hooks.slack.com/services/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',
                data: 'payload={"username": "Incoming Bug Report", "text": "'+woosh+'", "icon_emoji": ":bug:"}',
                crossDomain: true
            });
            $('.report').replaceWith('<li onclick="" class="for_content_li for_content_feature report"><p class="for_content_off"><i class="fi-check"></i></p><p class="for_content_p">Bug Report</p></li>');
        },
        report_modal: function() {
            dubx.input('Bug Report:','','Please only report bugs for DubX, not Dubtrack. \nBe sure to give a detailed description of the bug, and a way to replicate it, if possible.','confirm-for36','999');
            $('.confirm-for36').click(dubx.report_content);
            $('.confirm-for36').click(dubx.closeErr);
        },
        fs: function() {
            var elem = document.querySelector('.playerElement iframe');
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        },
        medium_disable: function() {
            if (!dubx.options.let_medium_disable) {
                dubx.options.let_medium_disable = true;
                $('.backstretch').hide();
                $('.medium').hide();
                dubx.saveOption('medium_disable','true');
                dubx.on('.medium_disable');
            } else {
                dubx.options.let_medium_disable = false;
                $('.backstretch').show();
                $('.medium').show();
                dubx.saveOption('medium_disable','false');
                dubx.off('.medium_disable');
            }
        },
        warn_redirect: function() {
            if(!dubx.options.let_warn_redirect) {
                dubx.options.let_warn_redirect = true;
                window.onbeforeunload = function(e) {
                    return '';
                };
                dubx.saveOption('warn_redirect','true');
                dubx.on('.warn_redirect');
            } else {
                dubx.options.let_warn_redirect = false;
                window.onbeforeunload = null;
                dubx.saveOption('warn_redirect','false');
                dubx.off('.warn_redirect');
            }
        },
        
        
        customMentions: function(e) {
            if(e && e.target && (e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil')) return;

            if (!dubx.options.let_custom_mentions) {
                dubx.options.let_custom_mentions = true;
                Dubtrack.Events.bind("realtime:chat-message", this.customMentionCheck);
                dubx.on('.custom_mentions');
            } else {
                dubx.options.let_custom_mentions = false;
                Dubtrack.Events.unbind("realtime:chat-message", this.customMentionCheck);
                dubx.off('.custom_mentions');
            }
        },
        customMentionCheck: function(e) {
            var content = e.message.toLowerCase();
            if (dubx.options.let_custom_mentions) {
                if (localStorage.getItem('custom_mentions')) {
                    var customMentions = localStorage.getItem('custom_mentions').toLowerCase().split(',');
                    if(Dubtrack.session.id !== e.user.userInfo.userid && customMentions.some(function(v) { return content.indexOf(v.trim(' ')) >= 0; })){
                        Dubtrack.room.chat.mentionChatSound.play();
                    }
                }
            }
        },
        createCustomMentions: function() {
            var current = localStorage.getItem('custom_mentions');
            dubx.input('Custom Mention Triggers (separate by comma)',current,'separate, custom triggers, by, comma, :heart:','confirm-for315','255');
            $('.confirm-for315').click(dubx.saveCustomMentions);
        },
        saveCustomMentions: function() {
            var customMentions = $('.input').val();
            dubx.saveOption('custom_mentions', customMentions);
            $('.onErr').remove();
        },
        chat_window: function() {
            if(!dubx.options.let_chat_window) {
                dubx.options.let_chat_window = true;
                $('head').append('<link class="chat_window_link" rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/chat_window.css">');
                dubx.saveOption('chat_window','true');
                dubx.on('.chat_window');
            } else {
                dubx.options.let_chat_window = false;
                $('.chat_window_link').remove();
                dubx.saveOption('chat_window','false');
                dubx.off('.chat_window');
            }
        },
        css_modal: function() {
            var current = localStorage.getItem('css') || "";
            dubx.input('CSS',current,'https://example.com/example.css','confirm-for313','999');
            $('.confirm-for313').click(dubx.css_import);
        },
        css_import: function() {
            $('.css_import').remove();
            var css_to_import = $('.input').val();
            dubx.saveOption('css',css_to_import);
            if (css_to_import && css_to_import !== '') {
                $('head').append('<link class="css_import" href="'+css_to_import+'" rel="stylesheet" type="text/css">');
            }
            $('.onErr').remove();
        },
        css_run: function() {
            if (localStorage.getItem('css') !== null) {
                var css_to_load = localStorage.getItem('css');
                $('head').append('<link class="css_import" href="'+css_to_load+'" rel="stylesheet" type="text/css">');
            }
        },
        css_for_the_world: function() {
            if (!dubx.options.let_css) {
                dubx.options.let_css = true;
                var location = Dubtrack.room.model.get('roomUrl');
                $.ajax({
                    type: 'GET',
                    url: 'https://api.dubtrack.fm/room/'+location,
                }).done(function(e) {
                    var content = e.data.description;
                    var url = content.match(/(@dubx=)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/);

                    if(!url) return;

                    var append = url[0].split('@dubx=');
                    $('head').append('<link class="css_world" href="'+append[1]+'" rel="stylesheet" type="text/css">');
                });
                dubx.saveOption('css_world','true');
                dubx.on('.css');
            } else {
                dubx.options.let_css = false;
                $('.css_world').remove();
                dubx.saveOption('css_world','false');
                dubx.off('.css');
            }
        },
        hide_avatars: function() {
            if(!dubx.options.let_hide_avatars) {
                dubx.options.let_hide_avatars = true;
                $('head').append('<link class="hide_avatars_link" rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/hide_avatars.css">');
                dubx.saveOption('hide_avatars','true');
                dubx.on('.hide_avatars');
            } else {
                dubx.options.let_hide_avatars = false;
                $('.hide_avatars_link').remove();
                dubx.saveOption('hide_avatars','false');
                dubx.off('.hide_avatars');
            }
        },
        nicole: function() {
            if (!dubx.options.let_nicole) {
                dubx.options.let_nicole = true;
                $('head').append('<link class="nicole_css" href="'+dubx.gitRoot+'/themes/PlugTheme.css" rel="stylesheet" type="text/css">');
                dubx.saveOption('nicole', 'true');
                dubx.on('.nicole');
            } else {
                dubx.options.let_nicole = false;
                $('.nicole_css').remove();
                dubx.saveOption('nicole','false');
                dubx.off('.nicole');
            }
        },
        medium_modal: function() {
            dubx.input('Link an image file:','It is recommended a .jpg file is used','https://example.com/example.jpg','confirm-for314','999');
            $('.confirm-for314').click(dubx.medium_import);
        },
        medium_import: function() {
            var content = $('.input').val();
            localStorage.setItem('medium',content);
            $('.medium').remove();
            $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
            $('.onErr').remove();
        },
        medium_load: function() {
            if (localStorage.getItem('medium') !== null) {
                var content = localStorage.getItem('medium');
                $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
            }
        },
        show_timestamps: function() {
            if(!dubx.options.let_show_timestamps) {
                dubx.options.let_show_timestamps = true;
                $('head').append('<link class="show_timestamps_link" rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/show_timestamps.css">');
                dubx.saveOption('show_timestamps','true');
                dubx.on('.show_timestamps');
            } else {
                dubx.options.let_show_timestamps = false;
                $('.show_timestamps_link').remove();
                dubx.saveOption('show_timestamps','false');
                dubx.off('.show_timestamps');
            }
        },
        video_window: function() {
            if(!dubx.options.let_video_window) {
                dubx.options.let_video_window = true;
                $('head').append('<link class="video_window_link" rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/video_window.css">');
                dubx.saveOption('video_window','true');
                dubx.on('.video_window');
            } else {
                dubx.options.let_video_window = false;
                $('.video_window_link').remove();
                dubx.saveOption('video_window','false');
                dubx.off('.video_window');
            }
        },
        // jQuery's getJSON kept returning errors so making my own with promise-like
        // structure and added optional Event to fire when done so can hook in elsewhere
        getJSON : (function (url, optionalEvent) {
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
        }),
        /**
         * pings for the existence of var/function for 5 seconds until found
         * runs callback once found and stop pinging
         * @param  {variable}   waitingFor Your global function, variable, etc
         * @param  {Function} cb         Callback function
         */
        whenAvailable : function(waitingFor, cb) {
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
        },
        emoji : {
            template: function(id) { return emojify.defaultConfig.img_dir+'/'+encodeURI(id)+'.png'; },
        },
        twitch : {
            template: function(id) { return "//static-cdn.jtvnw.net/emoticons/v1/" + id + "/3.0"; },
            specialEmotes: [],
            emotes: {},
            chatRegex : new RegExp(":([-_a-z0-9]+):", "ig")
        },
        bttv : {
            template: function(id) { return  "//cdn.betterttv.net/emote/" + id + "/3x";  },
            emotes: {},
            chatRegex : new RegExp(":([&!()\\-_a-z0-9]+):", "ig")
        },
        tasty : {
            template: function(id) { return dubx.tasty.emotes[id].url; },
            emotes: {}
        },
        shouldUpdateAPIs : function(apiName){
            var self = this;
            var day = 86400000; // milliseconds

            var today = Date.now();
            var lastSaved = parseInt(localStorage.getItem(apiName+'_api_timestamp'));
            return isNaN(lastSaved) || today - lastSaved > day * 5 || !localStorage[apiName +'_api'];
        },
        /**************************************************************************
         * Loads the twitch emotes from the api.
         * http://api.twitch.tv/kraken/chat/emoticon_images
         */
        loadTwitchEmotes: function(){
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

        },
        loadBTTVEmotes: function(){
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

        },
        loadTastyEmotes: function(){
            var self = dubx;
            var savedData;
            console.log('Dubx','tasty','loading from api');
            // since we control this API we should always have it load from remote
            var tastyApi = new self.getJSON(dubx.gitRoot + '/emotes/tastyemotes.json', 'tasty:loaded');
            tastyApi.done(function(data){
                localStorage.setItem('tasty_api', data);
                self.processTastyEmotes(JSON.parse(data));
            });
        },
        processTwitchEmotes: function(data) {
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
        },
        processBTTVEmotes: function(data){
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
        },
        processTastyEmotes: function(data) {
            var self = dubx;
            self.tasty.emotes = data.emotes;
            self.tastyJSONLoaded = true;
            self.emojiEmotes = self.emojiEmotes.concat(Object.keys(self.tasty.emotes));
        },
        /**************************************************************************
         * handles replacing twitch emotes in the chat box with the images
         */

        replaceTextWithEmote: function(){
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
        },
        
        optionMentions: function(){
            if (!dubx.options.let_autocomplete_mentions) {
                dubx.options.let_autocomplete_mentions = true;
                dubx.saveOption('autocomplete_mentions', 'true');
                dubx.on('.autocomplete_mentions');
            } else {
                dubx.options.let_autocomplete_mentions = false;
                dubx.saveOption('autocomplete_mentions', 'false');
                dubx.off('.autocomplete_mentions');
            }
        },
        mentionNotifications: function(){
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
        },
        notifyOnMention: function(e){
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
        },

        
        downdubChat: function(){
            if(!dubx.options.let_downdub_chat_notifications){
                dubx.options.let_downdub_chat_notifications = true;
                dubx.saveOption('downdub_chat', 'true');
                dubx.on('.downdub_chat');

                if(!dubx.userIsAtLeastMod(Dubtrack.session.id)) return;

                Dubtrack.Events.bind("realtime:room_playlist-dub", this.downdubWatcher);
            }
            else{
                dubx.options.let_downdub_chat_notifications = false;
                dubx.saveOption('downdub_chat', 'false');
                dubx.off('.downdub_chat');

                Dubtrack.Events.unbind("realtime:room_playlist-dub", this.downdubWatcher);
            }
        },
        downdubWatcher: function(e){
            var user = Dubtrack.session.get('username');
            var currentDj = Dubtrack.room.users.collection.findWhere({
                userid: Dubtrack.room.player.activeSong.attributes.song.userid
            }).attributes._user.username;

            if(user === currentDj && e.dubtype === 'downdub'){
                $('ul.chat-main').append(
                    '<li class="dubx-chat-system dubx-chat-system-downdub">' +
                        '<div class="chatDelete" onclick="dubx.deleteChatMessageClientSide(this)"><span class="icon-close"></span></div>' +
                        '<div class="text">' +
                            '@' + e.user.username + ' has downdubbed your song \'' + Dubtrack.room.player.activeSong.attributes.songInfo.name + ' \'' +
                        '</div>' +
                    '</li>');
            }

        },
        updubChat: function(){
            if(!dubx.options.let_updub_chat_notifications){
                dubx.options.let_updub_chat_notifications = true;
                dubx.saveOption('updub_chat', 'true');
                dubx.on('.updub_chat');

                Dubtrack.Events.bind("realtime:room_playlist-dub", this.updubWatcher);
            }
            else{
                dubx.options.let_updub_chat_notifications = false;
                dubx.saveOption('updub_chat', 'false');
                dubx.off('.updub_chat');

                Dubtrack.Events.unbind("realtime:room_playlist-dub", this.updubWatcher);
            }
        },
        updubWatcher: function(e){
            var user = Dubtrack.session.get('username');
            var currentDj = Dubtrack.room.users.collection.findWhere({
                userid: Dubtrack.room.player.activeSong.attributes.song.userid
            }).attributes._user.username;


            if(user === currentDj && e.dubtype === 'updub'){
                $('ul.chat-main').append(
                    '<li class="dubx-chat-system dubx-chat-system-updub">' +
                        '<div class="chatDelete" onclick="dubx.deleteChatMessageClientSide(this)"><span class="icon-close"></span></div>' +
                        '<div class="text">' +
                            '@' + e.user.username + ' has updubbed your song \'' + Dubtrack.room.player.activeSong.attributes.songInfo.name + ' \'' +
                        '</div>' +
                    '</li>');
            }

        },
        grabChat: function(){
            if(!dubx.options.let_grab_chat_notifications){
                dubx.options.let_grab_chat_notifications = true;
                dubx.saveOption('grab_chat', 'true');
                dubx.on('.grab_chat');

                Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabChatWatcher);
            }
            else{
                dubx.options.let_grab_chat_notifications = false;
                dubx.saveOption('grab_chat', 'false');
                dubx.off('.grab_chat');

                Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabChatWatcher);
            }
        },
        grabChatWatcher: function(e){
            var user = Dubtrack.session.get('username');
            var currentDj = Dubtrack.room.users.collection.findWhere({
                userid: Dubtrack.room.player.activeSong.attributes.song.userid
            }).attributes._user.username;


            if(user === currentDj && !Dubtrack.room.model.get('displayUserGrab')){
                $('ul.chat-main').append(
                    '<li class="dubx-chat-system dubx-chat-system-grab">' +
                        '<div class="chatDelete" onclick="dubx.deleteChatMessageClientSide(this)"><span class="icon-close"></span></div>' +
                        '<div class="text">' +
                            '@' + e.user.username + ' has grabbed your song \'' + Dubtrack.room.player.activeSong.attributes.songInfo.name + ' \'' +
                        '</div>' +
                    '</li>');
            }

        },
        deleteChatMessageClientSide: function(el){
            $(el).parent('li')[0].remove();
        },
        resetGrabs: function(){
            dubx.dubs.grabs = []; //TODO: Remove when we can hit the api for all grabs of current playing song
        },
        resetDubs: function(){
            dubx.dubs.upDubs = [];
            dubx.dubs.downDubs = [];
            // dubx.dubs.grabs: [] //TODO: Uncomment this when we can hit the api for all grabs of current playing song

            $.getJSON("https://api.dubtrack.fm/room/" + Dubtrack.room.model.id + "/playlist/active/dubs", function(response){
                response.data.upDubs.forEach(function(e){
                    //Dub already casted (usually from autodub)
                    if($.grep(dubx.dubs.upDubs, function(el){ return el.userid == e.userid; }).length > 0){
                        return;
                    }

                    var username;
                    if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
                        $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                            if(response && response.userinfo)
                                username = response.userinfo.username;
                        });
                    }
                    else{
                        username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
                    }

                    if(!username) return;

                    dubx.dubs.upDubs.push({
                        userid: e.userid,
                        username: username
                    })
                });
                //TODO: Uncomment this when we can hit the api for all grabs of current playing song
                /*response.data.grabs.forEach(function(e){
                    //Dub already casted (usually from autodub)
                    if($.grep(dubx.dubs.grabs, function(el){ return el.userid == e.userid; }).length > 0){
                        return;
                    }

                    var username;
                    if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
                        $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                            username = response.userinfo.username;
                        });
                    }
                    else{
                        username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
                    }

                    dubx.dubs.grabs.push({
                        userid: e.userid,
                        username: username
                    })
                });*/

                //Only let mods or higher access down dubs
                if(dubx.userIsAtLeastMod(Dubtrack.session.id)){
                    response.data.downDubs.forEach(function(e){
                        //Dub already casted
                        if($.grep(dubx.dubs.downDubs, function(el){ return el.userid == e.userid; }).length > 0){
                            return;
                        }

                        var username;
                        if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
                            $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                                username = response.userinfo.username;
                            });
                        }
                        else{
                            username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
                        }

                        dubx.dubs.downDubs.push({
                            userid: e.userid,
                            username: Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username
                        })
                    });
                }
            });
        },
        grabInfoWarning: function(){
            if(!dubx.options.let_dubs_hover){
                dubx.input('Grab Vote Info', 'Please note that this feature is currently still in development. We are waiting on the ability to pull grab vote information from Dubtrack on load. Until then the only grabs you will be able to see are those you are present in the room for.', null, 'confirm-for-grab-info');
                $('.confirm-for-grab-info').click(dubx.closeErr);
            }
        },
        showDubsOnHover: function(){
            if(!dubx.options.let_dubs_hover){
                dubx.options.let_dubs_hover = true;
                dubx.saveOption('dubs_hover', 'true');
                dubx.on('.dubs_hover');

                 // clear, start over
                this.resetDubs();

                Dubtrack.Events.bind("realtime:room_playlist-dub", this.dubWatcher);
                Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
                Dubtrack.Events.bind("realtime:user-leave", this.dubUserLeaveWatcher);
                Dubtrack.Events.bind("realtime:room_playlist-update", dubx.resetDubs);
                Dubtrack.Events.bind("realtime:room_playlist-update", dubx.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song

                var dubupEl = $($('.dubup')[0]).parent('li');
                var dubdownEl = $($('.dubdown')[0]).parent('li');
                var grabEl = $($('.add-to-playlist-button')[0]).parent('li');

                $(dubupEl).addClass("dubx-updubs-hover");
                $(dubdownEl).addClass("dubx-downdubs-hover");
                $(grabEl).addClass("dubx-grabs-hover");

                //Show compiled info containers when casting/changing vote
                $(dubupEl).click(function(event){
                    $('#dubx-updubs-container').remove();
                        var x = event.clientX, y = event.clientY;

                        if(!x || !y || isNaN(x) || isNaN(y)){
                            return $('#dubx-downdubs-container').remove();
                        }

                        var elementMouseIsOver = document.elementFromPoint(x, y);

                    if($(elementMouseIsOver).hasClass('dubx-updubs-hover') || $(elementMouseIsOver).parents('.dubx-updubs-hover').length > 0){
                        setTimeout(function(){$(dubupEl).mouseenter();}, 250);
                    }
                });
                $(dubdownEl).click(function(event){
                    $('#dubx-downdubs-container').remove();
                        var x = event.clientX, y = event.clientY;

                        if(!x || !y || isNaN(x) || isNaN(y)){
                            return $('#dubx-downdubs-container').remove();
                        }

                        var elementMouseIsOver = document.elementFromPoint(x, y);

                    if($(elementMouseIsOver).hasClass('dubx-downdubs-hover') || $(elementMouseIsOver).parents('.dubx-downdubs-hover').length > 0){
                        setTimeout(function(){$(dubdownEl).mouseenter();}, 250);
                    }
                });
                $(grabEl).click(function(event){
                    $('#dubx-grabs-container').remove();
                        var x = event.clientX, y = event.clientY;

                        if(!x || !y || isNaN(x) || isNaN(y)){
                            return $('#dubx-grabs-container').remove();
                        }

                        var elementMouseIsOver = document.elementFromPoint(x, y);

                    if($(elementMouseIsOver).hasClass('dubx-grabs-hover') || $(elementMouseIsOver).parents('.dubx-grabs-hover').length > 0){
                        setTimeout(function(){$(grabEl).mouseenter();}, 250);
                    }
                });

                $(dubupEl).mouseenter(function(){
                    if($("#dubx-updubs-container").length > 0) return; //already exists

                    var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
                    var dubupBackground = $('.dubup').hasClass('voted') ? $('.dubup').css('background-color') : $('.dubup').find('.icon-arrow-up').css('color');
                    var html;

                    if(dubx.dubs.upDubs.length > 0){
                        html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-updubs-hover" style="border-color: '+dubupBackground+'">';
                        dubx.dubs.upDubs.forEach(function(val){
                            html += '<li class="preview-dubinfo-item users-previews dubx-updubs-hover">' +
                                        '<div class="dubinfo-image">' +
                                            '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                                        '</div>' +
                                        '<span class="dubinfo-text">@' + val.username + '</span>' +
                                    '</li>'
                        });
                        html += '</ul>';                     
                    }
                    else{
                        html = '<div id="dubinfo-preview" class="dubinfo-show dubx-updubs-hover dubx-no-dubs" style="border-color: '+dubupBackground+'">' +
                                    'No updubs have been casted yet!' +
                                '</div>';
                    }

                    var newEl = document.createElement('div');
                    newEl.id = 'dubx-updubs-container';
                    newEl.className = 'dubinfo-show dubx-updubs-hover';
                    newEl.innerHTML = html;
                    newEl.style.visibility = "hidden";
                    document.body.appendChild(newEl);

                    var elemRect = this.getBoundingClientRect();
                    var bodyRect = document.body.getBoundingClientRect();

                    newEl.style.visibility = "";
                    newEl.style.width = infoPaneWidth + 'px';
                    newEl.style.top = (elemRect.top-150) + 'px';

                    //If info pane would run off screen set the position on right edge
                    if(bodyRect.right - elemRect.left >= infoPaneWidth){
                        newEl.style.left = elemRect.left + 'px';
                    }
                    else{
                        newEl.style.right = 0;
                    }

                    document.body.appendChild(newEl);

                    $(this).addClass('dubx-updubs-hover');

                    $(document.body).on('click', '.preview-dubinfo-item', function(e){
                        var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
                        dubx.updateChatInputWithString(new_text);
                    });

                    $('#dubinfo-preview').perfectScrollbar();

                    $('.dubx-updubs-hover').mouseleave(function(event){
                        var x = event.clientX, y = event.clientY;

                        if(!x || !y || isNaN(x) || isNaN(y)){
                            return $('#dubx-downdubs-container').remove();
                        }

                        var elementMouseIsOver = document.elementFromPoint(x, y);

                        if(!$(elementMouseIsOver).hasClass('dubx-updubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-updubs-hover').length <= 0){
                            $('#dubx-updubs-container').remove();
                        }

                    });
                });
                $(dubdownEl).mouseenter(function(){
                    if($("#dubx-downdubs-container").length > 0) return; //already exists

                    var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
                    var dubdownBackground = $('.dubdown').hasClass('voted') ? $('.dubdown').css('background-color') : $('.dubdown').find('.icon-arrow-down').css('color');
                    var html;

                    if(dubx.userIsAtLeastMod(Dubtrack.session.id)){
                        if(dubx.dubs.downDubs.length > 0){
                            html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover" style="border-color: '+dubdownBackground+'">';
                            dubx.dubs.downDubs.forEach(function(val){
                                html += '<li class="preview-dubinfo-item users-previews dubx-downdubs-hover">' +
                                            '<div class="dubinfo-image">' +
                                                '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                                            '</div>' +
                                            '<span class="dubinfo-text">@' + val.username + '</span>' +
                                        '</li>'
                            });
                            html += '</ul>';                     
                        }
                        else{
                            html = '<div id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover dubx-no-dubs" style="border-color: '+dubdownBackground+'">' +
                                        'No downdubs have been casted yet!' +
                                    '</div>';
                        }
                    }
                    else{
                        html = '<div id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover dubx-downdubs-unauthorized" style="border-color: '+dubdownBackground+'">' +
                                    'You must be at least a mod to view downdubs!' +
                                '</div>';
                    }

                    var newEl = document.createElement('div');
                    newEl.id = 'dubx-downdubs-container';
                    newEl.className = 'dubinfo-show dubx-downdubs-hover';
                    newEl.innerHTML = html;
                    newEl.style.visibility = "hidden";
                    document.body.appendChild(newEl);

                    var elemRect = this.getBoundingClientRect();
                    var bodyRect = document.body.getBoundingClientRect();

                    newEl.style.visibility = "";
                    newEl.style.width = infoPaneWidth + 'px';
                    newEl.style.top = (elemRect.top-150) + 'px';

                    //If info pane would run off screen set the position on right edge
                    if(bodyRect.right - elemRect.left >= infoPaneWidth){
                        newEl.style.left = elemRect.left + 'px';
                    }
                    else{
                        newEl.style.right = 0;
                    }

                    document.body.appendChild(newEl);

                    $(this).addClass('dubx-downdubs-hover');

                    $(document.body).on('click', '.preview-dubinfo-item', function(e){
                        var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
                        dubx.updateChatInputWithString(new_text);
                    });

                    $('#dubinfo-preview').perfectScrollbar();

                    $('.dubx-downdubs-hover').mouseleave(function(event){
                        var x = event.clientX, y = event.clientY;

                        if(!x || !y || isNaN(x) || isNaN(y)){
                            return $('#dubx-downdubs-container').remove();
                        }

                        var elementMouseIsOver = document.elementFromPoint(x, y);

                        if(!$(elementMouseIsOver).hasClass('dubx-downdubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-downdubs-hover').length <= 0){
                            $('#dubx-downdubs-container').remove();
                        }

                    });
                });
                $(grabEl).mouseenter(function(){
                    if($("#dubx-grabs-container").length > 0) return; //already exists

                    var infoPaneWidth = $(dubupEl).innerWidth() + $(grabEl).innerWidth();
                    var grabsBackground = $('.add-to-playlist-button').hasClass('grabbed') ? $('.add-to-playlist-button').css('background-color') : $('.add-to-playlist-button').find('.icon-heart').css('color');
                    var html;

                    if(dubx.dubs.grabs.length > 0){
                        html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-grabs-hover" style="border-color: '+grabsBackground+'">';
                        dubx.dubs.grabs.forEach(function(val){
                            html += '<li class="preview-dubinfo-item users-previews dubx-grabs-hover">' +
                                        '<div class="dubinfo-image">' +
                                            '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                                        '</div>' +
                                        '<span class="dubinfo-text">@' + val.username + '</span>' +
                                    '</li>'
                        });
                        html += '</ul>';                     
                    }
                    else{
                        html = '<div id="dubinfo-preview" class="dubinfo-show dubx-grabs-hover dubx-no-grabs" style="border-color: '+grabsBackground+'">' +
                                    'This song hasn\'t been grabbed yet!' +
                                '</div>';
                    }

                    var newEl = document.createElement('div');
                    newEl.id = 'dubx-grabs-container';
                    newEl.className = 'dubinfo-show dubx-grabs-hover';
                    newEl.innerHTML = html;
                    newEl.style.visibility = "hidden";
                    document.body.appendChild(newEl);

                    var elemRect = this.getBoundingClientRect();
                    var bodyRect = document.body.getBoundingClientRect();

                    newEl.style.visibility = "";
                    newEl.style.width = infoPaneWidth + 'px';
                    newEl.style.top = (elemRect.top-150) + 'px';

                    //If info pane would run off screen set the position on right edge
                    if(bodyRect.right - elemRect.left >= infoPaneWidth){
                        newEl.style.left = elemRect.left + 'px';
                    }
                    else{
                        newEl.style.right = 0;
                    }

                    document.body.appendChild(newEl);

                    $(this).addClass('dubx-grabs-hover');

                    $(document.body).on('click', '.preview-dubinfo-item', function(e){
                        var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
                        dubx.updateChatInputWithString(new_text);
                    });

                    $('#dubinfo-preview').perfectScrollbar();

                    $('.dubx-grabs-hover').mouseleave(function(event){
                        var x = event.clientX, y = event.clientY;

                        if(!x || !y || isNaN(x) || isNaN(y)){
                            return $('#dubx-grabs-container').remove();
                        }

                        var elementMouseIsOver = document.elementFromPoint(x, y);

                        if(!$(elementMouseIsOver).hasClass('dubx-grabs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-grabs-hover').length <= 0){
                            $('#dubx-grabs-container').remove();
                        }

                    });
                });
            }
            else{
                dubx.options.let_dubs_hover = false;
                dubx.saveOption('dubs_hover', 'false');
                dubx.off('.dubs_hover');
                Dubtrack.Events.unbind("realtime:room_playlist-dub", this.dubWatcher);
                Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
                Dubtrack.Events.unbind("realtime:user-leave", this.dubUserLeaveWatcher);
                Dubtrack.Events.unbind("realtime:room_playlist-update", dubx.resetDubs);
                Dubtrack.Events.unbind("realtime:room_playlist-update", dubx.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song
            }
        },
        dubUserLeaveWatcher: function(e){
            //Remove user from dub list
            if($.grep(dubx.dubs.upDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                $.each(dubx.dubs.upDubs, function(i){
                    if(dubx.dubs.upDubs[i].userid === e.user._id) {
                        dubx.dubs.upDubs.splice(i,1);
                        return false;
                    }
                });
            }
            if($.grep(dubx.dubs.downDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                $.each(dubx.dubs.downDubs, function(i){
                    if(dubx.dubs.downDubs[i].userid === e.user._id) {
                        dubx.dubs.downDubs.splice(i,1);
                        return false;
                    }
                });
            }
            if($.grep(dubx.dubs.grabs, function(el){ return el.userid == e.user._id; }).length > 0){
                $.each(dubx.dubs.grabs, function(i){
                    if(dubx.dubs.grabs[i].userid === e.user._id) {
                        dubx.dubs.grabs.splice(i,1);
                        return false;
                    }
                });
            }
        },
        grabWatcher: function(e){
            //If grab already casted
            if($.grep(dubx.dubs.grabs, function(el){ return el.userid == e.user._id; }).length <= 0){
                dubx.dubs.grabs.push({
                    userid: e.user._id,
                    username: e.user.username
                });
            }
        },
        dubWatcher: function(e){
            if(e.dubtype === 'updub'){
                //If dub already casted
                if($.grep(dubx.dubs.upDubs, function(el){ return el.userid == e.user._id; }).length <= 0){
                    dubx.dubs.upDubs.push({
                        userid: e.user._id,
                        username: e.user.username
                    });
                }

                //Remove user from other dubtype if exists
                if($.grep(dubx.dubs.downDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                    $.each(dubx.dubs.downDubs, function(i){
                        if(dubx.dubs.downDubs[i].userid === e.user._id) {
                            dubx.dubs.downDubs.splice(i,1);
                            return false;
                        }
                    });
                }
            }
            else if(e.dubtype === 'downdub'){
                //If dub already casted
                if($.grep(dubx.dubs.downDubs, function(el){ return el.userid == e.user._id; }).length <= 0 && dubx.userIsAtLeastMod(Dubtrack.session.id)){
                    dubx.dubs.downDubs.push({
                        userid: e.user._id,
                        username: e.user.username
                    });
                }

                //Remove user from other dubtype if exists
                if($.grep(dubx.dubs.upDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                    $.each(dubx.dubs.upDubs, function(i){
                        if(dubx.dubs.upDubs[i].userid === e.user._id) {
                            dubx.dubs.upDubs.splice(i,1);
                            return false;
                        }
                    });
                }
            }

            var msSinceSongStart = new Date() - new Date(Dubtrack.room.player.activeSong.attributes.song.played);
            if(msSinceSongStart < 1000) return;

            if(dubx.dubs.upDubs.length !== Dubtrack.room.player.activeSong.attributes.song.updubs){
                // console.log("Updubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
                dubx.resetDubs();
            }
            else if(dubx.userIsAtLeastMod(Dubtrack.session.id) && dubx.dubs.downDubs.length !== Dubtrack.room.player.activeSong.attributes.song.downdubs){
                // console.log("Downdubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
                dubx.resetDubs();
            }
            // TODO: Uncomment this else if block when we can hit the api for all grabs of current playing song
            /*
            else if(dubx.dubs.grabs.length !== parseInt($('.grab-counter')[0].innerHTML)){
                console.log("Grabs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
                dubx.resetDubs();
            }*/
        },
        userIsAtLeastMod: function(userid){
            return Dubtrack.helpers.isDubtrackAdmin(userid) ||
                    Dubtrack.room.users.getIfOwner(userid) ||
                    Dubtrack.room.users.getIfManager(userid) ||
                    Dubtrack.room.users.getIfMod(userid);
        },
        updateChatInputWithString: function(str){
            $("#chat-txt-message").val(str).focus();
        },
        spacebar_mute: function() {
            if (!dubx.options.let_spacebar_mute) {
                dubx.options.let_spacebar_mute = true;
                $(document).bind('keypress.key32', function() {
                    var tag = event.target.tagName.toLowerCase();
                    if (event.which === 32 && tag !== 'input' && tag !== 'textarea') {
                        $('#main_player .player_sharing .player-controller-container .mute').click();
                    }
                });
                dubx.saveOption('spacebar_mute', 'true');
                dubx.on('.spacebar_mute');
            } else {
                dubx.options.let_spacebar_mute = false;
                $(document).unbind("keypress.key32");
                dubx.saveOption('spacebar_mute','false');
                dubx.off('.spacebar_mute');
            }
        },
        filterUsers :function(str){
            var re = new RegExp('^@' + str, "i");
            return dubx.roomUsers.filter(function(val){
                return re.test(val.text);
            });
        },
        updateUsersArray: function(){
            var self = dubx;
            self.roomUsers = []; // clear, start over
            Dubtrack.room.users.collection.models.forEach(function(val,i, arr){
                var u = val.attributes._user;
                self.roomUsers.push({
                    src : "https://api.dubtrack.fm/user/"+u._id+"/image",
                    text : "@" + u.username,
                    cn : "users"
                });
            });
        },
        userAutoComplete: function(){
            //Remove keydown event chat view to replace with our event
            Dubtrack.room.chat.delegateEvents(_(Dubtrack.room.chat.events).omit('keydown input#chat-txt-message'));

            $(document.body).on('keyup', "#chat-txt-message", this.chatInputKeyupFunc);
            dubx.whenAvailable("Dubtrack.room.users", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-ban", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-join", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-kick", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-leave", dubx.updateUsersArray);
        },
        snooze: function() {
            if (!dubx.eventUtils.snoozed && Dubtrack.room.player.player_volume_level > 2) {
                dubx.eventUtils.currentVol = Dubtrack.room.player.player_volume_level;
                Dubtrack.room.player.setVolume(0);
                dubx.eventUtils.snoozed = true;
                Dubtrack.Events.bind("realtime:room_playlist-update", dubx.eventSongAdvance);
            } else if (dubx.eventUtils.snoozed) {
                Dubtrack.room.player.setVolume(dubx.eventUtils.currentVol);
                dubx.eventUtils.snoozed = false;
            }
        },
        eventSongAdvance: function(e) {
            if (e.startTime < 2) {
                if (dubx.eventUtils.snoozed) {
                    Dubtrack.room.player.setVolume(dubx.eventUtils.currentVol);
                    dubx.eventUtils.snoozed = false;
                }
                return true;
            }
        },
        eventUtils: {
            currentVol: 50,
            snoozed: false
        }
    };
    

} else {
    function onErr(error) {
        var onErr = [
            '<link rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/asset.css">',
            '<div class="onErr">',
                '<div class="container">',
                    '<div class="title">',
                        '<h1>Oh noes:</h1>',
                    '</div>',
                    '<div class="content">',
                        '<p>'+error+'</p>',
                    '</div>',
                    '<div class="control">',
                        '<div class="cancel" onclick="dubx.closeErr();">',
                            '<p>Cancel</p>',
                        '</div>',
                        '<div class="confirm confirm-err">',
                            '<p>Okay</p>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
        $('body').prepend(onErr);
    }
    if (!Dubtrack.session.id) {
        onErr('You\'re not logged in. Please login to use DUBX.');
    } else {
        onErr('Oh noes! We\'ve encountered a runtime error');
    };
    function closeErr() {
        $('.onErr').remove();
    };
    $('.cancel').click(closeErr);
    $('.confirm-err').click(closeErr);
}
