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
*/ /* global Dubtrack, emojify */
var hello_run;
if (!hello_run && Dubtrack.session.id) {
    hello_run = true;
    var our_version = '03.05.00 - Dub Vote Info';

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
    };

    $('html').addClass('dubx');

    //Ref 1.1
    $('.player_sharing').append('<span class="icon-history eta_tooltip_t" onmouseover="hello.eta();" onmouseout="hello.hide_eta();"></span>');
    $('.player_sharing').append('<span class="icon-mute snooze_btn" onclick="hello.snooze();" onmouseover="hello.snooze_tooltip();" onmouseout="hello.hide_snooze_tooltip();"></span>');
    $('.icon-mute.snooze_btn:after').css({"content": "1", "vertical-align": "top", "font-size": "0.75rem", "font-weight": "700"});

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
                '<div class="for_content" style="display:none;">',
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
                            '<li onclick="hello.grabInfoWarning(); hello.showDubsOnHover();" class="for_content_li for_content_feature dubs_hover">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Show Dub info on Hover</p>',
                            '</li>',
                            '<li onclick="hello.downdubChat();" class="for_content_li for_content_feature downdub_chat">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Downdubs in Chat (Mod Only)</p>',
                            '</li>',
                            '<li onclick="hello.updubChat();" class="for_content_li for_content_feature updub_chat">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Updubs in Chat</p>',
                            '</li>',
                            '<li onclick="hello.grabChat();" class="for_content_li for_content_feature grab_chat">',
                                '<p class="for_content_off"><i class="fi-x"></i></p>',
                                '<p class="for_content_p">Grabs in Chat</p>',
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
            $('.for_content').perfectScrollbar();
            $.getScript('https://rawgit.com/loktar00/JQuery-Snowfall/master/src/snowfall.jquery.js');

            hello.dubs = {
                upDubs: [],
                downDubs: [],
                grabs: []
            };
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
                            '<div class="cancel" onclick="hello.closeErr();">',
                                '<p>Cancel</p>',
                            '</div>',
                            confirmButton,
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
        voteCheck: function (obj) {
            if (obj.startTime < 2) {
                hello.advance_vote();
            }
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

                if(!Dubtrack.room || !song || song.songid !== dubsong) {
                    dubCookie = false;
                }

                //Only cast the vote if user hasn't already voted
                if(!$('.dubup, .dubdown').hasClass('voted') && !dubCookie) {
                    hello.advance_vote();
                }

                hello.option('autovote','true');
                hello.on('.autovote');
                Dubtrack.Events.bind("realtime:room_playlist-update", hello.voteCheck);
            } else {
                options.let_autovote = false;
                hello.option('autovote','false');
                hello.off('.autovote');
                Dubtrack.Events.unbind("realtime:room_playlist-update", hello.voteCheck);
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
            var id = Dubtrack.session.get("_id");
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
                    }, 180000);
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
            var current = localStorage.getItem('css') || "";
            hello.input('CSS',current,'https://example.com/example.css','confirm-for313','999');
            $('.confirm-for313').click(hello.css_import);
        },
        css_import: function() {
            $('.css_import').remove();
            var css_to_import = $('.input').val();
            hello.option('css',css_to_import);
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
            template: function(id) { return hello.tasty.emotes[id].url; },
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
            console.log('Dubx','tasty','loading from api');
            // since we control this API we should always have it load from remote
            var tastyApi = new self.getJSON(hello.gitRoot + '/emotes/tastyemotes.json', 'tasty:loaded');
            tastyApi.done(function(data){
                localStorage.setItem('tasty_api', data);
                self.processTastyEmotes(JSON.parse(data));
            });
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
        /**************************************************************************
         * Turn on/off the twitch emoji in chat
         */
        optionTwitchEmotes: function(){
            document.body.addEventListener('twitch:loaded', this.loadBTTVEmotes);
            document.body.addEventListener('bttv:loaded', this.loadTastyEmotes);
            
            if (!options.let_twitch_emotes) {
                if (!hello.twitchJSONSLoaded) {
                    hello.loadTwitchEmotes();
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
        },
        displayBoxIndex : -1,
        doNavigate : function(diff) {
            var self = hello;
            self.displayBoxIndex += diff;
            var oBoxCollection = $(".ac-show li");
            
            // remove "press enter to select" span
            $('.ac-list-press-enter').remove();

            if (self.displayBoxIndex >= oBoxCollection.length){
                hello.displayBoxIndex = 0;
            }
            if (self.displayBoxIndex < 0){
                 self.displayBoxIndex = oBoxCollection.length - 1;
             }
            var cssClass = "selected";
            var enterToSelectSpan = '<span class="ac-list-press-enter">press enter to select</span>';
            oBoxCollection.removeClass(cssClass).eq(self.displayBoxIndex).addClass(cssClass).append(enterToSelectSpan).focus();
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
                    var new_text = $('#autocomplete-preview li.selected').find('.ac-text')[0].textContent;
                    hello.updateChatInput(new_text);
                    break;
                default:
                    $("#chat-txt-message").focus();
                    break;
            }
        },
        previewListInit: function(){
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
            var cursorPos = $(this).get(0).selectionStart;
            // console.log("cursorPos", cursorPos);
            var strStart;
            var strEnd;
            var inputRegex = new RegExp('(:|@)([&!()\\+\\-_a-z0-9]+)($|\\s)', 'ig');
            var filterText = currentText.replace(inputRegex, function(matched, p1, p2, p3, pos, str){
                // console.dir( arguments );
                strStart = pos;
                strEnd = pos + matched.length;

                hello.previewSearchStr = p2;
                keyCharMin = (p1 === "@") ? 1 : 3;

                if (cursorPos >= strStart && cursorPos <= strEnd) {
                    // twitch and emoji
                    if (p2 && p2.length >= keyCharMin && p1 === ":" && options.let_emoji_preview) {
                        self.emojiUtils.addToPreviewList( self.emojiUtils.filterEmoji(p2) );
                    }

                    // users
                    if (p2 && p2.length >= keyCharMin && p1 === "@" && options.let_autocomplete_mentions) {
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
                hello.updateChatInput(new_text);
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
            var self = this;

            function startNotifications(permission) {
                if (permission === "granted") {
                    Dubtrack.Events.bind("realtime:chat-message", self.notifyOnMention);
                    options.let_mention_notifications = true;
                    hello.option('mention_notifications', 'true');
                    hello.on('.mention_notifications');
                }
            }

            if (!options.let_mention_notifications) {
                this.isActiveTab = true;

                window.onfocus = function () {
                  hello.isActiveTab = true;
                };

                window.onblur = function () {
                  hello.isActiveTab = false;
                };

                if (!("Notification" in window)) {
                    hello.input("Mention Notifications", "Sorry this browser does not support desktop notifications.  Please use the latest version of Chrome or FireFox");
                } else {
                    if (Notification.permission === "granted") {
                        startNotifications("granted");
                    } else if (Notification.permission !== 'denied') {
                        Notification.requestPermission(startNotifications);
                    } else {
                        hello.input("Mention Notifications", "You have chosen to block notifications. Reset this choice by clearing your cache for the site.");
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

        dubinfoInit: function(){
            $('head').prepend('<link rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/options/dubinfo.css">');
        },
        downdubChat: function(){
            if(!options.let_downdub_chat_notifications){
                options.let_downdub_chat_notifications = true;
                hello.option('downdub_chat', 'true');
                hello.on('.downdub_chat');

                if(!hello.userIsAtLeastMod(Dubtrack.session.id)) return;

                Dubtrack.Events.bind("realtime:room_playlist-dub", this.downdubWatcher);
            }
            else{
                options.let_downdub_chat_notifications = false;
                hello.option('downdub_chat', 'false');
                hello.off('.downdub_chat');

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
                        '<div class="chatDelete" onclick="hello.deleteChatMessageClientSide(this)"><span class="icon-close"></span></div>' +
                        '<div class="text">' +
                            '@' + e.user.username + ' has downdubbed your song \'' + Dubtrack.room.player.activeSong.attributes.songInfo.name + ' \'' +
                        '</div>' +
                    '</li>');
            }

        },
        updubChat: function(){
            if(!options.let_updub_chat_notifications){
                options.let_updub_chat_notifications = true;
                hello.option('updub_chat', 'true');
                hello.on('.updub_chat');

                Dubtrack.Events.bind("realtime:room_playlist-dub", this.updubWatcher);
            }
            else{
                options.let_updub_chat_notifications = false;
                hello.option('updub_chat', 'false');
                hello.off('.updub_chat');

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
                        '<div class="chatDelete" onclick="hello.deleteChatMessageClientSide(this)"><span class="icon-close"></span></div>' +
                        '<div class="text">' +
                            '@' + e.user.username + ' has updubbed your song \'' + Dubtrack.room.player.activeSong.attributes.songInfo.name + ' \'' +
                        '</div>' +
                    '</li>');
            }

        },
        grabChat: function(){
            if(!options.let_grab_chat_notifications){
                options.let_grab_chat_notifications = true;
                hello.option('grab_chat', 'true');
                hello.on('.grab_chat');

                Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabChatWatcher);
            }
            else{
                options.let_grab_chat_notifications = false;
                hello.option('grab_chat', 'false');
                hello.off('.grab_chat');

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
                        '<div class="chatDelete" onclick="hello.deleteChatMessageClientSide(this)"><span class="icon-close"></span></div>' +
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
            hello.dubs.grabs = []; //TODO: Remove when we can hit the api for all grabs of current playing song
        },
        resetDubs: function(){
            hello.dubs.upDubs = [];
            hello.dubs.downDubs = [];
            // hello.dubs.grabs: [] //TODO: Uncomment this when we can hit the api for all grabs of current playing song

            $.getJSON("https://api.dubtrack.fm/room/" + Dubtrack.room.model.id + "/playlist/active/dubs", function(response){
                response.data.upDubs.forEach(function(e){
                    //Dub already casted (usually from autodub)
                    if($.grep(hello.dubs.upDubs, function(el){ return el.userid == e.userid; }).length > 0){
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

                    hello.dubs.upDubs.push({
                        userid: e.userid,
                        username: username
                    })
                });
                //TODO: Uncomment this when we can hit the api for all grabs of current playing song
                /*response.data.grabs.forEach(function(e){
                    //Dub already casted (usually from autodub)
                    if($.grep(hello.dubs.grabs, function(el){ return el.userid == e.userid; }).length > 0){
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

                    hello.dubs.grabs.push({
                        userid: e.userid,
                        username: username
                    })
                });*/

                //Only let mods or higher access down dubs
                if(hello.userIsAtLeastMod(Dubtrack.session.id)){
                    response.data.downDubs.forEach(function(e){
                        //Dub already casted
                        if($.grep(hello.dubs.downDubs, function(el){ return el.userid == e.userid; }).length > 0){
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

                        hello.dubs.downDubs.push({
                            userid: e.userid,
                            username: Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username
                        })
                    });
                }
            });
        },
        grabInfoWarning: function(){
            if(!options.let_dubs_hover){
                hello.input('Grab Vote Info', 'Please note that this feature is currently still in development. We are waiting on the ability to pull grab vote information from Dubtrack on load. Until then the only grabs you will be able to see are those you are present in the room for.', null, 'confirm-for-grab-info');
                $('.confirm-for-grab-info').click(hello.closeErr);
            }
        },
        showDubsOnHover: function(){
            if(!options.let_dubs_hover){
                options.let_dubs_hover = true;
                hello.option('dubs_hover', 'true');
                hello.on('.dubs_hover');

                 // clear, start over
                this.resetDubs();

                Dubtrack.Events.bind("realtime:room_playlist-dub", this.dubWatcher);
                Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
                Dubtrack.Events.bind("realtime:user-leave", this.dubUserLeaveWatcher);
                Dubtrack.Events.bind("realtime:room_playlist-update", hello.resetDubs);
                Dubtrack.Events.bind("realtime:room_playlist-update", hello.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song

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

                    if(hello.dubs.upDubs.length > 0){
                        html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-updubs-hover" style="border-color: '+dubupBackground+'">';
                        hello.dubs.upDubs.forEach(function(val){
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
                        hello.updateChatInputWithString(new_text);
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

                    if(hello.userIsAtLeastMod(Dubtrack.session.id)){
                        if(hello.dubs.downDubs.length > 0){
                            html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover" style="border-color: '+dubdownBackground+'">';
                            hello.dubs.downDubs.forEach(function(val){
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
                        hello.updateChatInputWithString(new_text);
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

                    if(hello.dubs.grabs.length > 0){
                        html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-grabs-hover" style="border-color: '+grabsBackground+'">';
                        hello.dubs.grabs.forEach(function(val){
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
                        hello.updateChatInputWithString(new_text);
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
                options.let_dubs_hover = false;
                hello.option('dubs_hover', 'false');
                hello.off('.dubs_hover');
                Dubtrack.Events.unbind("realtime:room_playlist-dub", this.dubWatcher);
                Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
                Dubtrack.Events.unbind("realtime:user-leave", this.dubUserLeaveWatcher);
                Dubtrack.Events.unbind("realtime:room_playlist-update", hello.resetDubs);
                Dubtrack.Events.unbind("realtime:room_playlist-update", hello.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song
            }
        },
        dubUserLeaveWatcher: function(e){
            //Remove user from dub list
            if($.grep(hello.dubs.upDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                $.each(hello.dubs.upDubs, function(i){
                    if(hello.dubs.upDubs[i].userid === e.user._id) {
                        hello.dubs.upDubs.splice(i,1);
                        return false;
                    }
                });
            }
            if($.grep(hello.dubs.downDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                $.each(hello.dubs.downDubs, function(i){
                    if(hello.dubs.downDubs[i].userid === e.user._id) {
                        hello.dubs.downDubs.splice(i,1);
                        return false;
                    }
                });
            }
            if($.grep(hello.dubs.grabs, function(el){ return el.userid == e.user._id; }).length > 0){
                $.each(hello.dubs.grabs, function(i){
                    if(hello.dubs.grabs[i].userid === e.user._id) {
                        hello.dubs.grabs.splice(i,1);
                        return false;
                    }
                });
            }
        },
        grabWatcher: function(e){
            //If grab already casted
            if($.grep(hello.dubs.grabs, function(el){ return el.userid == e.user._id; }).length <= 0){
                hello.dubs.grabs.push({
                    userid: e.user._id,
                    username: e.user.username
                });
            }
        },
        dubWatcher: function(e){
            if(e.dubtype === 'updub'){
                //If dub already casted
                if($.grep(hello.dubs.upDubs, function(el){ return el.userid == e.user._id; }).length <= 0){
                    hello.dubs.upDubs.push({
                        userid: e.user._id,
                        username: e.user.username
                    });
                }

                //Remove user from other dubtype if exists
                if($.grep(hello.dubs.downDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                    $.each(hello.dubs.downDubs, function(i){
                        if(hello.dubs.downDubs[i].userid === e.user._id) {
                            hello.dubs.downDubs.splice(i,1);
                            return false;
                        }
                    });
                }
            }
            else if(e.dubtype === 'downdub'){
                //If dub already casted
                if($.grep(hello.dubs.downDubs, function(el){ return el.userid == e.user._id; }).length <= 0 && hello.userIsAtLeastMod(Dubtrack.session.id)){
                    hello.dubs.downDubs.push({
                        userid: e.user._id,
                        username: e.user.username
                    });
                }

                //Remove user from other dubtype if exists
                if($.grep(hello.dubs.upDubs, function(el){ return el.userid == e.user._id; }).length > 0){
                    $.each(hello.dubs.upDubs, function(i){
                        if(hello.dubs.upDubs[i].userid === e.user._id) {
                            hello.dubs.upDubs.splice(i,1);
                            return false;
                        }
                    });
                }
            }

            var msSinceSongStart = new Date() - new Date(Dubtrack.room.player.activeSong.attributes.song.played);
            if(msSinceSongStart < 1000) return;

            if(hello.dubs.upDubs.length !== Dubtrack.room.player.activeSong.attributes.song.updubs){
                // console.log("Updubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
                hello.resetDubs();
            }
            else if(hello.userIsAtLeastMod(Dubtrack.session.id) && hello.dubs.downDubs.length !== Dubtrack.room.player.activeSong.attributes.song.downdubs){
                // console.log("Downdubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
                hello.resetDubs();
            }
            // TODO: Uncomment this else if block when we can hit the api for all grabs of current playing song
            /*
            else if(hello.dubs.grabs.length !== parseInt($('.grab-counter')[0].innerHTML)){
                console.log("Grabs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
                hello.resetDubs();
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
            if (!options.let_spacebar_mute) {
                options.let_spacebar_mute = true;
                $(document).bind('keypress.key32', function() {
                    var tag = event.target.tagName.toLowerCase();
                    if (event.which === 32 && tag !== 'input' && tag !== 'textarea') {
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
        },
        snooze: function() {
            if (!hello.eventUtils.snoozed && Dubtrack.room.player.player_volume_level > 2) {
                hello.eventUtils.currentVol = Dubtrack.room.player.player_volume_level;
                Dubtrack.room.player.setVolume(0);
                hello.eventUtils.snoozed = true;
                Dubtrack.Events.bind("realtime:room_playlist-update", hello.eventSongAdvance);
            } else if (hello.eventUtils.snoozed) {
                Dubtrack.room.player.setVolume(hello.eventUtils.currentVol);
                hello.eventUtils.snoozed = false;
            }
        },
        eventSongAdvance: function(e) {
            if (e.startTime < 2) {
                if (hello.eventUtils.snoozed) {
                    Dubtrack.room.player.setVolume(hello.eventUtils.currentVol);
                    hello.eventUtils.snoozed = false;
                }
                return true;
            }
        },
        eventUtils: {
            currentVol: 50,
            snoozed: false
        }
    };
    //Ref 3:
    hello.initialize();
    hello.personalize();
    hello.previewListInit();
    hello.userAutoComplete();
    hello.dubinfoInit();

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
    if (localStorage.getItem('downdub_chat') === 'true') {
        hello.downdubChat();
    }
    if (localStorage.getItem('updub_chat') === 'true') {
        hello.updubChat();
    }
    if (localStorage.getItem('grab_chat') === 'true') {
        hello.grabChat();
    }
    if (localStorage.getItem('dubs_hover') === 'true') {
        hello.showDubsOnHover();
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
            '<link rel="stylesheet" type="text/css" href="'+hello.gitRoot+'/css/asset.css">',
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
    } else {
        onErr('Oh noes! We\'ve encountered a runtime error');
    };
    function closeErr() {
        $('.onErr').remove();
    };
    $('.cancel').click(closeErr);
    $('.confirm-err').click(closeErr);
}
