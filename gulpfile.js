var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

// Static Server + watching scss/js/html files
gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js']);
    gulp.watch("index.html").on('change', browserSync.reload);
});

// Compile sass into CSS and copy CSS to dist
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Copy JS to dist
gulp.task('js', function() {
    return gulp.src(['js/*.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
})

// Minify JS
gulp.task('minify-js', ['js'], function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// Run all
gulp.task('all', ['sass', 'minify-css', 'js', 'minify-js']);

// Run dev as default
gulp.task('default', ['all']);