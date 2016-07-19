/* global Dubtrack, dubx */

var modal = require('../utils/modal.js');

var myModule = {};

myModule.id = "afk";
myModule.moduleName = "AFK";
myModule.description = "Toggle Away from Keyboard and customize AFK message.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = [
    '<li id="'+myModule.id+'" class="for_content_li for_content_feature afk">',
        '<p class="for_content_off"><i class="fi-x"></i></p>',
        '<p id="createAfkMessage" class="for_content_edit" style="display: inline-block;color: #878c8e;font-size: .85rem;font-weight: bold;float: right;"><i class="fi-pencil"></i></p>',
        '<p class="for_content_p">AFK Autorespond</p>',
    '</li>',
].join('');


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

myModule.go = function(e) {
    if(e.target.className === 'for_content_edit' || e.target.className === 'fi-pencil') {return};

    var newOptionState;
    var optionName = 'afk';

    if (!dubx.options.let_afk) {
        Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
    }

    dubx.options.let_afk = newOptionState;
    dubx.settings = options.toggleAndSave(optionName, newOptionState, dubx.settings);
};

module.exports = {
    afk: afk,
    createAfkMessage: createAfkMessage
};