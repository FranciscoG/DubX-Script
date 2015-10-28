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
var hello_run;
if (!hello_run) {
    hello_run = true;
    var our_version = '03.00.10 - Candyland';
    //Ref 1: Variables
    var options = {
        let_autovote: false,
        let_split_chat: false,
        let_wide_video: false,
        let_medium_disable: false,
        let_work: false,
        let_warn_redirect: false,
        let_afk: false,
        let_active_afk: true,
        let_chat_window: false,
        let_css: false,
        let_nicole: false
    };
    
    //Ref 1.1
    $('.player_sharing').append('<span class="duration">...</span>');
    
    //Ref 2: Options
    var hello = {
        //Ref 2.1: Initialize
        personalize: function() {
            $('.isUser').text(Dubtrack.session.get('username'));
        },
        slide: function() {
            $('.isSwordful').slideToggle('fast');
        },
        //Ref 2.2: Initialize
        initialize: function() {
            var li = '<li><button onclick="hello.slide();" class="relate" style="font-size: 1em;height: 32px;margin-right: 16px;border-radius: 0.1875em;">DUBX</button></li>';
            var html = [
                '<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">',
                '<link rel="stylesheet" type="text/css" href="https://rawgit.com/sinfulBA/DubX-Script/master/css/asset.css">',
                '<div class="isSwordful">',
                    '<div class="verSwordful">',
                        '<p class="Javaling">DubX Settings</p>',
                        '<p class="Javaful">Version '+our_version+' - Apologies! You will need to restore options.</p>',
                    '</div>',
                    '<ul class="optionSwordful">',
                        '<li class="optionClass">',
                            '<p class="Optionling" style="margin: 0;">Aloha, <span class="isUser"></span>!</p>',
                        '</li>',
                        '<li class="titleClass">',
                            '<p class="istitle">Standard</p>',
                        '</li>',
                        '<li onclick="hello.autovote();" class="optionClass autovote">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Autovote</p>',
                        '</li>',
                        '<li onclick="hello.wide_video();" class="optionClass wide_video">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Fullscreen</p>',
                        '</li>',
                        '<li onclick="hello.work();" class="optionClass work">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Work Mode</p>',
                        '</li>',
                        '<li onclick="hello.split_chat();" class="optionClass split_chat">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Split Chat</p>',
                        '</li>',
                        '<li onclick="hello.chat_window();" class="optionClass chat_window">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Chat Only</p>',
                        '</li>',
                        '<li onclick="hello.medium_disable();" class="optionClass medium_disable">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Hide Background</p>',
                        '</li>',
                        '<li onclick="hello.afk();" class="optionClass afk">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">AFK Auto-Respond</p>',
                        '</li>',
                        '<li onclick="hello.warn_redirect();" class="optionClass warn_redirect">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Warn On Navigation</p>',
                        '</li>',
                        '<li onclick="hello.css_for_the_world();" class="optionClass css">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Community CSS</p>',
                        '</li>',
                        '<li onclick="hello.nicole();" class="optionClass nicole">',
                            '<p class="isOnOff"><i class="fi-x"></i></p>',
                            '<p class="Optionling">Plug Theme</p>',
                        '</li>',
                        '<li class="titleClass">',
                            '<p class="istitle">Contact</p>',
                        '</li>',
                        '<li onclick="hello.report_modal();" class="optionClass report">',
                            '<p class="isOnOff"><i class="fi-comments"></i></p>',
                            '<p class="Optionling">Bug Report</p>',
                        '</li>',
                        '<li class="titleClass">',
                            '<p class="istitle">Customize</p>',
                        '</li>',
                        '<li onclick="hello.css_modal();" class="optionClass">',
                            '<p class="isOnOff"><i class="fi-unlink"></i></p>',
                            '<p class="Optionling">Custom CSS</p>',
                        '</li>',
                        '<li onclick="hello.medium_modal();" class="optionClass">',
                            '<p class="isOnOff"><i class="fi-unlink"></i></p>',
                            '<p class="Optionling">Custom Background</p>',
                        '</li>',
                        '<li class="titleClass">',
                            '<p class="istitle">Social</p>',
                        '</li>',
                        '<li class="optionClass facebook">',
                            '<a href="https://www.facebook.com/DubXScript" target="_blank" style="color: white;">',
                                '<p class="isOnOff"><i class="fi-social-facebook"></i></p>',
                                '<p class="Optionling">Like Us on Facebook</p>',
                            '</a>',
                        '</li>',
                        '<li class="optionClass twitter">',
                            '<a href="https://twitter.com/DubXScript" target="_blank" style="color: white;">',
                                '<p class="isOnOff"><i class="fi-social-twitter"></i></p>',
                                '<p class="Optionling">Follow Us on Twitter</p>',
                            '</a>',
                        '</li>',
                        '<li class="optionClass github">',
                            '<a href="https://github.com/sinfulBA/DubX-Script" target="_blank" style="color: white;">',
                                '<p class="isOnOff"><i class="fi-social-github"></i></p>',
                                '<p class="Optionling">Fork Us on Github</p>',
                            '</a>',
                        '</li>',
                        '<li class="optionClass website">',
                            '<a href="https://dubx.net" target="_blank" style="color: white;">',
                                '<p class="isOnOff"><i class="fi-link"></i></p>',
                                '<p class="Optionling">Check out our Website</p>',
                            '</a>',
                        '</li>',
                        '<li class="titleClass">',
                            '<p class="istitle">Our Extension</p>',
                        '</li>',
                        '<li class="optionClass webstore">',
                            '<a href="https://chrome.google.com/webstore/detail/dubx/oceofndagjnpebjmknefoelcpcnpcedm/reviews" target="_blank" style="color: white;">',
                                '<p class="isOnOff"><i class="fi-like"></i></p>',
                                '<p class="Optionling">Give Us a Rating</p>',
                            '</a>',
                        '</li>',
                        '<li class="optionClass">',
                        	'<p class="Optionful" style="margin: 0;">Dub X currently has 874 users!</p>',
                        '</li>',
                    '</ul>',
                '</div>'
            ].join('');
            $('.user-header-menu').prepend(li);
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
            $(selector + ' .isOnOff i').replaceWith('<i class="fi-check"></i>');
        },
        off: function(selector) {
            $(selector + ' .isOnOff i').replaceWith('<i class="fi-x"></i>');
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
                $('.chat-main li:nth-child(even)').addClass('split');
                $('.chat-main li:nth-child(even) .chatDelete').addClass('splitfix');
                hello.option('split_chat', 'true');
                hello.on('.split_chat');
            } else {
                options.let_split_chat = false;
                isOn = 'off';
                $('.chat-main li:nth-child(even)').removeClass('split');
                $('.chat-main li:nth-child(even) .chatDelete').removeClass('splitfix');
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
                $('.duration').replaceWith('<span class="duration">You will be on the booth in approximately '+booth_time+' minutes.</span>');
            }
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
        wide_video_disable: function() {
            $('.wide_video_link').remove();
            options.let_wide_video = false;
            isOn = 'off';
            hello.option('wide_video','false');
            hello.off('.wide_video');
        },
        wide_video: function() {
            var isOn;
            if (!options.let_wide_video) {
                options.let_wide_video = true;
                isOn = 'on';
                $('head').prepend('<link class="wide_video_link" rel="stylesheet" type="text/css" href="https://rawgit.com/sinfulBA/DubX-Script/master/css/options/wide_video.css">');
                hello.option('wide_video','true');
                hello.on('.wide_video');
            } else {
                hello.wide_video_disable();
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
                hello.wide_video_disable;
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
                Dubtrack.Events.bind("realtime:chat-message", hello.afk_chat_respond);
                hello.on('.afk');
            } else {
                options.let_afk = false;
                isOn = 'off';
                Dubtrack.Events.unbind("realtime:chat-message", hello.afk_chat_respond);
                hello.off('.afk');
            }
        },
        chat_window: function() {
            var isOn;
            if(!options.let_chat_window) {
                options.let_chat_window = true;
                isOn = 'on';
                $('head').append('<link class="chat_window_link" rel="stylesheet" type="text/css" href="https://rawgit.com/sinfulBA/DubX-Script/master/css/options/chat_window.css">');
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
                $('head').append('<link class="nicole_css" href="https://rawgit.com/sinfulBA/DubX-Script/master/themes/PlugTheme.css" rel="stylesheet" type="text/css">');
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
            $('.custom_wallpaper').remove();
            $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
            $('.onErr').remove();
        },
        medium_load: function() {
            if (localStorage.getItem('medium') !== null) {
                var content = localStorage.getItem('medium');
                $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
            }
        },
        mobileSongTitle: function(){
            /* Show the song title on hover when in the mobile view */
            var mobileWidth = 1134;
            var isMobile = $(window).width() <= mobileWidth;
            // create holder span that will be the popup
            var songTitlePopup = document.createElement('span');
            songTitlePopup.style.cssText = "display: none; padding: 3px 4px; background-color:rgba(0,0,0,0.8); position: absolute; bottom: 44px; left: 0; width: 100%; z-index: 99;";
            songTitlePopup.id = "songTitlePopup";
            document.body.appendChild(songTitlePopup);

            // add hover to infoContainer
            $('#player-controller')
              .mouseenter(function(e){
                if (isMobile) { $('#songTitlePopup').show(); }
              })
              .mouseleave(function(e){
                if (isMobile) { $('#songTitlePopup').hide(); }
              });

            function getTitle() {
              isMobile = $(window).width() <= mobileWidth;
              var songTitle = $('.currentSong').text();
              $('#songTitlePopup').text(songTitle);
            }
            getTitle();

            // bind on resize
            $(window).resize(function(){
              isMobile = $(window).width() <= mobileWidth;
            });
            // bind on new song change
            Dubtrack.Events.bind("realtime:room_playlist-update", getTitle);
        },
        emojiPreview: function(){
            /* global emojify, Dubtrack */
            if (typeof emojify === 'undefined' || !emojify.emojiNames || emojify.emojiNames.length === 0) { 
                return; // we can't do anything below if the emojis don't exist
            }
            $('.pusher-chat-widget-input').prepend('<div id="emoji-preview" style="display: none; border: 1px solid #202020; position: absolute; bottom: 54px; background-color:#111;"></div>');

            function createImg(name) {
                return '<div style="display:inline-block">' +
                    '<img style="width: 1em; height: 1em; display:inline-block" src="'+emojify.defaultConfig.img_dir+'/'+encodeURI(name)+'.png" title=":'+name+':" alt=":'+name+':" align="absmiddle" />' +
                    '<span style="font-size: 0.8em; display:inline-block; padding:0 3px;">:' + name + ':</span>' +
                '</div>';
            }
            function addToHelper(emojiArray) {
                $('#emoji-preview').empty();
                var text = "";
                $.each(emojiArray, function(i,val){
                    text += createImg(val);
                });
                $('#emoji-preview').append(text).show();
            }
            function filterEmoji(str){
                var finalStr = str.replace("+","\\+");
                var re = new RegExp('^' + finalStr ,"i");
                return emojify.emojiNames.filter(function(val){
                    return re.test(val);
                });
            }
            var searchStr = "";
            var emojiRegex = new RegExp(":([+\\-_a-z0-9]+)$","i");
            $(document.body).on('keyup', "#chat-txt-message", function(e) {
                var currentText = $('#chat-txt-message').val();

                var filteredEmoji = currentText.replace(emojiRegex, function(matched, p1){
                    searchStr = p1;
                    addToHelper(filterEmoji(p1));
                });
                
                if (e.keyCode === 13 || searchStr.length <= 0 || currentText.charAt(currentText.length - 1) === ":") {
                    searchStr = "";
                    $('#emoji-preview').empty().hide();
                }
            });
        } // end emoji preview
    };
    //Ref 3:
    hello.initialize();
    hello.personalize();
    hello.emojiPreview();
    hello.mobileSongTitle();
    setInterval(function() {
        hello.eta();
    }, 5000);
    
    //Ref 4: 
    $('.user-info-button').click(hello.wide_video_disable);
    $('.user-info-button').click(hello.disable_work);
    window.addEventListener("resize", function(){
        var window_width = $(window).width();
        if (window_width <= 1185) {hello.wide_video_disable();}
    }, true);
    if (localStorage.getItem('autovote') === 'true') {
        hello.autovote();
    }
    if (localStorage.getItem('split_chat') === 'true') {
        hello.split_chat();
    }
    if (localStorage.getItem('wide_video') === 'true') {
        hello.wide_video();
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
    $('document').ready(function(){
        hello.css_run();
        hello.medium_load();
    });
    
     // Ref 5:
	$('.chat-main').on('DOMNodeInserted', function(e) {
		var itemEl = $(e.target);
		if(itemEl.prop('tagName').toLowerCase() !== 'li' || itemEl.attr('class').substring(0, 'user-'.length) !== 'user-') return;
		var user = Dubtrack.room.users.collection.findWhere({userid: itemEl.attr('class').split(/-| /)[1]});
		var role = !user.get('roleid') ? 'default' : Dubtrack.helpers.isDubtrackAdmin(user.get('userid')) ? 'admin' : user.get('roleid').type;
		itemEl.addClass('is' + (role.charAt(0).toUpperCase() + role.slice(1)));
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
