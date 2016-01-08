// thanks Stackoverflow:  http://stackoverflow.com/a/9517879/395414
var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js'); // add "script.js" to web_accessible_resources in manifest.json
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);