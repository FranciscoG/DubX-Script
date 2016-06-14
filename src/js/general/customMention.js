dubx.customMentions = function(e) {
    if(e && e.target && (e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil')) {return;}

    if (!dubx.options.let_custom_mentions) {
        dubx.options.let_custom_mentions = true;
        Dubtrack.Events.bind("realtime:chat-message", this.customMentionCheck);
        dubx.on('.custom_mentions');
    } else {
        dubx.options.let_custom_mentions = false;
        Dubtrack.Events.unbind("realtime:chat-message", this.customMentionCheck);
        dubx.off('.custom_mentions');
    }
};
dubx.customMentionCheck = function(e) {
    var content = e.message.toLowerCase();
    if (dubx.options.let_custom_mentions) {
        if (localStorage.getItem('custom_mentions')) {
            var customMentions = localStorage.getItem('custom_mentions').toLowerCase().split(',');
            if(Dubtrack.session.id !== e.user.userInfo.userid && customMentions.some(function(v) { return content.indexOf(v.trim(' ')) >= 0; })){
                Dubtrack.room.chat.mentionChatSound.play();
            }
        }
    }
};
dubx.createCustomMentions = function() {
    var current = localStorage.getItem('custom_mentions');
    dubx.input('Custom Mention Triggers (separate by comma)',current,'separate, custom triggers, by, comma, :heart:','confirm-for315','255');
    $('.confirm-for315').click(dubx.saveCustomMentions);
},
dubx.saveCustomMentions = function() {
    var customMentions = $('.input').val();
    dubx.saveOption('custom_mentions', customMentions);
    $('.onErr').remove();
};