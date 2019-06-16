// 

// Screen loader

setTimeout(function () {
  if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector(".loader-container").classList.add("no-display");

    });
  } //Loading has already finished
  else if(document.readyState === "complete" || document.readyState === "interactive" || document.readyState === "loaded"){
    console.log(" HTML loaded");
    document.querySelector(".loader-container").classList.add("no-display"); //Get rid of the loader
  }
}, 600);

// Checking SVG support

var svgSupport = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

if (!(svgSupport)) {

	let allSvg = document.getElementsByTagName("svg");

	for (let svg of allSvg) {
		svg.classList.add("no-display");
		svg.classList.add("hide-svg");
	}

	let allSvgFallback = document.querySelectorAll(".svg-fallback");

	for (let png of allSvgFallback) {
		png.classList.remove("no-display");
		png.classList.remove("hide-png");
	}



}

// document objects

// navigation bar objects

var navbar = {
	header: document.querySelector(".main-header"),
	name: document.querySelector("#nav__name"),
	menubutton: document.querySelector(".nav__menu"),
	menuitemscontainer: document.querySelector(".nav__items-container"),
	menuitems: document.querySelector(".nav__items"),
	menuitem: document.querySelectorAll(".nav__item"),
	indicator: document.querySelectorAll(".indicator"),
	showMenu: function showMenu() {
		navbar.menuitemscontainer.classList.add("show")
		navbar.menubutton.setAttribute("aria-expanded", "true");
	},
	hideMenu: function hideMenu() {
		navbar.menuitemscontainer.classList.remove("show")
		navbar.menubutton.setAttribute("aria-expanded", "false");
	},
	menutouched: false
}

navbar.menubutton.addEventListener("touchstart", function(){
	if(navbar.menuitemscontainer.classList.contains("show")) {
		navbar.hideMenu();
		navbar.menutouched = true;
	}
	else if(!(navbar.menuitemscontainer.classList.contains("show"))) {
		navbar.showMenu();
		navbar.menutouched = true;
	}
});

navbar.menubutton.addEventListener("click", function(){
	if(navbar.menuitemscontainer.classList.contains("show") && (navbar.menutouched === false)) {
		navbar.hideMenu();
	}
	else if(!(navbar.menuitemscontainer.classList.contains("show")) && (navbar.menutouched === false)) {
		navbar.showMenu();
	}
	navbar.menutouched = false;
});

var about = {
	top: document.querySelector("#about-section")
}	

var experience = {
	top: document.querySelector("#experience-section")
}

var education = {
	top: document.querySelector("#education-section")
}

var skills = {
	top: document.querySelector("#skills-section")
}

var interests = {
	top: document.querySelector("#interests-section")
}

var awards = {
	top: document.querySelector("#awards-section")
}

// Get the offset top of the section elements
var offset = { 
	
	aboutY: about.top.offsetTop - 30,
	experienceY: experience.top.offsetTop - 30,
	educationY: education.top.offsetTop - 30,
	skillsY: skills.top.offsetTop - 30,
	interestsY: interests.top.offsetTop - 30,
	awardsY: awards.top.offsetTop - 30
 }; 
// Re-updates the offset upon resizing
window.onresize = function (event) {

	aboutY = about.top.offsetTop - 30;
	experienceY = experience.top.offsetTop - 30;
	educationY = education.top.offsetTop - 30;
	skillsY = skills.top.offsetTop - 30; 
	interestsY = interests.top.offsetTop - 30;
	awardsY = awards.top.offsetTop - 30;

	
};

// This checks how much the window is scrolled
window.onscroll = function (event)
{
	
	// Highlight about after scrolling to its position
	if(this.scrollY < offset.experienceY) {
		for(let index = 0; index < navbar.menuitem.length; index++) {
			if(index !== 0) {
				navbar.menuitem[index].classList.remove("current");
				navbar.indicator[index].classList.remove("show");
			}

		}
		navbar.menuitem[0].classList.add("current");
		navbar.indicator[0].classList.add("show");


	}
	// Highlight experience after scrolling down to its position
	else if(this.scrollY > offset.experienceY && this.scrollY < offset.educationY) {
		for(let index = 0; index < navbar.menuitem.length; index++) {
			if(index !== 1){

			 navbar.menuitem[index].classList.remove("current");
			 navbar.indicator[index].classList.remove("show");

			}
		}
		navbar.menuitem[1].classList.add("current");
		navbar.indicator[1].classList.add("show");
	}

	// Highlight education after scrolling down to its position
	else if(this.scrollY > offset.educationY && this.scrollY < offset.skillsY) {
		for(let index = 0; index < navbar.menuitem.length; index++) {
			if(index !== 2) {
				navbar.menuitem[index].classList.remove("current");
				navbar.indicator[index].classList.remove("show");
			}
		}
		navbar.menuitem[2].classList.add("current");
		navbar.indicator[2].classList.add("show");
	}

	// Highlight skills after scrolling down to its position
	else if(this.scrollY > offset.skillsY && this.scrollY < offset.interestsY) {
		for(let index = 0; index < navbar.menuitem.length; index++) {
			if(index !== 3) {
				navbar.menuitem[index].classList.remove("current");
				navbar.indicator[index].classList.remove("show");
			}
		}
		navbar.menuitem[3].classList.add("current");
		navbar.indicator[3].classList.add("show");
	}

	// Highlight interests after scrolling down to its position
	else if(this.scrollY > offset.interestsY && this.scrollY < offset.awardsY) {
		for(let index = 0; index < navbar.menuitem.length; index++) {
			if(index !== 4){

			 	navbar.menuitem[index].classList.remove("current");
			 	navbar.indicator[index].classList.remove("show");
			}
		}
		navbar.menuitem[4].classList.add("current");
		navbar.indicator[4].classList.add("show");
	}

	// highlight awards after scrolling to its position
	else if(this.scrollY > offset.awardsY) {
		for(let index = 0; index < navbar.menuitem.length; index++) {
			if(index !== 5){
				navbar.menuitem[index].classList.remove("current");
				navbar.indicator[index].classList.remove("show");
			}
		}
		navbar.menuitem[5].classList.add("current");
		navbar.indicator[5].classList.add("show");
	}
}


for(let index = 0; index < navbar.menuitem.length; index++) {
	navbar.menuitem[index].addEventListener("focus", function(){
		// navbar.indicator[index].classList.add("show");
	});

	navbar.menuitem[index].addEventListener("blur", function(){
		// navbar.indicator[index].classList.remove("show");
	});

}

// navbar.menuitem[5].addEventListener("click", function(event){
	// if (!(navbar.indicator[5].classList.contains("show"))) { }
	// let distanceY = offset.awardsY - (window.scrollY);
	// event.preventDefault();
	// window.scrollBy(0, (0.0001 * distanceY));
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.0002 * distanceY));}, 30)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.0004 * distanceY));}, 60)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.0008 * distanceY));}, 90)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.0016 * distanceY));}, 120)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.0032 * distanceY));}, 150)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.0128 * distanceY));}, 210)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.0512 * distanceY));}, 270)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.2000 * distanceY));}, 330)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.5000 * distanceY));}, 360)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (0.55 * distanceY));}, 420)
	// setTimeout(function(){let distanceY = offset.awardsY - (window.scrollY); window.scrollBy(0, (1 * distanceY));}, 480)})









