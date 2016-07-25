/**
 * Show Timestamps
 * Toggle always showing chat message timestamps.
 */

/* global Dubtrack */
var menu = require('../init/menu.js');
var settings = require("../init/settings.js");

var myModule = {};

myModule.id = "show_timestamps";
myModule.moduleName = "Show Timestamps";
myModule.description = "Toggle always showing chat message timestamps.";
myModule.optionState = false;
myModule.category = "settings";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, myModule.id, myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;

    $('head').append('<link class="show_timestamps_link" rel="stylesheet" type="text/css" href="'+settings.srcRoot+'/css/options/show_timestamps.css">');
  } else {
    newOptionState = false;
    $('.show_timestamps_link').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;