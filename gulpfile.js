const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minify = require("gulp-babel-minify");

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

gulp.task("scripts", () => 
  gulp.src('dev/js/**/*.js')
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(concat("scripts.js"))
  .pipe(minify({
    mangle: {
      keepClassName: true
    }
  }))
  .pipe(gulp.dest('dist/js'))
);

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