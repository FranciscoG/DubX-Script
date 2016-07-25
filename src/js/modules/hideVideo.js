/**
 * Hide Video
 * Toggle hiding of the Video box.
 */

/* global Dubtrack */
var menu = require('../init/menu.js');
var settings = require("../init/settings.js");

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
    $('head').append('<link class="chat_window_link" rel="stylesheet" type="text/css" href="'+settings.srcRoot+'/css/options/chat_window.css">');
  } else {
    newOptionState= false;
    $('.chat_window_link').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;