dubx.chat_window = function() {
    if(!dubx.options.let_chat_window) {
        dubx.options.let_chat_window = true;
        $('head').append('<link class="chat_window_link" rel="stylesheet" type="text/css" href="'+dubx.srcRoot+'/css/options/chat_window.css">');
        dubx.saveOption('chat_window','true');
        dubx.on('.chat_window');
    } else {
        dubx.options.let_chat_window = false;
        $('.chat_window_link').remove();
        dubx.saveOption('chat_window','false');
        dubx.off('.chat_window');
    }
};