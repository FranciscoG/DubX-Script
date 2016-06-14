dubx.video_window = function() {
    if(!dubx.options.let_video_window) {
        dubx.options.let_video_window = true;
        $('head').append('<link class="video_window_link" rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/video_window.css">');
        dubx.saveOption('video_window','true');
        dubx.on('.video_window');
    } else {
        dubx.options.let_video_window = false;
        $('.video_window_link').remove();
        dubx.saveOption('video_window','false');
        dubx.off('.video_window');
    }
};