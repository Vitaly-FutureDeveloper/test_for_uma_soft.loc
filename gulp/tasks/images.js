import gulp from "gulp";
import plumber from "gulp-plumber";
import newer from "gulp-newer";
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
import notify from "gulp-notify";


// Configs
import path from "../config/path.js";
import app from "../config/app.js";

const img = () => {
	return gulp.src(path.img.src)
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: "Image",
				message: error.message,
			}))
		}))

		.pipe(newer(path.img.dest))
		.pipe(imagemin(app.imagemin))
		.pipe(gulp.dest(path.img.dest))

		.pipe(newer(path.img.dest))
		.pipe(webp(app.imagemin))
		.pipe(gulp.dest(path.img.dest))
}


export default img;