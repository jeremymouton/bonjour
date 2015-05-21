// ======================
// GULPFILE
// ======================

// Load plugins
var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  bless        = require('gulp-bless'),
  minifycss    = require('gulp-minify-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  rename       = require('gulp-rename'),
  path         = require('path'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps   = require('gulp-sourcemaps'),
  livereload   = require('gulp-livereload');

// CSS
gulp.task('css', function() {
  var stream = gulp
    .src('src/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));

  return stream
    .pipe(minifycss())
    .pipe(rename(function (path) {
      if(path.extname === '.css') {
        path.basename += '.min';
      }
    }))
    .pipe(bless())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
});

// JS
gulp.task('js', function() {
  var scripts = [
    'src/components/jquery/dist/jquery.js',
    'src/components/bootstrap/js/dropdown.js',
    'src/components/bootstrap/js/collapse.js',
    'src/components/bootstrap/js/transition.js',
    'src/js/plugins.js',
    'src/js/main.js'
  ];

  var stream = gulp
    .src(scripts)
    .pipe(concat('script.js'));

  return stream
    .pipe(gulp.dest('assets/js'))
    .pipe(uglify({ outSourceMap: true }))
    .pipe(rename(function (path) {
      if(path.extname === '.js') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Successfully compiled JavaScript' }));
});

// Fonts
gulp.task('fonts', function() {
  return gulp
    .src([
      // 'src/components/bootstrap/fonts/**/*'
    ])
    .pipe(gulp.dest('assets/fonts'))
    .pipe(notify({ message: 'Successfully processed Webfonts' }));
});

// Rimraf
gulp.task('rimraf', function() {
  return gulp
    .src(['assets/css', 'assets/js', 'assets/fonts'], {read: false})
    .pipe(rimraf());
});

// Default task
gulp.task('default', ['rimraf'], function() {
  gulp.start('css', 'js', 'fonts');
});

// Watch
gulp.task('watch', function() {

  // Watch .less files
  gulp.watch('src/less/**/*.less', ['css']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['js']);

  // Livereload
  livereload.listen();
  gulp.watch('assets/**/*').on('change', livereload.changed);
  
});
