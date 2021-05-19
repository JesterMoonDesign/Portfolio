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
		galleryWidth = getComputedStyle(gallery),
		galleryResize = document.querySelector('.gallery_resize'),
		sliderSwitch = document.querySelector('.slider_switch'),
		sliderSwitchPosition = getComputedStyle(sliderSwitch),
		sliderSwitchImg = document.querySelector('.slider_switch_img'),
		sliderSwitchImgPosition = getComputedStyle(sliderSwitchImg);

function galleryAdaptive () {
		sliderSwitchImg.style.transform = "translateX(" + (parseInt(galleryWidth.width) / 2) + "px)";
		galleryResize.style.clip = "rect(auto," + ((parseInt(galleryWidth.width) / 2) + 20) + "px,auto,auto)";
}

galleryAdaptive ()

//					Слайдер для пк						
function sliderBeeforeAfterPC () {

	sliderSwitchImg.onpointerdown = function (event) {
		
		event.preventDefault();

		function onDrag(event) {
		let x = event.layerX;
		sliderSwitchImg.style.transform = "translateX(" + x + 'px)';
		galleryResize.style.clip = "rect(auto," + (x + 20) + "px,auto,auto)";
		};

		document.body.addEventListener('pointermove', onDrag);

		function pointerLose() {
		document.body.removeEventListener('pointermove', onDrag);
		galleryAdaptive ()
		}

		document.body.addEventListener('pointerup', pointerLose);

		document.body.addEventListener('pointercancel', pointerLose);

		sliderSwitch.addEventListener('pointerleave', pointerLose);

	};
};


//					Сладйер для смартфона					


function sliderBeeforeAfterMobile () {

	sliderSwitch.addEventListener('touchstart', sliderWork);

	function sliderWork () {

		function onDrag(event) {
		sliderSwitchImg.style.pointerEvents = "none";
		let x = event.targetTouches[0].pageX - event.targetTouches[0].target.offsetLeft;
		sliderSwitchImg.style.transform = "translateX(" + x + 'px)';
		galleryResize.style.clip = "rect(auto," + (x + 20) + "px,auto,auto)";
		};

		scrollLoc();

		document.body.addEventListener('touchmove', onDrag);

		function pointerLose() {
		document.body.removeEventListener('touchmove', onDrag);
		galleryAdaptive ();
		scrollUnlock();
		};

		document.body.addEventListener('touchend', pointerLose);

		// document.body.addEventListener('touchcancel', pointerLose, {passive: true});

		// sliderSwitch.addEventListener('pointerleave', pointerLose, {passive: true});

		return false;

	};
};


if (isMobile.any()) {
	sliderBeeforeAfterMobile ();
} else {
	sliderBeeforeAfterPC ();
}
