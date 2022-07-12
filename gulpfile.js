'use strict';


let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin');
   


 



gulp.task('clean', async function(){
  del.sync('./dist/');
});

gulp.task('scss', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
	  .pipe(autoprefixer({
		  cascade: false,
		  grid: true
	  }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(imagemin());
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/jquery/dist/jquery.min.js',
    
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
  return gulp.src('src/*.html')
	  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function(){
	return gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('dist/img/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function(){
  return gulp.src('src/js/**/*.js')
  .pipe(concat('script.min.js'))
  .pipe (gulp.dest('dist/js/'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
  browserSync.init({
	  server: {
		  baseDir: [ 'dist' ],
	  },
	  port: 3000,
  });
});

gulp.task('export', function(cd){
  let buildHtml = gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'));

  let BuildFonts = gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('dist/img'));

	cd();
});

gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('src/*.html', gulp.parallel('html'));
  gulp.watch('src/js/*.js', gulp.parallel('script'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.series('clean', gulp.parallel('css' ,'scss', 'html', 'images', 'js', 'browser-sync', 'script','watch')));