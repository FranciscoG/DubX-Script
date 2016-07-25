
dubx.personalize = function() {
  $('.isUser').text(Dubtrack.session.get('username'));
};

dubx.dubinfoInit = function(){
    $('head').prepend('<link rel="stylesheet" type="text/css" href="'+dubx.srcRoot+'/css/options/dubinfo.css">');
};

dubx.init = function() {
  $('html').addClass('dubx');
  $.getScript('https://rawgit.com/loktar00/JQuery-Snowfall/master/src/snowfall.jquery.js');

  $('.player_sharing').append('<span class="icon-history eta_tooltip_t" onmouseover="dubx.eta();" onmouseout="dubx.hide_eta();"></span>');

  $('.icon-mute.snooze_btn:after').css({"content": "1", "vertical-align": "top", "font-size": "0.75rem", "font-weight": "700"});

  dubx.makeMenu();
  dubx.personalize();
  dubx.previewListInit();
  dubx.userAutoComplete();
  dubx.dubinfoInit();

  dubx.convertSettings();

  dubx.settings = JSON.parse( localStorage.getItem( 'dubxUserSettings' ) );

  //Ref 4:
  if (localStorage.getItem('autovote') === 'true') {
      dubx.autovote();
  }
  if (localStorage.getItem('split_chat') === 'true') {
      dubx.split_chat();
  }
  if (localStorage.getItem('medium_disable') === 'true') {
      dubx.medium_disable();
  }
  if (localStorage.getItem('warn_redirect') === 'true') {
      dubx.warn_redirect();
  }
  if (localStorage.getItem('chat_window') === 'true') {
      dubx.chat_window();
  }
  if (localStorage.getItem('hide_avatars') === 'true') {
      dubx.hide_avatars();
  }
  if (localStorage.getItem('show_timestamps') === 'true') {
      dubx.show_timestamps();
  }
  if (localStorage.getItem('video_window') === 'true') {
      dubx.video_window();
  }
  if (localStorage.getItem('css_world') === 'true') {
      dubx.css_world();
  }
  if (localStorage.getItem('nicole') === 'true') {
      dubx.nicole();
  }
  if (localStorage.getItem('twitch_emotes') === 'true') {
      dubx.twitch_emotes();
  }
  if (localStorage.getItem('emoji_preview') === 'true') {
      dubx.emoji_preview();
  }
  if (localStorage.getItem('autocomplete_mentions') === 'true') {
      dubx.optionMentions();
  }
  if (localStorage.getItem('mention_notifications') === 'true') {
      dubx.mentionNotifications();
  }
  if (localStorage.getItem('custom_mentions')) {
      dubx.customMentions();
  }
  if (localStorage.getItem('spacebar_mute') === 'true') {
      dubx.spacebar_mute();
  }
  if (localStorage.getItem('downdub_chat') === 'true') {
      dubx.downdubChat();
  }
  if (localStorage.getItem('updub_chat') === 'true') {
      dubx.updubChat();
  }
  if (localStorage.getItem('grab_chat') === 'true') {
      dubx.grabChat();
  }
  if (localStorage.getItem('dubs_hover') === 'true') {
      dubx.showDubsOnHover();
  }

  for(var i = 0; i < dubx.sectionList.length; i++){
    if (localStorage.getItem(dubx.sectionList[i]) === 'false') {
        $('.'+dubx.sectionList[i]).css('display', 'none');
        $('.'+dubx.sectionList[i]).prev('li').find('i').removeClass('fi-minus').addClass('fi-plus');
        dubx.options[dubx.sectionList[i]] = 'false';
    }
    else if(localStorage.getItem(dubx.sectionList[i]) === undefined) {
        dubx.option(dubx.sectionList[i], 'true');
        dubx.options[dubx.sectionList[i]] = 'true';
    }
    else {
        dubx.options[dubx.sectionList[i]] = 'true';
    }
  }

  $('document').ready(dubx.css_run);
  $('document').ready(dubx.medium_load);

  $('.for').click(function() {
      $('.for_content').show();
  });

  // Ref 5:
  $('.chat-main').on('DOMNodeInserted', function(e) {
      var itemEl = $(e.target);
      if(itemEl.prop('tagName').toLowerCase() !== 'li' || itemEl.attr('class').substring(0, 'user-'.length) !== 'user-') return;
      var user = Dubtrack.room.users.collection.findWhere({userid: itemEl.attr('class').split(/-| /)[1]});
      var role = !user.get('roleid') ? 'default' : Dubtrack.helpers.isDubtrackAdmin(user.get('userid')) ? 'admin' : user.get('roleid').type;
      itemEl.addClass('is' + (role.charAt(0).toUpperCase() + role.slice(1)));
  });
};


var dubxLoaded;
if (!dubxLoaded && Dubtrack.session.id) {
    dubxLoaded = true;

    dubx.init();

} else {
    function onErr(error) {
        var onErr = [
            '<link rel="stylesheet" type="text/css" href="'+dubx.srcRoot+'/css/asset.css">',
            '<div class="onErr">',
                '<div class="container">',
                    '<div class="title">',
                        '<h1>Oh noes:</h1>',
                    '</div>',
                    '<div class="content">',
                        '<p>'+error+'</p>',
                    '</div>',
                    '<div class="control">',
                        '<div class="cancel" onclick="dubx.closeErr();">',
                            '<p>Cancel</p>',
                        '</div>',
                        '<div class="confirm confirm-err">',
                            '<p>Okay</p>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
        $('body').prepend(onErr);
    }
    if (!Dubtrack.session.id) {
        onErr('You\'re not logged in. Please login to use DUBX.');
    } else {
        onErr('Oh noes! We\'ve encountered a runtime error');
    };
    function closeErr() {
        $('.onErr').remove();
    };
    $('.cancel').click(closeErr);
    $('.confirm-err').click(closeErr);
}