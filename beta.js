(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
    THE Q PUBLIC LICENSE version 1.0
    Copyright (C) 1999-2005 Trolltech AS, Norway.
    Everyone is permitted to copy and distribute this license document.
    The intent of this license is to establish freedom to share and change the software regulated by this license under the open source model.
    This license applies to any software containing a notice placed by the copyright holder saying that it may be distributed under the terms of the Q Public License version 1.0. Such software is herein referred to as the Software. This license covers modification and distribution of the Software, use of third-party application programs based on the Software, and development of free software which uses the Software.
    Granted Rights
    1. You are granted the non-exclusive rights set forth in this license provided you agree to and comply with any and all conditions in this license. Whole or partial distribution of the Software, or software items that link with the Software, in any form signifies acceptance of this license.
    2. You may copy and distribute the Software in unmodified form provided that the entire package, including - but not restricted to - copyright, trademark notices and disclaimers, as released by the initial developer of the Software, is distributed.
    3. You may make modifications to the Software and distribute your modifications, in a form that is separate from the Software, such as patches. The following restrictions apply to modifications:
    a. Modifications must not alter or remove any copyright notices in the Software.
    b. When modifications to the Software are released under this license, a non-exclusive royalty-free right is granted to the initial developer of the Software to distribute your modification in future versions of the Software provided such versions remain available under these terms in addition to any other license(s) of the initial developer.
    4. You may distribute machine-executable forms of the Software or machine-executable forms of modified versions of the Software, provided that you meet these restrictions:
    a. You must include this license document in the distribution.
    b. You must ensure that all recipients of the machine-executable forms are also able to receive the complete machine-readable source code to the distributed Software, including all modifications, without any charge beyond the costs of data transfer, and place prominent notices in the distribution explaining this.
    c. You must ensure that all modifications included in the machine-executable forms are available under the terms of this license.
    5. You may use the original or modified versions of the Software to compile, link and run application programs legally developed by you or by others.
    6. You may develop application programs, reusable components and other software items that link with the original or modified versions of the Software. These items, when distributed, are subject to the following requirements:
    a. You must ensure that all recipients of machine-executable forms of these items are also able to receive and use the complete machine-readable source code to the items without any charge beyond the costs of data transfer.
    b. You must explicitly license all recipients of your items to use and re-distribute original and modified versions of the items in both machine-executable and source code forms. The recipients must be able to do so without any charges whatsoever, and they must be able to re-distribute to anyone they choose.
    c. If the items are not available to the general public, and the initial developer of the Software requests a copy of the items, then you must supply one.
    Limitations of Liability
    In no event shall the initial developers or copyright holders be liable for any damages whatsoever, including - but not restricted to - lost revenue or profits or other direct, indirect, special, incidental or consequential damages, even if they have been advised of the possibility of such damages, except to the extent invariable law, if any, provides otherwise.
    No Warranty
    The Software and this license document are provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
    Choice of Law
    This license is governed by the Laws of Norway. Disputes shall be settled by Oslo City Court.
*/
var bugReport = require('./contact/bugReport.js');
var snow = require('./general/snow.js');

var dubx = {
  // options and constants  
  our_version : '03.05.00 - Dub Vote Info',
  srcRoot: 'https://rawgit.com/FranciscoG/DubX-Script/modularize',
  options : {
      let_autovote: false,
      let_split_chat: false,
      let_fs: false,
      let_medium_disable: false,
      let_warn_redirect: false,
      let_afk: false,
      let_active_afk: true,
      let_chat_window: false,
      let_css: false,
      let_hide_avatars: false,
      let_nicole: false,
      let_show_timestamps: false,
      let_video_window: false,
      let_twitch_emotes: false,
      let_emoji_preview: false,
      let_spacebar_mute: false,
      let_autocomplete_mentions: false,
      let_mention_notifications: false,
      let_downdub_chat_notifications: false,
      let_updub_chat_notifications: false,
      let_grab_chat_notifications: false,
      let_dubs_hover: false,
      let_custom_mentions: false,
      let_snow: false,
      draw_general: false,
      draw_userinterface: false,
      draw_settings: false,
      draw_customize: false,
      draw_contact: false,
      draw_social: false,
      draw_chrome: false
    },
    dubs : {
      upDubs: [],
      downDubs: [],
      grabs: []
    },

    // functions
    report_modal: bugReport.report_modal,
    snow: snow
};
},{"./contact/bugReport.js":2,"./general/snow.js":3}],2:[function(require,module,exports){
var modal = require('../utils/modal.js');

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

var report_modal = function() {
    modal.create(
        {
            title: 'Bug Report:',
            content: '',
            placeholder:'Please only report bugs for DubX, not Dubtrack. \nBe sure to give a detailed description of the bug, and a way to replicate it, if possible.'
            ,
            confirmButtonClass: 'confirm-for36',
            maxlength: '999',
            confirmCallback: function(){
                report_content();
                modal.close();
            }
        }
    );
};

module.exports = {
    report_modal: report_modal
};
},{"../utils/modal.js":4}],3:[function(require,module,exports){
var options = require('../utils/options.js');

/* global dubx  */
var snow = function() {
    var newOptionState;
    
    if (!dubx.options.let_snow) {
        newOptionState = true;
        $(document).snowfall({
            round: true,
            shadow: true,
            flakeCount: 50,
            minSize: 1,
            maxSize: 5,
            minSpeed: 5,
            maxSpeed: 5
        });
    } else {
        newOptionState= false;
        $(document).snowfall('clear');
    }

    dubx.options.let_snow = newOptionState;
    options.toggle('.snow', newOptionState);
    dubx.settings = options.saveOption('snow', newOptionState.toString(), dubx.settings);
};

module.exports = snow;
},{"../utils/options.js":5}],4:[function(require,module,exports){
/**
 * input is a modal used to display messages and also capture data
 * 
 * @param  {String} title       title that shows at the top of the modeal
 * @param  {String} content     A descriptive message on what the modal is for
 * @param  {String} placeholder placeholder for the textarea
 * @param  {String} confirm     a way to customize the text of the confirm button
 * @param  {Number} maxlength   for the textarea maxlength attribute
 */
var create = function(infoObj) {
    var defaults = {
        title: null,
        content: null,
        placeholder: null,
        confirmButtonClass: null,
        maxlength: null,
        confirmCallback: null
    };
    var opts = $.extend(true, {}, this.defaults, infoObj);
    
    var textarea = '';
    var confirmButton = '';

    if (opts.placeholder) {
        var mx = opts.maxlength || 999;
        textarea = '<textarea class="input" type="text" placeholder="'+opts.placeholder+'" maxlength="'+ mx +'">'+opts.content+'</textarea>';
    }
    if (opts.confirmButtonClass) {
        confirmButton = '<div class="'+opts.confirmButtonClass+' confirm"><p>Okay</p></div>';
    }
    
    var dubxModal = [
        '<div class="onErr">',
            '<div class="container">',
                '<div class="title">',
                    '<h1>'+opts.title+'</h1>',
                '</div>',
                '<div class="content">',
                    '<p>'+opts.content+'</p>',
                    textarea,
                '</div>',
                '<div class="control">',
                    '<div class="cancel dubx-js-cancel">',
                        '<p>Cancel</p>',
                    '</div>',
                    confirmButton,
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    $('body').append(dubxModal);

    // add one time cancel click
    $('.dubx-js-cancel').one("click",function(){
        $('.onErr').remove();
    });
    
    // add one time confirm action click
    if (typeof opts.confirmCallback === 'function'){
        $('.'+opts.confirmButtonClass).one("click", opts.confirmCallback);
    }
    
};


var close = function() {
    $('.onErr').remove();
};

module.exports = {
    create: create,
    close : close
};
},{}],5:[function(require,module,exports){
/**
 * Save an option to localStorage.  To keep it functional, you need to pass it
 * the current dubx.settings object and it will return the updated object
 * used the returned object to replace dubx.settings
 * example:
 * var options = require('../utils/options.js');
 * dubx.settings = options.saveOption('snow','true', dubx.settings);
 * 
 * @param  {sring} selector     the name of the option
 * @param  {Variable} value     the option value, usually string, bool, or number
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

module.exports = {
  on: on,
  off: off,
  toggle: toggle
};
},{}]},{},[1]);
