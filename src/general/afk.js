dubx.afk_chat_respond = function(e) {
    var content = e.message;
    var user = Dubtrack.session.get('username');
    if (content.indexOf('@'+user) >-1 && Dubtrack.session.id !== e.user.userInfo.userid) {
        if (dubx.options.let_active_afk) {
            if (localStorage.getItem('customAfkMessage')) {
                var customAfkMessage = localStorage.getItem('customAfkMessage');
                $('#chat-txt-message').val('[AFK] '+customAfkMessage);
            } else {
                $('#chat-txt-message').val("[AFK] I'm not here right now.");
            }
            Dubtrack.room.chat.sendMessage();
            dubx.options.let_active_afk = false;
            setTimeout(function() {
                dubx.options.let_active_afk = true;
            }, 180000);
        }
    }
};

dubx.saveAfkMessage =function() {
    var customAfkMessage = $('.input').val();
    dubx.saveOption('customAfkMessage', customAfkMessage);
    $('.onErr').remove();
};

dubx.createAfkMessage =function() {
    var current = localStorage.getItem('customAfkMessage');
    dubx.input('Custom AFK Message',current,'I\'m not here right now.','confirm-for315','255');
    $('.confirm-for315').click(dubx.saveAfkMessage);
};

dubx.afk = function(e) {
    if(e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil') return;

    if (!dubx.options.let_afk) {
        dubx.options.let_afk = true;
        Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
        dubx.on('.afk');
    } else {
        dubx.options.let_afk = false;
        Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
        dubx.off('.afk');
    }
};