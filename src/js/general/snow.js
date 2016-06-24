var options = require('../utils/options.js');

/* global dubx  */
var snow = function() {
    var newOptionState;
    var optionName = 'autovote';

    if (!dubx.options.let_snow) {
        newOptionState = true;
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
        newOptionState= false;
        $(document).snowfall('clear');
    }

    dubx.options.let_snow = newOptionState;
    dubx.settings = options.toggleAndSave(optionName, newOptionState, dubx.settings);
};

module.exports = snow;