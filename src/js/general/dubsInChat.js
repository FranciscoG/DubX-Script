dubx.downdubChat = function(){
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
};
dubx.downdubWatcher = function(e){
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

};
dubx.updubChat = function(){
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
};
dubx.updubWatcher = function(e){
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

};