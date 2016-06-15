## Javascript notes and style guide

:warning: *this doc is a work in progress* :warning:

#### Adding a new option

- functions should be written in `camelCase`    
- the localStorage option name should be the same exact words as the function name but converted to `snake_case`

example:  

`someOption` -> `some_option`

```javascript
// creating the fuction for the option
dubx.someOption = function(){};

// saving user's setting for that option
dubx.saveOption('some_option', 'true');
```


Each new option should get its own javascript file placed in the appropriate folder related to its place in the menu.  It can contain as many functions that are related to that option.  

**utils**    
The utils folder is used for files with any functions that are agnostic to any specific option and can be used in multiple places.

####Building

The build script will automatically include any JS file you place in the `src/js` subfolders EXCEPT for the `src/js/init` folder.  Anything you place in there needs to be added to the gulpfile.js `jsBuildOrder` array.