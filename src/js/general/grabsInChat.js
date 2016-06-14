dubx.grabChat = function(){
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
};
dubx.grabChatWatcher = function(e){
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

};

dubx.resetGrabs = function(){
  dubx.dubs.grabs = []; //TODO: Remove when we can hit the api for all grabs of current playing song
};

dubx.grabInfoWarning = function(){
    if(!dubx.options.let_dubs_hover){
        dubx.input('Grab Vote Info', 'Please note that this feature is currently still in development. We are waiting on the ability to pull grab vote information from Dubtrack on load. Until then the only grabs you will be able to see are those you are present in the room for.', null, 'confirm-for-grab-info');
        $('.confirm-for-grab-info').click(dubx.closeErr);
    }
};