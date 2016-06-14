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

When adding new JS files, don't forget to add it to the gulpfile build script in the root of this repo.

Right now I've decided to specificy the exact order that the files concatenate in.  I think eventually I'll move to using wildcards so we don't have to think about this anymore.  I just need to test that out to make sure it's not an issue
