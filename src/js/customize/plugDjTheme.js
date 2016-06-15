dubx.nicole = function() {
    if (!dubx.options.let_nicole) {
        dubx.options.let_nicole = true;
        $('head').append('<link class="nicole_css" href="'+dubx.srcRoot+'/themes/PlugTheme.css" rel="stylesheet" type="text/css">');
        dubx.saveOption('nicole', 'true');
        dubx.on('.nicole');
    } else {
        dubx.options.let_nicole = false;
        $('.nicole_css').remove();
        dubx.saveOption('nicole','false');
        dubx.off('.nicole');
    }
};