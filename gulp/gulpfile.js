var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//Configurations
var paths = {
    css: './assets/css/',
    scss: './assets/scss/'
};

//Scss to css
gulp.task('compile_scss', function () {
    gulp.src([paths.scss + '*.scss', paths.scss + '**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css));
});

//Minify css
gulp.task('minify_css', function () {
    gulp.src(paths.css + '**/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css));
});

//Watch task
gulp.task('scss_watch', function () {
    gulp.watch(paths.scss + '**/*.scss', ['compile_scss']);
});

//Build
gulp.task('build', ['compile_scss'], function () {
    gulp.run('minify_css');
});