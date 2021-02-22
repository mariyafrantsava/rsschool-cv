function menuOnClick() {
	document.querySelector("#menu-bar").classList.toggle("change");
	document.querySelector("#nav").classList.toggle("change");
	document.querySelector("#menu-bg").classList.toggle("change-bg");
}

let isMenuOpen = false;

function toggleMenu() {
	isMenuOpen = !isMenuOpen;
	menuOnClick();
}

const menuInit = () => {
	document.querySelector("#menu").addEventListener("click", function(event) {
		let menuHref = event.target.closest('a');	
		if(menuHref !== null){
			let id = menuHref.innerHTML;
			document.querySelector(`#${id}`).click();
		}
		toggleMenu();
	});
};

export { menuInit };