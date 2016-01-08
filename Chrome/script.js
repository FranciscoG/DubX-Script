(function(){

  // if you're not 100% sure if jquery exists, load it if it's missing
  var timeout = 100; // 10 seconds timeout
  var poll = function (cb) {
    setTimeout(function () {
      timeout--;
      if (typeof window.jQuery !== 'undefined') {
        cb(); // run callback
      } else if (timeout > 0) {
        poll(); // do it again sam
      } else {
        // External library failed to load, handle error
        console.log('extension:  jquery did not load in time');
      }
    }, 100);
  };

  function loadjQuery(callback) {
    // let's load jQuery if it doesn't exist
    if (typeof window.jQuery === 'undefined') {
      var s = document.createElement('script');
      s.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
      s.async = true;
      document.head.appendChild(s);
      poll(callback);
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
