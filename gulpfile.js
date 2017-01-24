const gulp            = require('gulp');
const pump            = require('pump');
const browserSync     = require('browser-sync').create();
const headerfooter    = require('gulp-headerfooter');
const prettify        = require('gulp-html-prettify');
const sass            = require('gulp-sass');
const cleanCSS        = require('gulp-clean-css');
const babel           = require('gulp-babel');
const uglify          = require('gulp-uglify');
const rename          = require("gulp-rename");

const onError = function(error) {
    console.log(error.toString());
    this.emit('end');
};

/**
 *  DEVELOPMENT
 * 
 */

// Static Server
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// watching scss/js/html files
gulp.task('dev', ['serve'], () => {
    gulp.watch("src/html/**/*.html", ['html-dev']).on('change', browserSync.reload);
    gulp.watch("src/sass/**/*.scss", ['sass-dev']);
    gulp.watch("src/js/**/*.js", ['js-dev']);
    gulp.watch("src/vendor/**/*.scss", ['vendor-sass-dev']);
    gulp.watch("src/vendor/**/*.css", ['vendor-css-dev']);
    gulp.watch("src/vendor/**/*.js", ['vendor-js-dev']);
});

// Compile html
gulp.task('html-dev', () => {
    gulp.src("src/html/*.html")
        .pipe(headerfooter.header('src/html/partials/sidebar.html'))
        .pipe(headerfooter.header('src/html/partials/css-dev.html'))
        .pipe(headerfooter.footer('src/html/partials/js-dev.html'))
        .pipe(headerfooter.header('src/html/partials/header.html'))
        .pipe(headerfooter.footer('src/html/partials/footer.html'))
        .pipe(gulp.dest("test/html"))
        .pipe(browserSync.stream());
});

// Compile sass into CSS
gulp.task('sass-dev', () => {
    gulp.src("src/sass/*.scss")
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest("test/css"))
        .pipe(browserSync.stream());
});

// Copy JS to test
gulp.task('js-dev', () => {
    gulp.src(['src/js/*.js'])
        .pipe(gulp.dest('test/js'))
        .pipe(browserSync.stream());
});

// Run all vendor dev
gulp.task('vendor-dev', ['vendor-sass-dev', 'vendor-css-dev', 'vendor-js-dev', 'font-awesome-dev']);

// Compile vendor sass into CSS
gulp.task('vendor-sass-dev', () => {
    gulp.src("src/vendor/*.scss")
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest("test/vendor"))
        .pipe(browserSync.stream());
});

// Copy Vendor css to test
gulp.task('vendor-css-dev', () => {
    gulp.src(['src/vendor/**/*.css'])
        .pipe(gulp.dest('test/vendor'))
        .pipe(browserSync.stream());
});

// Copy Vendor js to test
gulp.task('vendor-js-dev', () => {
    gulp.src(['src/vendor/**/*.js'])
        .pipe(gulp.dest('test/vendor'))
        .pipe(browserSync.stream());
});

// Copy Font-Awesome fonts to test
gulp.task('font-awesome-dev', () => {
    gulp.src(['node_modules/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('test/fonts'))
        .pipe(browserSync.stream());
});

/**
 *  DISTRIBUTION
 * 
 */

// Update dist and pages
gulp.task('dist', ['sass', 'js', 'html', 'vendor', 'minify-css', 'create-scss', 'minify-js']);
gulp.task('dist-post', ['minify-css', 'create-scss', 'minify-js']);

// Compile html
gulp.task('html', () => {
    gulp.src("src/html/*.html")
        .pipe(headerfooter.header('src/html/partials/sidebar.html'))
        .pipe(headerfooter.header('src/html/partials/css.html'))
        .pipe(headerfooter.footer('src/html/partials/js.html'))
        .pipe(headerfooter.header('src/html/partials/header.html'))
        .pipe(headerfooter.footer('src/html/partials/footer.html'))
        .pipe(prettify({indent_char: '    ', indent_size: 1}))
        .pipe(gulp.dest("pages"));
});

// Compile sass into CSS
gulp.task('sass', () => {
    gulp.src("src/sass/*.scss")
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest("dist/css"))
        .pipe(gulp.dest("dist/css/build"));
});

// Minify compiled CSS
gulp.task('minify-css', () => {
    gulp.src('dist/css/build/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
});

// Create SCSS
gulp.task('create-scss', () => {
    gulp.src('dist/css/build/*.css')
        .pipe(rename((path) => {
            path.extname = ".scss"
        }))
        .pipe(gulp.dest('dist/css'));
});

// Copy JS to dist
gulp.task('js', () => {
    gulp.src(['src/js/*.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('dist/js/build'));
})

// Minify JS
gulp.task('minify-js', (cb) => {
    pump([
            gulp.src('dist/js/build/*.js')
                .pipe(babel({
                    presets: ['es2015']
                })),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest('dist/js')
        ],
        cb
    );
});

// Run all vendor
gulp.task('vendor', ['vendor-sass', 'vendor-css', 'vendor-js', 'font-awesome']);

// Compile vendor sass into CSS
gulp.task('vendor-sass', () => {
    gulp.src("src/vendor/*.scss")
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest("dist/vendor"))
        .pipe(browserSync.stream());
});

// Copy Vendor css to dist
gulp.task('vendor-css', () => {
    gulp.src(['src/vendor/**/*.css'])
        .pipe(gulp.dest('dist/vendor'))
        .pipe(browserSync.stream());
});

// Copy Vendor js to dist
gulp.task('vendor-js', () => {
    gulp.src(['src/vendor/**/*.js'])
        .pipe(gulp.dest('dist/vendor'))
        .pipe(browserSync.stream());
});

// Copy Font-Awesome fonts to dist
gulp.task('font-awesome', () => {
    gulp.src(['node_modules/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});

// Run dev as default
gulp.task('default', ['dev']);