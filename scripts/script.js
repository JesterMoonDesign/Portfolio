"use strict";

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
//															МЕНЮ БУРГЕР															
(function() {const menuBurger = document.querySelector('.burger-list'),
			burger = document.querySelector('.burger');
			burger.addEventListener('click', () => {
			menuBurger.classList.toggle('active');
	});
})();

function hideBurgerMenu () {
	let burgerMenuBtns = document.querySelectorAll('.burger-list a');
	burgerMenuBtns.forEach(btn => {
		btn.onclick = function (){
			if (document.querySelector('.burger-list').classList.contains('active')) {
				console.log('xiy');
				document.querySelector('.burger-list').classList.remove('active');
			}
		}
	});
}hideBurgerMenu();

//														ПРОКРУТКА НАВЕРХ										
(function() {
const btnToTop = document.querySelector('.arrow-to-up');

function scrollTrack() {
	let scrolled = window.pageYOffset;
	let coords = document.documentElement.clientHeight;
	if (scrolled > coords) {
		btnToTop.classList.add('show');
	}
	if (scrolled < coords) {
		btnToTop.classList.remove('show');
	}
}

function toTop() {
	if (window.pageYOffset > 0) {
	window.scrollBy(0, -80);
	setTimeout(toTop, 10);
	}
}

btnToTop.addEventListener('click', toTop);

window.addEventListener('scroll', scrollTrack);
})();

//														ССЫЛКИ-ЯКОРЯ														
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener("click", function (event) {
		event.preventDefault();
		const blockID = anchor.getAttribute('href');
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	});
}
//														СЛАЙДЕР											
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
};

const activeDot = n => {
	for(dot of dots) {
	dot.classList.remove('active');
	}
	dots[n].classList.add('active');
};

const nextDot = () => {
	if(index == slides.length - 1) {
	index = 0;
	activeSlide(index);
	} else {
	index++;
	activeSlide(index);
	}
};
const activeSlide = n => {
	for(slide of slides) {
	slide.classList.remove('active');
	}
	slides[n].classList.add('active');
};
function nextSlide () {
	if(index == slides.length - 1) {
	index = 0;
	prepareCurrentSlide(index);
	} else {
	index++;
	prepareCurrentSlide(index);
	}
	sliderClearTimeout ();
};
function prevSlide () {
	if(index === 0) {
	index = slides.length - 1;
	prepareCurrentSlide(index);
	} else {
	index--;
	prepareCurrentSlide(index);
	}
	sliderClearTimeout ();
};
dots.forEach ((item, indexDot) => {
	item.addEventListener('click', () => {
	index = indexDot;
	prepareCurrentSlide(index);
	sliderClearTimeout ();
	});
});
next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

let sliderSetTimeout = setInterval(nextSlide, 2500);

function sliderClearTimeout () {
	clearInterval(sliderSetTimeout);
	sliderSetTimeout = setInterval(nextSlide, 2500);
}
//										СЛАЙДЕР BEEFORE/AFTER									
const gallery = document.querySelector('.gallery'),
		galleryWidth = getComputedStyle(gallery),
		galleryResize = document.querySelector('.gallery_resize'),
		sliderSwitch = document.querySelector('.slider_switch'),
		sliderSwitchPosition = getComputedStyle(sliderSwitch),
		sliderSwitchImg = document.querySelector('.slider_switch_img'),
		sliderSwitchImgPosition = getComputedStyle(sliderSwitchImg);
function galleryAdaptive () {
		sliderSwitchImg.style.transform = "translateX(" + (parseInt(galleryWidth.width) / 2) + "px)",
		sliderSwitchImg.style.WebkitTransform = "translateX(" + (parseInt(galleryWidth.width) / 2) + "px)",
		sliderSwitchImg.style.MozTransform = "translateX(" + (parseInt(galleryWidth.width) / 2) + "px)";
		galleryResize.style.clip = "rect(auto," + ((parseInt(galleryWidth.width) / 2) + 20) + "px,auto,auto)",
		galleryResize.style.webkitClip = "rect(auto," + ((parseInt(galleryWidth.width) / 2) + 20) + "px,auto,auto)",
		galleryResize.style.mozClip = "rect(auto," + ((parseInt(galleryWidth.width) / 2) + 20) + "px,auto,auto)";
}
galleryAdaptive ();
//													Слайдер BEEFORE/AFTER для пк						
function sliderBeeforeAfterPC () {
	sliderSwitchImg.onpointerdown = function (event) {
		event.preventDefault();
		function onDrag(event) {
		let x = event.layerX;
		sliderSwitchImg.style.transform = "translateX(" + x + 'px)' ,
		sliderSwitchImg.style.WebkitTransform = "translateX(" + x + 'px)' ,
		sliderSwitchImg.style.MozTransform = "translateX(" + x + 'px)';
		galleryResize.style.clip = "rect(auto," + (x + 20) + "px,auto,auto)",
		galleryResize.style.webkitClip = "rect(auto," + (x + 20) + "px,auto,auto)",
		galleryResize.style.mozClip = "rect(auto," + (x + 20) + "px,auto,auto)";
		}
		document.body.addEventListener('pointermove', onDrag);
		function pointerLose() {
		document.body.removeEventListener('pointermove', onDrag);
		galleryAdaptive ();
		}
		document.body.addEventListener('pointerup', pointerLose);
		document.body.addEventListener('pointercancel', pointerLose);
		sliderSwitch.addEventListener('pointerleave', pointerLose);
	};
}
//													Сладйер BEEFORE/AFTER для смартфона					
sliderBeeforeAfterMobile();
function sliderBeeforeAfterMobile () {
	sliderSwitch.addEventListener('touchstart', sliderWork, {passive: true});
	function sliderWork () {
		function onDrag(event) {
		sliderSwitchImg.style.pointerEvents = "none";
		let x = event.targetTouches[0].pageX - event.targetTouches[0].target.offsetLeft;
		sliderSwitchImg.style.transform = "translateX(" + x + 'px)' ,
		sliderSwitchImg.style.WebkitTransform = "translateX(" + x + 'px)',
		sliderSwitchImg.style.MozTransform = "translateX(" + x + 'px)';
		galleryResize.style.clip = "rect(auto," + (x + 20) + "px,auto,auto)";
		galleryResize.style.webkitClip = "rect(auto," + (x + 20) + "px,auto,auto)";
		galleryResize.style.mozClip = "rect(auto," + (x + 20) + "px,auto,auto)";
		}
		scrollLoc();
		document.body.addEventListener('touchmove', onDrag);
		function pointerLose() {
		document.body.removeEventListener('touchmove', onDrag);
		galleryAdaptive ();
		scrollUnlock();
		}
		document.body.addEventListener('touchend', pointerLose);
		document.body.addEventListener('touchcancel', pointerLose, {passive: true});
		sliderSwitch.addEventListener('touchleave', pointerLose, {passive: true});
		return false;
	}
}

if (isMobile.any()) {
	sliderBeeforeAfterMobile ();
} else {
	sliderBeeforeAfterPC ();
}

//														КОНТАКТЫ												
const contactsBtn = document.querySelector('.contacts-btn'),
		contactsPage = document.querySelector('.contacts-wraper');

contactsBtn.addEventListener('click', mailToggleActive);

function mailToggleActive() {
		contactsPage.classList.toggle('active');
	}

//												РЕАЛИЗАЦИЯ КОНТАКТОВ													
const contactAnchor = document.querySelector('.mail-to-link');

contactAnchor.addEventListener("click", activeCheck);

function contactsPageScroll() {contactAnchor.scrollIntoView({
behavior: "smooth",
block: "end"
});}

function activeCheck () {
	if (contactsPage.classList.contains("active")) {
		contactsPageScroll();
	} else { 
		mailToggleActive();
		setTimeout(() => contactsPageScroll(), 400);
	}
}

function scrollToContacts() {

	if (document.location.href == 'https://jestermoondesign.github.io/portfolio/index.html') {
	activeCheck ();
	} else {

		function goToContacts() { 
			document.location.assign ('https://jestermoondesign.github.io/portfolio/index.html');
		}
		sessionStorage.setItem('toContacts', 'activateContacts');
		goToContacts();
	}
}

function activeContacts () {
	if (sessionStorage.getItem('toContacts') == 'activateContacts') {
		activeCheck ();
		sessionStorage.clear();
	}
}

let menuContactsBtn = document.querySelector('#a-global-about')
menuContactsBtn.addEventListener('click', activeCheck);
activeContacts ();

										//КОПИРОВАНИЕ ЕМАЙЛА																
const textToCopy = document.querySelector('.text_to_copy');
const copyAllert = document.querySelector('.copy-allert');

textToCopy.addEventListener('click', copyText);

function copyText() {
	let copytext = document.createElement('input');
	copytext.value = textToCopy.value;
	document.body.appendChild(copytext);
	copytext.select();
	document.execCommand('copy');
	document.body.removeChild(copytext);
	showAllert();
	function showAllert() {
		copyAllert.classList.add('active');
		setTimeout(() => copyAllert.classList.remove('active'), 1000);
	}
}



									//Анимации
function page1H1Anim () {

	function timeout () {
		aniScrollX = 0;
		pageAnimation_1 ();
	}

	let h1Letters = document.querySelectorAll('.h1_letters_animation span');
	let h2Letters = document.querySelectorAll('.h2_letters_animation span');
	let topCommet = document.querySelector('.top-commet');
	let bottomCommet = document.querySelector('.bottom-commet');
	let aniScrollX = 0;

	function pageAnimation_1 () {
		aniScrollX = window.pageYOffset
		if (aniScrollX <= (1.1 * document.documentElement.clientHeight)) {
			h1Letters[0].classList.add('active');
			h1Letters[0].style.transform = "translate(" + aniScrollX + 'px,' + aniScrollX + 'px)';
			h1Letters[0].style.webkitTransform = "translate(" + aniScrollX + 'px,' + aniScrollX + 'px)';
			h1Letters[0].style.mozTransform = "translate(" + aniScrollX + 'px,' + aniScrollX + 'px)';
			h1Letters[1].classList.add('active');
			h1Letters[1].style.transform = "translate(" + aniScrollX * 1.6 + 'px,' + aniScrollX * 2.066 + 'px)';
			h1Letters[1].style.webkitTransform = "translate(" + aniScrollX * 1.6 + 'px,' + aniScrollX * 2.066 + 'px)';
			h1Letters[1].style.mozTransform = "translate(" + aniScrollX * 1.6 + 'px,' + aniScrollX * 2.066 + 'px)';
			h1Letters[2].classList.add('active');
			h1Letters[2].style.transform = "translate(" + aniScrollX * 1.4 + 'px,' + aniScrollX + 'px)';
			h1Letters[2].style.webkitTransform = "translate(" + aniScrollX * 1.4 + 'px,' + aniScrollX + 'px)';
			h1Letters[2].style.mozTransform = "translate(" + aniScrollX * 1.4 + 'px,' + aniScrollX + 'px)';
			h1Letters[3].classList.add('active');
			h1Letters[3].style.transform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 2.5 + 'px)';
			h1Letters[3].style.webkitTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 2.5 + 'px)';
			h1Letters[3].style.mozTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 2.5 + 'px)';
			h1Letters[4].classList.add('active');
			h1Letters[4].style.transform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 4.66 + 'px)';
			h1Letters[4].style.webkitTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 4.66 + 'px)';
			h1Letters[4].style.mozTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 4.66 + 'px)';
			h1Letters[5].classList.add('active');
			h1Letters[5].style.transform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.6 + 'px)';
			h1Letters[5].style.webkitTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.6 + 'px)';
			h1Letters[5].style.mozTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.6 + 'px)';
			h1Letters[6].classList.add('active');
			h1Letters[6].style.transform = "translate(" + aniScrollX * 1.4 + 'px,' + aniScrollX * -1.24 + 'px)';
			h1Letters[6].style.webkitTransform = "translate(" + aniScrollX * 1.4 + 'px,' + aniScrollX * -1.24 + 'px)';
			h1Letters[6].style.mozTransform = "translate(" + aniScrollX * 1.4 + 'px,' + aniScrollX * -1.24 + 'px)';
			h1Letters[7].classList.add('active');
			h1Letters[7].style.transform = "translate(" + aniScrollX * -1.57 + 'px,' + aniScrollX * 1.66 + 'px)';
			h1Letters[7].style.webkitTransform = "translate(" + aniScrollX * -1.57 + 'px,' + aniScrollX * 1.66 + 'px)';
			h1Letters[7].style.mozTransform = "translate(" + aniScrollX * -1.57 + 'px,' + aniScrollX * 1.66 + 'px)';
			h1Letters[8].classList.add('active');
			h1Letters[8].style.transform = "translate(" + aniScrollX * -1.86 + 'px,' + aniScrollX * 1.33 + 'px)';
			h1Letters[8].style.webkitTransform = "translate(" + aniScrollX * -1.86 + 'px,' + aniScrollX * 1.33 + 'px)';
			h1Letters[8].style.mozTransform = "translate(" + aniScrollX * -1.86 + 'px,' + aniScrollX * 1.33 + 'px)';
			h1Letters[9].classList.add('active');
			h1Letters[9].style.transform = "translate(" + aniScrollX * -2.33 + 'px,' + aniScrollX * -1.66 + 'px)';
			h1Letters[9].style.webkitTransform = "translate(" + aniScrollX * -2.33 + 'px,' + aniScrollX * -1.66 + 'px)';
			h1Letters[9].style.mozTransform = "translate(" + aniScrollX * -2.33 + 'px,' + aniScrollX * -1.66 + 'px)';

			h2Letters[0].classList.add('active');
			h2Letters[0].style.transform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.1 + 'px)';
			h2Letters[0].style.webkitTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.1 + 'px)';
			h2Letters[0].style.mozTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.1 + 'px)';
			h2Letters[1].classList.add('active');
			h2Letters[1].style.transform = "translate(" + aniScrollX * 1.2 + 'px,' + aniScrollX * 1.18 + 'px)';
			h2Letters[1].style.webkitTransform = "translate(" + aniScrollX * 1.2 + 'px,' + aniScrollX * 1.18 + 'px)'
			h2Letters[1].style.mozTransform = "translate(" + aniScrollX * 1.2 + 'px,' + aniScrollX * 1.18 + 'px)'
			h2Letters[2].classList.add('active');
			h2Letters[2].style.transform = "translate(" + aniScrollX * -1.3 + 'px,' + aniScrollX * -1.2+ 'px)';
			h2Letters[2].style.webkitTransform = "translate(" + aniScrollX * -1.3 + 'px,' + aniScrollX * -1.2+ 'px)';
			h2Letters[2].style.mozTransform = "translate(" + aniScrollX * -1.3 + 'px,' + aniScrollX * -1.2+ 'px)';
			h2Letters[3].classList.add('active');
			h2Letters[3].style.transform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.76 + 'px)';
			h2Letters[3].style.webkitTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.76 + 'px)';
			h2Letters[3].style.mozTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * -1.76 + 'px)';
			h2Letters[4].classList.add('active');
			h2Letters[4].style.transform = "translate(" + aniScrollX * 1.3 + 'px,' + aniScrollX * -1.1 + 'px)';
			h2Letters[4].style.webkitTransform = "translate(" + aniScrollX * 1.3 + 'px,' + aniScrollX * -1.1 + 'px)';
			h2Letters[4].style.mozTransform = "translate(" + aniScrollX * 1.3 + 'px,' + aniScrollX * -1.1 + 'px)';
			h2Letters[5].classList.add('active');
			h2Letters[5].style.transform = "translate(" + aniScrollX * -1.13 + 'px,' + aniScrollX * -1.56 + 'px)';
			h2Letters[5].style.webkitTransform = "translate(" + aniScrollX * -1.13 + 'px,' + aniScrollX * -1.56 + 'px)';
			h2Letters[5].style.mozTransform = "translate(" + aniScrollX * -1.13 + 'px,' + aniScrollX * -1.56 + 'px)';

			document.querySelector('.top_commet_div').classList.add("active");
			document.querySelector('.bottom_commet_div').classList.add("active");
			topCommet.style.transform = "translate(" + aniScrollX * 3 + 'px,' + aniScrollX * -1 + 'px)' + 'rotate(' + aniScrollX * -0.09 + 'deg)';
			bottomCommet.style.transform = "translate(" + aniScrollX * -3 + 'px,' + aniScrollX * 1 + 'px)' + 'rotate(' + aniScrollX * -0.19 + 'deg)';
		}
	}
	window.onscroll = setInterval(timeout (), 20000)
}

function page1H1AnimMobile () {

	function timeout () {
		aniScrollX = 0;
		pageAnimation_Mobile ();
	}

	let h1Letters = document.querySelectorAll('.mobile-header_ span');
	let commet = document.querySelector('.mobile_main_page_graphic_img');
	let aniScrollX = 0;

	function pageAnimation_Mobile () {
		aniScrollX = window.pageYOffset;
		let x = 0;

		commet.classList.add('active');
		if (aniScrollX<=1) {
			x=90
		} else {
			x=90 + (aniScrollX * 0.05)
		};
		if (aniScrollX <= (1.1 * document.documentElement.clientHeight)) {
			commet.style.transform = "translate(" + aniScrollX * -0.05 + 'px,' + aniScrollX * 1.9 + 'px)' + 'rotate(' + x + 'deg)';
			commet.style.webkitTransform = "translate(" + aniScrollX * -0.05 + 'px,' + aniScrollX * 1.9 + 'px)' + 'rotate(' + x + 'deg)';
			commet.style.mozTransform = "translate(" + aniScrollX * -0.05 + 'px,' + aniScrollX * 1.9 + 'px)' + 'rotate(' + x + 'deg)';
			
			h1Letters[0].classList.add('active');
			h1Letters[0].style.transform = "translate(" + aniScrollX * 1 + 'px,' + aniScrollX * 1 + 'px)';
			h1Letters[0].style.webkitTransform = "translate(" + aniScrollX * 1 + 'px,' + aniScrollX * 1 + 'px)';
			h1Letters[0].style.mozTransform = "translate(" + aniScrollX * 1 + 'px,' + aniScrollX * 1 + 'px)';
			h1Letters[1].classList.add('active');
			h1Letters[1].style.transform = "translate(" + aniScrollX * -3.53 + 'px,' + aniScrollX * 1.69 + 'px)';
			h1Letters[1].style.webkitTransform = "translate(" + aniScrollX * -3.53 + 'px,' + aniScrollX * 1.69 + 'px)';
			h1Letters[1].style.mozTransform = "translate(" + aniScrollX * -3.53 + 'px,' + aniScrollX * 1.69 + 'px)';
			h1Letters[2].classList.add('active');
			h1Letters[2].style.transform = "translate(" + aniScrollX * 4 + 'px,' + aniScrollX * -2.6 + 'px)';
			h1Letters[2].style.webkitTransform = "translate(" + aniScrollX * 4 + 'px,' + aniScrollX * -2.6 + 'px)';
			h1Letters[2].style.mozTransform = "translate(" + aniScrollX * 4 + 'px,' + aniScrollX * -2.6 + 'px)';
			h1Letters[3].classList.add('active');
			h1Letters[3].style.transform = "translate(" + aniScrollX * 2 + 'px,' + aniScrollX * -3.91 + 'px)';
			h1Letters[3].style.webkitTransform = "translate(" + aniScrollX * 2 + 'px,' + aniScrollX * -3.91 + 'px)';
			h1Letters[3].style.mozTransform = "translate(" + aniScrollX * 2 + 'px,' + aniScrollX * -3.91 + 'px)';
			h1Letters[4].classList.add('active');
			h1Letters[4].style.transform = "translate(" + aniScrollX * -0.45 + 'px,' + aniScrollX * 0.52 + 'px)';
			h1Letters[4].style.webkitTransform = "translate(" + aniScrollX * -0.45 + 'px,' + aniScrollX * 0.52 + 'px)';
			h1Letters[4].style.mozTransform = "translate(" + aniScrollX * -0.45 + 'px,' + aniScrollX * 0.52 + 'px)';
			h1Letters[5].classList.add('active');
			h1Letters[5].style.transform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[5].style.webkitTransform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[5].style.mozTransform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[6].classList.add('active');
			h1Letters[6].style.transform = "translate(" + aniScrollX * 4 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[6].style.webkitTransform = "translate(" + aniScrollX * 4 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[6].style.mozTransform = "translate(" + aniScrollX * 4 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[7].classList.add('active');
			h1Letters[7].style.transform = "translate(" + aniScrollX * 2 + 'px,' + aniScrollX * 3.91 + 'px)';
			h1Letters[7].style.wekitTransform = "translate(" + aniScrollX * 2 + 'px,' + aniScrollX * 3.91 + 'px)';
			h1Letters[7].style.mozTransform = "translate(" + aniScrollX * 2 + 'px,' + aniScrollX * 3.91 + 'px)';
			h1Letters[8].classList.add('active');
			h1Letters[8].style.transform = "translate(" + aniScrollX * -2 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[8].style.webkitTransform = "translate(" + aniScrollX * -2 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[8].style.mozTransform = "translate(" + aniScrollX * -2 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[9].classList.add('active');
			h1Letters[9].style.transform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 4.3 + 'px)';
			h1Letters[9].style.webkitTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 4.3 + 'px)';
			h1Letters[9].style.mozTransform = "translate(" + aniScrollX * -1.33 + 'px,' + aniScrollX * 4.3 + 'px)';
			h1Letters[10].classList.add('active');
			h1Letters[10].style.transform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * -1.52 + 'px)';
			h1Letters[10].style.webkitTransform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * -1.52 + 'px)';
			h1Letters[10].style.mozTransform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * -1.52 + 'px)';
			h1Letters[11].classList.add('active');
			h1Letters[11].style.transform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * 2.17 + 'px)';
			h1Letters[11].style.webkitTransform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * 2.17 + 'px)';
			h1Letters[11].style.mozTransform = "translate(" + aniScrollX * 6 + 'px,' + aniScrollX * 2.17 + 'px)';
			h1Letters[12].classList.add('active');
			h1Letters[12].style.transform = "translate(" + aniScrollX * 2.66 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[12].style.webkitTransform = "translate(" + aniScrollX * 2.66 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[12].style.mozTransform = "translate(" + aniScrollX * 2.66 + 'px,' + aniScrollX * -2.17 + 'px)';
			h1Letters[13].classList.add('active');
			h1Letters[13].style.transform = "translate(" + aniScrollX * 2.2 + 'px,' + aniScrollX * -1.74 + 'px)';
			h1Letters[13].style.webkitTransform = "translate(" + aniScrollX * 2.2 + 'px,' + aniScrollX * -1.74 + 'px)';
			h1Letters[13].style.mozTransform = "translate(" + aniScrollX * 2.2 + 'px,' + aniScrollX * -1.74 + 'px)';
			h1Letters[14].classList.add('active');
			h1Letters[14].style.transform = "translate(" + aniScrollX * 0.66 + 'px,' + aniScrollX * -1.31 + 'px)';
			h1Letters[14].style.webkitTransform = "translate(" + aniScrollX * 0.66 + 'px,' + aniScrollX * -1.31 + 'px)';
			h1Letters[14].style.mozTransform = "translate(" + aniScrollX * 0.66 + 'px,' + aniScrollX * -1.31 + 'px)';
			h1Letters[15].classList.add('active');
			h1Letters[15].style.transform = "translate(" + aniScrollX * -1.06 + 'px,' + aniScrollX * -0.87 + 'px)';
			h1Letters[15].style.webkitTransform = "translate(" + aniScrollX * -1.06 + 'px,' + aniScrollX * -0.87 + 'px)';
			h1Letters[15].style.mozTransform = "translate(" + aniScrollX * -1.06 + 'px,' + aniScrollX * -0.87 + 'px)';
		}
	}
	window.onscroll = setInterval(timeout (), 20000)
}

if (isMobile.any()) {
	window.addEventListener('scroll', page1H1AnimMobile);

} else {
	window.addEventListener('scroll', page1H1Anim);
}

function page2BlockAnimation () {
	let page2Block = document.querySelector('.page-2-content');
	let cover = document.querySelector('.page_2_ani_div');
	let monitorHeight = document.documentElement.clientHeight;
 	let x = 0;
	let index = 0;
	
	if (window.pageYOffset < (monitorHeight * 2)){
		window.onscroll = setInterval ((function page2BlockAnim () {
			if (window.pageYOffset >= (monitorHeight * 1.5) && x==0) {
				index = 0;
			}
			if (x==0 && window.pageYOffset < 5 || x==0 && window.pageYOffset >= (monitorHeight * 1.5) && index != 0 || x==0 && window.pageYOffset <= (monitorHeight * 1.6) && index==0){
				x=1;
				index = 0;
			}
			if (x==1 && window.pageYOffset >= (monitorHeight * 0.5) || x==1 && (monitorHeight * 0.5) > window.pageYOffset > (monitorHeight * 1.5)){
				index = 1;
				x=0;
			}
			if (index == 0) {
				page2Block.classList.remove('active');
				cover.classList.remove('active');
			} 
			if (index == 1) {
				page2Block.classList.add('active');
				cover.classList.add('active');
			}
		}), 100)
	}
} page2BlockAnimation ();