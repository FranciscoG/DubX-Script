var options = require('../utils/options.js');
var menu = require('../init/menu.js');
var modules = require('../modules/index.js');

var loadAllModulesTo = function(globalObject){
    if (typeof window[globalObject] === "undefined") {
        window[globalObject] = {};
    }

    // load modules into an array and then do a foreach on it
    var modules = [];
    modules.forEach(function(mod, i, r){
        globalObject[mod.id] = mod;
        globalObject[mod.id].toggleAndSave = options.toggleAndSave;
        $('body').on('click', '#'+mod.id, mod.go);

        // if module has a definied init function, run that first
        if (mod.init) { mod.init(); }

        // add the menu item to the appropriate category section
        menu.appendToSection(mod.category, mod.menuHTML.bind(mod) );

        // check previously stored setting and if true, run module's go function
        if ( globalObject.settings[mod.id].optionState ) {
            mod.go();
        }
    
    });

};

module.exports = loadAllModulesTo;