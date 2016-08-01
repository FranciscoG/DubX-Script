/**
 * Plug.dj theme
 * Toggle the plug.dj css theme
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var css = require('../utils/css.js');

var myModule = {};

myModule.id = "plugdjtheme";
myModule.moduleName = "Plug.dj Theme";
myModule.description = "Toggle the plug.dj css theme.";
myModule.optionState = false;
myModule.category = "customize";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, 'nicole', myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;
    css.load("nicole_css", "/themes/PlugTheme.css");
  } else {
    newOptionState = false;
    $('.nicole_css').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;