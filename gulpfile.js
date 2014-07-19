'use strict';
// generated on 2014-06-21 using generator-gulp-bootstrap 0.0.4

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gutil       = require('gulp-util');

var bourbon    = require('node-bourbon');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');

var loc = {
    srcScripts: './client/scripts/',
    srcStyles: './client/styles/',
    destScripts: './scripts/',
    destStyles: './styles/'
};

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src(loc.srcStyles + 'index.scss')
        .pipe($.sass({
            errLogToConsole: true,
            sourceComments: 'none',
            sourceMap: 'sass',
            includePaths: bourbon.includePaths
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(loc.destStyles))
        .pipe(reload({stream:true}))
        .pipe($.size());
});

gulp.task('scripts:vendor', function() {
  var b = browserify();
   b.bundle({debug: true})
   .on('error', $.util.log)
   .pipe(source('vendor.js'))
   .pipe(gulp.dest(loc.destScripts));
});

gulp.task('scripts', function() {
  var b = browserify({
    entries: [loc.srcScripts + 'index.js'],
    extensions: ['.js', '.tpl', '.html']
  }).bundle({debug: true})
   .on('error', $.util.log)   //error handler for reactify
   .pipe(source('index.js'))
   .pipe($.jshint())
   .pipe($.jshint.reporter(require('jshint-stylish')))
   .pipe(gulp.dest(loc.destScripts));
});

gulp.task('serve', ['styles'], function () {
    browserSync.init(null, {
        server: {
            baseDir: './',
            directory: true
        },
        debugInfo: true,
        open: false,
        hostnameSuffix: ".dev"
    }, function (err, bs) {
        console.log('Started connect web server on ' + bs.options.url);
    });
});

gulp.task('watch', ['serve'], function () {
    // watch for changes
    gulp.watch(['**/*.html'], reload);
    gulp.watch('client/styles/**/*.scss', ['styles']);
    gulp.watch('client/scripts/**/*.js', ['scripts']);
});