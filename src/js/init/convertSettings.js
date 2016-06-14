/**
 * conver all the current individual saved settings to the new version
 *
 * Options will be saved as JSON made from the dubx.options object under one location
 */

dubx.oldSettings = {
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


dubx.convertSettings = function(){

  if ( localStorage.getItem( 'dubxUserSettings') !== null ) {
    return;
  }

  var newSettings = {
    general : {},
    menu : {},
    custom : {}
  };

  dubx.oldSettings.general.forEach(function(el,i,r){
    newSettings.general[el] = localStorage.getItem(el);
  });

  dubx.oldSettings.menu.forEach(function(el,i,r){
    newSettings.menu[el] = localStorage.getItem(el);
  });

  dubx.oldSettings.custom.forEach(function(el,i,r){
    newSettings.custom[el] = localStorage.getItem(el);
  });

  dubx.settings = newSettings;

  localStorage.setItem( 'dubxUserSettings', JSON.stringify(dubx.settings) );

};