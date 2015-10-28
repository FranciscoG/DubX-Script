// because of CORS issues,  I have to embed the JSON here (parsed) 
// source:  https://twitchemotes.com/apidocs 
var GitHubLocation = 'https://rawgit.com/FranciscoG/DubX-Script/dev/js/';

$.getScript(GitHubLocation + 'twitchemotes.js', function(data){
  console.log(data);
  
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


