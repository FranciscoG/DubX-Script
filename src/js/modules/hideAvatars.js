/**
 * Hide Avatars
 * Toggle hiding user avatars in the chat box.
 */

/* global Dubtrack */
var menu = require('../init/menu.js');
var settings = require("../init/settings.js");

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
    $('head').append('<link class="hide_avatars_link" rel="stylesheet" type="text/css" href="'+settings.srcRoot+'/css/options/hide_avatars.css">');
  } else {
    newOptionState= false;
    $('.hide_avatars_link').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;