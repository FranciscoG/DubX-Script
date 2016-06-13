var hello_run;
var ifUserBanned;
$.ajax({
    url: 'https://db.daggerling.com/',
    method: 'GET',
    async: false
}).done(function(data) {
    if (data.data.indexOf(Dubtrack.session.id) !== -1) {
        ifUserBanned = true;
    } else {
        ifUserBanned = false;
    }
});
if (!hello_run && Dubtrack.session.id && !ifUserBanned) {
    hello_run = true;
    var our_version = '03.03.00 - Happy Holidays';

    //Ref 1: Variables
    var options = {
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
        let_custom_mentions: false,
        let_snow: false,
        draw_general: false,
        draw_userinterface: false,
        draw_settings: false,
        draw_customize: false,
        draw_contact: false,
        draw_social: false,
        draw_chrome: false
    };

    $('html').addClass('dubx');

    //Ref 1.1
    $('.player_sharing').append('<span class="icon-history eta_tooltip_t" onmouseover="hello.eta();" onmouseout="hello.hide_eta();"></span>');

    //Ref 2: Options
    var hello = {
        gitRoot: 'https://rawgit.com/sinfulBA/DubX-Script/master',
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
                    '<span class="for_content_version" onclick="hello.drawAll();" title="Collapse/Expand Menus">'+our_version+'</span>',
                    '<ul class="for_content_ul">',
                        '<li class="for_content_li" onclick="hello.drawSection(this)">',
                            '<p class="for_content_c">',
                                'General',
                                '<i class="fi-minus"></i>',
                            '</p>',
                        '</li>',
                        '<ul class="draw_general">',
                            '<li onclick="hello.snow();" class="for_content_li for_content_feature snow">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Snow</p>',
                            '</li>',
                            '<li onclick="hello.autovote();" class="for_content_li for_content_feature autovote">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Autovote</p>',
                            '</li>',
                            '<li onclick="hello.afk(event);" class="for_content_li for_content_feature afk">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p onclick="hello.createAfkMessage();" class="for_content_edit" style="display: inline-block;color: #878c8e;font-size: .85rem;font-weight: bold;float: right;"><i class="fi-pencil"></i></p>',
                                '<p class="for_content_p">AFK Autorespond</p>',
                            '</li>',
                            '<li onclick="hello.optionTwitchEmotes();" class="for_content_li for_content_feature twitch_emotes">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Emotes</p>',
                            '</li>',
                            '<li onclick="hello.optionEmojiPreview();" class="for_content_li for_content_feature emoji_preview">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Autocomplete Emoji</p>',
                            '</li>',
                            '<li onclick="hello.optionMentions();" class="for_content_li for_content_feature autocomplete_mentions">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Autocomplete Mentions</p>',
                            '</li>',
                            '<li onclick="hello.customMentions(event);" class="for_content_li for_content_feature custom_mentions">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p onclick="hello.createCustomMentions();" class="for_content_edit" style="display: inline-block;color: #878c8e;font-size: .85rem;font-weight: bold;float: right;"><i class="fi-pencil"></i></p>',
                                '<p class="for_content_p">Custom Mention Triggers</p>',
                            '</li>',
                            '<li onclick="hello.mentionNotifications();" class="for_content_li for_content_feature mention_notifications">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Notification on Mentions</p>',
                            '</li>',
                        '</ul>',
                        '<li class="for_content_li" onclick="hello.drawSection(this)">',
                            '<p class="for_content_c">',
                                'User Interface',
                                '<i class="fi-minus"></i>',
                            '</p>',
                        '</li>',
                        '<ul class="draw_userinterface">',
                            '<li onclick="hello.fs();" class="for_content_li for_content_feature fs">',
                                '<p class="for_content_off"><i class="fi-arrows-out"></i></p>',
                                '<p class="for_content_p">Fullscreen Video</p>',
                            '</li>',
                            '<li onclick="hello.split_chat();" class="for_content_li for_content_feature split_chat">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Split Chat</p>',
                            '</li>',
                            '<li onclick="hello.video_window();" class="for_content_li for_content_feature video_window">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Hide Chat</p>',
                            '</li>',
                            '<li onclick="hello.chat_window();" class="for_content_li for_content_feature chat_window">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Hide Video</p>',
                            '</li>',
                            '<li onclick="hello.hide_avatars();" class="for_content_li for_content_feature hide_avatars">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Hide Avatars</p>',
                            '</li>',
                            '<li onclick="hello.medium_disable();" class="for_content_li for_content_feature medium_disable">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Hide Background</p>',
                            '</li>',
                        '</ul>',
                        '<li class="for_content_li" onclick="hello.drawSection(this)">',
                            '<p class="for_content_c">',
                                'Settings',
                                '<i class="fi-minus"></i>',
                            '</p>',
                        '</li>',
                        '<ul class="draw_settings">',
                            '<li onclick="hello.spacebar_mute();" class="for_content_li for_content_feature spacebar_mute">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Spacebar Mute</p>',
                            '</li>',
                            '<li onclick="hello.show_timestamps();" class="for_content_li for_content_feature show_timestamps">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Show Timestamps</p>',
                            '</li>',
                            '<li onclick="hello.warn_redirect();" class="for_content_li for_content_feature warn_redirect">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Warn On Navigation</p>',
                            '</li>',
                        '</ul>',
                        '<li class="for_content_li" onclick="hello.drawSection(this)">',
                            '<p class="for_content_c">',
                                'Customize',
                                '<i class="fi-minus"></i>',
                            '</p>',
                        '</li>',
                        '<ul class="draw_customize">',
                            '<li onclick="hello.nicole();" class="for_content_li for_content_feature nicole">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Plug.dj Theme</p>',
                            '</li>',
                            '<li onclick="hello.css_for_the_world();" class="for_content_li for_content_feature css">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Community Theme</p>',
                            '</li>',
                            '<li onclick="hello.css_modal();" class="for_content_li for_content_feature">',
                                '<p class="for_content_off"><i class="fi-unlink"></i></p>',
                                '<p class="for_content_p">Custom CSS</p>',
                            '</li>',
                            '<li onclick="hello.medium_modal();" class="for_content_li for_content_feature">',
                                '<p class="for_content_off"><i class="fi-unlink"></i></p>',
                                '<p class="for_content_p">Custom Background</p>',
                            '</li>',
                        '</ul>',
                        '<li class="for_content_li" onclick="hello.drawSection(this)">',
                            '<p class="for_content_c">',
                                'Contact',
                                '<i class="fi-minus"></i>',
                            '</p>',
                        '</li>',
                        '<ul class="draw_contact">',
                            '<li onclick="hello.report_modal();" class="for_content_li for_content_feature report">',
                                '<p class="for_content_off"><i class="fi-comments"></i></p>',
                                '<p class="for_content_p">Bug Report</p>',
                            '</li>',
                        '</ul>',
                        '<li class="for_content_li" onclick="hello.drawSection(this)">',
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
                        '</ul>',
                        '<li class="for_content_li" onclick="hello.drawSection(this)">',
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
                        '</ul>',
                    '</ul>',
                '</div>'
            ].join('');
            $('.header-right-navigation').append(li);
            $('body').prepend(html);
            $('.for_content').perfectScrollbar({ wheelSpeed: 30, suppressScrollX: true });
            $.getScript('https://rawgit.com/loktar00/JQuery-Snowfall/master/src/snowfall.jquery.js');
        },
        sectionList: ['draw_general','draw_userinterface','draw_settings','draw_customize','draw_contact','draw_social','draw_chrome'],
        drawSection: function(el) {
            $(el).next('ul').slideToggle('fast');
            var sectionClass = $(el).next('ul').attr('class');

            var clicked = $(el).find('.for_content_c i');

            if(clicked.hasClass('fi-minus')){
                clicked.removeClass('fi-minus').addClass('fi-plus');
                hello.option(sectionClass,'false');
                options[sectionClass] = 'false';
            }
            else{
                clicked.removeClass('fi-plus').addClass('fi-minus');
                hello.option(sectionClass,'true');
                options[sectionClass] = 'true';
            }

        },
        drawAll: function() {
            var allClosed = true;
            for(var i = 0; i < hello.sectionList.length; i++) {
                if($('.'+hello.sectionList[i]).css('display') === 'block'){
                    allClosed = false;
                }
            }

            if(allClosed) {
                for(var i = 0; i < hello.sectionList.length; i++) {
                    $('.'+hello.sectionList[i]).slideDown('fast');
                    $('.'+hello.sectionList[i]).prev('li').find('i').removeClass('fi-plus').addClass('fi-minus');
                    hello.option(hello.sectionList[i], 'true');
                    options[hello.sectionList[i]] = 'true';
                }
            }
            else {
                for(var i = 0; i < hello.sectionList.length; i++) {
                    $('.'+hello.sectionList[i]).slideUp();
                    $('.'+hello.sectionList[i]).prev('li').find('i').removeClass('fi-minus').addClass('fi-plus');
                    hello.option(hello.sectionList[i],'false');
                    options[hello.sectionList[i]] = 'false';
                }
            }
        },
        //Ref 2.3.1: Input
        input: function(title,content,placeholder,confirm,maxlength) {
            var onErr = [
                '<div class="onErr">',
                    '<div class="container">',
                        '<div class="title">',
                            '<h1>'+title+'</h1>',
                        '</div>',
                        '<div class="content">',
                            '<p>'+content+'</p>',
                            '<textarea class="input" type="text" placeholder="'+placeholder+'" maxlength="'+maxlength+'">'+content+'</textarea>',
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
        snow: function() {
            if (!options.let_snow) {
                options.let_snow = true;
                hello.option('snow','true');
                hello.on('.snow');
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
                options.let_snow = false;
                hello.option('snow','false');
                hello.off('.snow');
                $(document).snowfall('clear');
            }
        },
        autovote: function() {
            if (!options.let_autovote) {
                options.let_autovote = true;

                var song = Dubtrack.room.player.activeSong.get('song');
                var dubCookie = Dubtrack.helpers.cookie.get('dub-' + Dubtrack.room.model.get("_id"));
                var dubsong = Dubtrack.helpers.cookie.get('dub-song');
                if(!Dubtrack.room || !song || song.songid !== dubsong)
                    dubCookie = false;

                //Only cast the vote if user hasn't already voted
                if(!$('.dubup, .dubdown').hasClass('voted') && !dubCookie)
                    hello.advance_vote();

                hello.option('autovote','true');
                hello.on('.autovote');
                Dubtrack.Events.bind("realtime:room_playlist-update", hello.advance_vote);
            } else {
                options.let_autovote = false;
                hello.option('autovote','false');
                hello.off('.autovote');
                Dubtrack.Events.unbind("realtime:room_playlist-update", hello.advance_vote);
            }
        },
        split_chat: function() {
            if (!options.let_split_chat) {
                options.let_split_chat = true;
                $('.chat-main').addClass('splitChat');
                hello.option('split_chat', 'true');
                hello.on('.split_chat');
            } else {
                options.let_split_chat = false;
                $('.chat-main').removeClass('splitChat');
                hello.option('split_chat','false');
                hello.off('.split_chat');
            }
        },
        eta: function() {
            var time = 4;
            var current_time = parseInt($('#player-controller div.left ul li.infoContainer.display-block div.currentTime span.min').text());
            var booth_duration = parseInt($('.queue-position').text());
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
            hello.input('Bug Report:','','Please only report bugs for DubX, not Dubtrack. \nBe sure to give a detailed description of the bug, and a way to replicate it, if possible.','confirm-for36','999');
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
            if (!options.let_medium_disable) {
                options.let_medium_disable = true;
                $('.backstretch').hide();
                $('.medium').hide();
                hello.option('medium_disable','true');
                hello.on('.medium_disable');
            } else {
                options.let_medium_disable = false;
                $('.backstretch').show();
                $('.medium').show();
                hello.option('medium_disable','false');
                hello.off('.medium_disable');
            }
        },
        warn_redirect: function() {
            if(!options.let_warn_redirect) {
                options.let_warn_redirect = true;
                window.onbeforeunload = function(e) {
                    return '';
                };
                hello.option('warn_redirect','true');
                hello.on('.warn_redirect');
            } else {
                options.let_warn_redirect = false;
                window.onbeforeunload = null;
                hello.option('warn_redirect','false');
                hello.off('.warn_redirect');
            }
        },
        afk_chat_respond: function(e) {
            var content = e.message;
            var user = Dubtrack.session.get('username');
            if (content.indexOf('@'+user) >-1 && Dubtrack.session.id !== e.user.userInfo.userid) {
                if (options.let_active_afk) {
                    if (localStorage.getItem('customAfkMessage')) {
                        var customAfkMessage = localStorage.getItem('customAfkMessage');
                        $('#chat-txt-message').val('[AFK] '+customAfkMessage);
                    } else {
                        $('#chat-txt-message').val("[AFK] I'm not here right now.");
                    }
                    Dubtrack.room.chat.sendMessage();
                    options.let_active_afk = false;
                    setTimeout(function() {
                        options.let_active_afk = true;
                    }, 30000);
                }
            }
        },
        saveAfkMessage: function() {
            var customAfkMessage = $('.input').val();
            hello.option('customAfkMessage', customAfkMessage);
            $('.onErr').remove();
        },
        createAfkMessage: function() {
            var current = localStorage.getItem('customAfkMessage');
            hello.input('Custom AFK Message',current,'I\'m not here right now.','confirm-for315','255');
            $('.confirm-for315').click(hello.saveAfkMessage);
        },
        afk: function(e) {
            if(e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil') return;

            if (!options.let_afk) {
                options.let_afk = true;
                Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
                hello.on('.afk');
            } else {
                options.let_afk = false;
                Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
                hello.off('.afk');
            }
        },
        customMentions: function(e) {
            if(e && e.target && (e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil')) return;

            if (!options.let_custom_mentions) {
                options.let_custom_mentions = true;
                Dubtrack.Events.bind("realtime:chat-message", this.customMentionCheck);
                hello.on('.custom_mentions');
            } else {
                options.let_custom_mentions = false;
                Dubtrack.Events.unbind("realtime:chat-message", this.customMentionCheck);
                hello.off('.custom_mentions');
            }
        },
        customMentionCheck: function(e) {
            var content = e.message.toLowerCase();
            if (options.let_custom_mentions) {
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
            hello.input('Custom Mention Triggers (separate by comma)',current,'separate, custom triggers, by, comma, :heart:','confirm-for315','255');
            $('.confirm-for315').click(hello.saveCustomMentions);
        },
        saveCustomMentions: function() {
            var customMentions = $('.input').val();
            hello.option('custom_mentions', customMentions);
            $('.onErr').remove();
        },
        chat_window: function() {
            if(!options.let_chat_window) {
                options.let_chat_window = true;
                $('head').append('<link class="chat_window_link" rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/chat_window.css">');
                hello.option('chat_window','true');
                hello.on('.chat_window');
            } else {
                options.let_chat_window = false;
                $('.chat_window_link').remove();
                hello.option('chat_window','false');
                hello.off('.chat_window');
            }
        },
        css_modal: function() {
            var current = localStorage.getItem('css');
            hello.input('CSS',current,'https://example.com/example.css','confirm-for313','999');
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
                    var url = content.match(/(@dubx=)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/);

                    if(!url) return;

                    var append = url[0].split('@dubx=');
                    $('head').append('<link class="css_world" href="'+append[1]+'" rel="stylesheet" type="text/css">');
                });
                hello.option('css_world','true');
                hello.on('.css');
            } else {
                options.let_css = false;
                $('.css_world').remove();
                hello.option('css_world','false');
                hello.off('.css');
            }
        },
        hide_avatars: function() {
            if(!options.let_hide_avatars) {
                options.let_hide_avatars = true;
                $('head').append('<link class="hide_avatars_link" rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/hide_avatars.css">');
                hello.option('hide_avatars','true');
                hello.on('.hide_avatars');
            } else {
                options.let_hide_avatars = false;
                $('.hide_avatars_link').remove();
                hello.option('hide_avatars','false');
                hello.off('.hide_avatars');
            }
        },
        nicole: function() {
            if (!options.let_nicole) {
                options.let_nicole = true;
                $('head').append('<link class="nicole_css" href="'+hello.gitRoot+'/themes/PlugTheme.css" rel="stylesheet" type="text/css">');
                hello.option('nicole', 'true');
                hello.on('.nicole');
            } else {
                options.let_nicole = false;
                $('.nicole_css').remove();
                hello.option('nicole','false');
                hello.off('.nicole');
            }
        },
        medium_modal: function() {
            hello.input('Link an image file:','It is recommended a .jpg file is used','https://example.com/example.jpg','confirm-for314','999');
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
        show_timestamps: function() {
            if(!options.let_show_timestamps) {
                options.let_show_timestamps = true;
                $('head').append('<link class="show_timestamps_link" rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/show_timestamps.css">');
                hello.option('show_timestamps','true');
                hello.on('.show_timestamps');
            } else {
                options.let_show_timestamps = false;
                $('.show_timestamps_link').remove();
                hello.option('show_timestamps','false');
                hello.off('.show_timestamps');
            }
        },
        video_window: function() {
            if(!options.let_video_window) {
                options.let_video_window = true;
                $('head').append('<link class="video_window_link" rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/video_window.css">');
                hello.option('video_window','true');
                hello.on('.video_window');
            } else {
                options.let_video_window = false;
                $('.video_window_link').remove();
                hello.option('video_window','false');
                hello.off('.video_window');
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
            url: "",
            template: function(id) { return hello.tasty.url + hello.tasty.emotes[id]; },
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
            var self = hello;
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
            var self = hello;
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
            var self = hello;
            var savedData;
            // if it doesn't exist in localStorage or it's older than 5 days
            // grab it from the bttv API
            if (self.shouldUpdateAPIs('tasty')) {
                console.log('Dubx','tasty','loading from api');
                var tastyApi = new self.getJSON(hello.gitRoot + '/emotes/tastyemotes.json', 'tasty:loaded');
                tastyApi.done(function(data){
                    localStorage.setItem('tasty_api_timestamp', Date.now().toString());
                    localStorage.setItem('tasty_api', data);
                    self.processTastyEmotes(JSON.parse(data));
                });
            } else {
                console.log('Dubx','tasty','loading from localstorage');
                savedData = JSON.parse(localStorage.getItem('tasty_api'));
                self.processTastyEmotes(savedData);
                savedData = null; // clear the var from memory
                var twEvent = new Event('tasty:loaded');
                document.body.dispatchEvent(twEvent);
            }
        },
        processTwitchEmotes: function(data) {
            var self = hello;
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
            var self = hello;
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
            var self = hello;
            self.tasty.url = data.template;
            self.tasty.emotes = data.emotes;
            self.tastyJSONLoaded = true;
            self.emojiEmotes = self.emojiEmotes.concat(Object.keys(self.tasty.emotes));
        },
        /**************************************************************************
         * handles replacing twitch emotes in the chat box with the images
         */

        replaceTextWithEmote: function(){
            var self = hello;
            var _regex = self.twitch.chatRegex;

            if (!self.twitchJSONSLoaded) { return; } // can't do anything until jsons are loaded

            function makeImage(src, name){
                return '<img class="emoji twitch-emoji" title="'+name+'" alt="'+name+'" src="'+src+'" />';
            }

            var $last = $('.chat-main .text').last();
            if (!$last.html()) { return; } // nothing to do

            if (self.bttvJSONSLoaded) { _regex = self.bttv.chatRegex; }

            var emoted = $last.html().replace(_regex, function(matched, p1){
                var _id, _src, _desc, key = p1.toLowerCase();

                if (typeof self.twitch.emotes[key] !== 'undefined'){
                    _id = self.twitch.emotes[key];
                    _src = self.twitch.template(_id);
                    return makeImage(_src, key);
                } else if (typeof self.bttv.emotes[key] !== 'undefined') {
                    _id = self.bttv.emotes[key];
                    _src = self.bttv.template(_id);
                    return makeImage(_src, key);
                } else if (typeof self.tasty.emotes[key] !== 'undefined') {
                    _src = self.tasty.template(key);
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
                document.body.addEventListener('twitch:loaded', this.loadBTTVEmotes);
                document.body.addEventListener('bttv:loaded', this.loadTastyEmotes);

                if (!hello.twitchJSONSLoaded) {
                    hello.loadTwitchEmotes();
                    document.body.addEventListener('tasty:loaded', this.replaceTextWithEmote);
                } else {
                    this.replaceTextWithEmote();
                }

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
        previewList: function(acArray) {
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
        },
        previewSearchStr : "",
        updateChatInput: function(str){
            var regexString = hello.previewSearchStr.replace(/([()])/, "\\$1");
            var _re = new RegExp("(:|@)"+regexString + "$");
            var fixed_text = $("#chat-txt-message").val().replace(_re, str) + " ";
            $('#autocomplete-preview').empty().removeClass('ac-show');
            $("#chat-txt-message").val(fixed_text).focus();
        },
        displayBoxIndex : -1,
        doNavigate : function(diff) {
            var self = hello;
            self.displayBoxIndex += diff;
            var oBoxCollection = $(".ac-show li");
            if (self.displayBoxIndex >= oBoxCollection.length){
                hello.displayBoxIndex = 0;
            }
            if (self.displayBoxIndex < 0){
                 self.displayBoxIndex = oBoxCollection.length - 1;
             }
            var cssClass = "selected";
            oBoxCollection.removeClass(cssClass).eq(self.displayBoxIndex).addClass(cssClass).focus();
        },
        previewListKeyUp: function(e){
            e.preventDefault();
            switch(e.keyCode) {
                case 38:
                    hello.doNavigate(-1);
                    break;
                case 40:
                    hello.doNavigate(1);
                    break;
                case 39:
                case 13:
                    $('#autocomplete-preview li.selected').trigger('click');
                    break;
                default:
                    $("#chat-txt-message").focus();
                    break;
            }
        },
        previewListInit: function(){
            // bind the keyup and click functions here

            $('head').prepend('<link rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/autocomplete.css">');
            var acUL = document.createElement('ul');
            acUL.id = "autocomplete-preview";
            $('.pusher-chat-widget-input').prepend(acUL);

            $(document.body).on('click', '.preview-item', function(e){
                var new_text = $(this).find('.ac-text')[0].textContent;
                hello.updateChatInput(new_text);
            });

            $(document.body).on('keyup', '.ac-show', hello.previewListKeyUp);
        },
        /**************************************************************************
         * A bunch of utility helpers for the emoji preview
         */
        emojiUtils : {
            createPreviewObj : function(type, id, name) {
                return {
                    src : hello[type].template(id),
                    text : ":" + name + ":",
                    alt : name,
                    cn : type
                };
            },
            addToPreviewList : function(emojiArray) {
                var self = hello.emojiUtils;
                var listArray = [];
                var _key;

                emojiArray.forEach(function(val,i,arr){
                    _key = val.toLowerCase();
                    if (typeof hello.twitch.emotes[_key] !== 'undefined') {
                        listArray.push(self.createPreviewObj("twitch", hello.twitch.emotes[_key], val));
                    }
                    if (typeof hello.bttv.emotes[_key] !== 'undefined') {
                        listArray.push(self.createPreviewObj("bttv", hello.bttv.emotes[_key], val));
                    }
                    if (typeof hello.tasty.emotes[_key] !== 'undefined') {
                        listArray.push(self.createPreviewObj("tasty", _key, val));
                    }
                    if (emojify.emojiNames.indexOf(_key) >= 0) {
                        listArray.push(self.createPreviewObj("emoji", val, val));
                    }
                });

                hello.previewList(listArray);
            },
            filterEmoji : function(str){
                var finalStr = str.replace(/([+()])/,"\\$1");
                var re = new RegExp('^' + finalStr, "i");
                var arrayToUse = emojify.emojiNames;
                if (options.let_twitch_emotes) {
                    arrayToUse = hello.emojiEmotes; // merged array
                }
                return arrayToUse.filter(function(val){
                    return re.test(val);
                });
            }
        },
        /**************************************************************************
         * handles filtering emoji, twitch, and users preview autocomplete popup on keyup
         */
        chatInputKeyupFunc: function(e){
            var self = hello;
            var currentText = this.value;
            var keyCharMin = 3; // when to start showing previews, default to 3 chars

            var filterText = currentText.replace(/(:|@)([&!()\+\-_a-z0-9]+)$/i, function(matched, p1, p2){
                hello.previewSearchStr = p2;
                keyCharMin = (p1 === "@") ? 1 : 3;

                // twitch and emoji
                if (p2 && p2.length >= keyCharMin && p1 === ":" && options.let_emoji_preview) {
                    self.emojiUtils.addToPreviewList( self.emojiUtils.filterEmoji(p2) );
                }

                // users
                if (p2 && p2.length >= keyCharMin && p1 === "@" && options.let_autocomplete_mentions) {
                    self.previewList( self.filterUsers(p2) );
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

            if ($('.ac-show li').length === 1) {
                $('.ac-show li').append('<span>press enter to select</span>').addClass('selected');
            }

            if ($('.ac-show li').length === 1 && e.keyCode === 13) {
                $('#autocomplete-preview li:first').trigger('click');
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
        },
        optionEmojiPreview: function(){
            if (!options.let_emoji_preview) {
                options.let_emoji_preview = true;
                hello.option('emoji_preview', 'true');
                hello.on('.emoji_preview');
            } else {
                options.let_emoji_preview = false;
                hello.option('emoji_preview', 'false');
                hello.off('.emoji_preview');
            }
        },
        optionMentions: function(){
            if (!options.let_autocomplete_mentions) {
                options.let_autocomplete_mentions = true;
                hello.option('autocomplete_mentions', 'true');
                hello.on('.autocomplete_mentions');
            } else {
                options.let_autocomplete_mentions = false;
                hello.option('autocomplete_mentions', 'false');
                hello.off('.autocomplete_mentions');
            }
        },
        mentionNotifications: function(){
            if (!options.let_mention_notifications) {
                this.isActiveTab = true;

                window.onfocus = function () {
                  hello.isActiveTab = true;
                };

                window.onblur = function () {
                  hello.isActiveTab = false;
                };

                if (!("Notification" in window)) {
                    alert("This browser does not support desktop notification");
                }
                else{
                    if (Notification.permission === "granted") {
                        Dubtrack.Events.bind("realtime:chat-message", this.notifyOnMention);
                        options.let_mention_notifications = true;
                        hello.option('mention_notifications', 'true');
                        hello.on('.mention_notifications');
                    }
                    else if (Notification.permission !== 'denied') {
                        var parent = this;
                        Notification.requestPermission(function (permission) {
                            if (permission === "granted") {
                                Dubtrack.Events.bind("realtime:chat-message", parent.notifyOnMention);
                                options.let_mention_notifications = true;
                                hello.option('mention_notifications', 'true');
                                hello.on('.mention_notifications');
                            }
                        });
                    }
                    else{
                        alert("You have chosen to block notifications. Reset this choice by clearing your cache for the site.");
                    }
                }
            } else {
                Dubtrack.Events.unbind("realtime:chat-message", this.notifyOnMention);
                options.let_mention_notifications = false;
                hello.option('mention_notifications', 'false');
                hello.off('.mention_notifications');
            }
        },
        notifyOnMention: function(e){
            var content = e.message;
            var user = Dubtrack.session.get('username').toLowerCase();
            var mentionTriggers = ['@'+user];

            if (options.let_custom_mentions && localStorage.getItem('custom_mentions')) {
                //add custom mention triggers to array
                mentionTriggers = mentionTriggers.concat(localStorage.getItem('custom_mentions').toLowerCase().split(','));
            }

            if (mentionTriggers.some(function(v) { return content.toLowerCase().indexOf(v.trim(' ')) >= 0; }) && !hello.isActiveTab && Dubtrack.session.id !== e.user.userInfo.userid) {
                var notificationOptions = {
                    body: content,
                    icon: "http://i.imgur.com/RXJnXNJ.png"
                };
                var n = new Notification("Message from "+e.user.username,notificationOptions);

                n.onclick = function(x) {
                    window.focus();
                    n.close();
                };

                setTimeout(n.close.bind(n), 5000);
            }
        },
        spacebar_mute: function() {
            if (!options.let_spacebar_mute) {
                options.let_spacebar_mute = true;
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
                $(document).unbind("keypress.key32");
                hello.option('spacebar_mute','false');
                hello.off('.spacebar_mute');
            }
        },
        filterUsers :function(str){
            var re = new RegExp('^@' + str, "i");
            return hello.roomUsers.filter(function(val){
                return re.test(val.text);
            });
        },
        updateUsersArray: function(){
            var self = hello;
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
            hello.whenAvailable("Dubtrack.room.users", hello.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-ban", hello.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-join", hello.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-kick", hello.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-leave", hello.updateUsersArray);
        }
    };
    //Ref 3:
    hello.initialize();
    hello.personalize();
    hello.previewListInit();
    hello.userAutoComplete();

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
    if (localStorage.getItem('warn_redirect') === 'true') {
        hello.warn_redirect();
    }
    if (localStorage.getItem('chat_window') === 'true') {
        hello.chat_window();
    }
    if (localStorage.getItem('hide_avatars') === 'true') {
        hello.hide_avatars();
    }
    if (localStorage.getItem('show_timestamps') === 'true') {
        hello.show_timestamps();
    }
    if (localStorage.getItem('video_window') === 'true') {
        hello.video_window();
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
    if (localStorage.getItem('autocomplete_mentions') === 'true') {
        hello.optionMentions();
    }
    if (localStorage.getItem('mention_notifications') === 'true') {
        hello.mentionNotifications();
    }
    if (localStorage.getItem('custom_mentions')) {
        hello.customMentions();
    }
    if (localStorage.getItem('spacebar_mute') === 'true') {
        hello.spacebar_mute();
    }
    for(var i = 0; i < hello.sectionList.length; i++){
        if (localStorage.getItem(hello.sectionList[i]) === 'false') {
            $('.'+hello.sectionList[i]).css('display', 'none');
            $('.'+hello.sectionList[i]).prev('li').find('i').removeClass('fi-minus').addClass('fi-plus');
            options[hello.sectionList[i]] = 'false';
        }
        else if(localStorage.getItem(hello.sectionList[i]) === undefined) {
            hello.option(hello.sectionList[i], 'true');
            options[hello.sectionList[i]] = 'true';
        }
        else {
            options[hello.sectionList[i]] = 'true';
        }
    }

    $('document').ready(hello.css_run);
    $('document').ready(hello.medium_load);

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

} else {
    function onErr(error) {
        var onErr = [
            '<link rel="stylesheet" type="text/css" href="https://rawgit.com/sinfulBA/DubX-Script/master/css/asset.css">',
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
    if (!Dubtrack.session.id) {
        onErr('You\'re not logged in. Please login to use DUBX.');
    } else if (ifUserBanned) {
        onErr('You\'ve been banned from using DUBX. If you believe this to be a mistake please contact us on Github');
    } else {
        onErr('Oh noes! We\'ve encountered a runtime error');
    };
    function closeErr() {
        $('.onErr').remove();
    };
    $('.cancel').click(closeErr);
    $('.confirm-err').click(closeErr);
};