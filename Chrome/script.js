(function(){
  'use strict';

  // if you're not 100% sure if jquery exists, load it if it's missing
  var poll = function(waitingFor, cb) {
    var interval = 100; // ms
    var currInterval = 0;
    var limit = 50; // how many intervals

    var check = function () {
        if (typeof waitingFor !== 'undefined') {
            console.log(waitingFor, "is available");
            cb(); // we'll assume typeof cb is a function for now
        } else if (currInterval < limit) {
            currInterval++;
            console.log('waiting for', waitingFor);
            window.setTimeout(check, interval);
        } else {
          console.log(waitingFor, 'did not load in the last', limit * interval, 'ms');
        }
    };

    window.setTimeout(check, interval);
  };

  function loadjQuery(callback) {
    // let's load jQuery if it doesn't exist
    if (typeof window.jQuery === 'undefined') {
      var s = document.createElement('script');
      s.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
      s.async = true;
      document.head.appendChild(s);
      poll(window.jQuery, callback);
    } else {
      callback();
    }
  }

  var dubxInit = function(){
    // load my dev instance of DubX
    $.getScript('https://rawgit.com/FranciscoG/DubX-Script/dev/beta.js');
  };
  
  loadjQuery(dubxInit);

})();
