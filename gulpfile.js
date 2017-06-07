"use strict;"

var gulp = require("gulp");
var sass = require("gulp-sass");
var ts = require("gulp-typescript");
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
    return gulp.src("src/main.ts")
        .pipe(ts({
            noImplicitAny: true,
            outFile: "main.js"
        }))
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
