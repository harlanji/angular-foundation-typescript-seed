'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
      log = gulpUtil.log,
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed')
    ;

gulp.task('build/client.js', function () {
  return gulp.src('client.js')
      .pipe(browserify({
        standalone: 'app',
        builtins: true,
        debug : !process.env.ENV == 'production'
      }))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('build/public/js'));
});

gulp.task('build/server.js', function () {
  return gulp.src('server.js')
      .pipe(gulp.dest('build'));
});

gulp.task('dist', ['build/client.js', 'build/server.js'], function () {
  return gulp.src(['./node_modules/**', './bower_components/**', './public/**'], {base: './'})
      .pipe(changed('build'))
      .pipe(gulp.dest('build'));
});

gulp.task('default', ['build/client.js', 'build/server.js']);