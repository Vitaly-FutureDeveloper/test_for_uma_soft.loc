import gulp from "gulp";
import html from "./gulp/tasks/html.js";
import styles from "./gulp/tasks/styles.js";
import clear from "./gulp/tasks/del.js";
import scripts from "./gulp/tasks/scripts.js";
import deploy from "./gulp/tasks/deploy.js";
import img from "./gulp/tasks/images.js";
import favicon from "./gulp/tasks/favicon.js";
import fonts from "./gulp/tasks/fonts.js";
import browserSyncServe from "browser-sync";
import run from "gulp4-run-sequence";

// Configs
import path from "./gulp/config/path.js";

const browserSync = browserSyncServe.create();

const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root,
			cors: true
		}
	});
};

const watcher = (done) => {
	gulp.watch(path.html.watch, html).on("all", browserSync.reload);

	gulp.watch(path.styles.watch, gulp.series(styles, (cb) => (
		gulp.src(path.styles.stream).pipe(browserSync.stream()).on('end', cb)))
	);

	gulp.watch(path.scripts.watch, scripts).on("all", browserSync.reload);

	gulp.watch(path.img.watch, img).on("all", browserSync.reload);
	gulp.watch(path.fonts.watch, fonts).on("all", browserSync.reload);

	return done();
};

const build = (done) => {
	run(gulp.series(clear, gulp.parallel(html, fonts, styles, scripts, img, favicon)), done);
};
const dev = gulp.series(
	build,
	gulp.parallel(watcher, server)
);


export { clear };
export { html };
export { styles };
export { scripts };
export { deploy };
export { img };
export { fonts };
export { favicon };

export { dev };
export { build };
