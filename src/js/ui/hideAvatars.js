dubx.hide_avatars = function() {
    if(!dubx.options.let_hide_avatars) {
        dubx.options.let_hide_avatars = true;
        $('head').append('<link class="hide_avatars_link" rel="stylesheet" type="text/css" href="'+dubx.srcRoot+'/css/options/hide_avatars.css">');
        dubx.saveOption('hide_avatars','true');
        dubx.on('.hide_avatars');
    } else {
        dubx.options.let_hide_avatars = false;
        $('.hide_avatars_link').remove();
        dubx.saveOption('hide_avatars','false');
        dubx.off('.hide_avatars');
    }
};