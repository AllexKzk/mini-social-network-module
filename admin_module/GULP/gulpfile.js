const { src, dest, series } = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const loadScripts = require('./gulpfile.babel.js');
const pug = require('gulp-pug');
const concat = require("gulp-concat");

function lessToCss() {
    return src('../views/LESS/*.less')
        .pipe(less()) // Обработать LESS
        .pipe(cleanCSS()) // Минификация CSS
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(dest('../public/GULP/style/'));
}

function concatCss() {
    return src('../views/CSS/*.css')
        .pipe(concat('main.min.css'))
        .pipe(dest('../public/GULP/style/'));
}

function pugToHTML() {
    return src('../views/*.pug')
        .pipe(pug({
            title: "gulp"
        }))
        .pipe(dest('../public/GULP/'));
}

exports.default = series(lessToCss, loadScripts.scripts, pugToHTML);

