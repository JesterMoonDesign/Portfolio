"use strict"

		// console.log(document.location);
const contactAnchor = document.querySelector('.mail-to-link')

contactAnchor.addEventListener("click", scrollToContacts) 

function contactsPageScroll() {contactsPage.scrollIntoView({
behavior: "smooth",
block: "start"
})};

function activeCheck () {
	if (contactsPage.classList.contains("active")) {
		contactsPageScroll();
	} else { 
		mailToggleActive();
		setTimeout(() => contactsPageScroll(), 300);
	};
}

function scrollToContacts() {

	if (document.location.href == 'https://jestermoondesign.github.io/portfolio/index.html') {
	activeCheck ();
	} else {

		function goToContacts() { 
			window.location.href = 'https://jestermoondesign.github.io/portfolio/index.html';
		};
		sessionStorage.setItem('toContacts', 'activateContacts');
		goToContacts();
	}
}
