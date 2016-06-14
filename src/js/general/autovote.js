dubx.advance_vote = function() {
    $('.dubup').click();
};

dubx.voteCheck = function (obj) {
    if (obj.startTime < 2) {
        dubx.advance_vote();
    }
};

dubx.autovote = function() {
  if (!dubx.options.let_autovote) {
      dubx.options.let_autovote = true;

      var song = Dubtrack.room.player.activeSong.get('song');
      var dubCookie = Dubtrack.helpers.cookie.get('dub-' + Dubtrack.room.model.get("_id"));
      var dubsong = Dubtrack.helpers.cookie.get('dub-song');

      if(!Dubtrack.room || !song || song.songid !== dubsong) {
          dubCookie = false;
      }

      //Only cast the vote if user hasn't already voted
      if(!$('.dubup, .dubdown').hasClass('voted') && !dubCookie) {
          dubx.advance_vote();
      }

      dubx.saveOption('autovote','true');
      dubx.on('.autovote');
      Dubtrack.Events.bind("realtime:room_playlist-update", dubx.voteCheck);
  } else {
      dubx.options.let_autovote = false;
      dubx.saveOption('autovote','false');
      dubx.off('.autovote');
      Dubtrack.Events.unbind("realtime:room_playlist-update", dubx.voteCheck);
  }
};