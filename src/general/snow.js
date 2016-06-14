dubx.snow = function() {
    if (!dubx.options.let_snow) {
        dubx.options.let_snow = true;
        dubx.saveOption('snow','true');
        dubx.on('.snow');
        $(document).snowfall({
            round: true,
            shadow: true,
            flakeCount: 50,
            minSize: 1,
            maxSize: 5,
            minSpeed: 5,
            maxSpeed: 5
        });
    } else {
        dubx.options.let_snow = false;
        dubx.saveOption('snow','false');
        dubx.off('.snow');
        $(document).snowfall('clear');
    }
};