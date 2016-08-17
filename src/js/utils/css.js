var settings = require("../lib/settings.js");

/**
 * Loads a CSS file into <head>
 * @param {string} cssFile    the css file location
 * @param {string} className  class name for element
 *
 * example:  css.load("/options/show_timestamps.css", "show_timestamps_link");
 */
var load = function(cssFile, className){
  if (!cssFile) {return;}
  var src =  settings.srcRoot + cssFile;
  var cn = className || '';
  $('head').append('<link class="'+cn+'" rel="stylesheet" type="text/css" href="'+src+'">');
};

/**
 * Use this to load any external CSS files that are not in this repo
 */
var loadExternal = function(cssFile, className){
  if (!cssFile) {return;}
  var cn = className || '';
  $('head').append('<link class="'+cn+'" rel="stylesheet" type="text/css" href="'+cssFile+'">');
};

module.exports = {
  load : load,
  loadExternal: loadExternal
};