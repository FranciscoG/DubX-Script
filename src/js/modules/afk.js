/**
 * AFK -  Away from Keyboard
 * Toggles the afk auto response on/off
 * including adding a custom message
 */

/* global Dubtrack */
var modal = require('../utils/modal.js');
var options = require('../utils/options.js');
var menu = require('../init/menu.js');
var settings = require("../init/settings.js");

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