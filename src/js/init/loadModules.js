var options = require('../utils/options.js');
var menu = require('../init/menu.js');
var modules = require('../modules/index.js');
var storedSettings = options.getAllOptions();

/**
 * Loads all the modules in /modules and initliazes them
 * @param  {Object} globalObject The target global object that modules will be added to.  In our case it will be window.dubx
 */
var loadAllModulesTo = function(globalObject){
    if (typeof window[globalObject] === "undefined") {
        window[globalObject] = {};
    }

    // load modules into an array and then do a foreach on it
    modules.forEach(function(mod, i, r){
        globalObject[mod.id] = mod;
        globalObject[mod.id].toggleAndSave = options.toggleAndSave;
        
        // add event listener
        $('body').on('click', '#'+mod.id, mod.go);

        // if module has a definied init function, run that first
        if (mod.init) { mod.init(); }

        // add the menu item to the appropriate category section
        menu.appendToSection(mod.category, mod.menuHTML.bind(mod) );

        // check localStorage for saved settings and update modules optionState
        if (typeof storedSettings.general[mod.id] !== 'undefined') {
            mod.optionState = storedSettings.general[mod.id];
        
            // run module's go function if setting was true or 'true'
            // !! converts String:'true' to Bool:true
            if ( !!storedSettings.general[mod.id] ) {
                mod.go();
            }
        }
    
    });

};

module.exports = loadAllModulesTo;