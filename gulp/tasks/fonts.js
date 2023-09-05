import gulp from "gulp";

// Configs
import path from "../config/path.js";

const fonts = () => {
	gulp.src(path.fonts.src)
		.pipe(gulp.dest(path.fonts.dest))
};

export default fonts;