/*
   make changes to the tastyemotes.json here, just run:
   node makeJSON.js    
 */

var fs = require('fs');
var path = require('path');

var contents = fs.readFileSync(__dirname + "/emotes.json");
var jsonContent = JSON.parse(contents);

var sets = [
  'cats',
  'gifs',
  'logos',
  'misc',
  'tastycat',
  'userfaces'
];

var tastyJSON = {
  lastUpdated : Date.now(),
  emotes: { }
};

function getEmotes(set) {
  for (var emote in jsonContent[set]) {
    var url = jsonContent[set][emote].url.split('/');
    if (emote.indexOf('amp;') >= 0){ 
      emote = emote.replace("amp;", ""); 
    }
    tastyJSON.emotes[emote.toLowerCase()] = jsonContent[set][emote];
  }
}

sets.forEach(function(val,i,r){
  getEmotes(val);
});

// console.log(tastyJSON);

fs.writeFile(__dirname + "/tastyemotes.json", JSON.stringify(tastyJSON), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
