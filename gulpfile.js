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
  'src/js/general/*.js',

  // user interface section
  'src/js/ui/*.js',

  // contact section
  'src/js/contact/*.js',

  // settings section
  'src/js/settings/*.js',

  // customize section
  'src/js/customize/*.js',

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