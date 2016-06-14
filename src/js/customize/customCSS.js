dubx.css_modal = function() {
    var current = localStorage.getItem('css') || "";
    dubx.input('CSS',current,'https://example.com/example.css','confirm-for313','999');
    $('.confirm-for313').click(dubx.css_import);
};
dubx.css_import = function() {
    $('.css_import').remove();
    var css_to_import = $('.input').val();
    dubx.saveOption('css',css_to_import);
    if (css_to_import && css_to_import !== '') {
        $('head').append('<link class="css_import" href="'+css_to_import+'" rel="stylesheet" type="text/css">');
    }
    $('.onErr').remove();
};

dubx.css_run = function() {
    if (localStorage.getItem('css') !== null) {
        var css_to_load = localStorage.getItem('css');
        $('head').append('<link class="css_import" href="'+css_to_load+'" rel="stylesheet" type="text/css">');
    }
};