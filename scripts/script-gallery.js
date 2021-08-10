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

//														ПРОКРУТКА НАВЕРХ										
// (function() {
// const btnToTop = document.querySelector('.arrow-to-up');

// function scrollTrack() {
// 	let scrolled = window.pageYOffset;
// 	let coords = document.documentElement.clientHeight;
// 	if (scrolled > coords) {
// 		btnToTop.classList.add('show');
// 	}
// 	if (scrolled < coords) {
// 		btnToTop.classList.remove('show');
// 	}
// }

// function toTop() {
// 	if (window.pageYOffset > 0) {
// 	window.scrollBy(0, -80);
// 	setTimeout(toTop, 10);
// 	}
// }

// btnToTop.addEventListener('click', toTop);

// window.addEventListener('scroll', scrollTrack);
// })();

//														ССЫЛКИ-ЯКОРЯ														
// const anchors = document.querySelectorAll('a[href*="#"]');

// for (let anchor of anchors) {
// 	anchor.addEventListener("click", function (event) {
// 		event.preventDefault();
// 		const blockID = anchor.getAttribute('href');
// 		document.querySelector('' + blockID).scrollIntoView({
// 			behavior: "smooth",
// 			block: "nearest"
// 		});
// 	});
// }

const query = window.matchMedia('(min-width: 768px)');

function galleryModal () {

	const imagesWrapers = document.querySelectorAll('.image__wraper');
	const modal = document.querySelector('.modal');
	const imageBg = document.querySelector('.image__bg');
	const modalFrame = document.querySelector('.modal__content');
	let modalImg = document.querySelector('.modal__image');
	const wrapers = [];
	let x = 0;

	for (let i = 0; i < imagesWrapers.length; i++) {
		wrapers.push(imagesWrapers[i])
	};

	for (var i = wrapers.length - 1; i >= 0; i--) {
		wrapers[i].addEventListener('click', openModal);
	};


	function openModal (e) {

		const body = document.querySelector('.gallery__body');
		const imageContainer = document.querySelector('.image');
		const bodyHeight = body.clientHeight;
		let imageHeight = 0;

		let image = this.children[0];
		modalImg.src = image.src;

		function moveModal (event) {
			x = event.target.scrollingElement.scrollTop;

			if (query.matches) {
				if (x <= imageHeight - (bodyHeight - 200)) { //!!!!!
					imageBg.style.transform = 'translate(-50%,' + x + 'px)';
					imageBg.style.webkitTransform = 'translate(-50%,' + x + 'px)';
				} else {};
			} else {
					if (x <= (bodyHeight - x - 200)) { //!!!!!
						imageBg.style.transform = 'translate(-50%,' + x + 'px)';
						imageBg.style.webkitTransform = 'translate(-50%,' + x + 'px)';
					}
			}
		};


		modalImg.onload = function() {
		imageHeight = modalImg.height;
		imageBg.style.transform = 'translate(-50%, 0px)';
		imageBg.style.webkitTransform = 'translate(-50%, 0px)';

		imageBg.style.transition = 'none';
		imageBg.style.WebkitTransition = 'none';
		imageBg.style.MozTransition = 'none';

			if (query.matches) {
				if (imageHeight > (bodyHeight -200)) { //!!!!!
				window.addEventListener('scroll', moveModal);
				};
			} else {
				window.addEventListener('scroll', moveModal);
			}
		};

		modal.classList.add('active');

		modal.addEventListener('click', closeModal);

		function closeModal () {
			imageBg.style.transform = 'translate(-50%, 0px)';
			imageBg.style.webkitTransform = 'translate(-50%, 0px)';
			window.removeEventListener('scroll', moveModal);
			modal.style.transition = 'all linear 0.2s';
			modal.style.WebkitTransition = 'all linear 0.2s';
			modal.style.MozTransition = 'all linear 0.2s';
			modal.classList.remove('active');
			modal.removeEventListener('click', closeModal);
		};

	};

}; galleryModal ();