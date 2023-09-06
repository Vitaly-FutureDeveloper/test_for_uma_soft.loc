import {Skroll} from "../base/scroll.js";

export const SkrollAnimation = new Skroll()
	.add("h2",{
		animation: "zoomIn",
		duration: 600
	})
	.add(".js-anim-left",{
		animation:"fadeInLeft",
		duration: 600
	})
	.add(".js-anim-right",{
		animation:"fadeInRight",
		duration: 600
	})
	.add(".js-anim-grow",{
		animation:"fadeInDown",
		duration: 600
	})