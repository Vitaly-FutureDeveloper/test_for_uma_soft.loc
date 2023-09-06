function SliderCarousel(obj){
	this.GeneralBlock = document.querySelector(obj.GeneralBlock);

	this.INTERVAL = obj.INTERVAL;
	this.STEP_SLIDES = obj.STEP_SLIDES;
	this.CHANGE_SLIDES = obj.CHANGE_SLIDES;
	this.FIRST_SLIDE = obj.FIRST_SLIDE;

	this.SENSITIVITY = obj.SENSITIVITY;

	this.viewport = obj.viewport;
	this.max_viewport = obj.max_viewport;

	this.fix_max_width = obj.fix_max_width;

	this.media = obj.media;
	this.media_widths = obj.media_widths;

	this.sliderWrap = this.GeneralBlock.querySelector(obj.sliderWrap);
	this.slidesWrap = this.GeneralBlock.querySelector(obj.slidesWrap);
	this.slides = this.GeneralBlock.querySelectorAll(obj.slides);

	this.eventSlide = obj.eventSlide;
	this.slide_class = obj.slide_class;

	this.dotsWrap = null;
	if( obj.dotsWrap ){
		this.dotsWrap = this.GeneralBlock.querySelector(obj.dotsWrap);
		this.dots = this.GeneralBlock.querySelectorAll(obj.dots);
		this.dot_class = obj.dot_class;
		this.dot_active_class = obj.dot_active_class;
	}

	this.btnsWrap = this.GeneralBlock.querySelector(obj.btnsWrap);
	this.btnMinus = this.GeneralBlock.querySelector(obj.btnMinus);
	this.btnPlus = this.GeneralBlock.querySelector(obj.btnPlus);

	obj.countSlideElement ? this.countSlideElement = this.GeneralBlock.querySelector(obj.countSlideElement) : this.countSlideElement = null;

	this.activations = (this.activations && (Object.keys(this.activations).length !== 0)) && obj.isActivations;
	if( this.activations ){
		obj.activations.slidePrev ? this.slidePrev = obj.activations.slidePrev : this.slidePrev = '';
		obj.activations.slideActive ? this.slideActive = obj.activations.slideActive : this.slideActive = '';
		obj.activations.slideNext ? this.slideNext = obj.activations.slideNext : this.slideNext = '';
	} else {
		this.slidePrev = '';
		this.slideActive = '';
		this.slideNext = '';
	}

	this._linear = 0; // @number
	this._count = 0; // @number
	this._revers = false; // @boolean
	this._slideWidth = 0; // @number
	this._widthWrap = 0; // @number

	this._interval = this._getInterval(this);


	this.changeViewport();

	window.addEventListener('resize', this.changeViewport.bind(this));

	if(this.dotsWrap){
		this.dotsWrap.addEventListener('click', this.slideChange.bind(this));
	}
	if(this.eventSlide){
		this.slidesWrap.addEventListener('click', this.slideChangeInSlides.bind(this));
	}

	this.btnPlus.addEventListener('click', this.slidePlus.bind(this));
	this.btnMinus.addEventListener('click', this.slideMinus.bind(this));

	this.sliderWrap.addEventListener('click', this.clearIntSlider.bind(this));
	this.btnsWrap.addEventListener('click', this.clearIntSlider.bind(this));

	if(this.SENSITIVITY){
		this.sliderWrap.addEventListener('touchstart', this.startTouchMove.bind(this));
		this.sliderWrap.addEventListener('touchmove', this.touchMove.bind(this));
		this.sliderWrap.addEventListener('touchend', this.touchEnd.bind(this));
		this._touchStart = 0;
		this._touchPosition = 0;
	}
}

SliderCarousel.prototype.slidePlus = function () {
	if(this._count < (this.slides.length / this.CHANGE_SLIDES) - 1) {
		this._linear = this._linear + this._widthWrap;
		// this._linear = (this._linear + this._slideWidth) * this.CHANGE_SLIDES;
		this._count++;
		this.dotActivator(this._count);
	}
	else{
		this._revers = true;
	}
// 	const widthSlide = this._widthWrap
console.log(this._count)
// 	if(this._linear > this._widthWrap) this._linear = this._widthWrap;

	this.currentSlide(this._linear);
};

SliderCarousel.prototype.slideMinus = function () {
	if(this._count > 0 || this._linear > 0) {
		this._linear = this._linear - this._widthWrap;
		this._count--;
		this.dotActivator(this._count);
	}
	else{
		this._revers = false;
	}

	if(this._linear < 0) this._linear = 0;

	this.currentSlide(this._linear);
};



SliderCarousel.prototype._getInterval = function(thisObj){
	let interval = setInterval(function () {
		if(!thisObj._revers){
			thisObj.slidePlus();
		}	
		else if(thisObj._revers){
			thisObj.slideMinus();
		}
	}, this.INTERVAL);

	return interval;
};

SliderCarousel.prototype.clearIntSlider = function () {
	clearInterval(this._interval);
};

SliderCarousel.prototype.classToggler = function () {
	if(this.activations){
		Array.from(this.slides).forEach((item) => {
			item.classList.remove(this.slidePrev);
			item.classList.remove(this.slideActive);
			item.classList.remove(this.slideNext);
		});

		if( this.slides[this._count - 1] && this.slidePrev ){
			this.slides[this._count - 1].classList.add(this.slidePrev);
		}
		if( this.slideActive ){
			this.slides[this._count + 0].classList.add(this.slideActive);
		}
		if( this.slides[this._count + 1] && this.slideNext ){
			this.slides[this._count + 1].classList.add(this.slideNext);
		}
	}
}

SliderCarousel.prototype.currentSlide = function (linear) {
	let stepPixel = -linear / (this.STEP_SLIDES / this.CHANGE_SLIDES) + (this._slideWidth * this.FIRST_SLIDE);

	this.slidesWrap.style.transform = `translateX(${stepPixel}px)`;
	if(this.countSlideElement){
		this.countSlideElement.textContent = this._count + 1;
	}

	this.classToggler();
};

SliderCarousel.prototype.dotActivator = function (i) {
	if( this.dotsWrap ){
		Array.from(this.dots).forEach((item) => item.classList.remove(this.dot_active_class));
		this.dots[i].classList.add(this.dot_active_class);
	}
};

SliderCarousel.prototype.slideChange = function (evt) {
	for(let i = 0; i < this.dots.length; i++){
		if( evt.target.classList.contains(this.dot_class) && evt.target == this.dots[i] ){
			this.dotActivator(i);

			this._linear = this._widthWrap * i;
			this._count = i;

			this.currentSlide(this._linear);
			
			this.clearIntSlider();
		}
	}
};

SliderCarousel.prototype.slideChangeInSlides = function (evt) {
	const slideElement = evt.target.closest('.' + this.slide_class);
	
	for(let i = 0; i < this.slides.length; i++){
		if(slideElement === this.slides[i] && !slideElement.classList.contains(this.slideActive)){
			this.dotsWrap && this.dotActivator(i);

			this._linear = this._slideWidth * i;
			this._count = i;

			this.currentSlide(this._linear);
			
			this.clearIntSlider();
		}
	}
};

SliderCarousel.prototype.startTouchMove = function (evt){
	this._touchStart = evt.changedTouches[0].clientX;
	this._touchPosition = this._touchStart;

	this.clearIntSlider();
}
SliderCarousel.prototype.touchMove = function (evt){
	this._touchPosition = evt.changedTouches[0].clientX;
}
SliderCarousel.prototype.touchEnd = function (){
	let distance = this._touchStart - this._touchPosition;
	if (distance > 0 && distance >= this.SENSITIVITY) {
		this.slidePlus();
	}
	if (distance < 0 && distance * -1 >= this.SENSITIVITY) {
		this.slideMinus();
	}
}


SliderCarousel.prototype.changeViewport = function () {
	if(window.innerWidth >= this.max_viewport && this.viewport){
		this._widthWrap = parseInt(getComputedStyle(this.sliderWrap).width.replace("px",""));

		if( this.media ){
			for(let i = 0; i < this.media_widths.length; i++){
				if(window.innerWidth <= this.media_widths[i].width){
					this.STEP_SLIDES = this.media_widths[i].STEP_SLIDES;
					this.CHANGE_SLIDES = this.media_widths[i].CHANGE_SLIDES;
					this.FIRST_SLIDE = this.media_widths[i].FIRST_SLIDE;
				}
			}
		}

		this.slides.forEach((item) => {
			item.style.width = (this._widthWrap / this.STEP_SLIDES) + 'px';
		});

		if(this.fix_max_width){
			this.slides.forEach((item) => {
				item.style.minWidth = (this._widthWrap / this.STEP_SLIDES) + 'px';
				item.style.maxWidth = (this._widthWrap / this.STEP_SLIDES) + 'px';
			});
		}

		this._slideWidth = parseInt(getComputedStyle(this.slides[0]).width.replace("px",""));

		this._linear = 0;
		this._count = 0;
		this.currentSlide(this._linear);

		this.sliderWrap.scrollLeft = 0;
	}
};

export {SliderCarousel};