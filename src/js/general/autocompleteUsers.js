dubx.filterUsers = function(str){
    var re = new RegExp('^@' + str, "i");
    return dubx.roomUsers.filter(function(val){
        return re.test(val.text);
    });
};
dubx.updateUsersArray =  function(){
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
};
dubx.userAutoComplete =  function(){
    //Remove keydown event chat view to replace with our event
    Dubtrack.room.chat.delegateEvents(_(Dubtrack.room.chat.events).omit('keydown input#chat-txt-message'));

    $(document.body).on('keyup', "#chat-txt-message", this.chatInputKeyupFunc);
    dubx.whenAvailable("Dubtrack.room.users", dubx.updateUsersArray);
    Dubtrack.Events.bind("realtime:user-ban", dubx.updateUsersArray);
    Dubtrack.Events.bind("realtime:user-join", dubx.updateUsersArray);
    Dubtrack.Events.bind("realtime:user-kick", dubx.updateUsersArray);
    Dubtrack.Events.bind("realtime:user-leave", dubx.updateUsersArray);
};