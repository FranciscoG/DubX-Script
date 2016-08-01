(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
    THE Q PUBLIC LICENSE version 1.0
    Copyright (C) 1999-2005 Trolltech AS, Norway.
    Everyone is permitted to copy and distribute this license document.
    The intent of this license is to establish freedom to share and change the software regulated by this license under the open source model.
    This license applies to any software containing a notice placed by the copyright holder saying that it may be distributed under the terms of the Q Public License version 1.0. Such software is herein referred to as the Software. This license covers modification and distribution of the Software, use of third-party application programs based on the Software, and development of free software which uses the Software.
    Granted Rights
    1. You are granted the non-exclusive rights set forth in this license provided you agree to and comply with any and all conditions in this license. Whole or partial distribution of the Software, or software items that link with the Software, in any form signifies acceptance of this license.
    2. You may copy and distribute the Software in unmodified form provided that the entire package, including - but not restricted to - copyright, trademark notices and disclaimers, as released by the initial developer of the Software, is distributed.
    3. You may make modifications to the Software and distribute your modifications, in a form that is separate from the Software, such as patches. The following restrictions apply to modifications:
    a. Modifications must not alter or remove any copyright notices in the Software.
    b. When modifications to the Software are released under this license, a non-exclusive royalty-free right is granted to the initial developer of the Software to distribute your modification in future versions of the Software provided such versions remain available under these terms in addition to any other license(s) of the initial developer.
    4. You may distribute machine-executable forms of the Software or machine-executable forms of modified versions of the Software, provided that you meet these restrictions:
    a. You must include this license document in the distribution.
    b. You must ensure that all recipients of the machine-executable forms are also able to receive the complete machine-readable source code to the distributed Software, including all modifications, without any charge beyond the costs of data transfer, and place prominent notices in the distribution explaining this.
    c. You must ensure that all modifications included in the machine-executable forms are available under the terms of this license.
    5. You may use the original or modified versions of the Software to compile, link and run application programs legally developed by you or by others.
    6. You may develop application programs, reusable components and other software items that link with the original or modified versions of the Software. These items, when distributed, are subject to the following requirements:
    a. You must ensure that all recipients of machine-executable forms of these items are also able to receive and use the complete machine-readable source code to the items without any charge beyond the costs of data transfer.
    b. You must explicitly license all recipients of your items to use and re-distribute original and modified versions of the items in both machine-executable and source code forms. The recipients must be able to do so without any charges whatsoever, and they must be able to re-distribute to anyone they choose.
    c. If the items are not available to the general public, and the initial developer of the Software requests a copy of the items, then you must supply one.
    Limitations of Liability
    In no event shall the initial developers or copyright holders be liable for any damages whatsoever, including - but not restricted to - lost revenue or profits or other direct, indirect, special, incidental or consequential damages, even if they have been advised of the possibility of such damages, except to the extent invariable law, if any, provides otherwise.
    No Warranty
    The Software and this license document are provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
    Choice of Law
    This license is governed by the Laws of Norway. Disputes shall be settled by Oslo City Court.
*/

var modal = require('./utils/modal.js');
var init = require('./lib/init.js');
var css = require('./utils/css.js');

/* global Dubtrack, dubxLoaded */
window.dubxLoaded = false;
if (!dubxLoaded && Dubtrack.session.id) {
    window.dubxLoaded = true;

    init();

} else {
    css.load(null, '/css/asset.css');
    var errorMsg;
    if (!Dubtrack.session.id) {
        errorMsg = 'You\'re not logged in. Please login to use DUBX.';
    } else {
        errorMsg = 'Oh noes! We\'ve encountered a runtime error';
    }
    modal.create({
        title: 'Oh noes:',
        content: errorMsg,
        confirmButtonClass: 'confirm-err'
    });
}
},{"./lib/init.js":4,"./utils/css.js":29,"./utils/modal.js":31}],2:[function(require,module,exports){
/* global Dubtrack, emojify */

var getJSON = require('../utils/getJSON.js');
var settings = require("../lib/settings.js");

var prepEmoji = {};

prepEmoji.emoji = {
    template: function(id) { return emojify.defaultConfig.img_dir+'/'+encodeURI(id)+'.png'; },
};
prepEmoji.twitch = {
    template: function(id) { return "//static-cdn.jtvnw.net/emoticons/v1/" + id + "/3.0"; },
    specialEmotes: [],
    emotes: {},
    chatRegex : new RegExp(":([-_a-z0-9]+):", "ig")
};
prepEmoji.bttv = {
    template: function(id) { return  "//cdn.betterttv.net/emote/" + id + "/3x";  },
    emotes: {},
    chatRegex : new RegExp(":([&!()\\-_a-z0-9]+):", "ig")
};
prepEmoji.tasty = {
    template: function(id) { return this.emotes[id].url; },
    emotes: {}
};
prepEmoji.shouldUpdateAPIs = function(apiName){
    var day = 86400000; // milliseconds in a day

    var today = Date.now();
    var lastSaved = parseInt(localStorage.getItem(apiName+'_api_timestamp'));
    // Is the lastsaved not a number for some strange reason, then we should update
    // are we past 5 days from last update? then we should update
    // does the data not exist in localStorage, then we should update
    return isNaN(lastSaved) || today - lastSaved > day * 5 || !localStorage[apiName +'_api'];
};
/**************************************************************************
 * Loads the twitch emotes from the api.
 * http://api.twitch.tv/kraken/chat/emoticon_images
 */
prepEmoji.loadTwitchEmotes = function(){
    var self = this;
    var savedData;
    // if it doesn't exist in localStorage or it's older than 5 days
    // grab it from the twitch API
    if (self.shouldUpdateAPIs('twitch')) {
        console.log('Dubx','twitch','loading from api');
        var twApi = new getJSON('//api.twitch.tv/kraken/chat/emoticon_images', 'twitch:loaded');
        twApi.done(function(data){
            localStorage.setItem('twitch_api_timestamp', Date.now().toString());
            localStorage.setItem('twitch_api', data);
            self.processTwitchEmotes(JSON.parse(data));
        });
    } else {
        console.log('Dubx','twitch','loading from localstorage');
        savedData = JSON.parse(localStorage.getItem('twitch_api'));
        self.processTwitchEmotes(savedData);
        savedData = null; // clear the var from memory
        var twEvent = new Event('twitch:loaded');
        document.body.dispatchEvent(twEvent);
    }

};

prepEmoji.loadBTTVEmotes = function(){
    var self = this;
    var savedData;
    // if it doesn't exist in localStorage or it's older than 5 days
    // grab it from the bttv API
    if (self.shouldUpdateAPIs('bttv')) {
        console.log('Dubx','bttv','loading from api');
        var bttvApi = new getJSON('//api.betterttv.net/2/emotes', 'bttv:loaded');
        bttvApi.done(function(data){
            localStorage.setItem('bttv_api_timestamp', Date.now().toString());
            localStorage.setItem('bttv_api', data);
            self.processBTTVEmotes(JSON.parse(data));
        });
    } else {
        console.log('Dubx','bttv','loading from localstorage');
        savedData = JSON.parse(localStorage.getItem('bttv_api'));
        self.processBTTVEmotes(savedData);
        savedData = null; // clear the var from memory
        var twEvent = new Event('bttv:loaded');
        document.body.dispatchEvent(twEvent);
    }

};

prepEmoji.loadTastyEmotes = function(){
    var self = this;
    var savedData;
    console.log('Dubx','tasty','loading from api');
    // since we control this API we should always have it load from remote
    var tastyApi = new getJSON(settings.srcRoot + '/emotes/tastyemotes.json', 'tasty:loaded');
    tastyApi.done(function(data){
        localStorage.setItem('tasty_api', data);
        self.processTastyEmotes(JSON.parse(data));
    });
};

prepEmoji.processTwitchEmotes = function(data) {
    var self = this;
    data.emoticons.forEach(function(el,i,arr){
        var _key = el.code.toLowerCase();

        // move twitch non-named emojis to their own array
        if (el.code.indexOf('\\') >= 0) {
            self.twitch.specialEmotes.push([el.code, el.id]);
            return;
        }

        if (emojify.emojiNames.indexOf(_key) >= 0) {
            return; // do nothing so we don't override emoji
        }

        if (!self.twitch.emotes[_key]){
            // if emote doesn't exist, add it
            self.twitch.emotes[_key] = el.id;
        } else if (el.emoticon_set === null) {
            // override if it's a global emote (null set = global emote)
            self.twitch.emotes[_key] = el.id;
        }

    });
    self.twitchJSONSLoaded = true;
    self.emojiEmotes = emojify.emojiNames.concat(Object.keys(self.twitch.emotes));
};

prepEmoji.processBTTVEmotes = function(data){
    var self = this;
    data.emotes.forEach(function(el,i,arr){
        var _key = el.code.toLowerCase();

        if (el.code.indexOf(':') >= 0) {
            return; // don't want any emotes with smileys and stuff
        }

        if (emojify.emojiNames.indexOf(_key) >= 0) {
            return; // do nothing so we don't override emoji
        }

        if (el.code.indexOf('(') >= 0) {
            _key = _key.replace(/([()])/g, "");
        }

        self.bttv.emotes[_key] = el.id;

    });
    self.bttvJSONSLoaded = true;
    self.emojiEmotes = self.emojiEmotes.concat(Object.keys(self.bttv.emotes));
};

prepEmoji.processTastyEmotes = function(data) {
    var self = this;
    self.tasty.emotes = data.emotes;
    self.tastyJSONLoaded = true;
    self.emojiEmotes = self.emojiEmotes.concat(Object.keys(self.tasty.emotes));
};

module.exports = prepEmoji;
},{"../lib/settings.js":7,"../utils/getJSON.js":30}],3:[function(require,module,exports){
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
    'snow',
    'medium'
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
    options : {},
    menu : {},
    custom : {}
  };

  oldSettings.general.forEach(function(el,i,r){
    newSettings.options[el] = localStorage.getItem(el);
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
  go: convertSettings,
  delOldSettings: delOldSettings
};
},{}],4:[function(require,module,exports){
/* global Dubtrack */
var convertSettings = require('./convertSettings.js');
var modules = require('./loadModules.js');
var modal = require('../utils/modal.js');
var css = require('../utils/css.js');
var menu = require('./menu.js');

/*
  The following are elements that are always done on load
*/

module.exports = function(){
  $('.isUser').text(Dubtrack.session.get('username'));

  css.load(null, '/css/options/dubinfo.css');

  convertSettings.go();
  convertSettings.delOldSettings();

  $('html').addClass('dubx');

  $.getScript('https://rawgit.com/loktar00/JQuery-Snowfall/master/src/snowfall.jquery.js');

  $('.icon-mute.snooze_btn:after').css({"content": "1", "vertical-align": "top", "font-size": "0.75rem", "font-weight": "700"});

  // click event on the dubx icon in the upper right which shows the whole menu
  $('.for').click(function() {
      $('.for_content').show();
  });

  // make menu before loading the modules
  menu.makeMenu();

  modules.loadAllModulesTo('dubx');

  // dubx.previewListInit();

  // dubx.userAutoComplete();

  // Ref 5:
  $('.chat-main').on('DOMNodeInserted', function(e) {
      var itemEl = $(e.target);
      if(itemEl.prop('tagName').toLowerCase() !== 'li' || itemEl.attr('class').substring(0, 'user-'.length) !== 'user-') return;
      var user = Dubtrack.room.users.collection.findWhere({userid: itemEl.attr('class').split(/-| /)[1]});
      var role = !user.get('roleid') ? 'default' : Dubtrack.helpers.isDubtrackAdmin(user.get('userid')) ? 'admin' : user.get('roleid').type;
      itemEl.addClass('is' + (role.charAt(0).toUpperCase() + role.slice(1)));
  });

};
},{"../utils/css.js":29,"../utils/modal.js":31,"./convertSettings.js":3,"./loadModules.js":5,"./menu.js":6}],5:[function(require,module,exports){
var options = require('../utils/options.js');
var menu = require('../lib/menu.js');
var modules = require('../modules/index.js');
var storedSettings = options.getAllOptions();

/**
 * Loads all the modules in /modules and initliazes them
 * @param  {Object} globalObject The target global object that modules will be added to.  In our case it will be window.dubx
 */
var loadAllModulesTo = function(globalObject){
    if (typeof window[globalObject] === "undefined") {
        window[globalObject] = {};
    }

    modules.forEach(function(mod, i, r){
        globalObject[mod.id] = mod;
        globalObject[mod.id].toggleAndSave = options.toggleAndSave;
        
        // add event listener
        if (mod.go){
          $('body').on('click', '#'+mod.id, mod.go.bind(mod) );
        }

        // if module has a definied init function, run that first
        if (mod.init) { 
          mod.init.bind(mod); 
        }

        // add the menu item to the appropriate category section
        if (mod.menuHTML && mod.category) {
          menu.appendToSection(mod.category, mod.menuHTML.bind(mod) );
        }

        // check localStorage for saved settings and update modules optionState
        if (typeof storedSettings.options[mod.id] !== 'undefined') {
          mod.optionState = storedSettings.options[mod.id];

          // run module's go function if setting was true
          if ( storedSettings.options[mod.id] === 'true' && mod.go ) {
          mod.go.bind(mod);
          }
        }
    
    });

};

module.exports = loadAllModulesTo;
},{"../lib/menu.js":6,"../modules/index.js":21,"../utils/options.js":32}],6:[function(require,module,exports){
var OLDmenu = {
  general: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'General',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_general">',
          '<li onclick="dubx.snow();" class="for_content_li for_content_feature snow">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Snow</p>',
          '</li>',
          '<li onclick="dubx.autovote();" class="for_content_li for_content_feature autovote">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Autovote</p>',
          '</li>',
          '<li onclick="dubx.afk(event);" class="for_content_li for_content_feature afk">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p onclick="dubx.createAfkMessage();" class="for_content_edit" style="display: inline-block;color: #878c8e;font-size: .85rem;font-weight: bold;float: right;"><i class="fi-pencil"></i></p>',
              '<p class="for_content_p">AFK Autorespond</p>',
          '</li>',
          '<li onclick="dubx.twitch_emotes();" class="for_content_li for_content_feature twitch_emotes">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Emotes</p>',
          '</li>',
          '<li onclick="dubx.emoji_preview();" class="for_content_li for_content_feature emoji_preview">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Autocomplete Emoji</p>',
          '</li>',
          '<li onclick="dubx.optionMentions();" class="for_content_li for_content_feature autocomplete_mentions">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Autocomplete Mentions</p>',
          '</li>',
          '<li onclick="dubx.customMentions(event);" class="for_content_li for_content_feature custom_mentions">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p onclick="dubx.createCustomMentions();" class="for_content_edit" style="display: inline-block;color: #878c8e;font-size: .85rem;font-weight: bold;float: right;"><i class="fi-pencil"></i></p>',
              '<p class="for_content_p">Custom Mention Triggers</p>',
          '</li>',
          '<li onclick="dubx.mentionNotifications();" class="for_content_li for_content_feature mention_notifications">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Notification on Mentions</p>',
          '</li>',
          '<li onclick="dubx.grabInfoWarning(); dubx.showDubsOnHover();" class="for_content_li for_content_feature dubs_hover">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Show Dub info on Hover</p>',
          '</li>',
          '<li onclick="dubx.downdubChat();" class="for_content_li for_content_feature downdub_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Downdubs in Chat (Mod Only)</p>',
          '</li>',
          '<li onclick="dubx.updubChat();" class="for_content_li for_content_feature updub_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Updubs in Chat</p>',
          '</li>',
          '<li onclick="dubx.grabChat();" class="for_content_li for_content_feature grab_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Grabs in Chat</p>',
          '</li>',
      '</ul>'
    ].join('');
  },
  ui : function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'User Interface',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_userinterface">',
          '<li onclick="dubx.fullscreen();" class="for_content_li for_content_feature fs">',
              '<p class="for_content_off"><i class="fi-arrows-out"></i></p>',
              '<p class="for_content_p">Fullscreen Video</p>',
          '</li>',
          '<li onclick="dubx.split_chat();" class="for_content_li for_content_feature split_chat">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Split Chat</p>',
          '</li>',
          '<li onclick="dubx.video_window();" class="for_content_li for_content_feature video_window">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Chat</p>',
          '</li>',
          '<li onclick="dubx.chat_window();" class="for_content_li for_content_feature chat_window">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Video</p>',
          '</li>',
          '<li onclick="dubx.hide_avatars();" class="for_content_li for_content_feature hide_avatars">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Avatars</p>',
          '</li>',
          '<li onclick="dubx.medium_disable();" class="for_content_li for_content_feature medium_disable">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Hide Background</p>',
          '</li>',
      '</ul>'
    ].join('');
  }, 
  settings: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Settings',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_settings">',
          '<li onclick="dubx.spacebar_mute();" class="for_content_li for_content_feature spacebar_mute">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Spacebar Mute</p>',
          '</li>',
          '<li onclick="dubx.show_timestamps();" class="for_content_li for_content_feature show_timestamps">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Show Timestamps</p>',
          '</li>',
          '<li onclick="dubx.warn_redirect();" class="for_content_li for_content_feature warn_redirect">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Warn On Navigation</p>',
          '</li>',
      '</ul>'
    ].join('');
  },
  customize: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Customize',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_customize">',
          '<li onclick="dubx.nicole();" class="for_content_li for_content_feature nicole">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Plug.dj Theme</p>',
          '</li>',
          '<li onclick="dubx.css_world();" class="for_content_li for_content_feature css">',
              '<p class="for_content_off"><i class="fi-x"></i></p>',
              '<p class="for_content_p">Community Theme</p>',
          '</li>',
          '<li onclick="dubx.css_modal();" class="for_content_li for_content_feature">',
              '<p class="for_content_off"><i class="fi-unlink"></i></p>',
              '<p class="for_content_p">Custom CSS</p>',
          '</li>',
          '<li onclick="dubx.medium_modal();" class="for_content_li for_content_feature">',
              '<p class="for_content_off"><i class="fi-unlink"></i></p>',
              '<p class="for_content_p">Custom Background</p>',
          '</li>',
      '</ul>'
    ].join('');
  },
  contact: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Contact',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_contact">',
          '<li onclick="dubx.report_modal();" class="for_content_li for_content_feature report">',
              '<p class="for_content_off"><i class="fi-comments"></i></p>',
              '<p class="for_content_p">Bug Report</p>',
          '</li>',
      '</ul>'
    ].join('');
  }

};

/*********************************************/

var options = require('../utils/options.js');
var settings = require('./settings.js');
var css = require('../utils/css.js');
/* global Dubtrack */


var openSection = function($sectionEl){
  var sectionName = $sectionEl.data('dubx-subnav');
  // open the section
  $sectionEl.slideDown('fast');
  // replace the icon
  $sectionEl.find('.dubx-menu-section-title i').removeClass('fi-plus').addClass('fi-minus');
  // save the option
  options.saveMenuOption(sectionName,'true');
};

var closeSection = function($sectionEl){
  var sectionName = $sectionEl.data('dubx-subnav');
  // open the section
  $sectionEl.slideUp('fast');
  // replace the icon
  $sectionEl.find('.dubx-menu-section-title i').removeClass('fi-minus').addClass('fi-plus');
  // save the option
  options.saveMenuOption(sectionName,'false');
};

var toggleDubxSection = function(e) {
    var $targetSection = $(this).find('.dubx-menu-subsection');
    var clicked = $(this).find('.dubx-menu-section-title i');
    if( clicked.hasClass('fi-minus') ){
      closeSection($targetSection);
    } else{
      openSection($targetSection);
    }
};


var openAllMenus = function(){
  var $targetSection, sectionName;
  $('.dubx-menu-section').each(function(i,section){
    $targetSection = $(this).find('.dubx-menu-subsection');
    openSection($targetSection);
  });
};

var closeAllMenus = function(){
  var $targetSection, sectionName;
  $('.dubx-menu-section').each(function(i,section){
    $targetSection = $(this).find('.dubx-menu-subsection');
    closeSection($targetSection);
  });
};

var toggleAllSections = function() {
    var allClosed = true;
    var $targetSection;

    $('.dubx-menu-section').each(function(i, section){
      $targetSection = $(this).find('.dubx-menu-subsection');
      if( $targetSection.css('display') === 'block'){
        allClosed = false;
      }
    });

    if ( allClosed ) {
      openAllMenus();
    } else {
      closeAllMenus();
    }
};

var menu = {
  general: function(){
    return [
      '<li class="for_content_li dubx-menu-section">',
          '<p class="for_content_c dubx-menu-section-title">',
              'General',
              '<i class="fi-minus"></i>',
          '</p>',
          '<ul id="dubxmenu-general" data-dubx-subnav="general" class="draw_general dubx-menu-subsection">',
          '</ul>',
      '</li>',
    ].join('');
  },
  ui : function(){
    return [
      '<li class="for_content_li dubx-menu-section">',
          '<p class="for_content_c dubx-menu-section-title">',
              'User Interface',
              '<i class="fi-minus"></i>',
          '</p>',
          '<ul id="dubxmenu-ui" data-dubx-subnav="userinterface" class="draw_userinterface dubx-menu-subsection">',
          '</ul>',
      '</li>',
    ].join('');
  }, 
  settings: function(){
    return [
      '<li class="for_content_li dubx-menu-section">',
          '<p class="for_content_c dubx-menu-section-title">',
              'Settings',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul id="dubxmenu-settings" data-dubx-subnav="settings" class="draw_settings dubx-menu-subsection">',
      '</ul>'
    ].join('');
  },
  customize: function(){
    return [
      '<li class="for_content_li dubx-menu-section">',
          '<p class="for_content_c dubx-menu-section-title">',
              'Customize',
              '<i class="fi-minus"></i>',
          '</p>',
          '<ul id="dubxmenu-customize" data-dubx-subnav="customize" class="draw_customize dubx-menu-subsection">',
          '</ul>',
      '</li>'
    ].join('');
  },
  contact: function(){
    return [
      '<li class="for_content_li dubx-menu-section">',
          '<p class="for_content_c dubx-menu-section-title">',
              'Contact',
              '<i class="fi-minus"></i>',
          '</p>',
          '<ul id="dubxmenu-contact" data-dubx-subnav="contact" class="draw_contact dubx-menu-subsection">',
          '</ul>',
      '</li>'
    ].join('');
  },
  social: function(){
      return [
        '<li class="for_content_li dubx-menu-section">',
            '<p class="for_content_c dubx-menu-section-title">',
                'Social',
                '<i class="fi-minus"></i>',
            '</p>',
            '<ul id="dubxmenu-social" data-dubx-subnav="social" class="draw_social dubx-menu-subsection">',
                '<li class="for_content_li for_content_feature">',
                    '<a href="https://www.facebook.com/DubXScript" target="_blank" style="color: #878c8e;">',
                        '<p class="for_content_off"><i class="fi-social-facebook"></i></p>',
                        '<p class="for_content_p">Like Us on Facebook</p>',
                    '</a>',
                '</li>',
                '<li class="for_content_li for_content_feature">',
                    '<a href="https://twitter.com/DubXScript" target="_blank" style="color: #878c8e;">',
                        '<p class="for_content_off"><i class="fi-social-twitter"></i></p>',
                        '<p class="for_content_p">Follow Us on Twitter</p>',
                    '</a>',
                '</li>',
                '<li class="for_content_li for_content_feature">',
                    '<a href="https://github.com/sinfulBA/DubX-Script" target="_blank" style="color: #878c8e;">',
                        '<p class="for_content_off"><i class="fi-social-github"></i></p>',
                        '<p class="for_content_p">Fork Us on Github</p>',
                    '</a>',
                '</li>',
                '<li class="for_content_li for_content_feature">',
                    '<a href="https://dubx.net" target="_blank" style="color: #878c8e;">',
                        '<p class="for_content_off"><i class="fi-link"></i></p>',
                        '<p class="for_content_p">Our Website</p>',
                    '</a>',
                '</li>',
                '<li class="for_content_li for_content_feature">',
                    '<a href="https://dubx.net/donate.html" target="_blank" style="color: #878c8e;">',
                        '<p class="for_content_off"><i class="fi-pricetag-multiple"></i></p>',
                        '<p class="for_content_p">Donate</p>',
                    '</a>',
                '</li>',
            '</ul>',
        '</li>'
      ].join('');
  },
  extension: function(){
    return [
      '<li class="for_content_li dubx-menu-section">',
          '<p class="for_content_c dubx-menu-section-title">',
              'Chrome Extension',
              '<i class="fi-minus"></i>',
          '</p>',
          '<ul id="dubxmenu-extension" data-dubx-subnav="chrome" class="draw_chrome dubx-menu-subsection">',
              '<li class="for_content_li for_content_feature">',
                  '<a href="https://chrome.google.com/webstore/detail/dubx/oceofndagjnpebjmknefoelcpcnpcedm/reviews" target="_blank" style="color: #878c8e;">',
                      '<p class="for_content_off"><i class="fi-like"></i></p>',
                      '<p class="for_content_p">Give Us a Rating</p>',
                  '</a>',
              '</li>',
          '</ul>',
      '</li>'
    ].join('');
  }

};

var makeMenu = function(){
    css.loadExternal('https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css');
    css.load(null, '/css/asset.css');

    // add icon to the upper right corner
    var menuIcon = '<div class="for dubx-menu"><img src="'+settings.srcRoot+'/params/params.svg" alt=""></div>';
    $('.header-right-navigation').append(menuIcon);

    // hide/show the who menu when you click on the icon in the top right
    $('body').on('click', '.dubx-menu', function(e){
      $('.dubx-menu-content').slideToggle('fast');
    });

    // make the menu
    var html = [
        '<div class="for_content dubx-menu-content" style="display:none;">',
          '<span class="for_content_ver dubx-menu-title">DubX Settings</span>',
          '<span class="for_content_version dubx-version" title="Collapse/Expand Menus">'+settings.our_version+'</span>',
          '<ul class="for_content_ul">',
            menu.general(),
            menu.ui(),
            menu.settings(),
            menu.customize(),
            menu.contact(),
            menu.social(),
            menu.extension(),
          '</ul>',
        '</div>'
    ].join('');

    // add it to the DOM
    $('body').prepend(html);
    // use the perfectScrollBar plugin to make it look nice
    $('.dubx-menu-content').perfectScrollbar();

    // add event listeners that open/close all/each the menu section
    $('body').on('click', '.dubx-menu-section', toggleDubxSection);
    $('body').on('click', '.dubx-version', toggleAllSections);

    // load menu saved open/close sections settings and apply
    var $targetSection, sectionName;
    $('.dubx-menu-section').each(function(i,section){
      $targetSection = $(this).find('.dubx-menu-subsection');
      var sectionName = $targetSection.data('dubx-subnav');

      if (settings.menu[sectionName] === 'false') {
        closeSection($targetSection);
      } else {
        options.saveMenuOption(sectionName,'true');
      }

    });
};



var makeStandardMenuHTML = function(id, desc, cssClass, menuTitle){
  return [
    '<li id="'+id+'" title="'+desc+'" class="for_content_li for_content_feature '+cssClass+'">',
        '<p class="for_content_off"><i class="fi-x"></i></p>',
        '<p class="for_content_p">'+menuTitle+'</p>',
    '</li>',
  ].join('');
};

var makeOtherMenuHTML = function(icon, id, desc, cssClass, menuTitle){
  return [
    '<li id="'+id+'" title="'+desc+'" class="for_content_li for_content_feature '+cssClass+'">',
        '<p class="for_content_off"><i class="fi-'+icon+'"></i></p>',
        '<p class="for_content_p">'+menuTitle+'</p>',
    '</li>',
  ].join('');
};

var appendToSection = function(section, menuItemHtml){
  $('#dubxmenu-'+section).append(menuItemHtml);
};

module.exports = {
  makeMenu: makeMenu,
  appendToSection: appendToSection,
  makeStandardMenuHTML: makeStandardMenuHTML,
  makeOtherMenuHTML: makeOtherMenuHTML
};

},{"../utils/css.js":29,"../utils/options.js":32,"./settings.js":7}],7:[function(require,module,exports){
/**
 * Settings
 * this will hold all the "global" (dubx) settings
 */
module.exports = {
  // options and constants  
  our_version : '03.06.00 - The rewrite',
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
    },
    menu : {},
    custom: {}
};

},{}],8:[function(require,module,exports){
/**
 * AFK -  Away from Keyboard
 * Toggles the afk auto response on/off
 * including adding a custom message
 */

/* global Dubtrack */
var modal = require('../utils/modal.js');
var options = require('../utils/options.js');
var menu = require('../lib/menu.js');
var settings = require("../lib/settings.js");

var myModule = {};

myModule.id = "afk";
myModule.moduleName = "AFK Autorespond";
myModule.description = "Toggle Away from Keyboard and customize AFK message.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


var afk_chat_respond = function(e) {
    var content = e.message;
    var user = Dubtrack.session.get('username');
    
    if (content.indexOf('@'+user) > -1 && Dubtrack.session.id !== e.user.userInfo.userid) {
    
        if (this.optionState) {
            if (settings.custom.customAfkMessage) {
                $('#chat-txt-message').val('[AFK] '+ settings.custom.customAfkMessage);
            } else {
                $('#chat-txt-message').val("[AFK] I'm not here right now.");
            }
            Dubtrack.room.chat.sendMessage();
            this.optionState = false;

            var self = this;
            setTimeout(function() {
                self.optionState = true;
            }, 180000);
        }

    }
};

var saveAfkMessage =function() {
    var customAfkMessage = $('.input').val();
    options.saveOption('customAfkMessage', customAfkMessage);
};

var createAfkMessage =function() {
    var current = settings.custom.customAfkMessage;
    modal.create({
        title: 'Custom AFK Message',
        content: current,
        placeholder: 'I\'m not here right now.',
        confirmButtonClass: 'confirm-for315',
        maxlength: '255',
        confirmCallback: saveAfkMessage
    });
};

myModule.init = function(){
    $('#createAfkMessage').on('click', createAfkMessage);
};

myModule.go = function(e) {
    if(e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil') {return;
    }
    var newOptionState;

    if (!this.optionState) {
        newOptionState = true;
        Dubtrack.Events.bind("realtime:chat-message", afk_chat_respond);
    } else {
        newOptionState = false;
        Dubtrack.Events.unbind("realtime:chat-message", afk_chat_respond);
    }

    this.optionState = newOptionState;
    this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../lib/settings.js":7,"../utils/modal.js":31,"../utils/options.js":32}],9:[function(require,module,exports){
/* global Dubtrack */
var menu = require('../lib/menu.js');

var myModule = {};

myModule.id = "autovote";
myModule.moduleName = "Autovote";
myModule.description = "Toggles support for auto upvoting for every song";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);

// this function will be run on each click of the menu
myModule.go = function(e){
  var newOptionState;
  
  if (!this.optionState) {
      newOptionState = true;

      var song = Dubtrack.room.player.activeSong.get('song');
      var dubCookie = Dubtrack.helpers.cookie.get('dub-' + Dubtrack.room.model.get("_id"));
      var dubsong = Dubtrack.helpers.cookie.get('dub-song');

      if (!Dubtrack.room || !song || song.songid !== dubsong) {
          dubCookie = false;
      }
      //Only cast the vote if user hasn't already voted
      if (!$('.dubup, .dubdown').hasClass('voted') && !dubCookie) {
          this.advance_vote();
      }

      Dubtrack.Events.bind("realtime:room_playlist-update", this.voteCheck);
  } else {
      newOptionState = false;
      Dubtrack.Events.unbind("realtime:room_playlist-update", this.voteCheck);
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

// add any custom functions to this module
myModule.advance_vote = function() {
  $('.dubup').click();
};

myModule.voteCheck = function (obj) {
  if (obj.startTime < 2) {
      this.advance_vote();
  }
};

module.exports = myModule;
},{"../lib/menu.js":6}],10:[function(require,module,exports){
/**
 * Bug Report
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var settings = require("../lib/settings.js");
var modal = require('../utils/modal.js');

var myModule = {};

myModule.id = "report_modal";
myModule.moduleName = "Bug Report";
myModule.description = "Report any DUBX specific bugs, NOT dubtrack bugs.";
myModule.optionState = false;
myModule.category = "contact";
myModule.menuHTML = menu.makeOtherMenuHTML('comments', myModule.id, myModule.description, '', myModule.moduleName);

var report_content = function() {
    var content = $('.input').val();

    if(!content || content.trim(' ').length === 0) {return;}

    var user = Dubtrack.session.get('username');
    var id = Dubtrack.realtime.dtPubNub.get_uuid();
    var href = location.href;
    var woosh = [
        ' *Username*: '+user+' | ',
        ' *Identification*: '+id+' | ',
        ' *Location*: `'+location+'` | ',
        ' *Content*: '+content+' | '
    ].join('');
    $.ajax({
        type: 'POST',
        url: 'https://hooks.slack.com/services/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',
        data: 'payload={"username": "Incoming Bug Report", "text": "'+woosh+'", "icon_emoji": ":bug:"}',
        crossDomain: true
    });
    $('.report').replaceWith('<li class="for_content_li for_content_feature report"><p class="for_content_off"><i class="fi-check"></i></p><p class="for_content_p">Bug Report</p></li>');
};

myModule.go = function() {
  modal.create({
    title: 'Bug Report:',
    content: '',
    placeholder: "Please only report bugs for DubX, not Dubtrack. \nBe sure to give a detailed description of the bug, and a way to replicate it, if possible.",
    confirmButtonClass: 'confirm-for36',
    maxlength: '999',
    confirmCallback: report_content
  });
};

module.exports = myModule;
},{"../lib/menu.js":6,"../lib/settings.js":7,"../utils/modal.js":31}],11:[function(require,module,exports){
/**
 * Community Theme
 * Toggle Community CSS theme
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');

var myModule = {};

myModule.id = "css_world";
myModule.moduleName = "Community Theme";
myModule.description = "Toggle Community CSS theme.";
myModule.optionState = false;
myModule.category = "customize";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, 'css', myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;

    var location = Dubtrack.room.model.get('roomUrl');
    $.ajax({
        type: 'GET',
        url: 'https://api.dubtrack.fm/room/'+location,
    }).done(function(e) {
        var content = e.data.description;
        var url = content.match(/(@dubx=)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/);

        if(!url) {return;}

        var append = url[0].split('@dubx=');
        css.loadExternal('css_world', append[1]);
    });

  } else {
    newOptionState = false;
    $('.css_world').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../utils/css.js":29}],12:[function(require,module,exports){
/**
 * Custom Background
 * Add your own custom background
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var settings = require("../lib/settings.js");
var modal = require('../utils/modal.js');
var options = require('../utils/options.js');

var myModule = {};

myModule.id = "customBG";
myModule.moduleName = "Custom Background";
myModule.description = "Add your own custom background.";
myModule.optionState = false;
myModule.category = "customize";
myModule.menuHTML = menu.makeOtherMenuHTML('unlink', myModule.id, myModule.description, '', myModule.moduleName);

myModule.init = function(){
  if (settings.general.medium !== null) {
      $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+settings.general.medium+');background-size: cover;top: 0;"></div>');
  }
};

var saveCustomBG = function() {
    var content = $('.input').val();
    options.saveOption('medium',content);
    $('.medium').remove();
    $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
};

myModule.go = function() {
    modal.create({
        title: 'Link an image file:',
        content: 'It is recommended a .jpg file is used',
        placeholder: 'https://example.com/example.jpg',
        confirmButtonClass: 'confirm-for314',
        maxlength: '999',
        confirmCallback: saveCustomBG
    });
};

module.exports = myModule;
},{"../lib/menu.js":6,"../lib/settings.js":7,"../utils/modal.js":31,"../utils/options.js":32}],13:[function(require,module,exports){
/**
 * Custom CSS
 * Add custom CSS
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');
var settings = require("../lib/settings.js");
var modal = require('../utils/modal.js');
var options = require('../utils/options.js');

var myModule = {};

myModule.id = "css_modal";
myModule.moduleName = "Custom CSS";
myModule.description = "Add custom CSS.";
myModule.optionState = false;
myModule.category = "customize";
myModule.menuHTML = menu.makeOtherMenuHTML('unlink', myModule.id, myModule.description, '', myModule.moduleName);

myModule.init = function(){
  if (settings.custom.css !== null) {
    css.loadExternal('css_import',settings.custom.css);
  }
};

var css_import = function() {
    $('.css_import').remove();
    var css_to_import = $('.input').val();
    options.saveOption('css',css_to_import);
    
    if (css_to_import && css_to_import !== '') {
        $('head').append('<link class="css_import" href="'+css_to_import+'" rel="stylesheet" type="text/css">');
        css.loadExternal('css_import',css_to_import);
    }
};

myModule.go = function() {
  var current = settings.custom.css || "";

  modal.create({
      title: 'CSS',
      content: current,
      placeholder: 'https://example.com/example.css',
      confirmButtonClass: 'confirm-for313',
      maxlength: '999',
      confirmCallback: css_import
  });
};

module.exports = myModule;
},{"../lib/menu.js":6,"../lib/settings.js":7,"../utils/css.js":29,"../utils/modal.js":31,"../utils/options.js":32}],14:[function(require,module,exports){
/**
 * Emotes
 * Adds additional Twitch, BTTV, and Tasty Emotes to the chat window 
 */

/* global Dubtrack, emojify */
var options = require('../utils/options.js');
var menu = require('../lib/menu.js');
var dubx_emoji = require('../emojiUtils/prepEmoji.js');


var myModule = {};

myModule.id = "twitch_emotes";
myModule.moduleName = "Emotes";
myModule.description = "Toggle Twitch Emotes support.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, "twitch_emotes", myModule.moduleName);

function makeImage(type, src, name, w, h){
  return '<img class="emoji '+type+'-emote" '+
    (w ? 'width="'+w+'" ' : '') +
    (h ? 'height="'+h+'" ' : '') +
     'title="'+name+'" alt="'+name+'" src="'+src+'" />';
}

/**********************************************************************
 * handles replacing twitch emotes in the chat box with the images
 */

myModule.replaceTextWithEmote = function(){
    var self = dubx_emoji;

    var _regex = self.twitch.chatRegex;

    if (!self.twitchJSONSLoaded) { return; } // can't do anything until jsons are loaded

    var $chatTarget = $('.chat-main .text').last();
    
    if (!$chatTarget.html()) { return; } // nothing to do

    if (self.bttvJSONSLoaded) { _regex = self.bttv.chatRegex; }

    var emoted = $chatTarget.html().replace(_regex, function(matched, p1){
        var _id, _src, _desc, key = p1.toLowerCase();

        if ( self.twitch.emotes[key] ){
            _id = self.twitch.emotes[key];
            _src = self.twitch.template(_id);
            return makeImage("twitch", _src, key);
        } else if ( self.bttv.emotes[key] ) {
            _id = self.bttv.emotes[key];
            _src = self.bttv.template(_id);
            return makeImage("bttv", _src, key);
        } else if ( self.tasty.emotes[key] ) {
            _src = self.tasty.template(key);
            return makeImage("tasty", _src, key, self.tasty.emotes[key].width, self.tasty.emotes[key].height);
        } else {
            return matched;
        }

    });

    $chatTarget.html(emoted);
};

/**************************************************************************
 * Turn on/off the twitch emoji in chat
 */
myModule.go = function(){
    document.body.addEventListener('twitch:loaded', dubx_emoji.loadBTTVEmotes);
    document.body.addEventListener('bttv:loaded', dubx_emoji.loadTastyEmotes);
    
    var newOptionState;
    var optionName = 'twitch_emotes';

    if (!myModule.optionState) {
        
        if (!dubx_emoji.twitchJSONSLoaded) {
            dubx_emoji.loadTwitchEmotes();
        } else {
            this.replaceTextWithEmote();
        }

        Dubtrack.Events.bind("realtime:chat-message", this.replaceTextWithEmote);
        newOptionState = true;
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.replaceTextWithEmote);
        newOptionState = false;
    }

    this.optionState = newOptionState;
    this.toggleAndSave(this.id, newOptionState);
};


module.exports = myModule;
},{"../emojiUtils/prepEmoji.js":2,"../lib/menu.js":6,"../utils/options.js":32}],15:[function(require,module,exports){
/**
 * ETA
 *
 * This module is not a menu item, it is run once on load
 */

/* global Dubtrack */
var myModule = {};

myModule.id = "eta";
myModule.moduleName = "eta";
myModule.description = "shows your eta on hover.";

myModule.optionState = false;
myModule.category = false;
myModule.menuHTML = false;

var eta = function() {
    var time = 4;
    var current_time = parseInt($('#player-controller div.left ul li.infoContainer.display-block div.currentTime span.min').text());
    var booth_duration = parseInt($('.queue-position').text());
    var booth_time = (booth_duration * time - time) + current_time;
    
    if (booth_time >= 0) {
        $(this).append('<div class="eta_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">ETA: '+booth_time+' minutes</div>');
    } else {
        $(this).append('<div class="eta_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">You\'re not in the queue</div>');
    }
};

var hide_eta = function() {
    $(this).empty();
};

myModule.init = function() {
  $('.player_sharing').append('<span class="icon-history eta_tooltip_t"></span>');
  $('.eta_tooltip_t').mouseover(eta).mouseout(hide_eta);
};

module.exports = myModule;
},{}],16:[function(require,module,exports){
/**
 * Fullscreen video
 * Toggle fullscreen video mode
 */

var menu = require('../lib/menu.js');

var myModule = {};

myModule.id = "fs";
myModule.moduleName = "Fullscreen Video";
myModule.description = "Toggle fullscreen video mode";
myModule.optionState = false;
myModule.category = "ui";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, 'fs', myModule.moduleName);


myModule.go = function(e) {
    var elem = document.querySelector('.playerElement iframe');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
};

module.exports = myModule;
},{"../lib/menu.js":6}],17:[function(require,module,exports){
/**
 * Hide Avatars
 * Toggle hiding user avatars in the chat box.
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');

var myModule = {};

myModule.id = "hide_avatars";
myModule.moduleName = "Hide Avatars";
myModule.description = "Toggle hiding user avatars in the chat box.";
myModule.optionState = false;
myModule.category = "ui";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if(!this.optionState) {
    newOptionState= true;
    css.load('hide_avatars_link','/css/options/hide_avatars.css');
  } else {
    newOptionState= false;
    $('.hide_avatars_link').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../utils/css.js":29}],18:[function(require,module,exports){
/**
 * Hide Background
 * toggle hiding background image
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var settings = require("../lib/settings.js");

var myModule = {};

myModule.id = "medium_disable";
myModule.moduleName = "Hide Background";
myModule.description = "Toggle hiding background image.";
myModule.optionState = false;
myModule.category = "ui";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if(!this.optionState) {
    newOptionState= true;
    $('.backstretch').hide();
    $('.medium').hide();
  } else {
    newOptionState= false;
    $('.backstretch').show();
    $('.medium').show();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../lib/settings.js":7}],19:[function(require,module,exports){
/**
 * Hide Chat
 * Toggle hiding of the chat box.
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');

var myModule = {};

myModule.id = "video_window";
myModule.moduleName = "Hide Chat";
myModule.description = "Toggle hiding of the chat box.";
myModule.optionState = false;
myModule.category = "ui";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;
    css.load('video_window_link','/css/options/video_window.css');
  } else {
    newOptionState = false;
    $('.video_window_link').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../utils/css.js":29}],20:[function(require,module,exports){
/**
 * Hide Video
 * Toggle hiding of the Video box.
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');

var myModule = {};

myModule.id = "chat_window";
myModule.moduleName = "Hide Video";
myModule.description = "Toggle hiding of the video box.";
myModule.optionState = false;
myModule.category = "ui";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if(!this.optionState) {
    newOptionState= true;
    css.load("chat_window_link", '/css/options/chat_window.css');
  } else {
    newOptionState= false;
    $('.chat_window_link').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../utils/css.js":29}],21:[function(require,module,exports){
// put this in order of appearance in the menu
module.exports = [
  // General 
  require('./snow.js'),
  require('./autovote.js'),
  require('./afk.js'),
  require('./emotes.js'),

  // User Interface
  require('./fullscreen.js'),
  require('./splitchat.js'),
  require('./hideChat.js'),
  require('./hideVideo.js'),
  require('./hideAvatars.js'),
  require('./hideBackground.js'),
  
  // Settings
  require('./spacebarMute.js'),
  require('./showTimestamps.js'),
  require('./warnOnNavigation.js'),

  // Customize
  require('./plugDjTheme.js'),
  require('./communityTheme.js'),
  require('./customCSS.js'),
  require('./customBackground.js'),

  // Contact
  require('./bugReport.js'),

  // non-menu modules
  require('./snooze.js'),
  require('./eta.js')
];
},{"./afk.js":8,"./autovote.js":9,"./bugReport.js":10,"./communityTheme.js":11,"./customBackground.js":12,"./customCSS.js":13,"./emotes.js":14,"./eta.js":15,"./fullscreen.js":16,"./hideAvatars.js":17,"./hideBackground.js":18,"./hideChat.js":19,"./hideVideo.js":20,"./plugDjTheme.js":22,"./showTimestamps.js":23,"./snooze.js":24,"./snow.js":25,"./spacebarMute.js":26,"./splitchat.js":27,"./warnOnNavigation.js":28}],22:[function(require,module,exports){
/**
 * Plug.dj theme
 * Toggle the plug.dj css theme
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');

var myModule = {};

myModule.id = "plugdjtheme";
myModule.moduleName = "Plug.dj Theme";
myModule.description = "Toggle the plug.dj css theme.";
myModule.optionState = false;
myModule.category = "customize";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, 'nicole', myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;
    css.load("nicole_css", "/themes/PlugTheme.css");
  } else {
    newOptionState = false;
    $('.nicole_css').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../utils/css.js":29}],23:[function(require,module,exports){
/**
 * Show Timestamps
 * Toggle always showing chat message timestamps.
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');

var myModule = {};

myModule.id = "show_timestamps";
myModule.moduleName = "Show Timestamps";
myModule.description = "Toggle always showing chat message timestamps.";
myModule.optionState = false;
myModule.category = "settings";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;
    css.load("show_timestamps_link", "/css/options/show_timestamps.css");
  } else {
    newOptionState = false;
    $('.show_timestamps_link').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../utils/css.js":29}],24:[function(require,module,exports){
/**
 * Snooze current song
 * Mutes the current song.
 *
 * This module is not a menu item, it is always automatically run on load
 */

/* global Dubtrack */
var myModule = {};

myModule.id = "snooze_btn";
myModule.moduleName = "Snooze";
myModule.description = "Mutes the current song.";

myModule.optionState = false; // not used in this module
myModule.category = false; // not used for this module
myModule.menuHTML = false; // not used for this module


var snooze_tooltip = function(e) {
  $(this).append('<div class="snooze_tooltip" style="position: absolute;font: 1rem/1.5 proxima-nova,sans-serif;display: block;left: -33px;cursor: pointer;border-radius: 1.5rem;padding: 8px 16px;background: #fff;font-weight: 700;font-size: 13.6px;text-transform: uppercase;color: #000;opacity: .8;text-align: center;z-index: 9;">Mute current song</div>');
};

var hide_snooze_tooltip = function() {
    $('.snooze_tooltip').remove();
};

var eventUtils = {
    currentVol: 50,
    snoozed: false
};

var eventSongAdvance = function(e) {
    if (e.startTime < 2) {
        if (eventUtils.snoozed) {
            Dubtrack.room.player.setVolume(eventUtils.currentVol);
            eventUtils.snoozed = false;
        }
        return true;
    }
};

var snooze = function() {
    if (!eventUtils.snoozed && Dubtrack.room.player.player_volume_level > 2) {
        eventUtils.currentVol = Dubtrack.room.player.player_volume_level;
        Dubtrack.room.player.setVolume(0);
        eventUtils.snoozed = true;
        Dubtrack.Events.bind("realtime:room_playlist-update", eventSongAdvance);
    } else if (eventUtils.snoozed) {
        Dubtrack.room.player.setVolume(eventUtils.currentVol);
        eventUtils.snoozed = false;
    }
};

myModule.init = function() {
  $('.player_sharing').append('<span class="icon-mute snooze_btn"></span>');

  $('body').on('mouseover', '.snooze_btn', snooze_tooltip);
  $('body').on('mouseout', '.snooze_btn', hide_snooze_tooltip);
  $('body').on('click', '.snooze_btn', snooze);
};

module.exports = myModule;




},{}],25:[function(require,module,exports){
var menu = require('../lib/menu.js');

var myModule = {};

myModule.id = "snow";
myModule.moduleName = "Snow";
myModule.description = "Toggle snow.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);

// this function will be run on each click of the menu
myModule.go = function(e){
  var newOptionState;

  if (!this.optionState) {
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

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6}],26:[function(require,module,exports){
/**
 * Spacebar Mute
 * Turn on/off the ability to mute current song with the spacebar
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var settings = require("../lib/settings.js");

var myModule = {};

myModule.id = "spacebar_mute";
myModule.moduleName = "Spacebar Mute";
myModule.description = "Turn on/off the ability to mute current song with the spacebar.";
myModule.optionState = false;
myModule.category = "settings";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;

    $(document).bind('keypress.key32', function() {
      var tag = event.target.tagName.toLowerCase();
      if (event.which === 32 && tag !== 'input' && tag !== 'textarea') {
          $('#main_player .player_sharing .player-controller-container .mute').click();
      }
    });
  } else {
    newOptionState = false;
    $(document).unbind("keypress.key32");
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../lib/settings.js":7}],27:[function(require,module,exports){
/**
 * Split Chat
 * Toggle Split chat mode
 */

var menu = require('../lib/menu.js');

var myModule = {};

myModule.id = "split_chat";
myModule.moduleName = "Split Chat";
myModule.description = "Toggle Split Chat UI enhancement";
myModule.optionState = false;
myModule.category = "ui";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);



myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;
    $('.chat-main').addClass('splitChat');

  } else {
    newOptionState = false;
    $('.chat-main').removeClass('splitChat');
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6}],28:[function(require,module,exports){
/**
 * Warn on Navigation
 * Warns you when accidentally clicking on a link that takes you out of dubtrack
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var settings = require("../lib/settings.js");

var myModule = {};

myModule.id = "warn_redirect";
myModule.moduleName = "Warn On Navigation";
myModule.description = "Warns you when accidentally clicking on a link that takes you out of dubtrack.";
myModule.optionState = false;
myModule.category = "settings";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;

    window.onbeforeunload = function(e) {
      return '';
    };
  } else {
    newOptionState = false;
    window.onbeforeunload = null;
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;
},{"../lib/menu.js":6,"../lib/settings.js":7}],29:[function(require,module,exports){
var settings = require("../lib/settings.js");

/**
 * Loads a CSS file into <head>
 * Assumes all CSS files lives at  root/...
 * @param {string} className  class name for element
 * @param {string} cssFile    the css file location starting after /root/css
 *
 * example:  css.load("show_timestamps_link", "/options/show_timestamps.css");
 */
var load = function(className,cssFile){
  var src =  settings.srcRoot + cssFile;
  var cn = className || '';
  $('head').append('<link class="'+cn+'" rel="stylesheet" type="text/css" href="'+src+'">');
};

/**
 * Use this to load any external CSS files that are not in this repo
 */
var loadExternal = function(className,cssFile){
  $('head').append('<link class="'+className+'" rel="stylesheet" type="text/css" href="'+cssFile+'">');
};

module.exports = {
  load : load,
  loadExternal: loadExternal
};
},{"../lib/settings.js":7}],30:[function(require,module,exports){
// jQuery's getJSON kept returning errors so making my own with promise-like
// structure and added optional Event to fire when done so can hook in elsewhere
var getJSON = (function (url, optionalEvent) {
    var doneEvent;
    function GetJ(_url, _cb){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _url);
        xhr.send();
        xhr.onload = function() {
            var resp = xhr.responseText;
            if (typeof _cb === 'function') { _cb(resp); }
            if (optionalEvent) { document.body.dispatchEvent(doneEvent); }
        };
    }
    if (optionalEvent){ doneEvent = new Event(optionalEvent); }
    var done = function(cb){
        new GetJ(url, cb);
    };
    return { done: done };
});

module.exports = getJSON;
},{}],31:[function(require,module,exports){
/**
 * input is a modal used to display messages and also capture data
 * 
 * @param  {String} title       title that shows at the top of the modal
 * @param  {String} content     A descriptive message on what the modal is for
 * @param  {String} placeholder placeholder for the textarea
 * @param  {String} confirm     a way to customize the text of the confirm button
 * @param  {Number} maxlength   for the textarea maxlength attribute
 */
var create = function(infoObj) {
    var defaults = {
        title: '',
        content: '',
        placeholder: null,
        confirmButtonClass: null,
        maxlength: null,
        confirmCallback: null
    };
    var opts = $.extend(true, {}, this.defaults, infoObj);
    
    var textarea = '';
    var confirmButton = '';

    if (opts.placeholder) {
        var mx = opts.maxlength || 999;
        textarea = '<textarea class="input" type="text" placeholder="'+opts.placeholder+'" maxlength="'+ mx +'">'+opts.content+'</textarea>';
    }
    if (opts.confirmButtonClass) {
        confirmButton = '<div class="'+opts.confirmButtonClass+' confirm"><p>Okay</p></div>';
    }
    
    var dubxModal = [
        '<div class="onErr">',
            '<div class="container">',
                '<div class="title">',
                    '<h1>'+opts.title+'</h1>',
                '</div>',
                '<div class="content">',
                    '<p>'+opts.content+'</p>',
                    textarea,
                '</div>',
                '<div class="control">',
                    '<div class="cancel dubx-js-cancel">',
                        '<p>Cancel</p>',
                    '</div>',
                    confirmButton,
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    $('body').append(dubxModal);

    // add one time cancel click
    $('.dubx-js-cancel').one("click",function(){
        $('.onErr').remove();
    });
    
    if (opts.confirmButtonClass) {
      $('.'+opts.confirmButtonClass).one("click", function(e){
          confirmButton(opts.confirmCallback || null);
      });
    }
    
};

var confirmButton = function(optionalCB){
    if (typeof optionalCB === 'function'){
        optionalCB();
    }
    $('.onErr').remove();
};

var close = function() {
    $('.onErr').remove();
};

module.exports = {
    create: create,
    close : close
};
},{}],32:[function(require,module,exports){
var settings = require("../lib/settings.js");
/**
 * Save an option to localStorage. 
 * 
 * @param  {String} selector    the name of the option
 * @param  {String} value       'true' or 'false'
 */
var saveOption = function(optionName, value) {
  localStorage.setItem(optionName,value);

  // new options
  if ( /^draw/i.test(optionName) ) {
    settings.menu[optionName] = value;
  } else if (/(css|customAfkMessage)/i.test(optionName)) {
    settings.custom[optionName] = value;
  } else {
    settings.options[optionName] = value;
  }
  localStorage.setItem( 'dubxUserSettings', JSON.stringify(settings) );
};

var saveMenuOption = function(optionName, value){
  settings.menu[optionName] = value;
  localStorage.setItem( 'dubxUserSettings', JSON.stringify(settings) );
};

var getAllOptions = function(){
  var _stored = localStorage.dubxUserSettings;
  return JSON.parse(_stored);
};

/**
 * Updates the on/off state of the option in the dubx menu
 * @param  {String} selector name of the selector to be updated
 * @param  {Bool} state      true for "on", false for "off"
 * @return {undefined}         
 */
var toggle = function(selector, state){
  var item = document.querySelector(selector + ' .for_content_off i');
  
  if (state === true) {
    item.classList.remove('fi-x');
    item.classList.add('fi-check');
  } else {
    item.classList.remove('fi-check');
    item.classList.add('fi-x');
  }
};

/**
 * TODO: go through all the files and replace .on and .off with the new toggle
 */
// deprecating these 2 eventually, for now they are pass-throughs
var on = function(selector) {
  // $(selector + ' .for_content_off i').replaceWith('<i class="fi-check"></i>');
  toggle(selector, true);
};
var off = function(selector) {
  // $(selector + ' .for_content_off i').replaceWith('<i class="fi-x"></i>');
  toggle(selector, false);
};

var toggleAndSave = function(optionName, state){
  toggle("."+optionName, state);
  return saveOption(optionName, state.toString());
};

module.exports = {
  on: on,
  off: off,
  toggle: toggle,
  toggleAndSave: toggleAndSave,
  saveMenuOption: saveMenuOption
};
},{"../lib/settings.js":7}]},{},[1]);
