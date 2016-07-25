/**
 * Bug Report
 */

/* global Dubtrack */
var menu = require('../init/menu.js');
var settings = require("../init/settings.js");
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
    $('.report').replaceWith('<li onclick="" class="for_content_li for_content_feature report"><p class="for_content_off"><i class="fi-check"></i></p><p class="for_content_p">Bug Report</p></li>');
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