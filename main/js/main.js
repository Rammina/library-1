// 

// Screen loader

/*
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
  */
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



var general = {
	main: document.querySelector(".main-content")
}
var helper = { 
	openModal(modal){
		modal.classList.add("show");
	},
	closeModal(modal){
		modal.classList.remove("show");	
	}
};


var bookList = { 
	addButton: document.getElementById("add-book"),
	table: document.getElementById("books-list-1"),
	readButtons: document.querySelectorAll(".books-read-button"),
	library: [],
	/*Book(title, author, pages, read){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	},
	addBook(title, author, pages, read){
		let newBook = new bookList.Book(title, author, pages, read);
		bookList.library.push(newBook);
	},
	render(library){
		let counter = 1;
		for (let book of library){

			let item = document.createElement("tr");
			item.classList.add("books-row");
			item.classList.add("books-item");
			item.insert.insertAdjacentHTML("beforeend", `
                    <td class="books-number">${counter}</td>
                    <td class="books-title">${book.title}</td>
                    <td class="books-author">${book.author}</td>
                    <td class="books-pages">${book.pages}</td>
                    <td class="books-read">tbd</td>
                    <td class="books-delete">bin.SvG</td>
                    `);
			bookList.table.appendChild(item);
			counter++;
		}
	}*/
	


	

};

// bookList.Book.prototype.toggleRead = function () {
// 	this.read = !(this.read);
// }

for(let i = 0; i < bookList.readButtons.length; i++) {
	bookList.readButtons[i].addEventListener("click", function(){
		if (bookList.readButtons[i].innerText === "Yes") {
			bookList.readButtons[i].innerText = "No";
		}
		else if (bookList.readButtons[i].innerText === "No") {
			bookList.readButtons[i].innerText = "Yes";
		}
	});
}


var bookModal = {
	backdrop: document.getElementById("add-backdrop"),
	close: document.getElementById("add-close"),
	content: document.getElementById("add-content")
}


bookList.addButton.addEventListener("click", function(){
	helper.openModal(bookModal.backdrop);
});

bookModal.close.addEventListener("click", function(){
	helper.closeModal(bookModal.backdrop);
});

bookModal.backdrop.addEventListener("click", function(event){
	if(!((event.target === bookModal.content) || (bookModal.content.contains(event.target)))) {
		helper.closeModal(bookModal.backdrop);

	}
});





