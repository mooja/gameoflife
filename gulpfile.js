"use strict;"

var gulp = require("gulp");
var sass = require("gulp-sass");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");
var tsify = require("tsify");
var livereload = require("gulp-livereload");

gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(livereload());
})

gulp.task("sass", function() {
    return gulp.src("src/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist"))
        .pipe(livereload());
})

gulp.task("typescript", function() {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
});

gulp.task("default", ["html", "typescript", "sass"]);

gulp.task("watch", function() {
    var watcher = gulp.watch("src/*", ["typescript", "html", "sass"]);
    watcher.on("change", function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
    livereload.listen();
});
