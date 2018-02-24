var gulp 				= require('gulp'),
	sass 				= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'),  // Подключаем библиотеку для переименования файлов
    gcmq 				= require('gulp-group-css-media-queries'),
    del 				= require('del'),
    imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant    = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache       = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
 return gulp.src('app/sass/**/*.+(sass|scss)')
   .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
 	 .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
 	 .pipe(gcmq())
   .pipe(gulp.dest('app/css'))
   .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/bootstrap/dist/js/bootstrap.js',
        'app/libs/fontawesome/svg-with-js/js/fontawesome-all.min.js',
        'app/libs/html5shiv/dist/html5shiv.min.js',
        'app/libs/html5shiv/dist/html5shiv-printshiv.min.js',
        'app/libs/respond/dest/respond.min.js',
        'app/libs/parallax/parallax.min.js',
        'app/libs/waypoints/lib/jquery.waypoints.min.js',
        'app/libs/mixitup/dist/mixitup.min.js',
        'app/libs/sliphover/src/jquery.sliphover.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js', // Берем Magnific Popup
        'app/libs/owl.carousel/dist/owl.carousel.min.js',
        'app/libs/animate/animate-css.js'])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.+(sass|scss)', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src(['app/img/**/*', 'app/libs/gamma/images/**/*']) // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([
			'app/css/common.css',
			'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

    var buildAwesome = gulp.src('app/libs/font-awesome/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/fontawesome'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('app/*.php')
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);

gulp.task('clear', function() {
	return cache.clearAll();
})



















