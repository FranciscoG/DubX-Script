
var hello_run;
if (!hello_run && Dubtrack.session.id) {
    hello_run = true;

   
    //Ref 2: Options
    var hello = {

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
