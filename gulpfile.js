var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-clean-css');
var rename = require('gulp-rename');
var contact = require('gulp-concat');
var browserSync = require('browser-sync').create();


var yingtai = {
  less: 'yingtai/assets/less/*.less',
  css: 'yingtai/assets/css/',
  js: 'yingtai/assets/js/*.js',
  images: 'yingtai/assets/images/*',
  html: 'yingtai/html/*.html',
  index: 'yingtai/index.html'
};

var dest = {
  css: 'dest/assets/css/',
  js: 'dest/assets/js/',
  images: 'dest/assets/images',
  html: 'dest/html/',
  index: 'dest/'
};

//编译yingtai/assets/less文件并压缩
gulp.task('css',function(){
  return gulp.src(yingtai.less)
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(dest.css))
    .pipe(gulp.dest(yingtai.css));
});


gulp.task('html',function(){
  return gulp.src(yingtai.html)
    .pipe(gulp.dest(dest.html));
});

gulp.task('js',function(){
  return gulp.src(yingtai.js)
    .pipe(gulp.dest(dest.js));
});

gulp.task('index',function(){
  return gulp.src(yingtai.index)
    .pipe(gulp.dest(dest.index));
});

gulp.task('images',function(){
  return gulp.src(yingtai.images)
    .pipe(gulp.dest(dest.images));
});

gulp.task('watch',function(){
  gulp.watch([yingtai.less, yingtai.html, yingtai.js, yingtai.index, yingtai.images],['css', 'html', 'js', 'index', 'images']);
});

gulp.task('default',function(){
  gulp.start('browserSync');
});

gulp.task('browserSync',['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./yingtai",
        },
        files: [ 'yingtai/*','yingtai/html/*', 'docs/*']
    });
});
