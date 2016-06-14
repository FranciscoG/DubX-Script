dubx.medium_modal = function() {
    dubx.input('Link an image file:','It is recommended a .jpg file is used','https://example.com/example.jpg','confirm-for314','999');
    $('.confirm-for314').click(dubx.medium_import);
};
dubx.medium_import = function() {
    var content = $('.input').val();
    localStorage.setItem('medium',content);
    $('.medium').remove();
    $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
    $('.onErr').remove();
};
dubx.medium_load = function() {
    if (localStorage.getItem('medium') !== null) {
        var content = localStorage.getItem('medium');
        $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
    }
};