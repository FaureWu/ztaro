const gulp = require('gulp')
const oss = require('gulp-alioss-upload')
const appConfig = require('./config/config')

const ossOptions = {
  ...appConfig.oss[process.env.BUILD_ENV],
  path: appConfig.oss.path,
  prefix: appConfig.oss.prefix,
  formats: appConfig.oss.formats,
}


function uploadOss() {
  return gulp
    .src([
      './dist/**/*.js',
      './dist/**/*.json',
      './dist/**/*.wxss',
      './dist/**/*.wxml',
    ], { since: gulp.lastRun(uploadOss) })
    .pipe(oss(ossOptions))
    .pipe(gulp.dest('./dist/'))
}

gulp.task('upload:oss', uploadOss)
gulp.task('watch', function() {
  return gulp.watch(
    [
      './dist/**/*.js',
      './dist/**/*.json',
      './dist/**/*.wxss',
      './dist/**/*.wxml',
    ],
    { delay: 1000, ignoreInitial: false },
    uploadOss,
  )
})
