/**
 * Show Dubs on Hover
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');
var modal = require('../utils/modal.js');
var settings = require("../lib/settings.js");

var myModule = {};

myModule.id = "dubs_hover";
myModule.moduleName = "Show Dub info on Hover";
myModule.description = "Show Dub info on Hover.";
myModule.optionState = false;
myModule.category = "ui";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function(e) {
  
  var newOptionState;
  if (!this.optionState) {
    newOptionState = true;
    
    this.grabInfoWarning();
    this.showDubsOnHover();

  } else {
    newOptionState = false;
    this.stopDubsOnHover();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;

/*******************************/


myModule.resetGrabs = function(){
  this.dubs.grabs = []; //TODO: Remove when we can hit the api for all grabs of current playing song
};

myModule.grabInfoWarning = function(){
    modal.create({
      title: 'Grab Vote Info',
      content: 'Please note that this feature is currently still in development. We are waiting on the ability to pull grab vote information from Dubtrack on load. Until then the only grabs you will be able to see are those you are present in the room for.',
      confirmButtonClass: 'confirm-for-grab-info'
    });
};

myModule.showDubsOnHover = function(){
  var self = this;

  this.resetDubs();

  Dubtrack.Events.bind("realtime:room_playlist-dub", this.dubWatcher);
  Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
  Dubtrack.Events.bind("realtime:user-leave", this.dubUserLeaveWatcher);
  Dubtrack.Events.bind("realtime:room_playlist-update", this.resetDubs);
  Dubtrack.Events.bind("realtime:room_playlist-update", this.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song

  var dubupEl = $('.dubup').first().parent('li');
  var dubdownEl = $('.dubdown').first().parent('li');
  var grabEl = $('.add-to-playlist-button').first().parent('li');

  $(dubupEl).addClass("dubx-updubs-hover");
  $(dubdownEl).addClass("dubx-downdubs-hover");
  $(grabEl).addClass("dubx-grabs-hover");

  //Show compiled info containers when casting/changing vote
  $(dubdownbupEl).click(function(event){
    $('#dubx-updubs-container').remove();
        var x = event.clientX, y = event.clientY;

        if(!x || !y || isNaN(x) || isNaN(y)){
            return $('#dubx-downdubs-container').remove();
        }

        var elementMouseIsOver = document.elementFromPoint(x, y);

    if($(elementMouseIsOver).hasClass('dubx-updubs-hover') || $(elementMouseIsOver).parents('.dubx-updubs-hover').length > 0){
        setTimeout(function(){$(dubupEl).mouseenter();}, 250);
    }
  });
  $(dubdownEl).click(function(event){
    $('#dubx-downdubs-container').remove();
        var x = event.clientX, y = event.clientY;

        if(!x || !y || isNaN(x) || isNaN(y)){
            return $('#dubx-downdubs-container').remove();
        }

        var elementMouseIsOver = document.elementFromPoint(x, y);

    if($(elementMouseIsOver).hasClass('dubx-downdubs-hover') || $(elementMouseIsOver).parents('.dubx-downdubs-hover').length > 0){
        setTimeout(function(){$(dubdownEl).mouseenter();}, 250);
    }
  });
  $(grabEl).click(function(event){
    $('#dubx-grabs-container').remove();
        var x = event.clientX, y = event.clientY;

        if(!x || !y || isNaN(x) || isNaN(y)){
            return $('#dubx-grabs-container').remove();
        }

        var elementMouseIsOver = document.elementFromPoint(x, y);

    if($(elementMouseIsOver).hasClass('dubx-grabs-hover') || $(elementMouseIsOver).parents('.dubx-grabs-hover').length > 0){
        setTimeout(function(){$(grabEl).mouseenter();}, 250);
    }
  });

  $(dubupEl).mouseenter(function(){
    if($("#dubx-updubs-container").length > 0) return; //already exists

    var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
    var dubupBackground = $('.dubup').hasClass('voted') ? $('.dubup').css('background-color') : $('.dubup').find('.icon-arrow-up').css('color');
    var html;

    if(this.dubs.upDubs.length > 0){
        html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-updubs-hover" style="border-color: '+dubupBackground+'">';
        this.dubs.upDubs.forEach(function(val){
            html += '<li class="preview-dubinfo-item users-previews dubx-updubs-hover">' +
                        '<div class="dubinfo-image">' +
                            '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                        '</div>' +
                        '<span class="dubinfo-text">@' + val.username + '</span>' +
                    '</li>'
        });
        html += '</ul>';                     
    }
    else{
        html = '<div id="dubinfo-preview" class="dubinfo-show dubx-updubs-hover dubx-no-dubs" style="border-color: '+dubupBackground+'">' +
                    'No updubs have been casted yet!' +
                '</div>';
    }

    var newEl = document.createElement('div');
    newEl.id = 'dubx-updubs-container';
    newEl.className = 'dubinfo-show dubx-updubs-hover';
    newEl.innerHTML = html;
    newEl.style.visibility = "hidden";
    document.body.appendChild(newEl);

    var elemRect = this.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    newEl.style.visibility = "";
    newEl.style.width = infoPaneWidth + 'px';
    newEl.style.top = (elemRect.top-150) + 'px';

    //If info pane would run off screen set the position on right edge
    if(bodyRect.right - elemRect.left >= infoPaneWidth){
        newEl.style.left = elemRect.left + 'px';
    }
    else{
        newEl.style.right = 0;
    }

    document.body.appendChild(newEl);

    $(this).addClass('dubx-updubs-hover');

    $(document.body).on('click', '.preview-dubinfo-item', function(e){
        var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
        self.updateChatInputWithString(new_text);
    });

    $('#dubinfo-preview').perfectScrollbar();

    $('.dubx-updubs-hover').mouseleave(function(event){
        var x = event.clientX, y = event.clientY;

        if(!x || !y || isNaN(x) || isNaN(y)){
            return $('#dubx-downdubs-container').remove();
        }

        var elementMouseIsOver = document.elementFromPoint(x, y);

        if(!$(elementMouseIsOver).hasClass('dubx-updubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-updubs-hover').length <= 0){
            $('#dubx-updubs-container').remove();
        }

    });
  });
  $(dubdownEl).mouseenter(function(){
    if($("#dubx-downdubs-container").length > 0) return; //already exists

    var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
    var dubdownBackground = $('.dubdown').hasClass('voted') ? $('.dubdown').css('background-color') : $('.dubdown').find('.icon-arrow-down').css('color');
    var html;

    if(this.userIsAtLeastMod(Dubtrack.session.id)){
        if(this.dubs.downDubs.length > 0){
            html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover" style="border-color: '+dubdownBackground+'">';
            this.dubs.downDubs.forEach(function(val){
                html += '<li class="preview-dubinfo-item users-previews dubx-downdubs-hover">' +
                            '<div class="dubinfo-image">' +
                                '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                            '</div>' +
                            '<span class="dubinfo-text">@' + val.username + '</span>' +
                        '</li>'
            });
            html += '</ul>';                     
        }
        else{
            html = '<div id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover dubx-no-dubs" style="border-color: '+dubdownBackground+'">' +
                        'No downdubs have been casted yet!' +
                    '</div>';
        }
    }
    else{
        html = '<div id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover dubx-downdubs-unauthorized" style="border-color: '+dubdownBackground+'">' +
                    'You must be at least a mod to view downdubs!' +
                '</div>';
    }

    var newEl = document.createElement('div');
    newEl.id = 'dubx-downdubs-container';
    newEl.className = 'dubinfo-show dubx-downdubs-hover';
    newEl.innerHTML = html;
    newEl.style.visibility = "hidden";
    document.body.appendChild(newEl);

    var elemRect = this.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    newEl.style.visibility = "";
    newEl.style.width = infoPaneWidth + 'px';
    newEl.style.top = (elemRect.top-150) + 'px';

    //If info pane would run off screen set the position on right edge
    if(bodyRect.right - elemRect.left >= infoPaneWidth){
        newEl.style.left = elemRect.left + 'px';
    }
    else{
        newEl.style.right = 0;
    }

    document.body.appendChild(newEl);

    $(this).addClass('dubx-downdubs-hover');

    $(document.body).on('click', '.preview-dubinfo-item', function(e){
        var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
        self.updateChatInputWithString(new_text);
    });

    $('#dubinfo-preview').perfectScrollbar();

    $('.dubx-downdubs-hover').mouseleave(function(event){
        var x = event.clientX, y = event.clientY;

        if(!x || !y || isNaN(x) || isNaN(y)){
            return $('#dubx-downdubs-container').remove();
        }

        var elementMouseIsOver = document.elementFromPoint(x, y);

        if(!$(elementMouseIsOver).hasClass('dubx-downdubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-downdubs-hover').length <= 0){
            $('#dubx-downdubs-container').remove();
        }

    });
  });
  $(grabEl).mouseenter(function(){
    if($("#dubx-grabs-container").length > 0) return; //already exists

    var infoPaneWidth = $(dubupEl).innerWidth() + $(grabEl).innerWidth();
    var grabsBackground = $('.add-to-playlist-button').hasClass('grabbed') ? $('.add-to-playlist-button').css('background-color') : $('.add-to-playlist-button').find('.icon-heart').css('color');
    var html;

    if(this.dubs.grabs.length > 0){
        html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-grabs-hover" style="border-color: '+grabsBackground+'">';
        this.dubs.grabs.forEach(function(val){
            html += '<li class="preview-dubinfo-item users-previews dubx-grabs-hover">' +
                        '<div class="dubinfo-image">' +
                            '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                        '</div>' +
                        '<span class="dubinfo-text">@' + val.username + '</span>' +
                    '</li>'
        });
        html += '</ul>';                     
    }
    else{
        html = '<div id="dubinfo-preview" class="dubinfo-show dubx-grabs-hover dubx-no-grabs" style="border-color: '+grabsBackground+'">' +
                    'This song hasn\'t been grabbed yet!' +
                '</div>';
    }

    var newEl = document.createElement('div');
    newEl.id = 'dubx-grabs-container';
    newEl.className = 'dubinfo-show dubx-grabs-hover';
    newEl.innerHTML = html;
    newEl.style.visibility = "hidden";
    document.body.appendChild(newEl);

    var elemRect = this.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    newEl.style.visibility = "";
    newEl.style.width = infoPaneWidth + 'px';
    newEl.style.top = (elemRect.top-150) + 'px';

    //If info pane would run off screen set the position on right edge
    if(bodyRect.right - elemRect.left >= infoPaneWidth){
        newEl.style.left = elemRect.left + 'px';
    }
    else{
        newEl.style.right = 0;
    }

    document.body.appendChild(newEl);

    $(this).addClass('dubx-grabs-hover');

    $(document.body).on('click', '.preview-dubinfo-item', function(e){
        var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
        self.updateChatInputWithString(new_text);
    });

    $('#dubinfo-preview').perfectScrollbar();

    $('.dubx-grabs-hover').mouseleave(function(event){
        var x = event.clientX, y = event.clientY;

        if(!x || !y || isNaN(x) || isNaN(y)){
            return $('#dubx-grabs-container').remove();
        }

        var elementMouseIsOver = document.elementFromPoint(x, y);

        if(!$(elementMouseIsOver).hasClass('dubx-grabs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-grabs-hover').length <= 0){
            $('#dubx-grabs-container').remove();
        }

    });
  });
 
};

myModule.stopDubsOnHover = function(){
    Dubtrack.Events.unbind("realtime:room_playlist-dub", this.dubWatcher);
    Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
    Dubtrack.Events.unbind("realtime:user-leave", this.dubUserLeaveWatcher);
    Dubtrack.Events.unbind("realtime:room_playlist-update", this.resetDubs);
    Dubtrack.Events.unbind("realtime:room_playlist-update", this.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song
};


myModule.dubUserLeaveWatcher = function(e){
    var self = this;
    //Remove user from dub list
    if($.grep(this.dubs.upDubs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(self.dubs.upDubs, function(i){
            if(self.dubs.upDubs[i].userid === e.user._id) {
                self.dubs.upDubs.splice(i,1);
                return false;
            }
        });
    }
    if($.grep(this.dubs.downDubs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(self.dubs.downDubs, function(i){
            if(self.dubs.downDubs[i].userid === e.user._id) {
                self.dubs.downDubs.splice(i,1);
                return false;
            }
        });
    }
    if($.grep(mydubs.grabs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(self.dubs.grabs, function(i){
            if(self.dubs.grabs[i].userid === e.user._id) {
                self.dubs.grabs.splice(i,1);
                return false;
            }
        });
    }
};

myModule.grabWatcher = function(e){
    var self = this;
    //If grab already casted
    if($.grep(this.dubs.grabs, function(el){ return el.userid == e.user._id; }).length <= 0){
        self.dubs.grabs.push({
            userid: e.user._id,
            username: e.user.username
        });
    }
};

myModule.updateChatInputWithString = function(str){
    $("#chat-txt-message").val(str).focus();
};

myModule.userIsAtLeastMod = function(userid){
    return Dubtrack.helpers.isDubtrackAdmin(userid) ||
            Dubtrack.room.users.getIfOwner(userid) ||
            Dubtrack.room.users.getIfManager(userid) ||
            Dubtrack.room.users.getIfMod(userid);
};

myModule.deleteChatMessageClientSide = function(el){
  $(el).parent('li')[0].remove();
};

myModule.dubWatcher = function(e){
    if(e.dubtype === 'updub'){
        //If dub already casted
        if($.grep(this.dubs.upDubs, function(el){ return el.userid === e.user._id; }).length <= 0){
            self.dubs.upDubs.push({
                userid: e.user._id,
                username: e.user.username
            });
        }

        //Remove user from other dubtype if exists
        if($.grep(this.dubs.downDubs, function(el){ return el.userid === e.user._id; }).length > 0){
            $.each(self.dubs.downDubs, function(i){
                if(self.dubs.downDubs[i].userid === e.user._id) {
                    self.dubs.downDubs.splice(i,1);
                    return false;
                }
            });
        }
    }
    else if(e.dubtype === 'downdub'){
        //If dub already casted
        if($.grep(this.dubs.downDubs, function(el){ return el.userid === e.user._id; }).length <= 0 && this.userIsAtLeastMod(Dubtrack.session.id)){
            self.dubs.downDubs.push({
                userid: e.user._id,
                username: e.user.username
            });
        }

        //Remove user from other dubtype if exists
        if($.grep(this.dubs.upDubs, function(el){ return el.userid === e.user._id; }).length > 0){
            $.each(self.dubs.upDubs, function(i){
                if(self.dubs.upDubs[i].userid === e.user._id) {
                    self.dubs.upDubs.splice(i,1);
                    return false;
                }
            });
        }
    }

    var msSinceSongStart = new Date() - new Date(Dubtrack.room.player.activeSong.attributes.song.played);
    if(msSinceSongStart < 1000) return;

    if(this.dubs.upDubs.length !== Dubtrack.room.player.activeSong.attributes.song.updubs){
        // console.log("Updubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
        this.resetDubs();
    }
    else if(this.userIsAtLeastMod(Dubtrack.session.id) && this.dubs.downDubs.length !== Dubtrack.room.player.activeSong.attributes.song.downdubs){
        // console.log("Downdubs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
        this.resetDubs();
    }
    // TODO: Uncomment this else if block when we can hit the api for all grabs of current playing song
    /*
    else if(this.dubs.grabs.length !== parseInt($('.grab-counter')[0].innerHTML)){
        console.log("Grabs don't match, reset! Song started ", msSinceSongStart, "ms ago!");
        this.resetDubs();
    }*/
};

myModule.resetDubs = function(){
    var self = this;
    this.dubs.upDubs = [];
    this.dubs.downDubs = [];
    // this.dubs.grabs: [] //TODO: Uncomment this when we can hit the api for all grabs of current playing song

    $.getJSON("https://api.dubtrack.fm/room/" + Dubtrack.room.model.id + "/playlist/active/dubs", function(response){
        response.data.upDubs.forEach(function(e){
            //Dub already casted (usually from autodub)
            if($.grep(self.dubs.upDubs, function(el){ return el.userid == e.userid; }).length > 0){
                return;
            }

            var username;
            if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
                $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                    if(response && response.userinfo)
                        username = response.userinfo.username;
                });
            }
            else{
                username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
            }

            if(!username) return;

            self.dubs.upDubs.push({
                userid: e.userid,
                username: username
            });
        });
        //TODO: Uncomment this when we can hit the api for all grabs of current playing song
        /*response.data.grabs.forEach(function(e){
            //Dub already casted (usually from autodub)
            if($.grep(self.dubs.grabs, function(el){ return el.userid == e.userid; }).length > 0){
                return;
            }

            var username;
            if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
                $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                    username = response.userinfo.username;
                });
            }
            else{
                username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
            }

            self.dubs.grabs.push({
                userid: e.userid,
                username: username
            })
        });*/

        //Only let mods or higher access down dubs
        if(self.userIsAtLeastMod(Dubtrack.session.id)){
            response.data.downDubs.forEach(function(e){
                //Dub already casted
                if($.grep(self.dubs.downDubs, function(el){ return el.userid == e.userid; }).length > 0){
                    return;
                }

                var username;
                if(!Dubtrack.room.users.collection.findWhere({userid: e.userid}) || !Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes) {
                    $.getJSON("https://api.dubtrack.fm/user/" + e.userid, function(response){
                        username = response.userinfo.username;
                    });
                }
                else{
                    username = Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username;
                }

                self.dubs.downDubs.push({
                    userid: e.userid,
                    username: Dubtrack.room.users.collection.findWhere({userid: e.userid}).attributes._user.username
                });
            });
        }
    });
};