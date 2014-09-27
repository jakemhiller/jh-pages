
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var bourbon    = require('node-bourbon');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');

// Load All Gulp Plugins
var $ = require('gulp-load-plugins')();

var isProd = $.util.env.production;

gulp.task('scripts', function() {
  var b = browserify({
    entries: ['./app/scripts/index.js'],
    extensions: ['.js', '.tpl'],
    debug: !isProd
  }).transform('jstify', {
    engine: 'lodash'
  });

   b.bundle()
   .on('error', $.util.log)
   .pipe(source('index.js'))
   .pipe($.jshint())
   .pipe($.jshint.reporter(require('jshint-stylish')))
   .pipe(gulp.dest('scripts/'));
});

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass({
            errLogToConsole: true,
            includePaths: bourbon.includePaths
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('styles/'))
        .pipe(reload({stream:true}))
        .pipe($.size())
        .pipe($.notify("Compilation complete."));;
});

gulp.task('serve', ['styles'], function () {
    browserSync({
        server: {
            baseDir: './'
        },
        debugInfo: false,
        open: false
    });
});

gulp.task('default', ['scripts', 'styles']);

gulp.task('watch', ['serve'], function () {
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.tpl'], ['scripts']);
});