/* global dubx */
dubx.sectionList = ['draw_general','draw_userinterface','draw_settings','draw_customize','draw_contact','draw_social','draw_chrome'];

dubx.drawSection = function(el) {
    $(el).next('ul').slideToggle('fast');
    var sectionClass = $(el).next('ul').attr('class');

    var clicked = $(el).find('.for_content_c i');

    if(clicked.hasClass('fi-minus')){
        clicked.removeClass('fi-minus').addClass('fi-plus');
        dubx.saveOption(sectionClass,'false');
        dubx.options[sectionClass] = 'false';
    }
    else{
        clicked.removeClass('fi-plus').addClass('fi-minus');
        dubx.saveOption(sectionClass,'true');
        dubx.options[sectionClass] = 'true';
    }

};

dubx.openAllMenus = function(){
  dubx.sectionList.forEach(function(section,i,arr){
    $('.'+section).slideDown('fast');
    $('.'+section).prev('li').find('i').removeClass('fi-plus').addClass('fi-minus');
    dubx.saveOption(section, 'true');
    dubx.options[section] = 'true';
  });
};

dubx.closeAllMenus = function(){
  dubx.sectionList.forEach(function(section,i,arr){
    $('.'+section).slideUp();
    $('.'+section).prev('li').find('i').removeClass('fi-minus').addClass('fi-plus');
    dubx.saveOption(section,'false');
    dubx.options[section] = 'false';
  });
};

dubx.drawAll = function() {
    var allClosed = true;

    dubx.sectionList.forEach(function(section, i, arr){
      if($('.'+section).css('display') === 'block'){
          allClosed = false;
      }
    });

    if(allClosed) {
      dubx.openAllMenus();
    }
    else {
      dubx.closeAllMenus();
    }
};

dubx.slide = function() {
  $('.for_content').slideToggle('fast');
};

dubx.menu = {
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
  },
  social: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Social',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_social">',
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
      '</ul>'
    ].join('');
  },
  extension: function(){
    return [
      '<li class="for_content_li" onclick="dubx.drawSection(this)">',
          '<p class="for_content_c">',
              'Chrome Extension',
              '<i class="fi-minus"></i>',
          '</p>',
      '</li>',
      '<ul class="draw_chrome">',
          '<li class="for_content_li for_content_feature">',
              '<a href="https://chrome.google.com/webstore/detail/dubx/oceofndagjnpebjmknefoelcpcnpcedm/reviews" target="_blank" style="color: #878c8e;">',
                  '<p class="for_content_off"><i class="fi-like"></i></p>',
                  '<p class="for_content_p">Give Us a Rating</p>',
              '</a>',
          '</li>',
      '</ul>'
    ].join('');
  }

};

dubx.makeMenu = function(){
    // add icon to the upper right corner
    var li = '<div class="for" onclick="dubx.slide();"><img src="'+dubx.srcRoot+'/params/params.svg" alt=""></div>';
    $('.header-right-navigation').append(li);

    $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="'+dubx.srcRoot+'/css/asset.css">');

    var html = [
        '<div class="for_content" style="display:none;">',
          '<span class="for_content_ver">DubX Settings</span>',
          '<span class="for_content_version" onclick="dubx.drawAll();" title="Collapse/Expand Menus">'+dubx.our_version+'</span>',
          '<ul class="for_content_ul">',
            dubx.menu.general(),
            dubx.menu.ui(),
            dubx.menu.settings(),
            dubx.menu.customize(),
            dubx.menu.contact(),
            dubx.menu.social(),
            dubx.menu.extension(),
          '</ul>',
        '</div>'
    ].join('');

    $('body').prepend(html);
    $('.for_content').perfectScrollbar();

};