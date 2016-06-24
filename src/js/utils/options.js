/**
 * Save an option to localStorage.  To keep it functional, you need to pass it
 * the current dubx.settings object and it will return the updated object
 * used the returned object to replace dubx.settings
 * example:
 * var options = require('../utils/options.js');
 * dubx.settings = options.saveOption('snow','true', dubx.settings);
 * 
 * @param  {String} selector    the name of the option
 * @param  {String} value       'true' or 'false'
 * @param  {Object} settingObj  the dubx.settings object
 * @return {Object}             the updated dubx.settings obj
 */
var saveOption = function(optionName, value, settingObj) {
  localStorage.setItem(optionName,value);

  // new options
  if ( /^draw/i.test(optionName) ) {
    settingObj.menu[optionName] = value;
  } else if (/(css|customAfkMessage)/i.test(optionName)) {
    settingObj.custom[optionName] = value;
  } else {
    settingObj.general[optionName] = value;
  }
  localStorage.setItem( 'dubxUserSettings', JSON.stringify(settingObj) );
  return settingObj;
};

/**
 * Updates the on/off state of the option in the dubx menu
 * @param  {String} selector name of the selector to be updated
 * @param  {Bool} state      true for "on", false for "off"
 * @return {undefined}         
 */
var toggle = function(selector, state){
  var status = state ? "check" : "x";
  $(selector + ' .for_content_off i').replaceWith('<i class="fi-'+status+'"></i>');
};

/**
 * TODO: go through all the files and replace .on and .off with the new toggle
 */
// deprecating these 2 eventually, for now they are pass-throughs
var on = function(selector) {
  // $(selector + ' .for_content_off i').replaceWith('<i class="fi-check"></i>');
  toggle(selector, true);
};
var off = function(selector) {
  // $(selector + ' .for_content_off i').replaceWith('<i class="fi-x"></i>');
  toggle(selector, false);
};

var toggleAndSave = function(optionName, state, settingObj){
  toggle("."+optionName, state);
  return saveOption(optionName, state.toString(), settingObj);
};

module.exports = {
  on: on,
  off: off,
  toggle: toggle,
  toggleAndSave: toggleAndSave
};