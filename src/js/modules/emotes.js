/**
 * Emotes
 * Adds additional Twitch, BTTV, and Tasty Emotes to the chat window 
 */

/* global Dubtrack, emojify */
var options = require('../utils/options.js');
var menu = require('../init/menu.js');
var dubx_emoji = require('../emojiUtils/prepEmoji.js');


var myModule = {};

myModule.id = "twitch_emotes";
myModule.moduleName = "Emotes";
myModule.description = "Toggle Twitch Emotes support.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = menu.makeStandardMenuHTML(myModule.id, myModule.description, "twitch_emotes", myModule.moduleName);

function makeImage(type, src, name, w, h){
  return '<img class="emoji '+type+'-emote" '+
    (w ? 'width="'+w+'" ' : '') +
    (h ? 'height="'+h+'" ' : '') +
     'title="'+name+'" alt="'+name+'" src="'+src+'" />';
}

/**********************************************************************
 * handles replacing twitch emotes in the chat box with the images
 */

myModule.replaceTextWithEmote = function(){
    var self = dubx_emoji;

    var _regex = self.twitch.chatRegex;

    if (!self.twitchJSONSLoaded) { return; } // can't do anything until jsons are loaded

    var $chatTarget = $('.chat-main .text').last();
    
    if (!$chatTarget.html()) { return; } // nothing to do

    if (self.bttvJSONSLoaded) { _regex = self.bttv.chatRegex; }

    var emoted = $chatTarget.html().replace(_regex, function(matched, p1){
        var _id, _src, _desc, key = p1.toLowerCase();

        if ( self.twitch.emotes[key] ){
            _id = self.twitch.emotes[key];
            _src = self.twitch.template(_id);
            return makeImage("twitch", _src, key);
        } else if ( self.bttv.emotes[key] ) {
            _id = self.bttv.emotes[key];
            _src = self.bttv.template(_id);
            return makeImage("bttv", _src, key);
        } else if ( self.tasty.emotes[key] ) {
            _src = self.tasty.template(key);
            return makeImage("tasty", _src, key, self.tasty.emotes[key].width, self.tasty.emotes[key].height);
        } else {
            return matched;
        }

    });

    $chatTarget.html(emoted);
};

/**************************************************************************
 * Turn on/off the twitch emoji in chat
 */
myModule.go = function(){
    document.body.addEventListener('twitch:loaded', dubx_emoji.loadBTTVEmotes);
    document.body.addEventListener('bttv:loaded', dubx_emoji.loadTastyEmotes);
    
    var newOptionState;
    var optionName = 'twitch_emotes';

    if (!myModule.optionState) {
        
        if (!dubx_emoji.twitchJSONSLoaded) {
            dubx_emoji.loadTwitchEmotes();
        } else {
            this.replaceTextWithEmote();
        }

        Dubtrack.Events.bind("realtime:chat-message", this.replaceTextWithEmote);
        newOptionState = true;
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.replaceTextWithEmote);
        newOptionState = false;
    }

    this.optionState = newOptionState;
    this.toggleAndSave(this.id, newOptionState);
};


module.exports = myModule;