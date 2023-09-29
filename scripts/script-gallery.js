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

const query = window.matchMedia('(min-width: 500px)');
const imagesWrapers = document.querySelectorAll('.image__wraper');

function galleryModal () {

	const modal = document.querySelector('.modal');
	const imageBg = document.querySelector('.image__bg');
	const modalFrame = document.querySelector('.modal__content');
	let modalImg = document.querySelector('.modal__image');
	let modalDescription = document.querySelector('.modal-description-value')
	let modalLinkWrapper = document.querySelector('.link-wrapper')
	let modalLink = document.querySelector('.modal-link')
	const wrapers = [];


	for (let i = 0; i < imagesWrapers.length; i++) {
		wrapers.push(imagesWrapers[i])
	};

	for (let i = wrapers.length - 1; i >= 0; i--) {
		wrapers[i].addEventListener('click', openModal);
	};


	function openModal (e) {

		const body = document.querySelector('.gallery__body');
		const imageContainer = document.querySelector('.image');
		const bodyHeight = body.clientHeight;
		let imageHeight = 0;
		let x = 0;

		const image = this.children[0];
		const description = image.dataset.description;
		const link = image.dataset.link;

		imageBg.style.transition = 'none';
		imageBg.style.WebkitTransition = 'none';
		imageBg.style.MozTransition = 'none';
		imageBg.style.oTransition = 'none';
		imageBg.style.transform = 'translate(-50%, 0px)';
		document.body.scrollTop = 0;
  		document.documentElement.scrollTop = 0;

		modalImg.src = image.src;
		!description ? modalDescription.innerHTML = '' : modalDescription.innerHTML = description;
		if (!link) {
			modalLinkWrapper.style.display = 'none';
		} else {
			modalLinkWrapper.style.display = 'flex';
			modalLink.innerHTML = link;
			modalLink.href = link;
		}

		modalImg.onload = function() {
			imageHeight = modalImg.height;
			query.matches ? imageBg.style.height = imageHeight + 600 + 'px' : imageBg.style.height = body.offsetHeight + 200 + 'px';
			x = e.pageY - e.clientY;

			window.addEventListener('scroll', moveModal);
		};

		function moveModal (event) {
			x = event.target.scrollingElement.scrollTop;
			let y;
			if (query.matches) {
				y = 1000;
			} else {
				y = bodyHeight
			}

			if (x <= bodyHeight-y) { //!!!!!
				imageBg.style.transform = 'translate(-50%,' + x + 'px)';
				imageBg.style.webkitTransform = 'translate(-50%,' + x + 'px)';
				imageBg.style.mozTransform = 'translate(-50%,' + x + 'px)';
			}
		};

		modal.classList.add('active');

		imageBg.addEventListener('click', closeModal);

		function closeModal () {
			imageBg.style.transform = 'translate(-50%, 0px)';
			imageBg.style.webkitTransform = 'translate(-50%, 0px)';
			imageBg.style.oTransform = 'translate(-50%, 0px)';
			window.removeEventListener('scroll', moveModal);
			modal.style.transition = 'all linear 0.2s';
			modal.style.webkitTransition = 'all linear 0.2s';
			modal.style.mozTransition = 'all linear 0.2s';
			modal.classList.remove('active');
			imageBg.removeEventListener('click', closeModal);
		};

	};

}; galleryModal ();

function disableEmptyContainers () {
	for (let i = 0; i < imagesWrapers.length; i++) {
		let imageSrc = imagesWrapers[i].children[0].attributes[0].value;
		if(!imageSrc) {
			imagesWrapers[i].children[0].attributes[0].nodeValue = 'img/if-no-image.png'
			imagesWrapers[i].classList.add('disabled');
		}
	}
}disableEmptyContainers();

// function gallleryCursor () {
// 	let imageWrapers = document.querySelectorAll('.image__wraper');
// 	let page = document.querySelector('.gallery__body');
// 	let cursor = document.querySelector('.cursor');
// 	let x = 0;
// 	let y = 0;
		
// 	imageWrapers.forEach(wraper => {
// 		wraper.onpointerenter = function (){
// 			cursor.style.visibility = ('visible');

// 			page.onpointermove = function (event){
// 				x = event.clientX;
// 				y = event.clientY;
// 				cursor.style.transform = 'translate(' + x + 'px,' + y + 'px)';
// 			};

// 			page.onpointerleave = function (){
// 				cursor.style.visibility = ('hidden');
// 			};
// 		};
// 	});
// } gallleryCursor ();
