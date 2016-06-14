dubx.warn_redirect = function() {
    if(!dubx.options.let_warn_redirect) {
        dubx.options.let_warn_redirect = true;
        window.onbeforeunload = function(e) {
            return '';
        };
        dubx.saveOption('warn_redirect','true');
        dubx.on('.warn_redirect');
    } else {
        dubx.options.let_warn_redirect = false;
        window.onbeforeunload = null;
        dubx.saveOption('warn_redirect','false');
        dubx.off('.warn_redirect');
    }
};