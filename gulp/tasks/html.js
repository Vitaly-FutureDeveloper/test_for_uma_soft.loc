import gulp from "gulp";
import plumber from "gulp-plumber";
import pug from "gulp-pug";
import notify from "gulp-notify";
// import webpHtml from "gulp-webp-html";

// Configs
import path from "../config/path.js";
import app from "../config/app.js";

const html = () => {
	return gulp.src(path.html.src)
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: "HTML",
				message: error.message,
			}))
		}))
		.pipe(pug(app.pug))
		// .pipe(webpHtml())
		.pipe(gulp.dest(path.html.dest))
}

export default html;