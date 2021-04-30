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

const menuBurger = document.querySelector('.burger-list');

const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
	menuBurger.classList.toggle('active');
});




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