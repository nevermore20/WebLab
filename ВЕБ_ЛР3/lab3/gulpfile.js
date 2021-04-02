const gulp = require("gulp");
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require("del");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const merge = require("merge-stream");
const babel = require('gulp-babel');

clean = () => del(["assets/js", "assets/css"]);
styles = () => {
    let less_styles = gulp.src('public/css/*.less')
        .pipe(less())
        .pipe(concat('less-files.less'));
    let css_styles = gulp.src('public/css/*.css')
        .pipe(concat('css-files.css'));
    return merge(less_styles, css_styles)
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(rename({
            'basename': 'main',
            'suffix': '.min'
        }))
        .pipe(gulp.dest('public/assets/css/'))
};
scripts = () => {
    return gulp.src(['public/js/jquery.min.js', 'public/js/*.js'])
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({
            'basename': 'main',
            'suffix': '.min'
        }))
        .pipe(gulp.dest('public/assets/js/'))

};

gulp.task("default", gulp.series(clean, styles, scripts));