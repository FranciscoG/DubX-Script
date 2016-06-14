dubx.medium_disable = function() {
    if (!dubx.options.let_medium_disable) {
        dubx.options.let_medium_disable = true;
        $('.backstretch').hide();
        $('.medium').hide();
        dubx.saveOption('medium_disable','true');
        dubx.on('.medium_disable');
    } else {
        dubx.options.let_medium_disable = false;
        $('.backstretch').show();
        $('.medium').show();
        dubx.saveOption('medium_disable','false');
        dubx.off('.medium_disable');
    }
};