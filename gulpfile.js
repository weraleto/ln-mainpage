const
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    htmlmin      = require('gulp-htmlmin'),
    browserSync  = require('browser-sync').create(),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    cache        = require('gulp-cache'),
    imagemin     = require('gulp-imagemin'),
    svgSprite    = require('gulp-svg-sprites'),
    svgmin       = require('gulp-svgmin'),
    cheerio      = require('gulp-cheerio'),
    replace      = require('gulp-replace');

gulp.task('browser-sync', ['fonts', 'styles', 'scripts', 'home-js', 'product-cat-js', 'product-js', 'blog-js', 'post-js', 'page-js', 'html', 'svgSprite', 'images'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: false
    });
});

//таск для преобразования всех свг иконок в один svg спрайт
//

gulp.task('svgSprite', function () {
    return gulp.src('./dev/img/svg/**/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
          run: function ($) {
            //удаляем из свг ненужные атрибуты
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
        //   parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        // в поле selector добавляем уникальный префикс который далее будет использован в пути к свг спрайту
        .pipe(svgSprite({
                mode: "symbols",
                preview: false,
                selector: "viva_%f",
                svg: {
                    symbols: 'sprite.svg'
                }
            }
        ))
        .pipe(gulp.dest('./app/img/svg/'))
        .pipe(gulp.dest('./dest/img/svg/'));
});

gulp.task('styles', function () {
    return gulp.src('./dev/scss/main.scss')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.stream());
});


gulp.task('scripts', function() {
    return gulp.src([
        './dev/js/libs/jquery/jquery-3.4.1.js',
        './dev/js/libs/fullpage/fullpage.js',
        './dev/js/libs/slick/slick.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js/'))
        .pipe(gulp.dest('./dest/js/'));
});

gulp.task('home-js', function() {
    return gulp.src([
        './dev/js/home.js'
    ])
        .pipe(concat('home.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./app/js/'))
        .pipe(gulp.dest('./dest/js/'));
});

gulp.task('product-cat-js', function() {
  return gulp.src([
    './dev/js/product-cat.js'
  ])
    .pipe(concat('product-cat.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('product-js', function() {
  return gulp.src([
    './dev/js/product.js'
  ])
    .pipe(concat('product.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('blog-js', function() {
  return gulp.src([
    './dev/js/blog.js'
  ])
    .pipe(concat('blog.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('post-js', function() {
  return gulp.src([
    './dev/js/post.js'
  ])
    .pipe(concat('post.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('page-js', function() {
  return gulp.src([
    './dev/js/page.js'
  ])
    .pipe(concat('page.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('html', function() {
    return gulp.src([
        './dev/*.html'
    ])
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: true
        // }))
        .pipe(gulp.dest('./app'));
});

gulp.task('images', function(){
    return gulp.src([
        './dev/img/**/*.+(png|jpg|jpeg|svg)',
        './dev/img/images/*.+(png|jpg|jpeg)',
        '!/dev/img/svg/**/*.svg'
    ])
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./app/img/'))
        .pipe(gulp.dest('./dest/img/'));
});

gulp.task('fonts', function() {
    return gulp.src([
        './dev/fonts/**/*'
    ])
        .pipe(gulp.dest('./app/fonts/'))
        .pipe(gulp.dest('./dest/fonts/'));
});

gulp.task('watch', function () {
    gulp.watch('./dev/scss/**/*.scss', ['styles']);
    gulp.watch('./dev/js/libs/**/*.js', ['scripts']);
    gulp.watch('./dev/js/home.js', ['home-js']);
    gulp.watch('./dev/js/product-cat.js', ['product-cat-js']);
    gulp.watch('./dev/js/product.js', ['product-js']);
    gulp.watch('./dev/js/blog.js', ['blog-js']);
    gulp.watch('./dev/js/post.js', ['post-js']);
    gulp.watch('./dev/js/page.js', ['page-js']);
    gulp.watch('./dev/*.html', ['html']);
    gulp.watch('./dev/img/svg/**/*.svg', ['svgSprite']);
    gulp.watch('./dev/img/**/*.+(png|jpg|jpeg)', ['images']);
    gulp.watch('./dev/js/*.js').on("change", browserSync.reload);
    gulp.watch('./dev/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
