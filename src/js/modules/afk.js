/**
 * AFK -  Away from Keyboard
 * Toggles the afk auto response on/off
 * including adding a custom message
 */

/* global Dubtrack, dubx */
var modal = require('../utils/modal.js');
var options = require('../utils/options.js');
var menu = require('../init/menu.js');

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
    if (content.indexOf('@'+user) >-1 && Dubtrack.session.id !== e.user.userInfo.userid) {
        if (dubx.options.let_active_afk) {
            if (localStorage.getItem('customAfkMessage')) {
                var customAfkMessage = localStorage.getItem('customAfkMessage');
                $('#chat-txt-message').val('[AFK] '+customAfkMessage);
            } else {
                $('#chat-txt-message').val("[AFK] I'm not here right now.");
            }
            Dubtrack.room.chat.sendMessage();
            dubx.options.let_active_afk = false;
            setTimeout(function() {
                dubx.options.let_active_afk = true;
            }, 180000);
        }
    }
};

var saveAfkMessage =function() {
    var customAfkMessage = $('.input').val();
    options.saveOption('customAfkMessage', customAfkMessage);
    $('.onErr').remove();
};

var createAfkMessage =function() {
    var current = localStorage.getItem('customAfkMessage');
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
        Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
    }

    this.optionState = newOptionState;
    this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;