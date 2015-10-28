/* global emojify, Dubtrack, twitchObject */
$('.pusher-chat-widget-input').prepend('<div id="emoji-preview" style="display: none; border: 1px solid #202020; position: absolute; bottom: 54px; background-color:#111;"></div>');

var emotes = emojify.emojiNames;
var GitHubLocation = 'https://rawgit.com/FranciscoG/DubX-Script/dev/js/';

$.getScript(GitHubLocation + 'twitchemotes.js', function(){
    emotes = emotes.concat(Object.keys(twitchObject.emotes));

    var re = new RegExp(":(" + Object.keys(twitchObject.emotes).join("|") + "):" ,"ig"); 

    function makeImage(id){
     return '<img class="emoji" src="//static-cdn.jtvnw.net/emoticons/v1/'+id+'/1.0" />';
    }

    function replaceTextWithEmote(){
     var $last = $('.chat-main .text').last();
     var emoted = $last.html().replace(re, function(matched, p1){
       var key = p1.toLowerCase();
       if (typeof twitchObject.emotes[key] !== 'undefined'){
         return makeImage(twitchObject.emotes[key].image_id);
       }
     });
     $last.html(emoted);
    }

    Dubtrack.Events.bind("realtime:chat-message", replaceTextWithEmote);
});

function createTwitchImg(id, name) {
    return '<div style="display:inline-block" class="twitch-previews">' +
        '<img style="width: 1em; height: 1em; display:inline-block" src="//static-cdn.jtvnw.net/emoticons/v1/'+id+'/1.0" />' +
        '<span style="font-size: 0.8em; display:inline-block; padding:0 3px;">:' + name + ':</span>' +
    '</div>';
}
function createImg(name) {
    return '<div style="display:inline-block" class="emoji-previews">' +
        '<img style="width: 1em; height: 1em; display:inline-block" src="'+emojify.defaultConfig.img_dir+'/'+encodeURI(name)+'.png" title=":'+name+':" alt=":'+name+':" align="absmiddle" />' +
        '<span style="font-size: 0.8em; display:inline-block; padding:0 3px;">:' + name + ':</span>' +
    '</div>';
}
function addToHelper(emojiArray) {
    $('#emoji-preview').empty();
    var text = "";
    
    $.each(emojiArray, function(i,val){
        if (typeof twitchObject.emotes[val.toLowerCase()] !== 'undefined') {
            text += createTwitchImg(twitchObject.emotes[val.toLowerCase()].image_id, val);
        } else {
            text += createImg(val);
        }
    });

    $('#emoji-preview').append(text);
    $('#emoji-preview .emoji-previews').last().after('<hr style="margin: 4px 0;">');
    $('#emoji-preview').show();
}
function filterEmoji(str){
    var finalStr = str.replace("+","\\+");
    var re = new RegExp('^' + finalStr ,"i");
    return emotes.filter(function(val){
        return re.test(val);
    });
}
var searchStr = "";
var emojiRegex = new RegExp(":([+\\-_a-z0-9]+)$","i");
$(document.body).on('keyup', "#chat-txt-message", function(e) {
    var currentText = $('#chat-txt-message').val();

    var filteredEmoji = currentText.replace(emojiRegex, function(matched, p1){
        searchStr = p1;
        addToHelper(filterEmoji(p1));
    });
    
    if (e.keyCode === 13 || searchStr.length <= 0 || currentText.charAt(currentText.length - 1) === ":") {
        searchStr = "";
        $('#emoji-preview').empty().hide();
    }
});