/**
 * Community Theme
 * Toggle Community CSS theme
 */

/* global Dubtrack */
var menu = require('../init/menu.js');
var settings = require("../init/settings.js");

var myModule = {};

myModule.id = "css_world";
myModule.moduleName = "Community Theme";
myModule.description = "Toggle Community CSS theme.";
myModule.optionState = false;
myModule.category = "customize";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, 'css', myModule.moduleName);


myModule.go = function() {
  var newOptionState;

  if (!this.optionState) {
    newOptionState = true;

    var location = Dubtrack.room.model.get('roomUrl');
    $.ajax({
        type: 'GET',
        url: 'https://api.dubtrack.fm/room/'+location,
    }).done(function(e) {
        var content = e.data.description;
        var url = content.match(/(@dubx=)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/);

        if(!url) {return;}

        var append = url[0].split('@dubx=');
        $('head').append('<link class="css_world" href="'+append[1]+'" rel="stylesheet" type="text/css">');
    });

  } else {
    newOptionState = false;
    $('.css_world').remove();
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;