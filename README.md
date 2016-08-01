# Dub X (source)
- A simple script/extension for Dubtrack.fm

[Follow Us on Twitter](https://twitter.com/DubXScript) and [Like Us on Facebook!](https://facebook.com/DubXScript)


-------------
Our Team
---
 - [sinful](https://github.com/sinfulBA) __(Owner/Developer)__
 - [Swordling](https://github.com/swordling) __(Owner/Developer)__
 - [Kris](https://github.com/PossiblyKris) __(Helper/Developer)__
 - [Al3366](https://github.com/Al3366) __(Helper/Extension Manager)__
 - [Ciscog](https://github.com/FranciscoG) __(Helper/Developer)__
 - [mbsurfer](https://github.com/coryshaw1) __(Helper/Developer)__

-----------------
IMPORTANT
---

__Updates (Version 03.02.04)__

- Added ability to set custom text phrases that trigger a mention sound
- Notifications now check for custom mention triggers as well

-----------------
Usage
---

* Bookmark the following code from the [Dub X Website](https://dubx.net) or the script below. Once in a Dubtrack.fm community, run the bookmark. We also have a Google Chrome extension [here](https://chrome.google.com/webstore/detail/dubx/oceofndagjnpebjmknefoelcpcnpcedm?utm_source=chrome-app-launcher-info-dialog)

```
javascript:(function(){$.getScript('https://rawgit.com/sinfulBA/DubX-Script/master/beta.js');}());
```

* If this does not work, go to `https://rawgit.com/sinfulBA/DubX-Script/master/beta.js` and copy paste its content into your console (accessible in chrome by pressing f12) when on Dubtrack.fm in a community.

-----------------
Custom CSS
---

* plug.dj theme made by Kris and edited by sinful. Paste `https://rawgit.com/sinfulBA/DubX-Script/master/themes/PlugTheme.css` in the Custom CSS option in Dub X, then click 'Okay'

-----------------
Features
---

- Autovote
- AFK Autorespond
- Emotes
- Autocomplete Emoji
- Autocomplete Mentions
- Custom Mention Triggers
- Notification on Mentions
- Fullscreen Video
- Split Chat
- Hide Chat
- Hide Video
- Hide Avatars
- Hide Background
- Spacebar Mute
- Show Timestamps
- Warn on Navigation
- plug.dj Theme
- Community Theme
- Custom CSS
- Custom Background
- Bug Report

-----------------
Translations
---

**None so far**

-----------------
Development
---

Requirements:  
- [NodeJS](https://nodejs.org/en/)
- [Sass](http://sass-lang.com/) 

Install Node dependencies from the root directory of the repo
```bash
$ npm install && npm install gulp -g
```

**Javascript**    
In order to build all of the source files from `src/js/*` into `beta.js`, run:   
```bash
$ gulp
```
For continous development you can watch for changes and auto-compile by running:
```bash
$ gulp watch
```

**SASS/CSS**    
_coming soon_

-----------------
Thanks To
---
- thedark1337 - for helping with questions regarding coding.
- Igor - for helping with questions regarding coding.

-----------------
LICENSE
---

**THE Q PUBLIC LICENSE version 1.0**

View the full license [here](LICENSE/LICENSE.md)