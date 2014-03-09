'use strict';

var paths = {
  serverJs: ['server.js'],
  clientJs: ['client.js'], 
  clientTs: ['client.ts'], 
  sass: 'app.sass',
  typings: 'typings',

  dist: ['build/public/js/app.js', 
  'build/public/index-jade.html',
    'build/public/css/app.css', 
    'build/server.js'],
};

var isDebug = process.env.ENV != 'production';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
      log = gulpUtil.log,
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    symlink = require('gulp-symlink'),
    clean = require('gulp-clean'),
    typescript = require('gulp-typescript'),
    jade = require('gulp-jade')
    ;


gulp.task('build/public/js/app.js', function () {
  return gulp.src(paths.clientTs)
    .pipe(typescript({
      sourcemap: true,
      module: 'commonjs',
      //target: 'ES5'
    }))
    .pipe(browserify({
      standalone: 'client',
      builtins: true,
      debug: isDebug
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('build/public/js'));
});

// gulp.task('build/public/js/app.js', function () {
//   return gulp.src(paths.clientJs)
//     .pipe(browserify({
//       standalone: 'app',
//       builtins: true,
//       debug : !process.env.ENV == 'production'
//     }))
//     .pipe(rename('app.js'))
//     .pipe(gulp.dest('build/public/js'));
// });


gulp.task('build/public/css/app.css', function () {
  return gulp.src(paths.sass)
    //.pipe(changed('build/public/css/app.css'))
    .pipe(sass({
      sourceComments: 'map',
      // includePaths: [],
      // imagePth: '',
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('build/public/css'));
});

gulp.task('build/public/index-jade.html', function () {
  return gulp.src('src/assets/index.jade')
    .pipe(jade({
      pretty: isDebug
    }))
    .pipe(rename('index-jade.html'))
    .pipe(gulp.dest('build/public'));
});

gulp.task('build/server.js', function () {
  return gulp.src(paths.serverJs)
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return gulp.src(['build', 'dist', 'dev'], {read: false})
    .pipe(clean({force: true}));
});


gulp.task('dist', paths.dist, function () {
  return gulp.src(['./node_modules/**', './bower_components/**', './public/**', './typings/**'], {base: './'})
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', paths.dist, function () {
  return [
    gulp.src('build/**')
      .pipe(gulp.dest('dev')),

    gulp.src('node_modules')
      .pipe(symlink('dev')),

    gulp.src('bower_components')
      .pipe(symlink('dev')),

    gulp.src('public')
      .pipe(symlink('dev')),

    gulp.src('typings')
      .pipe(symlink('dev')),

    ];
});

gulp.task('watch', ['dev'], function () {
  // TODO merge watch paths and use changed() for all tasks, for a 
  //      single call to watch that does minimal work.
  gulp.watch(paths.clientJs, ['dev']);
  gulp.watch(paths.sass, ['build/public/css/app.css', 'dev']);
});

gulp.task('default', ['dev']);