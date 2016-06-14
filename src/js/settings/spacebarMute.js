dubx.spacebar_mute = function() {
    if (!dubx.options.let_spacebar_mute) {
        dubx.options.let_spacebar_mute = true;
        $(document).bind('keypress.key32', function() {
            var tag = event.target.tagName.toLowerCase();
            if (event.which === 32 && tag !== 'input' && tag !== 'textarea') {
                $('#main_player .player_sharing .player-controller-container .mute').click();
            }
        });
        dubx.saveOption('spacebar_mute', 'true');
        dubx.on('.spacebar_mute');
    } else {
        dubx.options.let_spacebar_mute = false;
        $(document).unbind("keypress.key32");
        dubx.saveOption('spacebar_mute','false');
        dubx.off('.spacebar_mute');
    }
};