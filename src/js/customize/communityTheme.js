dubx.css_for_the_world = function() {
    if (!dubx.options.let_css) {
        dubx.options.let_css = true;
        var location = Dubtrack.room.model.get('roomUrl');
        $.ajax({
            type: 'GET',
            url: 'https://api.dubtrack.fm/room/'+location,
        }).done(function(e) {
            var content = e.data.description;
            var url = content.match(/(@dubx=)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/);

            if(!url) return;

            var append = url[0].split('@dubx=');
            $('head').append('<link class="css_world" href="'+append[1]+'" rel="stylesheet" type="text/css">');
        });
        dubx.saveOption('css_world','true');
        dubx.on('.css');
    } else {
        dubx.options.let_css = false;
        $('.css_world').remove();
        dubx.saveOption('css_world','false');
        dubx.off('.css');
    }
};