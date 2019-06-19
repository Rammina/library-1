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
	main: document.querySelector(".main-content"),
	backdrops: document.querySelectorAll(".backdrop"),
	closeButtons: document.querySelectorAll(".modal__close")
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
	readContainer: document.querySelectorAll(".books-read-container"),
	readIcons: document.querySelectorAll(".books-read-icon"),
	deleteIcons: document.querySelectorAll(".books-delete-container"),
	library: [{title: "A Game of Thrones", author: "George R.R. Martin", pages: 694, read: false},
		{title: "A Game of Thrones", author: "George R.R. Martin", pages: 694, read: true}],
	Book: function(title, author, pages, read){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	},
	renderRow(title, author, pages, read){
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
						<div class="books-read-container" tabindex="0">
							<img class="books-read-icon not-read" src="main/images/x-icon.png" alt="X icon" >
						</div>	
					</td>`);
				
			}
			else if(read === true) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<div class="books-read-container" tabindex="0">
							<img class="books-read-icon read" src="main/images/check.png" alt="check icon">
						</div>
					</td>`);
			}
            item.insertAdjacentHTML("beforeend", `
            	<td class="books-delete">
            		<div class="books-delete-container" tabindex="0">
                        <img class="delete-png" src="main/images/delete.png" alt="Trash bin">
                             <!-- <img class="delete-png" src="main/images/open-delete.png" alt="Trash bin"> -->
                    </div>
                </td>`);
            let itemRead = item.querySelector(".books-read-container");
			bookList.tableBody.appendChild(item);
			// counter++;

	},
	addBook(title, author, pages, read){
		// Add the book to the array
		let newBook = new bookList.Book(title, author, pages, read);
		bookList.library.push(newBook);
		bookList.renderRow(title, author, pages, read);
					
	},
	renderLibrary(library){
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
						<div class="books-read-container" tabindex="0">
							<img class="books-read-icon not-read" src="main/images/x-icon.png" alt="X icon">
						</div>
					</td>`);
				
			}
			else if(book.read === false) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<div class="books-read-container" tabindex="0">
							<img class="books-read-icon read" src="main/images/check.png" alt="check icon">
						</div>
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

var addModal = {
	backdrop: document.getElementById("add-backdrop"),
	close: document.getElementById("add-close"),
	content: document.getElementById("add-content"),
	title: document.getElementById("book-title-field"),
	author: document.getElementById("book-author-field"),
	pages: document.getElementById("book-pages-field"),
	checkbox: document.getElementById("read-checkbox"),
	submit: document.getElementById("book-submit"),
	clearForm(){
		addModal.title.value = "";
		addModal.author.value = "";
		addModal.pages.value = "";
		addModal.checkbox.checked = false;
	}
}

var deleteModal = {
	backdrop: document.getElementById("delete-backdrop"),
	close: document.getElementById("delete-close"),
	content: document.getElementById("delete-modal"),
	delete: document.getElementById("delete-modal-button"),
	cancel: document.getElementById("cancel-modal-button"),
	openedBy: null,
};


// bookList.Book.prototype.toggleRead = function () {
// 	this.read = !(this.read);
// }

for(let i = 0; i < bookList.readContainer.length; i++) {
	bookList.readContainer[i].addEventListener("touchstart", function(){

		if (bookList.readIcons[i].classList.contains("read")) {
			// Make it look like it's not read
			bookList.readIcons[i].classList.remove("read");
			bookList.readIcons[i].classList.add("not-read");
			bookList.readIcons[i].setAttribute("src", "main/images/x-icon.png");
			bookList.readIcons[i].setAttribute("alt", "X icon");
			// bookList.readIcons[i].setAttribute("tabindex", "0");

			// Actually change the property Of the object in the library
			bookList.library[i].read = false;

		}
		else if (bookList.readIcons[i].classList.contains("not-read")) {

			// Make it look like it's not read
			bookList.readIcons[i].classList.remove("not-read");
			bookList.readIcons[i].classList.add("read");
			bookList.readIcons[i].setAttribute("src", "main/images/check.png");
			bookList.readIcons[i].setAttribute("alt", "check icon");
			// bookList.readIcons[i].setAttribute("tabindex", "0");

			// Actually change the property Of the object in the library			
			bookList.library[i].read = true;
		}

		helper.touch();
	});
	bookList.readContainer[i].addEventListener("click", function(){
	
		if(!(helper.touched)) {


		
			if (bookList.readIcons[i].classList.contains("read")) {
				// Make it look like it's not read
				bookList.readIcons[i].classList.remove("read");
				bookList.readIcons[i].classList.add("not-read");
				bookList.readIcons[i].setAttribute("src", "main/images/x-icon.png");
				bookList.readIcons[i].setAttribute("alt", "X icon");
				// bookList.readIcons[i].setAttribute("tabindex", "0");

				// Actually change the property Of the object in the library
				bookList.library[i].read = false;

			}
			else if (bookList.readIcons[i].classList.contains("not-read")) {

				// Make it look like it's not read
				bookList.readIcons[i].classList.remove("not-read");
				bookList.readIcons[i].classList.add("read");
				bookList.readIcons[i].setAttribute("src", "main/images/check.png");
				bookList.readIcons[i].setAttribute("alt", "check icon");
				// bookList.readIcons[i].setAttribute("tabindex", "0");

				// Actually change the property Of the object in the library			
				bookList.library[i].read = true;
			}
		}
		helper.untouch();
	});
}




bookList.addButton.addEventListener("touchstart", function(){
	helper.openModal(addModal.backdrop);
	addModal.content.focus();
	helper.touch();
});

bookList.addButton.addEventListener("click", function(){
	if(!(helper.touched)) {
		helper.openModal(addModal.backdrop);
		addModal.content.focus();
	}
	helper.untouch();
	
});

// Intended general modal backdrop closer
for(let i = 0; i < general.backdrops.length; i++) {
	general.backdrops[i].addEventListener("touchstart", function(event){
		if(!((event.target === general.backdrops[i].firstElementChild) || (general.backdrops[i].firstElementChild.contains(event.target)))) {
			helper.closeModal(general.backdrops[i]);

			// In case the delete backdrop was opened, reset the openedBy property
			if(deleteModal.openedBy !== null) {
				deleteModal.openedBy = null;
			}

		}

		helper.touch();	
	});

	general.backdrops[i].addEventListener("click", function(event){
		if(!(helper.touched)) {


			if(!((event.target === general.backdrops[i].firstElementChild) || (general.backdrops[i].firstElementChild.contains(event.target)))) {
				helper.closeModal(general.backdrops[i]);

				// In case the delete backdrop was opened, reset the openedBy property
				if(deleteModal.openedBy !== null) {
					deleteModal.openedBy = null;
				}
			}
		}
		helper.untouch();
	});
}

// General close button modal closer
for(let i = 0; i < general.closeButtons.length; i++) {
	general.closeButtons[i].addEventListener("touchstart", function(event){
		helper.closeModal(general.backdrops[i]);

		// In case the delete backdrop was opened, reset the openedBy property
		if(deleteModal.openedBy !== null) {
			deleteModal.openedBy = null;
		}

		

		helper.touch();	
	});

	general.closeButtons[i].addEventListener("click", function(event){
		if(!(helper.touched)) {
			helper.closeModal(general.backdrops[i]);

			// In case the delete backdrop was opened, reset the openedBy property
			if(deleteModal.openedBy !== null) {
				deleteModal.openedBy = null;
				
			}
		}
		helper.untouch();
	});
}

// Submit listener for the modal form
addModal.submit.addEventListener("touchstart", function(event){
	event.preventDefault();
	let errors = document.querySelectorAll(".modal-error-message");
	for (let error of errors){
		error.parentNode.removeChild(error);
	}

	// Count the number of empty and invalid fields
	let empty = 0;
	let invalid = 0;

	// Do not submit if not all fields are filled Or if they have invalid input
	if(addModal.title.value === "") {addModal.title.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
	
	if(addModal.author.value === "") {addModal.author.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}

	if(addModal.pages.value === "") {addModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
	else if(addModal.pages.value <= 0) {addModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid page number.</p>`); invalid++;}

	// Abort if there are empty or invalid fields
	if(empty != 0 || invalid != 0) {
		return;

	}
	
	bookList.addBook(addModal.title.value, addModal.author.value, addModal.pages.value, addModal.checkbox.checked);
	addModal.clearForm();
	helper.closeModal(addModal.backdrop);
	helper.touch();
});

addModal.submit.addEventListener("click", function(event){
	


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
		if(addModal.title.value === "") {addModal.title.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
		
		if(addModal.author.value === "") {addModal.author.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}

		if(addModal.pages.value === "") {addModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`); empty++;}
		else if(addModal.pages.value <= 0) {addModal.pages.insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid page number.</p>`); invalid++;}

		// Abort if there are empty or invalid fields
		if(empty != 0 || invalid != 0) {
			return;

		}
		

		
		
		bookList.addBook(addModal.title.value, addModal.author.value, addModal.pages.value, addModal.checkbox.checked);
		addModal.clearForm();
		helper.closeModal(addModal.backdrop)
	}
	helper.untouch();

});

// delete an item from the book list ( opening the delete modal )
for(let i = 0; i < bookList.deleteIcons.length; i++) {
	bookList.deleteIcons[i].addEventListener("touchstart", function(){
		
		deleteModal.openedBy = i;
		helper.openModal(deleteModal.backdrop);
		deleteModal.content.focus();
		helper.touch();
	});

	bookList.deleteIcons[i].addEventListener("click", function(){
	
		if(!(helper.touched)) {

			// bookList.tableBody.removeChild(bookList.tableRows[i]);
			// bookList.library.splice(i, 1);
			deleteModal.openedBy = i;
			helper.openModal(deleteModal.backdrop);
			deleteModal.content.focus();
		}
		helper.untouch();
	});

}

// delete confirmation
deleteModal.delete.addEventListener("touchstart", function(){
	bookList.tableBody.removeChild(bookList.tableRows[deleteModal.openedBy]);
	bookList.library.splice(deleteModal.openedBy, 1);
	deleteModal.openedBy = null;
	helper.closeModal(deleteModal.backdrop);

	helper.touch();
});

deleteModal.delete.addEventListener("click", function(){
	if(!(helper.touched)) {
		bookList.tableBody.removeChild(bookList.tableRows[deleteModal.openedBy]);
		bookList.library.splice(deleteModal.openedBy, 1);
		deleteModal.openedBy = null;
		helper.closeModal(deleteModal.backdrop);
	}
	helper.untouch();
});

// cancel deletion
deleteModal.cancel.addEventListener("touchstart", function(){
	deleteModal.openedBy = null;
	helper.closeModal(deleteModal.backdrop);

	helper.touch();
});

deleteModal.cancel.addEventListener("click", function(){
	if(!(helper.touched)) {
		deleteModal.openedBy = null;
		helper.closeModal(deleteModal.backdrop);
	}

	helper.untouch();
});

					


/* Find all focusable children
	focusableElementsString: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], [tabindex="-1"]',

	focusableElements: popup.content.querySelectorAll(".popup__close"),
	// Convert Nodelist to Array
	focusableElements: Array.prototype.slice.call(popup.focusableElements),

	firstTabStop: popup.focusableElements[0],
	lastTabStop: popup.focusableElements[popup.focusableElements.length - 1],


	products.items[i].addEventListener("keydown", function(event){
		if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
			popup.openModal(i);

		}
	});


	// Check for TAB key press
		if (event.keyCode === 9) {

			// SHIFT + TAB
			if (event.shiftKey) {
				if (document.activeElement === popup.content[i]) {
					event.preventDefault();
					popup.close[i].focus();
				}
				else if (document.activeElement === popup.close[i]) {
					event.preventDefault();
					popup.content[i].focus();
				}
			}
			// TAB
			else {
				if (document.activeElement === popup.close[i]) {
					event.preventDefault();
					popup.content[i].focus();
				}
				else if (document.activeElement === popup.content[i]) {
					event.preventDefault();
					popup.close[i].focus();
				}
			}
		}

		//ESCAPE
		if (event.keyCode === 27) {
			popup.closeModal(i);
		}
*/