"use strict"

const lazyImages = document.querySelectorAll('img[data-src]');
const windowHeight = document.documentElement.clientHeight;
let lazyImagesPositions = [];

if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src || img.dataset.srcset) {
            lazyImagesPositions.push(img.getBoundingClientRect().top + scrollY);
            lazyScrollCheck();
        }
    })
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
    if (document.querySelectorAll('img[data-src]', 'source[data-srcset]').length>0) {
        lazyScrollCheck();
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => scrollY > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].onload = () => {
                lazyImages[imgIndex].classList.add('loaded');
                lazyImages[imgIndex].removeAttribute('data-src');
            }
        } else if (lazyImages[imgIndex].dataset.srcset) {
            lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
            lazyImages[imgIndex].removeAttribute('data-srcset')
        }
        delete lazyImagesPositions[imgIndex];
    }
}



//to add lazzyLoad to page -> add <script src="scripts/lazzy_load.js"> </script> to bottom of body.

//for <img> -> 
//1. Change src to data-src;
//2. Set src as src="img/design_pics/thumb.png" (this is empty png 3x3px).

//for imgWrapper -> set class="lazyWrapper".

//to change loading animation -> in CSS .lazyWrapper {background: url(../img/design_pics/loading.gif) center / 50px no-repeat;}.