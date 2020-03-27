"use strict";

// var gulp = require("gulp");
// var plumber = require("gulp-plumber");
// var sourcemap = require("gulp-sourcemaps");
// var rename = require ("gulp-rename")
// var sass = require("gulp-sass");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var server = require("browser-sync").create();
// var csso = require ("gulp-csso");
// var imagemin = require("gulp-imagemin");
// var webp = require("gulp-webp");
// var svgstore = require("gulp-svgstore");
// var posthtml = require("gulp-posthtml");
// var include = require("posthtml-include");
// var del = require("del");
// var htmlmin = require("gulp-htmlmin");
// var jsmin = require("gulp-jsmin");
//
//
// gulp.task("css", function () {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(gulp.dest("build/css"))
//     .pipe(csso())
//     .pipe (rename("style.min.css"))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });
//
// gulp.task("server", function () {
//   server.init({
//     server: "build/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//
//   gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
//   gulp.watch("source/img/**/icon-*.svg", gulp.series("sprite", "html", "refresh"));
//   gulp.watch("source/*.html", gulp.series("html", "refresh"));
// });
//
// gulp.task("refresh", function (done) {
//   server.reload();
//   done();
// })
//
// gulp.task("images", function () {
//   return gulp.src("source/img/**/*.{png,jpg,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true}),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("build/img"));
// });
//
// gulp.task("htmlmin", function () {
//     return gulp.src('build/*.html')
//     .pipe(htmlmin())
//     .pipe(gulp.dest("build"));
// });
//
// gulp.task("jsmin", function (cb) {
//   gulp.src("source/js/script.js")
//     .pipe(jsmin())
//     .pipe(rename("script.min.js"))
//     .pipe(gulp.dest("build/js"));
//     cb();
// });
//
// gulp.task("webp", function () {
//   return gulp.src("source/img/**/*.{png,jpg}")
//     .pipe(webp({quality: 90}))
//     .pipe(guip.dest("source/img/optimization"));
// });
//
// gulp.task("sprite", function () {
//   return gulp.src("source/img/icon-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("img"));
// });
//
// gulp.task("html", function () {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     .pipe(gulp.dest("build"));
//
// });
//
// gulp.task("copy", function () {
//   return gulp.src([
//     "source/fonts/**/*.{woff,woff2}",
//     "source/img/**",
//     "source/js/**",
//     "source/*.ico"
//   ], {
//     base: "source"
//     })
//     .pipe(gulp.dest("build"));
// });
//
// gulp.task("clean", function () {
//   return del("build");
//
// });

// gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "jsmin","html", "htmlmin"));
// gulp.task("build", gulp.series("clean", "copy", "css", "sprite"));
// gulp.task("start", gulp.series("build", "server"));

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var rename = require ("gulp-rename");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/blocks/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "sprite", "server"));
