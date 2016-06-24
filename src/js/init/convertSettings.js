/**
 * convert all the current individual saved settings to the new version
 *
 * Options will be saved as JSON made from the dubx.options object under one location
 */

var oldSettings = {
  general : [
    'autovote',
    'split_chat',
    'medium_disable',
    'warn_redirect',
    'chat_window',
    'hide_avatars',
    'show_timestamps',
    'video_window',
    'css_world',
    'nicole',
    'twitch_emotes',
    'emoji_preview',
    'autocomplete_mentions',
    'mention_notifications',
    'custom_mentions',
    'spacebar_mute',
    'downdub_chat',
    'updub_chat',
    'grab_chat',
    'dubs_hover',
    'snow'
  ],
  menu: [
    'draw_general',
    'draw_userinterface',
    'draw_settings',
    'draw_customize',
    'draw_contact',
    'draw_social',
    'draw_chrome',
  ],
  custom: [
    'css',
    'customAfkMessage'
  ]
};


var convertSettings = function(){

  if ( localStorage.getItem( 'dubxUserSettings') !== null ) {
    // new settings already exist, nothing do here, load old settings and return it
    return JSON.parse( localStorage.getItem( 'dubxUserSettings' ) );
  }

  var newSettings = {
    general : {},
    menu : {},
    custom : {}
  };

  oldSettings.general.forEach(function(el,i,r){
    newSettings.general[el] = localStorage.getItem(el);
  });

  oldSettings.menu.forEach(function(el,i,r){
    newSettings.menu[el] = localStorage.getItem(el);
  });

  oldSettings.custom.forEach(function(el,i,r){
    newSettings.custom[el] = localStorage.getItem(el);
  });

  localStorage.setItem( 'dubxUserSettings', JSON.stringify(newSettings) );
  return newSettings;
};

var delOldSettings = function(){

  oldSettings.general.forEach(function(el,i,r){
    localStorage.removeItem(el);
  });

  oldSettings.menu.forEach(function(el,i,r){
    localStorage.removeItem(el);
  });

  oldSettings.custom.forEach(function(el,i,r){
    localStorage.removeItem(el);
  });
};


module.exports = {
  convertSettings: convertSettings,
  delOldSettings: delOldSettings
};