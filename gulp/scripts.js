'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function () {

    var b = browserify({
      entries: './src/app/index.coffee',
      debug: true,
      transform: ['coffeeify'],
      extensions: ['.coffee']
    });

    return b.bundle()
      .pipe(source('./index.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init())
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.tmp + '/serve/app'))
      .pipe(browserSync.reload({ stream: true }))
      .pipe($.size());
  });
};
