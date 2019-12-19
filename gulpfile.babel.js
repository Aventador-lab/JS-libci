'use strict'

var browserify = require('browserify'),

del = require('del'),
gulp = require('gulp'),
babel = require('gulp-babel'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
sourcemaps = require('gulp-sourcemaps'),
log = require('gulplog'),
rename = require('gulp-rename')


const paths = {
  scripts : {
    src:"src/**/*.js",
    dest:'build/jsm'
  }
}


gulp.task('js:build',function(){
  var b = browserify({
    entries:['./src/index.js']
  })

  return b.bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    //.on('error',log.error)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
});

  

