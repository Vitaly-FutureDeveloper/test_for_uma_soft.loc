import {SliderCarousel} from "../base/SliderCarousel.js"

export const favoriteSlider = (sectionClass) => {
	const favoriteSliderSection = document.querySelector(`.${sectionClass}`);

	if(!favoriteSliderSection) return;

	new SliderCarousel({
		GeneralBlock: '.favorites-slider', // Общий блок со слайдером и кнопками, откуда будут браться все по селекторам

		INTERVAL: 9000, // @number Интервал автопереключения
		STEP_SLIDES: 4, // @number Сколько слайдов видимость
		CHANGE_SLIDES: 4, // @number Сколько слайдов переключать
		FIRST_SLIDE: 0, // @number Какой слайд посредине

		media: true,
		media_widths: [
			{
				width: 1420,
				STEP_SLIDES: 4,
				CHANGE_SLIDES: 4, // @number Сколько слайдов переключать
				FIRST_SLIDE: 0,
			},
			{
				width: 920,
				STEP_SLIDES: 3,
				CHANGE_SLIDES: 3, // @number Сколько слайдов переключать
				FIRST_SLIDE: 0,
			},
			{
				width: 768,
				STEP_SLIDES: 2,
				CHANGE_SLIDES: 2, // @number Сколько слайдов переключать
				FIRST_SLIDE: 0,
			},
			{
				width: 475,
				STEP_SLIDES: 1,
				CHANGE_SLIDES: 1, // @number Сколько слайдов переключать
				FIRST_SLIDE: 0,
			}
		],

		fix_max_width: true, // Когда width не работает,
		// будет устанавливать max-width каждому слайду, грузит проц (лучше без него)

		SENSITIVITY: 20,

		viewport: true, // Автоматическое вычисление размеров 1 слайда
		max_viewport: 0,

		sliderWrap: '.favorites-slider-wrap', // Общее окошко со слайдами - которые видно
		slidesWrap: '.favorites-slider-list', // Внутренний ul блок со слайдами
		slides: '.favorites-slider-list__item', // 1 слайд
		eventSlide: true, // Переключение слайдов по клику на слайд
		slide_class: 'favorites-slider-list__item', // Если переключаем по кликам на слайдер - задаём класс

		// dotsWrap: '.slider-rewiews__dots-down', // Кнопочки
		// dots: '.slider-rewiews__dot', // Селектор кнопочки
		// dot_class: 'slider-rewiews__dot', // Класс кнопочки для проверки при делигировании
		// dot_active_class: 'dot--active',

		btnsWrap: '.slider-btns-block', //
		btnMinus: '.js-favorites-slider__btn-left', //
		btnPlus: '.js-favorites-slider__btn-right', //

		//countSlideElement: '', // Куда выводить цифру номера слайда

		isActivations: true,
		activations: {
			// slidePrev: '',
			// slideActive: '--active',
			// slideNext: '',
		},
	});
};