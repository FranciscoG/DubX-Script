var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
 
// Change the concat order here
var jsBuildOrder = [
  // license goes on top
  'LICENSE/LICENSE.js',

  // options.js should always be the first file after license because
  // it starts the dubx object namespace
  'src/js/init/options.js',

  // all utils first
  'src/js/utils/*.js',
  
  // general section
  'src/js/general/snow.js',
  'src/js/general/autovote.js',
  'src/js/general/afk.js',
  'src/js/general/prepEmoji.js',
  'src/js/general/previewList.js',
  'src/js/general/emotes.js',
  'src/js/general/mentions.js',
  'src/js/general/customMention.js',
  'src/js/general/dubGrabUtils.js',
  'src/js/general/dubsInChat.js',
  'src/js/general/grabsInChat.js',
  'src/js/general/showDubsOnHover.js',
  'src/js/general/autocompleteUsers.js',

  // user interface section
  'src/js/ui/fullscreen.js',
  'src/js/ui/splitChat.js',
  'src/js/ui/hideBackground.js',
  'src/js/ui/snoozeTooltip.js',
  'src/js/ui/hideVideo.js',
  'src/js/ui/hideAvatars.js',
  'src/js/ui/hideChat.js',

  // contact section
  'src/js/contact/bugReport.js',

  // settings section
  'src/js/settings/warnOnNavigation.js',
  'src/js/settings/showTimestamps.js',
  'src/js/settings/spacebarMute.js',

  // customize section
  'src/js/customize/customCSS.js',
  'src/js/customize/communityTheme.js',
  'src/js/customize/plugDjTheme.js',
  'src/js/customize/customBackground.js',

  // init
  'src/js/init/eta.js',
  'src/js/init/menu.js',
  'src/js/init/convertSettings.js',
  'src/js/init/init.js'
];

gulp.task('build:js', function() {
  return gulp.src(jsBuildOrder)
    .pipe(concat('beta.js'))
    .pipe(gulp.dest('./'));
});

/*
  not using this yet
 */
gulp.task('build:min', function() {
  return gulp.src('beta.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['build:js']); 
});


gulp.task('default', ['build:js']);