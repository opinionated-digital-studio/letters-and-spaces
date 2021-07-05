const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const gulpStylelint = require('gulp-stylelint')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer');
const sortMediaQueries = require('postcss-sort-media-queries');
const sassdoc = require('sassdoc')

const sassFiles = './src/**/*.scss'
const entryFile = './src/index.scss'
const outDir = './dist/'

gulp.task('styles', () => {
  return gulp.src(entryFile)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      basename: 'styles',
      extname: '.css'
    }))
    .pipe(postcss([autoprefixer(), sortMediaQueries()]))
    .pipe(gulp.dest(outDir, {
      overwrite: true
    }))
})

gulp.task('lint', () => {
  return gulp.src(sassFiles)
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
})

gulp.task('sassdoc', () => {
  return gulp.src(sassFiles)
    .pipe(sassdoc())
})

gulp.task('watch', () => {
  gulp.watch(sassFiles, { ignoreInitial: false }, gulp.series('styles'))
})

gulp.task('watch:lint', () => {
  gulp.watch(sassFiles, { ignoreInitial: false }, gulp.series('lint', 'styles'))
})
