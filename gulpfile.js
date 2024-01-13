const{ src, dest, watch, parallel} = require('gulp'); // src = source (indentificar un archivo), dest (para guardar el archivo)

// CSS
const sass = require('gulp-sass')(require('sass')); // Utilizar gulp sass y buscar su dependencia
const plumber = require('gulp-plumber');
const autoprefixer = requiere('autoprefixer');
const cssnano = requiere('cssnano');
const postcss = requiere('gulp-postcss');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    
    src('src/scss/**/*.scss') // Identificar el archivo SASS a compilar y lo mantiene en memoria
    .pipe(plumber())
    .pipe(sass()) // Compilarlo (.pipe funciona para encadenar procesos uno tras otro primero se ejecuta uno apra dar paso al siguiente)
    .pipe( postcss([ cssnano(), autoprefixer()]))
    .pipe( dest('build/css')); // Almacenarla en el disco duro

    
    done();// Callback que avisa a gulp cuando llegamos al final
}

function imagenes(done){
    const opciones = {
        optimixationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(opciones) ) )
        .pipe( dest('build/img'))
        
    done();
}

function versionWebp(done){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp (opciones))
        .pipe( dest('build/img'))

    done();
}

function versionAvif(done){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif (opciones))
        .pipe( dest('build/img'))

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

        done();
}

function dev(done){

    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);

    done();
}


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);

