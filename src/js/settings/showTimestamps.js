dubx.show_timestamps = function() {
    if(!dubx.options.let_show_timestamps) {
        dubx.options.let_show_timestamps = true;
        $('head').append('<link class="show_timestamps_link" rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/show_timestamps.css">');
        dubx.saveOption('show_timestamps','true');
        dubx.on('.show_timestamps');
    } else {
        dubx.options.let_show_timestamps = false;
        $('.show_timestamps_link').remove();
        dubx.saveOption('show_timestamps','false');
        dubx.off('.show_timestamps');
    }
};