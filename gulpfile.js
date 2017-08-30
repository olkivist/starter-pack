const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const uglify      = require('gulp-uglify');
const imagemin    = require('gulp-imagemin');

// Move js modules to src/js
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                     'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"  
    });
    
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Minify Js
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Optimize images
gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
);

// Copy Html files to public
gulp.task('copyHtmlToPublic', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('public'))
});

// Compile scss files to public
gulp.task('compileSass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});


gulp.task('default', ['js','serve']);
gulp.task('build', ['minify', 'imagemin', 'copyHtmlToPublic', 'compileSass']);