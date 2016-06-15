var dubx = {
  our_version : '03.05.00 - Dub Vote Info',
  srcRoot: 'https://rawgit.com/FranciscoG/DubX-Script/modularize',
  options : {
      let_autovote: false,
      let_split_chat: false,
      let_fs: false,
      let_medium_disable: false,
      let_warn_redirect: false,
      let_afk: false,
      let_active_afk: true,
      let_chat_window: false,
      let_css: false,
      let_hide_avatars: false,
      let_nicole: false,
      let_show_timestamps: false,
      let_video_window: false,
      let_twitch_emotes: false,
      let_emoji_preview: false,
      let_spacebar_mute: false,
      let_autocomplete_mentions: false,
      let_mention_notifications: false,
      let_downdub_chat_notifications: false,
      let_updub_chat_notifications: false,
      let_grab_chat_notifications: false,
      let_dubs_hover: false,
      let_custom_mentions: false,
      let_snow: false,
      draw_general: false,
      draw_userinterface: false,
      draw_settings: false,
      draw_customize: false,
      draw_contact: false,
      draw_social: false,
      draw_chrome: false
    },
    dubs : {
      upDubs: [],
      downDubs: [],
      grabs: []
    }
};

dubx.saveOption = function(selector,value) {
  localStorage.setItem(selector,value);

  // new options
  if ( /^draw/i.test(selector) ) {
    dubx.settings.menu[selector] = value;
  } else if (/(css|customAfkMessage)/i.test(selector)) {
    dubx.settings.custom[selector] = value;
  } else {
    dubx.settings.general[selector] = value;
  }
  localStorage.setItem( 'dubxUserSettings', JSON.stringify(dubx.settings) );
};


/**
 * TODO: go through all the files and replace .on and .off with the new toggleOption
 */

// deprecating these 2 eventually, for now they are pass-throughs
dubx.on = function(selector) {
  // $(selector + ' .for_content_off i').replaceWith('<i class="fi-check"></i>');
  dubx.toggleOption(selector, true);
};
dubx.off = function(selector) {
  // $(selector + ' .for_content_off i').replaceWith('<i class="fi-x"></i>');
  dubx.toggleOption(selector, false);
};

/**
 * Updates the on/off state of the option in the dubx menu
 * @param  {String} selector name of the selector to be updated
 * @param  {Bool} state      true to convert to checkmark, false to convert to an X
 * @return {undefined}         
 */
dubx.toggleOption = function(selector, state){
  var status = state ? "check" : "x";
  $(selector + ' .for_content_off i').replaceWith('<i class="fi-'+status+'"></i>');
};