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
*/ /* global Dubtrack */
var hello_run;
if (!hello_run) {
    hello_run = true;
    var our_version = '03.00.85 - Emotes & Emojis!';
    //Ref 1: Variables
    var options = {
        let_autovote: false,
        let_split_chat: false,
        let_fs: false,
        let_medium_disable: false,
        let_work: false,
        let_warn_redirect: false,
        let_afk: false,
        let_active_afk: true,
        let_chat_window: false,
        let_css: false,
        let_nicole: false,
        let_twitch_emotes: false,
        let_emoji_preview: false,
        let_spacebar_mute: false
    };
    
    //Ref 1.1
    $('.player_sharing').append('<span class="icon-history eta_tooltip_t" onmouseover="hello.eta();" onmouseout="hello.hide_eta();"></span>');
    
    //Ref 2: Options
    var hello = {
        gitRoot: 'https://rawgit.com/FranciscoG/DubX-Script/dev',
        //Ref 2.1: Initialize
        personalize: function() {
            $('.isUser').text(Dubtrack.session.get('username'));
        },
        slide: function() {
            $('.for_content').slideToggle('fast');
        },
        //Ref 2.2: Initialize
        initialize: function() {
            var li = '<div class="for" onclick="hello.slide();"><img src="'+hello.gitRoot+'/params/params.svg" alt=""></div>';
            var html = [
                '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">',
                '<link rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/asset.css">',
                '<div class="for_content">',
                    '<span class="for_content_ver">DubX Settings</span>',
                    '<span class="for_content_version">'+our_version+'</span>',
                    '<ul class="for_content_ul">',
                        '<li class="for_content_li">',
                            '<p class="for_content_c">Standard</p>',
                        '</li>',
                        '<li onclick="hello.autovote();" class="for_content_li for_content_feature autovote">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Autovote</p>',
                        '</li>',
                        '<li onclick="hello.fs();" class="for_content_li for_content_feature fs">',
                            '<p class="for_content_off"><i class="fi-arrows-out"></i></p>',
                            '<p class="for_content_p">Fullscreen</p>',
                        '</li>',
                        '<li onclick="hello.work();" class="for_content_li for_content_feature work">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Work Mode</p>',
                        '</li>',
                        '<li onclick="hello.split_chat();" class="for_content_li for_content_feature split_chat">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Split Chat</p>',
                        '</li>',
                        '<li onclick="hello.chat_window();" class="for_content_li for_content_feature chat_window">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Chat Only</p>',
                        '</li>',
                        '<li onclick="hello.medium_disable();" class="for_content_li for_content_feature medium_disable">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Hide Background</p>',
                        '</li>',
                        '<li onclick="hello.afk();" class="for_content_li for_content_feature afk">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">AFK Autorespond</p>',
                        '</li>',
                        '<li onclick="hello.warn_redirect();" class="for_content_li for_content_feature warn_redirect">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Warn On Navigation</p>',
                        '</li>',
                        '<li onclick="hello.css_for_the_world();" class="for_content_li for_content_feature css">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Room CSS</p>',
                        '</li>',
                        '<li onclick="hello.nicole();" class="for_content_li for_content_feature nicole">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Plug.dj Theme</p>',
                        '</li>',
                        '<li onclick="hello.spacebar_mute();" class="for_content_li for_content_feature spacebar_mute">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Spacebar Mute</p>',
                        '</li>',
                        '<li onclick="hello.optionTwitchEmotes();" class="for_content_li for_content_feature twitch_emotes">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Twitch Emotes</p>',
                        '</li>',
                        '<li onclick="hello.optionEmojiPreview();" class="for_content_li for_content_feature emoji_preview">',
                            '<p class="for_content_off"><i class="fi-x"></i></p>',
                            '<p class="for_content_p">Emoji Preview</p>',
                        '</li>',
                        '<li class="for_content_li">',
                            '<p class="for_content_c">Contact</p>',
                        '</li>',
                        '<li onclick="hello.report_modal();" class="for_content_li for_content_feature report">',
                            '<p class="for_content_off"><i class="fi-comments"></i></p>',
                            '<p class="for_content_p">Bug Report</p>',
                        '</li>',
                        '<li class="for_content_li">',
                            '<p class="for_content_c">Customize</p>',
                        '</li>',
                        '<li onclick="hello.css_modal();" class="for_content_li for_content_feature">',
                            '<p class="for_content_off"><i class="fi-unlink"></i></p>',
                            '<p class="for_content_p">Custom CSS</p>',
                        '</li>',
                        '<li onclick="hello.medium_modal();" class="for_content_li for_content_feature">',
                            '<p class="for_content_off"><i class="fi-unlink"></i></p>',
                            '<p class="for_content_p">Custom Background</p>',
                        '</li>',
                        '<li class="for_content_li">',
                            '<p class="for_content_c">Social</p>',
                        '</li>',
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
                            '<a href="https://www.dubx.net" target="_blank" style="color: #878c8e;">',
                                '<p class="for_content_off"><i class="fi-link"></i></p>',
                                '<p class="for_content_p">Our Website</p>',
                            '</a>',
                        '</li>',
                        '<li class="for_content_li">',
                            '<p class="for_content_c">Chrome Extension</p>',
                        '</li>',
                        '<li class="for_content_li for_content_feature">',
                            '<a href="https://chrome.google.com/webstore/detail/dubx/oceofndagjnpebjmknefoelcpcnpcedm/reviews" target="_blank" style="color: #878c8e;">',
                                '<p class="for_content_off"><i class="fi-like"></i></p>',
                                '<p class="for_content_p">Give Us a Rating</p>',
                            '</a>',
                        '</li>',
                    '</ul>',
                '</div>'
            ].join('');
            $('.header-right-navigation').append(li);
            $('body').prepend(html);
        },
        //Ref 2.3.1: Input
        input: function(title,content,placeholder,confirm) {
            var onErr = [
                '<div class="onErr">',
                    '<div class="container">',
                        '<div class="title">',
                            '<h1>'+title+'</h1>',
                        '</div>',
                        '<div class="content">',
                            '<p>'+content+'</p>',
                            '<textarea class="input" type="text" placeholder="'+placeholder+'"></textarea>',
                        '</div>',
                        '<div class="control">',
                            '<div class="cancel" onclick="hello.closeErr();">',
                                '<p>Cancel</p>',
                            '</div>',
                            '<div class="'+confirm+' confirm">',
                                '<p>Okay</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');
            $('body').prepend(onErr);
        },
        on: function(selector) {
            $(selector + ' .for_content_off i').replaceWith('<i class="fi-check"></i>');
        },
        off: function(selector) {
            $(selector + ' .for_content_off i').replaceWith('<i class="fi-x"></i>');
        },
        closeErr: function() {
            $('.onErr').remove();
        },
        option: function(selector,value) {
            localStorage.setItem(selector,value);
        },
        advance_vote: function() {
            $('.dubup').click();
        },
        autovote: function() {
            var isOn;
            if (!options.let_autovote) {
                options.let_autovote = true;
                isOn = 'on';
                hello.advance_vote();
                hello.option('autovote','true');
                hello.on('.autovote');
                Dubtrack.Events.bind("realtime:room_playlist-update", hello.advance_vote);    
            } else {
                options.let_autovote = false;
                isOn = 'off';
                hello.option('autovote','false');
                hello.off('.autovote');
                Dubtrack.Events.unbind("realtime:room_playlist-update", hello.advance_vote);
            }
        },
        split_chat: function() {
            var isOn;
            if (!options.let_split_chat) {
                options.let_split_chat = true;
                isOn = 'on';
                $('.chat-main').addClass('splitChat');
                hello.option('split_chat', 'true');
                hello.on('.split_chat');
            } else {
                options.let_split_chat = false;
                isOn = 'off';
                $('.chat-main').removeClass('splitChat');
                hello.option('split_chat','false');
                hello.off('.split_chat');
            }
        },
        eta: function() {
            var time = 4;
            var current_time = parseInt($('#player-controller div.left ul li.infoContainer.display-block div.currentTime span.min').text());
            var booth_duration = parseInt(Dubtrack.room.player.queueInfo.text());
            var booth_time = (booth_duration * time - time) + current_time;
            if (booth_time >= 0) {
                $('.eta_tooltip_t').append('<div class="eta_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">ETA: '+booth_time+' minutes.</div>');
            } else {
                $('.eta_tooltip_t').append('<div class="eta_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">You\'re not in the queue.</div>');
            }
        },
        hide_eta: function() {
            $('.eta_tooltip').remove();
        },
        report_content: function() {
            var content = $('.input').val();
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
        },
        report_modal: function() {
            hello.input('Bug Report:','Report:','Please give a detailed description of the bug.','confirm-for36','cancel');
            $('.confirm-for36').click(hello.report_content);
            $('.confirm-for36').click(hello.closeErr);
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
            var isOn;
            if (!options.let_medium_disable) {
                options.let_medium_disable = true;
                isOn = 'on';
                $('.backstretch').hide();
                $('.medium').hide();
                hello.option('medium_disable','true');
                hello.on('.medium_disable');
            } else {
                options.let_medium_disable = false;
                isOn = 'off';
                $('.backstretch').show();
                $('.medium').show();
                hello.option('medium_disable','false');
                hello.off('.medium_disable');
            }
        },
        disable_work: function() {
            options.let_work = false;
            $('#main-room').show();
            isOn = 'off';
            hello.option('work','false');
            hello.off('.work');
        },
        work: function() {
            var isOn;
            if (!options.let_work) {
                isOn = 'on';
                options.let_work = true;
                $('#main-room').hide();
                hello.option('work','true');
                hello.on('.work');
            } else {
                hello.disable_work();
            }
        },
        warn_redirect: function() {
            var isOn;
            if(!options.let_warn_redirect) {
                options.let_warn_redirect = true;
                isOn = 'on';
                window.onbeforeunload = function(e) {
                    return '';
                };
                hello.option('warn_redirect','true');
                hello.on('.warn_redirect');
            } else {
                options.let_warn_redirect = false;
                isOn = 'off';
                window.onbeforeunload = null;
                hello.option('warn_redirect','false');
                hello.off('.warn_redirect');
            }
        },
        afk_chat_respond: function(e) {
            var content = e.message;
            var user = Dubtrack.session.get('username');
            if (content.indexOf('@'+user) >-1) {
                if (options.let_active_afk) {
                    $('#chat-txt-message').val('I am AFK at the moment.');
                    Dubtrack.room.chat.sendMessage();
                    options.let_active_afk = false;
                    setTimeout(function() {
                        options.let_active_afk = true;
                    }, 30000);
                }
            }
        },
        afk: function() {
            var isOn;
            if (!options.let_afk) {
                options.let_afk = true;
                isOn = 'on';
                Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
                hello.on('.afk');
            } else {
                options.let_afk = false;
                isOn = 'off';
                Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
                hello.off('.afk');
            }
        },
        chat_window: function() {
            var isOn;
            if(!options.let_chat_window) {
                options.let_chat_window = true;
                isOn = 'on';
                $('head').append('<link class="chat_window_link" rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/chat_window.css">');
                hello.option('chat_window','true');
                hello.on('.chat_window');
            } else {
                options.let_chat_window = false;
                isOn = 'off';
                $('.chat_window_link').remove();
                hello.option('chat_window','false');
                hello.off('.chat_window');
            }
        },
        css_modal: function() {
            var current = localStorage.getItem('css');
            hello.input('CSS',current,'https://example.com/example.css','confirm-for313');
            $('.confirm-for313').click(hello.css_import);
        },
        css_import: function() {
            $('.css_import').remove();
            var css_to_import = $('.input').val();
            hello.option('css',css_to_import);
            $('head').append('<link class="css_import" href="'+css_to_import+'" rel="stylesheet" type="text/css">');
            $('.onErr').remove();
        },
        css_run: function() {
            if (localStorage.getItem('css') !== null) {
                var css_to_load = localStorage.getItem('css');
                $('head').append('<link class="css_import" href="'+css_to_load+'" rel="stylesheet" type="text/css">');
            }
        },
        css_for_the_world: function() {
            if (!options.let_css) {
                options.let_css = true;
                var location = Dubtrack.room.model.get('roomUrl');
                $.ajax({
                    type: 'GET',
                    url: 'https://api.dubtrack.fm/room/'+location,
                }).done(function(e) {
                    var content = e.data.description;
                    var url = content.match(/(@dubx=)(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
                    var append = url[0].split('@dubx=');
                    $('head').append('<link class="css_world" href="'+append[1]+'" rel="stylesheet" type="text/css">');
                });
                hello.option('css_world','true');
                hello.on('.css');
            } else {
                options.let_css = false;
                isOn = 'off';
                $('.css_world').remove();
                hello.option('css_world','false');
                hello.off('.css');
            }
        },
        nicole: function() {
            var isOn;
            if (!options.let_nicole) {
                options.let_nicole = true;
                isOn = 'on';
                $('head').append('<link class="nicole_css" href="'+hello.gitRoot+'/themes/PlugTheme.css" rel="stylesheet" type="text/css">');
                hello.option('nicole', 'true');
                hello.on('.nicole');
            } else {
                options.let_nicole = false;
                isOn = 'off';
                $('.nicole_css').remove();
                hello.option('nicole','false');
                hello.off('.nicole');
            }
        },
        medium_modal: function() {
            hello.input('Link an image file:','It is recommended a .jpg file is used','https://example.com/example.jpg','confirm-for314');
            $('.confirm-for314').click(hello.medium_import);
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
                    if (optionalEvent) { document.dispatchEvent(doneEvent); }
                };
            }
            if (optionalEvent){ doneEvent = new CustomEvent(optionalEvent); }
            var done = function(cb){
                new GetJ(url, cb);
            };
            return { done: done };
        }),

        twitch : { 
            template: "//static-cdn.jtvnw.net/emoticons/v1/{image_id}/3.0",
            specialEmotes: [],
            emotes: {},
            chatRegex : new RegExp(":([-_a-z0-9]+):", "ig")
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
                    self.emojiTwitch = emojify.emojiNames.concat(Object.keys(self.twitch.emotes));
                });
        },
        /**************************************************************************
         * handles replacing twitch emotes in the chat box with the images
         */
        
        replaceTextWithEmote: function(){
            var self = hello;

            if (!self.twitchJSONSLoaded) { return; } // can't do anything until jsons are loaded
            function makeImage(src, name){
                return '<img class="emoji twitch-emoji" title="'+name+'" alt="'+name+'" src="'+src+'" />';
            }
            
            var $last = $('.chat-main .text').last();
            if (!$last.html()) { return; } // nothing to do
            
            var emoted = $last.html().replace(self.twitch.chatRegex, function(matched, p1){
                var _id, _src, _desc, key = p1.toLowerCase();
                if (typeof self.twitch.emotes[key] !== 'undefined'){
                    _id = self.twitch.emotes[key];
                    _src = self.twitch.template.replace("{image_id}", _id);
                    return makeImage(_src, key);
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
                if (options.let_twitch_emotes) {
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

            if (e.keyCode === 38 || e.keyCode === 40 || $('.emoji-grow li').length === 1) {
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
        },
        spacebar_mute: function() {
            var isOn;
            if (!options.let_spacebar_mute) {
                options.let_spacebar_mute = true;
                isOn = 'on';
                $(document).bind('keypress.key32', function() {
                    var tag = event.target.tagName.toLowerCase();
                    if (event.which === 32 && tag != 'input' && tag != 'textarea') {
                        $('#main_player .player_sharing .player-controller-container .mute').click();
                    }
                });
                hello.option('spacebar_mute', 'true');
                hello.on('.spacebar_mute');
            } else {
                options.let_spacebar_mute = false;
                isOn = 'off';
                $(document).unbind("keypress.key32");
                hello.option('spacebar_mute','false');
                hello.off('.spacebar_mute');
            }
        }
    };
    //Ref 3:
    hello.initialize();
    hello.personalize();
    hello.loadTwitchFromApi();

    //Ref 4: 
    if (localStorage.getItem('autovote') === 'true') {
        hello.autovote();
    }
    if (localStorage.getItem('split_chat') === 'true') {
        hello.split_chat();
    }
    if (localStorage.getItem('medium_disable') === 'true') {
        hello.medium_disable();
    }
    if (localStorage.getItem('work') === 'true') {
        hello.work();
    }
    if (localStorage.getItem('warn_redirect') === 'true') {
        hello.warn_redirect();
    }
    if (localStorage.getItem('chat_window') === 'true') {
        hello.chat_window();
    }
    if (localStorage.getItem('css_world') === 'true') {
        hello.css_for_the_world();
    }
    if (localStorage.getItem('nicole') === 'true') {
        hello.nicole();
    }
    if (localStorage.getItem('twitch_emotes') === 'true') {
        hello.optionTwitchEmotes();
    }
    if (localStorage.getItem('emoji_preview') === 'true') {
        hello.optionEmojiPreview();
    }
    if (localStorage.getItem('spacebar_mute') === 'true') {
        hello.spacebar_mute();
    }
    $('document').ready(hello.css_run);
    $('document').ready(hello.medium_load);
    
    $('.for').click(function() {
        $('.for_content').show();
    });

} else {
    function onErr(error) {
        var onErr = [
            '<div class="onErr">',
                '<div class="container">',
                    '<div class="title">',
                        '<h1>Oh noes:</h1>',
                    '</div>',
                    '<div class="content">',
                        '<p>'+error+'</p>',
                    '</div>',
                    '<div class="control">',
                        '<div class="cancel" onclick="hello.closeErr();">',
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
    onErr('Oh no! Error 69: Extension is already open.');
    $('.cancel').click(hello.closeErr);
    $('.confirm-err').click(hello.closeErr);
}