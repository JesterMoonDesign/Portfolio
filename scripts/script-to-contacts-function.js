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

	if (document.location.href == 'file:///E:/Art/Web%20design/My%20portfolio/Portfolio/Portfolio/index.html') {
	activeCheck ();
	} else {

		function goToContacts() { 
			window.location.href = 'file:///E:/Art/Web%20design/My%20portfolio/Portfolio/Portfolio/index.html';
		};
		sessionStorage.setItem('toContacts', 'activateContacts');
		goToContacts();
	}
}