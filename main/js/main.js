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
	touched: false,
	openModal(modal){
		modal.classList.add("show");
	},
	closeModal(modal){
		modal.classList.remove("show");	
	},
	touch(){
		helper.touched = true;
	},
	untouch(){
		helper.touched = false;
	},
	

};


var bookList = { 
	addButton: document.getElementById("add-book"),
	table: document.getElementById("books-list-1"),
	tableBody: document.querySelector(".books-list-body"),
	tableRows: document.getElementsByClassName("books-item"),
	readIcons: document.querySelectorAll(".books-read-icon"),
	deleteIcons: document.querySelectorAll(".books-delete-container"),
	library: [],
	Book: function(title, author, pages, read){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	},
	addBook(title, author, pages, read){
		// Add the book to the array
		let newBook = new bookList.Book(title, author, pages, read);
		bookList.library.push(newBook);

		// At the book to the HTML document
			let item = document.createElement("tr");
			item.classList.add("books-row");
			item.classList.add("books-item");
			item.insertAdjacentHTML("beforeend", `
                    <td class="books-number"></td>
                    <td class="books-title">${title}</td>
                    <td class="books-author">${author}</td>
                    <td class="books-pages">${pages}</td>
                    `);
			if(read === false) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<img class="books-read-icon not-read" src="main/images/x-icon.png" alt="X icon" tabindex="0">
					</td>`);
				
			}
			else if(read === true) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<img class="books-read-icon read" src="main/images/check.png" alt="check icon" tabindex="0">
					</td>`);
			}
            item.insertAdjacentHTML("beforeend", `
            	<td class="books-delete">
            		<div class="books-delete-container" tabindex="0">
                        <img class="delete-png" src="main/images/delete.png" alt="Trash bin">
                             <!-- <img class="delete-png" src="main/images/open-delete.png" alt="Trash bin"> -->
                    </div>
                </td>`);
			bookList.tableBody.appendChild(item);
			// counter++;

	},
	render(library){
		// let counter = 1;
		for (let book of library){

			let item = document.createElement("tr");
			item.classList.add("books-row");
			item.classList.add("books-item");
			item.insertAdjacentHTML("beforeend", `
                    <td class="books-number"></td>
                    <td class="books-title">${book.title}</td>
                    <td class="books-author">${book.author}</td>
                    <td class="books-pages">${book.pages}</td>
                    `);
			if(book.read === true) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<img class="books-read-icon not-read" src="main/images/x-icon.png" alt="X icon" tabindex="0">
					</td>`);
				
			}
			else if(book.read === false) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<img class="books-read-icon read" src="main/images/check.png" alt="check icon" tabindex="0">
					</td>`);
			}
            item.insertAdjacentHTML("beforeend", `
            	<td class="books-delete">
            		<div class="books-delete-container" tabindex="0">
                        <img class="delete-png" src="main/images/delete.png" alt="Trash bin">
                             <!-- <img class="delete-png" src="main/images/open-delete.png" alt="Trash bin"> -->
                    </div>
                </td>`);
			bookList.tableBody.appendChild(item);
			// counter++;
		}
	},

};

var bookModal = {
	backdrop: document.getElementById("add-backdrop"),
	close: document.getElementById("add-close"),
	content: document.getElementById("add-content"),
	title: document.getElementById("book-title-field"),
	author: document.getElementById("book-author-field"),
	pages: document.getElementById("book-pages-field"),
	checkbox: document.getElementById("read-checkbox"),
	submit: document.getElementById("book-submit"),
	clearForm(){
		bookModal.title.value = "";
		bookModal.author.value = "";
		bookModal.pages.value = "";
		bookModal.checkbox.checked = false;
	}
}


// bookList.Book.prototype.toggleRead = function () {
// 	this.read = !(this.read);
// }

for(let i = 0; i < bookList.readIcons.length; i++) {
	bookList.readIcons[i].addEventListener("touchstart", function(){

		if (bookList.readIcons[i].classList.contains("read")) {
			// Make it look like it's not read
			bookList.readIcons[i].classList.remove("read");
			bookList.readIcons[i].classList.add("not-read");
			bookList.readIcons[i].setAttribute("src", "main/images/x-icon.png");
			bookList.readIcons[i].setAttribute("alt", "X icon");
			bookList.readIcons[i].setAttribute("tabindex", "0");

			// Actually change the property Of the object in the library
			bookList.library[i].read = false;

		}
		else if (bookList.readIcons[i].classList.contains("not-read")) {

			// Make it look like it's not read
			bookList.readIcons[i].classList.remove("not-read");
			bookList.readIcons[i].classList.add("read");
			bookList.readIcons[i].setAttribute("src", "main/images/check.png");
			bookList.readIcons[i].setAttribute("alt", "check icon");
			bookList.readIcons[i].setAttribute("tabindex", "0");

			// Actually change the property Of the object in the library			
			bookList.library[i].read = true;
		}

		helper.touch();
	});
	bookList.readIcons[i].addEventListener("click", function(){
	
		if(!(helper.touched)) {


		
			if (bookList.readIcons[i].classList.contains("read")) {
				// Make it look like it's not read
				bookList.readIcons[i].classList.remove("read");
				bookList.readIcons[i].classList.add("not-read");
				bookList.readIcons[i].setAttribute("src", "main/images/x-icon.png");
				bookList.readIcons[i].setAttribute("alt", "X icon");
				bookList.readIcons[i].setAttribute("tabindex", "0");

				// Actually change the property Of the object in the library
				bookList.library[i].read = false;

			}
			else if (bookList.readIcons[i].classList.contains("not-read")) {

				// Make it look like it's not read
				bookList.readIcons[i].classList.remove("not-read");
				bookList.readIcons[i].classList.add("read");
				bookList.readIcons[i].setAttribute("src", "main/images/check.png");
				bookList.readIcons[i].setAttribute("alt", "check icon");
				bookList.readIcons[i].setAttribute("tabindex", "0");

				// Actually change the property Of the object in the library			
				bookList.library[i].read = true;
			}
		}
		helper.untouch();
	});
}




bookList.addButton.addEventListener("touchstart", function(){
	helper.openModal(bookModal.backdrop);
	helper.touch();
});

bookList.addButton.addEventListener("click", function(){
	if(!(helper.touched)) {
		helper.openModal(bookModal.backdrop);

	}
	helper.untouch();
	
});
bookModal.close.addEventListener("touchstart", function(){
	helper.closeModal(bookModal.backdrop);
	helper.touch();
});

bookModal.close.addEventListener("click", function(){

	if(!(helper.touched)) {

		helper.closeModal(bookModal.backdrop);
	}
	helper.untouch();
});


bookModal.backdrop.addEventListener("touchstart", function(event){
	if(!((event.target === bookModal.content) || (bookModal.content.contains(event.target)))) {
		helper.closeModal(bookModal.backdrop);

	}

	helper.touch();
});

bookModal.backdrop.addEventListener("click", function(event){
	
	if(!(helper.touched)) {
		if(!((event.target === bookModal.content) || (bookModal.content.contains(event.target)))) {
			helper.closeModal(bookModal.backdrop);
		}
	}
	helper.untouch();
});


// delete an item from the book list
for(let i = 0; i < bookList.deleteIcons.length; i++) {
	bookList.deleteIcons[i].addEventListener("touchstart", function(){
		bookList.tableBody.removeChild(bookList.tableRows[i]);
		bookList.library.splice(i, 1);

		helper.touch();
	});

	bookList.deleteIcons[i].addEventListener("click", function(){
	
		if(!(helper.touched)) {
			bookList.tableBody.removeChild(bookList.tableRows[i]);
			bookList.library.splice(i, 1);
		}
		helper.untouch();
	});

}


// Submit listener for the modal form
bookModal.submit.addEventListener("touchstart", function(event){
	event.preventDefault();
	let errors = document.querySelectorAll(".modal-error-message");
	for (let error of errors){
		error.parentNode.removeChild(error);
	}

	// Count the number of empty and invalid fields
	let empty = 0;
	let invalid = 0;

	// Do not submit if not all fields are filled Or if they have invalid input
	if(bookModal.title.value === "") {bookModal.title.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
	
	if(bookModal.author.value === "") {bookModal.author.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}

	if(bookModal.pages.value === "") {bookModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
	else if(bookModal.pages.value <= 0) {bookModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid input.</p>`); invalid++;}

	// Abort if there are empty or invalid fields
	if(empty != 0 || invalid != 0) {
		return;

	}
	
	bookList.addBook(bookModal.title.value, bookModal.author.value, bookModal.pages.value, bookModal.checkbox.checked);
	bookModal.clearForm();
	helper.closeModal(bookModal.backdrop);
	helper.touch();
});

bookModal.submit.addEventListener("click", function(event){
	


	if(!(helper.touched)) {
		event.preventDefault();
		let errors = document.querySelectorAll(".modal-error-message");
		for (let error of errors){
			error.parentNode.removeChild(error);
		}

		// Count the number of empty and invalid fields
		let empty = 0;
		let invalid = 0;

		// Do not submit if not all fields are filled Or if they have invalid input
		if(bookModal.title.value === "") {bookModal.title.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
		
		if(bookModal.author.value === "") {bookModal.author.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}

		if(bookModal.pages.value === "") {bookModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
		else if(bookModal.pages.value <= 0) {bookModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid input.</p>`); invalid++;}

		// Abort if there are empty or invalid fields
		if(empty != 0 || invalid != 0) {
			return;

		}
		

		
		
		bookList.addBook(bookModal.title.value, bookModal.author.value, bookModal.pages.value, bookModal.checkbox.checked);
		bookModal.clearForm();
		helper.closeModal(bookModal.backdrop)
	}
	helper.untouch();

});					
