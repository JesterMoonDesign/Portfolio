"use strict"

const isMobile = {
	Andorid: function () {
		return navigator.userAgent.match(/Andorid/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
		isMobile.Andorid() ||
		isMobile.BlackBerry() ||
		isMobile.iOS() ||
		isMobile.Opera() ||
		isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');
} else {
	document.body.classList.add('_pc');
}



function scrollLoc() {
	document.body.classList.add('no_croll');
}


function scrollUnlock() {
	document.body.classList.remove('no_croll');
}

							// МЕНЮ БУРГЕР								


const menuBurger = document.querySelector('.burger-list'),
		burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
	menuBurger.classList.toggle('active');
});



									 // СЛАЙДЕР 							

const prev = document.getElementById('btn-prev'),
		next = document.getElementById('btn-next'),
		slides = document.querySelectorAll('.slide'),
		dots = document.querySelectorAll('.frame-count-dot');

let index = 0,
	 slide = document.querySelector('.slide'),
	 dot = document.querySelector('.frame-count-dot');

const prepareCurrentSlide = ind => {
	activeSlide(ind);
	activeDot(ind);
}

const activeDot = n => {
	for(dot of dots) {
	dot.classList.remove('active');
	}
	dots[n].classList.add('active');
}

const nextDot = () => {
	if(index == slides.length - 1) {
	index = 0;
	activeSlide(index);
	} else {
	index++;
	activeSlide(index);
	}
}

const activeSlide = n => {
	for(slide of slides) {
	slide.classList.remove('active');
	}
	slides[n].classList.add('active');
}

const nextSlide = () => {
	if(index == slides.length - 1) {
	index = 0;
	prepareCurrentSlide(index);
	} else {
	index++;
	prepareCurrentSlide(index);
	}
}

const prevSlide = () => {
	if(index == 0) {
	index = slides.length - 1;
	prepareCurrentSlide(index);
	} else {
	index--;
	prepareCurrentSlide(index);
	}
}

dots.forEach ((item, indexDot) => {
	item.addEventListener('click', () => {
	index = indexDot;
	prepareCurrentSlide(index);
	});
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

const contactsBtn = document.querySelector('.contacts-btn');
let contactsPage =  document.querySelector('.contacts-wraper');

contactsBtn.addEventListener('click', () => {
	contactsPage.classList.toggle('active');
});


					// СЛАДЙЕР BEEFORE/AFTER									


const gallery = document.querySelector('.gallery'),
		galleryResize = document.querySelector('.gallery_resize'),
		sliderSwitch = document.querySelector('.slider_switch'),
		sliderSwitchPosition = getComputedStyle(sliderSwitch),
		sliderSwitchImg = document.querySelector('.slider_switch_img'),
		sliderSwitchImgPosition = getComputedStyle(sliderSwitchImg);

function galleryResizeWidth() {
	(galleryResize.style.width = parseInt(sliderSwitchImgPosition.marginLeft) + 20 + 'px')
}

galleryResizeWidth()

// Для пк:
// function sliderBeeforeAfterPC () {

// 	sliderSwitchImg.onpointerdown = function (event) {
		
// 		event.preventDefault();

// 		scrollLoc();

// 		function onDrag(event) {
// 		sliderSwitchImg.style.marginLeft = event.layerX + 'px';
// 		galleryResizeWidth();
// 		};

// 		document.body.addEventListener('pointermove', onDrag);

// 		function pointerLose() {
// 		document.body.removeEventListener('pointermove', onDrag);
// 		sliderSwitchImg.style.marginLeft = parseInt(sliderSwitchPosition.width) / 2 + 'px';
// 		galleryResizeWidth();
// 		scrollUnlock();
// 		}

// 		document.body.addEventListener('pointerup', pointerLose);

// 		document.body.addEventListener('pointercancel', pointerLose);

// 		sliderSwitch.addEventListener('pointerleave', pointerLose);

// 		galleryResizeWidth();
// 	};
// };

// sliderBeeforeAfterPC()

// sliderSwitchImg.addEventListener('touchstart', $, {passive: true});
// function $(event) {
// 	console.log(event)
// }


function pointerEventsDisabler () {
	sliderSwitchImg.style.pointerEvents = "none";
}

function sliderBeeforeAfterPC () {

		function onDrag(event) {
		sliderSwitchImg.style.marginLeft = event.touches[0].pageX - event.touches[0].target.offsetLeft + 'px';
		galleryResizeWidth();
		};

		scrollLoc();

		document.body.addEventListener('touchmove', onDrag, {passive: true});

		function pointerLose() {
		document.body.removeEventListener('touchmove', onDrag, );
		sliderSwitchImg.style.marginLeft = parseInt(sliderSwitchPosition.width) / 2 + 'px';
		galleryResizeWidth();
		scrollUnlock();
		}

		// sliderSwitch.addEventListener('touchcup', pointerLose, {passive: true});

		// sliderSwitch.addEventListener('touchcancel', pointerLose, {passive: true});

		document.body.addEventListener('touchend', pointerLose, );

		galleryResizeWidth();
};
pointerEventsDisabler();
sliderSwitch.addEventListener('touchstart', sliderBeeforeAfterPC, {passive: true});


// // Для смартфона:
// function sliderBeeforeAfterMobile () {

// 	sliderSwitchImg.addEventListener('touchstart', sliderWork, {passive: true});

// 	function sliderWork (event) {

// 		sliderSwitch.addEventListener('touchmove', onDrag, {passive: true});

// 		function onDrag(event) {
// 		sliderSwitchImg.style.marginLeft = event.touches[0].pageX - event.touches[0].target.offsetLeft + 'px';
// 		console.log('1_' + event.touches[0].pageX);
// 		console.log('2_' + event.touches[0].target.offsetLeft);
// 		console.log(event.touches[0].pageX - event.touches[0].target.offsetLeft);
// 		galleryResizeWidth();
// 		};

// 		sliderSwitch.addEventListener('touchend', touchEnd, {passive: true});

// 		function touchEnd() {
// 		sliderSwitch.removeEventListener('touchmove', onDrag, {passive: true});
// 		sliderSwitchImg.style.marginLeft = parseInt(sliderSwitchPosition.width) / 2 + 'px';
// 		galleryResizeWidth();
// 		}

// 		sliderSwitchImg.ondragstart = function() {
// 		return false;
// 		};
// 	};
// };

// if (isMobile.any()) {
// 	sliderBeeforeAfterMobile ();
// } else {
// 	sliderBeeforeAfterMobile ();
// }
