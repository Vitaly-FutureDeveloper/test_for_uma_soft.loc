import {deleteSync} from "del";

// Configs
import path from "../config/path.js";

const clear = (cb) => {
	deleteSync(path.root);
	return cb();
};

export default clear;