
const gulp = require('gulp');

//Css
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//Js
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

//Other

const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();





var plugins = [
    autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }),
    cssnano()
];



function minJs() {
    return gulp.src(['src/script/*.js'])
    //.pipe(uglify())  - not use now
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./script'))
    .pipe(browserSync.stream());
}


function include() {
    return gulp.src(['src/html/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
}




function style() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./styles'))
        .pipe(browserSync.stream());
}







function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/scss/**/*.scss", style)
    gulp.watch("src/script/**/*.js", minJs)
    gulp.watch("src/html/**/*.html", include).on('change', browserSync.reload)

}




function main() {
    include()
    style()
    watch();
    
}


exports.default = main