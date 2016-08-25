'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('src/sass/asset.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/dist'));
});
 
gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});