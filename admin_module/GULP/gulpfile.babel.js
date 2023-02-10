const babel = require("gulp-babel");
const concat = require("gulp-concat");
const {src, dest} = require("gulp");

function scripts() {
    return src("../scripts/*.js")
        .pipe(babel())
        .pipe(dest("../public/GULP/src/"))
}

exports.scripts = scripts;