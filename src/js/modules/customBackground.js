/**
 * Custom Background
 * Add your own custom background
 */

/* global Dubtrack */
var menu = require('../lib/menu.js');
var settings = require("../lib/settings.js");
var modal = require('../utils/modal.js');
var options = require('../utils/options.js');

var myModule = {};

myModule.id = "customBG";
myModule.moduleName = "Custom Background";
myModule.description = "Add your own custom background.";
myModule.optionState = false;
myModule.category = "customize";
myModule.menuHTML = menu.makeOtherMenuHTML('unlink', myModule.id, myModule.description, '', myModule.moduleName);

myModule.init = function(){
  if (settings.general.medium !== null) {
      $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+settings.general.medium+');background-size: cover;top: 0;"></div>');
  }
};

var saveCustomBG = function() {
    var content = $('.input').val();
    options.saveOption('medium',content);
    $('.medium').remove();
    $('body').append('<div class="medium" style="width: 100vw;height: 100vh;z-index: -999998;position: fixed; background: url('+content+');background-size: cover;top: 0;"></div>');
};

myModule.go = function() {
    modal.create({
        title: 'Link an image file:',
        content: 'It is recommended a .jpg file is used',
        placeholder: 'https://example.com/example.jpg',
        confirmButtonClass: 'confirm-for314',
        maxlength: '999',
        confirmCallback: saveCustomBG
    });
};

module.exports = myModule;