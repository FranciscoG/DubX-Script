dubx.snooze_tooltip = function() {
    $('.snooze_btn').append('<div class="snooze_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">Mute current song</div>');
};

dubx.hide_snooze_tooltip = function() {
    $('.snooze_tooltip').remove();
};

dubx.snooze = function() {
    if (!dubx.eventUtils.snoozed && Dubtrack.room.player.player_volume_level > 2) {
        dubx.eventUtils.currentVol = Dubtrack.room.player.player_volume_level;
        Dubtrack.room.player.setVolume(0);
        dubx.eventUtils.snoozed = true;
        Dubtrack.Events.bind("realtime:room_playlist-update", dubx.eventSongAdvance);
    } else if (dubx.eventUtils.snoozed) {
        Dubtrack.room.player.setVolume(dubx.eventUtils.currentVol);
        dubx.eventUtils.snoozed = false;
    }
};

dubx.eventSongAdvance = function(e) {
    if (e.startTime < 2) {
        if (dubx.eventUtils.snoozed) {
            Dubtrack.room.player.setVolume(dubx.eventUtils.currentVol);
            dubx.eventUtils.snoozed = false;
        }
        return true;
    }
};

dubx.eventUtils = {
    currentVol: 50,
    snoozed: false
};