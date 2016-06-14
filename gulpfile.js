var gulp = require('gulp');
var concat = require('gulp-concat');
 
// Change the concat order here
var jsBuildOrder = [
  // license goes on top
  'LICENSE/LICENSE.js',

  // all utils first
  'src/js/utils/*.js',
  
  'src/js/general/snow.js',
  'src/js/general/autovote.js',
  'src/js/general/afk.js',
  'src/js/general/prepEmoji.js',
  'src/js/general/previewList.js',
  'src/js/general/emotes.js',
  'src/js/general/mentions.js',
  'src/js/general/customMention.js',

  'src/js/ui/fullscreen.js',
  'src/js/ui/splitChat.js',
  'src/js/ui/hideBackground.js',
  'src/js/ui/snoozeTooltip.js',
  'src/js/ui/hideVideo.js',

  'src/js/contact/bugReport.js',

  'src/js/settings/warnOnNavigation.js',

  'src/js/customize/customCSS.js',

  'src/js/ui/eta.js',
  'src/js/menu.js',
  'src/js/init.js'
];

gulp.task('build:js', function() {
  return gulp.src(jsBuildOrder)
    .pipe(concat('beta.js'))
    .pipe(gulp.dest('./'));
});


gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['build:js']); 
});

/**********************************************
 * Default and specific tasks
 */

gulp.task('default', ['build:js']);