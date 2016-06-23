var options = require('../utils/options.js');

/* global dubx, Dubtrack */
var advance_vote = function() {
    $('.dubup').click();
};

var voteCheck = function (obj) {
    if (obj.startTime < 2) {
        advance_vote();
    }
};

var autovote = function() {
  var newOptionState;
  var optionName = 'autovote';
  
  if (!dubx.options.let_autovote) {
      newOptionState = true;

      var song = Dubtrack.room.player.activeSong.get('song');
      var dubCookie = Dubtrack.helpers.cookie.get('dub-' + Dubtrack.room.model.get("_id"));
      var dubsong = Dubtrack.helpers.cookie.get('dub-song');

      if (!Dubtrack.room || !song || song.songid !== dubsong) {
          dubCookie = false;
      }
      //Only cast the vote if user hasn't already voted
      if (!$('.dubup, .dubdown').hasClass('voted') && !dubCookie) {
          advance_vote();
      }

      Dubtrack.Events.bind("realtime:room_playlist-update", voteCheck);
  } else {
      newOptionState = false;
      Dubtrack.Events.unbind("realtime:room_playlist-update", voteCheck);
  }

  dubx.options.let_snow = newOptionState;
  dubx.settings = options.toggleAndSave(optionName, newOptionState, dubx.settings);
};

module.exports = autovote;