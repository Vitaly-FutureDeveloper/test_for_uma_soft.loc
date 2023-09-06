import {favoriteSlider} from "./module/favorite-slider.js";
import {SkrollAnimation} from "./module/scroll-animation.js";


// Lib https://github.com/akzhy/skroll/tree/master
SkrollAnimation.init();

// Самописный слайдер - полностью адаптивный
favoriteSlider('favorites-slider');