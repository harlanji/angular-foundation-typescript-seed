'use strict';

var distDeps = ['build/public/js/app.js', 
                'build/public/js/css/app.css', 
                'build/server.js'
                ];

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
      log = gulpUtil.log,
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    symlink = require('gulp-symlink')
    ;

gulp.task('build/public/js/app.js', function () {
  return gulp.src('client.js')
    .pipe(browserify({
      standalone: 'app',
      builtins: true,
      debug : !process.env.ENV == 'production'
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('build/public/js'));
});


gulp.task('build/public/js/css/app.css', function () {
  return gulp.src('app.sass')
    .pipe(changed('build/public/js/css/app.css'))
    .pipe(sass({
      //sourceComments: 'map',
      // includePaths: [],
      // imagePth: '',
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('build/public/css'));
});

gulp.task('build/server.js', function () {
  return gulp.src('server.js')
    .pipe(gulp.dest('build'));
});

gulp.task('dist', distDeps, function () {
  return gulp.src(['./node_modules/**', './bower_components/**', './public/**'], {base: './'})
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', distDeps, function () {
  return [
    gulp.src('build/**')
      .pipe(gulp.dest('dev')),

    gulp.src('node_modules')
      .pipe(symlink('dev')),

    gulp.src('bower_components')
      .pipe(symlink('dev')),

    gulp.src('public')
      .pipe(symlink('dev'))
    ];
});

gulp.task('default', ['dev']);