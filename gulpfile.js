"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const buildConfig = require("./gulp.config");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// CSS expanded
function css() {
  return gulp
    .src(buildConfig.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(concat(buildConfig.cssFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}

// CSS compressed
function cssMin() {
  return gulp
    .src(buildConfig.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat(buildConfig.cssFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}

// Scripts expanded
function js() {
  return gulp
    .src(buildConfig.jsFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat(buildConfig.jsFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}

// Scripts compressed
function jsMin() {
  return gulp
    .src(buildConfig.jsFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat(buildConfig.jsFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}

// html files watch
function htmlWatch() {
  return gulp
    .src(buildConfig.htmlFiles)
    .pipe(plumber())
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch(buildConfig.sassFiles, css);
  gulp.watch(buildConfig.jsFiles, gulp.series(js));
  gulp.watch(buildConfig.allSassFiles, gulp.series([css]));
  gulp.watch(buildConfig.htmlFiles, gulp.series(htmlWatch));
  //   gulp.watch("./assets/img/**/*", images);
}
// Tasks
// gulp.task("images", images);
// gulp.task("css", gulp.series(cssHomeMin, cssLayoutMin));
// gulp.task("js", gulp.series(jsHomeMin, jsLayoutMin));

// build
gulp.task("default", gulp.series(gulp.parallel(cssMin, jsMin)));

// watch
gulp.task("watch", gulp.parallel(watchFiles, browserSync));
