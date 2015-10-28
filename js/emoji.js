/* global emojify, Dubtrack */
$('.pusher-chat-widget-input').prepend('<div id="emoji-preview" style="display: none; border: 1px solid #202020; position: absolute; bottom: 54px; background-color:#111;"></div>');

function createImg(name) {
    return '<div style="display:inline-block">' +
        '<img style="width: 1em; height: 1em; display:inline-block" src="'+emojify.defaultConfig.img_dir+'/'+encodeURI(name)+'.png" title=":'+name+':" alt=":'+name+':" align="absmiddle" />' +
        '<span style="font-size: 0.8em; display:inline-block; padding:0 3px;">:' + name + ':</span>' +
    '</div>';
}
function addToHelper(emojiArray) {
    $('#emoji-preview').empty();
    var text = "";
    $.each(emojiArray, function(i,val){
        text += createImg(val);
    });
    $('#emoji-preview').append(text).show();
}
function filterEmoji(str){
    var finalStr = str.replace("+","\\+");
    var re = new RegExp('^' + finalStr ,"i");
    return emojify.emojiNames.filter(function(val){
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