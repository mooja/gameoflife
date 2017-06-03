var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var watchify = require("watchify");
var gutil = require("gulp-util");
var paths = {
    pages: ['src/*.html']
}


var watchedBrowserify = watchify(browserify({
        basedir: '.',
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCache: {}
}).plugin(tsify));


gulp.task("copy-html", function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
})

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);