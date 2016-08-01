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
