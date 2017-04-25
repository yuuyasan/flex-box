'use strict';

var gulp = require('gulp'),

    browserSync = require('browser-sync').create(), //web服务器

    less = require('gulp-less'),

    sourcemaps = require('gulp-sourcemaps'), //sass调试map图

    reload = browserSync.reload,

    dir = ".",

    markDir = ".";


//启动webServer
gulp.task('serve', ['less', 'html', 'js'], function() {

    browserSync.init({
        server: markDir
    });
    gulp.watch(dir + "/less/*.less", ['less']);
    gulp.watch(dir + "/*.html", ['html']);
    gulp.watch(dir + "/static/js/*.js", ['js']);
    gulp.watch(dir + "/*.html").on('change', reload);
    gulp.watch(dir + "/css/*.css").on('change', reload);
    gulp.watch(dir + "/js/**").on('change', reload);
});
//另存html页面
gulp.task('html', function() {
    return gulp.src(markDir + '/*.html')
});
//另存js页面
gulp.task('js', function() {
    return gulp.src(markDir + '/js/**')
});
gulp.task('less', function() {
    return gulp.src(markDir + '/less/*.less')
        .pipe(less())
        .pipe(gulp.dest(markDir + '/css/'));
});
gulp.task('default', ['serve']);
