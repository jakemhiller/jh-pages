
var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

gulp.task('scripts', function() {
    gulp.src(['client/scripts/**/*.coffee'])
        .pipe(coffee().on('error', function(err){
            gutil.log(gutil.colors.red(err))
        }))
        .pipe(gulp.dest('./scripts'));
});

gulp.task('styles', function() {
    gulp.src(['client/styles/**/*.scss'])
        .pipe(sass().on('error', function(err){
            gutil.log(gutil.colors.red('Error in SASS syntax'));
        }))
        .pipe(gulp.dest('./styles'));
});

gulp.task('content', function() {
    gulp.src(['client/views/**/*.jade', '!client/views/layouts/**'])
        .pipe(jade().on('error', function(err){
            gutil.log(gutil.colors.red(err))
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function(){
    connect.server({
        livereload: true,
        port: 9000
    });
});

gulp.task('default', function() {
  gulp.run('scripts', 'styles', 'content', 'connect');
});

gulp.task('watch', function(){
    gulp.run('default');
    gulp.watch('client/scripts/**', function(event) {
        gulp.run('scripts');
    });
    gulp.watch('client/styles/**', function(event) {
        gulp.run('styles');
    });
    gulp.watch('client/views/**', function(event) {
        gulp.run('content');
    });
});
