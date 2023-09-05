import gulp from "gulp";
import plumber from "gulp-plumber";
import newer from "gulp-newer";
import imagemin from "gulp-imagemin";
import notify from "gulp-notify";


// Configs
import path from "../config/path.js";
import app from "../config/app.js";

const favicon = () => {
	return gulp.src(path.img.favicon)
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: "Image",
				message: error.message,
			}))
		}))

		.pipe(newer(path.img.dest))
		.pipe(imagemin(app.imagemin))
		.pipe(gulp.dest(path.root))
}


export default favicon;