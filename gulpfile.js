/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2011-2014 Webcomm Pty Ltd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Load plugins
var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  minifycss    = require('gulp-minify-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  cache        = require('gulp-cache'),
  path         = require('path'),
  sourcemaps   = require('gulp-sourcemaps'),
  imagemin     = require('gulp-imagemin'),
  livereload   = require('gulp-livereload');

var config = {

  // Should CSS & JS be compressed?
  minifyCss: false,
  uglifyJS: false

}

// CSS
gulp.task('css', function() {
  var stream = gulp
    .src('src/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));

  if (config.minifyCss === true) {
    stream.pipe(minifycss());
  }

  return stream
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
});

// JS
gulp.task('js', function() {
  var scripts = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/retina.js/dist/js/retina.js',
    'src/js/plugins.js',
    'src/js/main.js'
  ];

  var stream = gulp
    .src(scripts)
    .pipe(concat('script.js'));

  if (config.uglifyJS === true) {
    stream.pipe(uglify());
  }

  return stream
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Successfully compiled JavaScript' }));
});

// Images
gulp.task('images', function() {
  return gulp
    .src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images'))
    .pipe(notify({ message: 'Successfully processed Images' }));
});

// Favicons
gulp.task('favicons', function() {
  return gulp
    .src('src/ico/**/*')
    .pipe(gulp.dest('assets/ico'))
    .pipe(notify({ message: 'Successfully processed Favicons' }));
});

// Fonts
gulp.task('webfonts', function() {
  return gulp
    .src([
      'bower_components/bootstrap/fonts/**/*'
    ])
    .pipe(gulp.dest('assets/webfonts'))
    .pipe(notify({ message: 'Successfully processed Webfonts' }));
})

// Rimraf
gulp.task('rimraf', function() {
  return gulp
    .src(['css', 'js', 'images', 'favicons'], {read: false})
    .pipe(rimraf());
});

// Default task
gulp.task('default', ['rimraf'], function() {
    gulp.start('css', 'js', 'images', 'webfonts', 'favicons');
});

// Watch
gulp.task('watch', function() {

  // Watch .less files
  gulp.watch('src/less/**/*.less', ['css']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['js']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch icon files
  gulp.watch('src/ico/**/*', ['favicons']);

  // Watch webfonts
  gulp.watch('src/webfonts/**/*', ['webfonts']);

  // Livereload
  livereload.listen();
  gulp.watch('assets/**/*').on('change', livereload.changed);
  
});
