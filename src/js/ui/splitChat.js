dubx.split_chat = function() {
    if (!dubx.options.let_split_chat) {
        dubx.options.let_split_chat = true;
        $('.chat-main').addClass('splitChat');
        dubx.saveOption('split_chat', 'true');
        dubx.on('.split_chat');
    } else {
        dubx.options.let_split_chat = false;
        $('.chat-main').removeClass('splitChat');
        dubx.saveOption('split_chat','false');
        dubx.off('.split_chat');
    }
};