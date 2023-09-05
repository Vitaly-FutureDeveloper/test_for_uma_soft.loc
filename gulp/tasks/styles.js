import gulp from "gulp";
import plumber from "gulp-plumber";
import autoprefixer from 'gulp-autoprefixer';
import shorthand from 'gulp-shorthand';
import csso from 'gulp-csso';
import size from 'gulp-size';
import rename from 'gulp-rename';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
// import notify from "gulp-notify";
import gulpIf from "gulp-if";
// import webpCss from "gulp-webp-css";

import dartSass from 'sass';
import gulpSass from 'gulp-sass';


// Configs
import path from "../config/path.js";
import app from "../config/app.js";

const sass = gulpSass(dartSass);

const styles = () => {
	return gulp.src(path.styles.src, { sourcemaps: app.isDev })

		.pipe(plumber())
		.pipe(sass())
		.pipe(gulpIf(app.isDev, shorthand()))
		.pipe(gulpIf(app.isDev, autoprefixer()))
		.pipe(groupCssMediaQueries())
		//.pipe(webpCss())

		.pipe(size({title: "main.css"}))
		.pipe(gulp.dest(path.styles.dest, { sourcemaps: app.isDev }))
		.pipe(rename({ suffix: ".min" }))

		.pipe(csso())
		.pipe(size({title: "main.min.css"}))
		.pipe(gulp.dest(path.styles.dest, { sourcemaps: app.isDev }))

};

export default styles;