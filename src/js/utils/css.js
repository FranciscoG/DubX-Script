var settings = require("../lib/settings.js");

/**
 * Loads a CSS file into <head>
 * Assumes all CSS files lives at  root/...
 * @param {string} className  class name for element
 * @param {string} cssFile    the css file location starting after /root/css
 *
 * example:  css.load("show_timestamps_link", "/options/show_timestamps.css");
 */
var load = function(className,cssFile){
  var src =  settings.srcRoot + cssFile;
  var cn = className || '';
  $('head').append('<link class="'+cn+'" rel="stylesheet" type="text/css" href="'+src+'">');
};

/**
 * Use this to load any external CSS files that are not in this repo
 */
var loadExternal = function(className,cssFile){
  $('head').append('<link class="'+className+'" rel="stylesheet" type="text/css" href="'+cssFile+'">');
};

module.exports = {
  load : load,
  loadExternal: loadExternal
};