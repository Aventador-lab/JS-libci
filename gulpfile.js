'use strict'

var browserify = require('browserify'),

del = require('del'),
gulp = require('gulp'),
babel = require('gulp-babel'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
terser = require('gulp-terser-js'),
sourcemaps = require('gulp-sourcemaps'),
gutil = require('gulp-util'),
log = require('gulplog'),
rename = require('gulp-rename'),
assign = require('lodash.assign')



const paths = {
  scripts : {
    src:"src/**/*.js",
    dest:'build/js'
  }
}


gulp.task('js:bundle',function(){
  var b = browserify({
    entries:['./src/index.js']
  })

  return b.bundle()
    .pipe(source("index"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(terser({
      mangle:{
        reserved:['BAS']
      }
    }))
    .pipe(rename({extname:'.bundle.min.js'}))
    //.pipe(uglify())
    //.on('error',log.error)
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.scripts.dest,{overwrite:true}))
});

  
