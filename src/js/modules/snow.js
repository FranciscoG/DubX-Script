var myModule = {};

myModule.id = "snow";
myModule.moduleName = "Snow";
myModule.description = "Toggle snow.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = [
    '<li id="'+myModule.id+'" class="for_content_li for_content_feature snow">',
        '<p class="for_content_off"><i class="fi-x"></i></p>',
        '<p class="for_content_p">Snow</p>',
    '</li>'
].join('');

// this function will be run on each click of the menu
myModule.go = function(e){
  var newOptionState;

  if (!this.optionState) {
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

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;