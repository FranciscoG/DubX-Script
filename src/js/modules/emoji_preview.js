var myModule = {};

myModule.id = "emoji_preview";
myModule.moduleName = "Autocomplete Emoji";
myModule.description = "Toggle snow.";
myModule.optionState = false;
myModule.category = "general";
myModule.menuHTML = [
  '<li id="'+myModule.id+'" class="for_content_li for_content_feature '+myModule.id+'">',
      '<p class="for_content_off"><i class="fi-x"></i></p>',
      '<p class="for_content_p">'+myModule.moduleName+'</p>',
  '</li>'
].join('');

// this function will be run on each click of the menu
myModule.go = function(e){
  var newOptionState;

  if (!this.optionState) {
      newOptionState = true;
  } else {
      newOptionState = false;
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = myModule;