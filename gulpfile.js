const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const minify = require("gulp-babel-minify");
const browserify = require("browserify");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var babelify = require("babelify");

gulp.task("scss", () => {
  return gulp
    .src("dev/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("scripts", function() {
  return browserify({
    entries: "./dev/js/index.js",
    extensions: [".js"],
    debug: true
  })
    .transform(babelify, { presets: ["@babel/env"] })
    .bundle()
    .on("error", function(err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("scripts.min.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      minify({
        mangle: {
          keepClassName: true
        }
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: "dist"
    },
    notify: false
  });
});

gulp.task("default", ["browser-sync", "scss", "scripts"], () => {
  gulp.watch("dev/scss/**/*.scss", ["scss"]);
  gulp.watch("dev/js/**/*.js", ["scripts"]);
  gulp.watch("dist/*.html", browserSync.reload);
});
