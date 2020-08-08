'use strict';

/* eslint-disable no-undef */
const { src, dest, task, series } = require('gulp');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const del = require('del');
const cssnano = require('gulp-cssnano');
// const cwebp = require('gulp-cwebp');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
// const bootlint = require('gulp-bootlint');
const autoprefixer = require('gulp-autoprefixer');
// const replace = require('gulp-replace');
/* eslint-enable no-undef */

function cleanup() {
  return del(['dist']);
}

function minify() {
  return (
    src('src/*.html')
      .pipe(useref())
      .pipe(
        gulpIf(
          '*.html',
          htmlmin({ collapseWhitespace: true })
        )
      )
      // .pipe(replace('png', 'webp'))
      // .pipe(replace('jpg', 'webp'))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulpIf('*.css', autoprefixer()))
      .pipe(dest('dist'))
  );
}

function copyFonts() {
  return src('src/fonts/**/*').pipe(dest('dist/fonts'));
}

function copyImages() {
  return (
    src('src/img/**/*')
      .pipe(gulpIf('*.+(png|jpg|gif)', imagemin()))
      // .pipe(gulpIf('*.+(png|jpg)', webp()))
      .pipe(dest('dist/img'))
  );
}

// function lintBootstrap() {
//   return src('src/**/*.html').pipe(bootlint());
// }

// function copySitemap() {
//   return src('src/sitemap.xml').pipe(dest('dist'));
// }

// function copyRobots() {
//   return src('src/robots.txt').pipe(dest('dist'));
// }

task(
  'build',
  series(
    cleanup,
    // lintBootstrap,
    copyFonts,
    copyImages,
    minify,
    // copySitemap,
    // copyRobots
  )
);

