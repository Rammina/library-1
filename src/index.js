//image imports
import XIcon from './images/x-icon.png';
import CheckIcon from './images/check.png';
import TrashIcon from './images/delete.png';
import CloseIcon from './images/close.png';
import CloseIconSvg from './images/close.svg';
import PlusIcon from './images/plus.png';
import PlusIconSvg from './images/plus.svg';
import BookTitle from './images/book-title.png';
import DeleteAll from './images/delete-all.png';

//CSS imports
import './main.css';
import './main-bp.css';
import './shared.css';
import './shared-bp.css';

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

  // If SVG is not supported
  if (!(svgSupport)) {

	  let allSvg = document.getElementsByTagName("svg");

	// Hide all the SVGs
	  for (let svg of allSvg) {
		  svg.classList.add("no-display");
		  svg.classList.add("hide-svg");
	  }

	  let allSvgFallback = document.querySelectorAll(".svg-fallback");

  	// Display all of the PNGs That serve as a fallback for the SVG
	  for (let png of allSvgFallback) {
		  png.classList.remove("no-display");
		  png.classList.remove("hide-png");
	  }
  }

// Object that holds common elements for websites
var general = {
	main: document.querySelector(".main-content"),
	backdrops: document.querySelectorAll(".backdrop"),
	closeButtons: document.querySelectorAll(".modal__close"),
	navTitle: document.querySelector(".nav__title")
}

// Object that contains helper variables and functions
var helper = {
	touched: false,

	trappedObject: null,
	errorCounts: [],

	//Traps the last element focused, Opens the modal ( usually the backdrop And the section), And focuses Its contents after the transition effect finishes
	openModal(modal){
		helper.trap();
		modal.classList.add("show");
		modal.firstElementChild.classList.add("show");
		modal.firstElementChild.setAttribute("aria-hidden", "false");

		// Wait for transition effect finish so it can focus
		setTimeout(function () {
			modal.firstElementChild.focus();
		}, 310);
	},
	// Closes the modal (usually the backdrop and the section), focus on the trapped element
	closeModal(modal){
		modal.classList.remove("show");
		modal.firstElementChild.classList.remove("show");
		modal.firstElementChild.setAttribute("aria-hidden", "true");
		helper.trappedObject.focus();
	},

	// Both touch and untouch Are indicators That are used by touchstart and click listeners
	touch(){
		helper.touched = true;
	},
	untouch(){
		helper.touched = false;
	},

	// Trap the element that is last focused, before opening a modal
	trap(){
		helper.trappedObject = document.activeElement;
	},

	// Clear all error messages for all text fields
	clearErrors(){

		// For every text field, remove the CSS class effect, and delete the error messages
		let textFields = document.querySelectorAll(".text-field");
		for (let i = 0; i < textFields.length; i++) {

			textFields[i].classList.remove("invalid");

			// Since the text field and error message have the same parent, use parentNode and removeChild to get rid of the error
			let error = textFields[i].parentNode.querySelector(".modal-error-message");
			if(error !== null && error !== undefined) {
				error.parentNode.removeChild(error);

				// Reset the error counter for the text field
				helper.errorCounts[i] = 0;
			}
		}
	},
	// Clear all empty field error messages
	clearEmptyErrors(){

		// Similar to clearErrors, Except this one selectively checks for empty text fields
		let textFields = document.querySelectorAll(".text-field");
		for (let i = 0; i < textFields.length; i++) {

			// Only perform the deletion if it is an empty text field
			if (textFields[i].value === "") {
				textFields[i].classList.remove("invalid");

				// Since the text field and error message have the same parent, use parentNode and removeChild to get rid of the error
				let error = textFields[i].parentNode.querySelector(".modal-error-message");
					if(error !== null && error !== undefined) {
						error.parentNode.removeChild(error);

						// Reset the error counter for the text field
						helper.errorCounts[i] = 0;
					}
			}
		}
	}

};

// Object that contains related things to the add book modal
var addModal = {

	// assigning HTML elements to certain variable names
	backdrop: document.getElementById("add-backdrop"),
	close: document.getElementById("add-close"),
	content: document.getElementById("add-content"),
	title: document.getElementById("book-title-field"),
	author: document.getElementById("book-author-field"),
	pages: document.getElementById("book-pages-field"),
	checkbox: document.getElementById("read-checkbox"),
	submit: document.getElementById("book-submit"),

	// Clear all input fields
	clearForm(){
		addModal.title.value = "";
		addModal.author.value = "";
		addModal.pages.value = "";
		addModal.checkbox.checked = false;
	},

	// Verify before submitting the form
	verifyThenSubmit(){

		// clear all past errors
		helper.clearErrors();

		// Count the number of empty and invalid fields
		let empty = 0, invalid = 0;

		// Error messages for each text field
		let textFields = document.querySelectorAll(".text-field");
		for(let i = 0; i < textFields.length; i++) {

				// If the text field is empty, give an error that indicates it is empty and should be filled up
				if(textFields[i].value === "") {

					textFields[i].classList.add("invalid");
					textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`);

					// Increment the counters
					helper.errorCounts[i]++;
					empty++;
				}

				// Check if it's the page number text field
				if(textFields[i] === document.querySelector("#book-pages-field")) {

					// Check if the value is lower than one and only show this error if the text field is not empty
					if(textFields[i].value <= 0 && textFields[i].value !== "") {

						// Error message that states it is an invalid number
						textFields[i].classList.add("invalid");
						textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid page number.</p>`);

						// Increment the counters
						helper.errorCounts[i]++;
						invalid++;
					}
				}
		}
		// Abort if there are empty or invalid fields
		if(empty != 0 || invalid != 0) {
			return;
		}

		// Submit if there are no errors
		bookList.renderRow(addModal.title.value, addModal.author.value, addModal.pages.value, addModal.checkbox.checked);
		addModal.clearForm();
		helper.closeModal(addModal.backdrop);


	}

}

// Check all the focusable elements in the add modal
addModal.tabbables = addModal.content.querySelectorAll("input, [tabindex='-1']");

var deleteAllModal = {
	// Assign variable names to important HTML elements
	backdrop: document.getElementById("delete-all-backdrop"),
	close: document.getElementById("delete-all-close"),
	content: document.getElementById("delete-all-modal"),
	cancel: document.getElementById("cancel-all-modal-button"),
	delete: document.getElementById("delete-all-modal-button"),

	// Function that deletes all of the items in the list table HTML element As well as the booklist array
	confirmDeleteAll() {
		let allItems = document.querySelectorAll(".books-item");
		for (let item of allItems){
			bookList.tableBody.removeChild(item);
		}
		bookList.emptyLibrary(bookList.library);
		helper.closeModal(deleteAllModal.backdrop);
	},
}

// Check all the focusable elements in the delete all modal
deleteAllModal.tabbables = deleteAllModal.content.querySelectorAll("button, [tabindex='-1']");

// object that contains the main functional properties and methods of the booklist
var bookList = {

	// booklist HTML element variable assignment
	addButton: document.getElementById("add-book"),
	deleteAllButton: document.getElementById("delete-all"),
	table: document.getElementById("books-list-1"),
	tableBody: document.querySelector(".books-list-body"),

	// The library array contains all the data about the books listed
	library: [],

	// This is a counter variable that is used as a value assigner To tag each book
	// with a unique code that differentiates it from the other books
	// the counter is also used to delete a specific book
	counter: 0,

	// This is the Book class
	Book: class Book{
		constructor(title, author, pages, read) {
			this.title = title;
			this.author = author;
			this.pages = pages;
			this.read = read;
		}
		toggleRead(){
			this.read = !(this.read);
		}
	},
	// method that creates a book row
	createBookRow(title, author, pages, read){

			// Generate an element and insert all the HTML required to produce a row
			let item = document.createElement("tr");
			item.classList.add("books-row");
			item.classList.add("books-item");
			item.insertAdjacentHTML("beforeend", `
                    <td class="books-number"></td>
                    <td class="books-title">${title}</td>
                    <td class="books-author">${author}</td>
                    <td class="books-pages">${pages}</td>
            `);

			// If the read value is false, show a red x mark in the read column
			if(read === false) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<div class="books-read-container" tabindex="0" aria-label="not read, toggle to change to read" role="button">
							<img class="books-read-icon not-read" src=${XIcon} alt="X icon">
						</div>
					</td>
				`);

			}
			// If the read value is true, show a green check mark in the read column
			else if(read === true) {
				item.insertAdjacentHTML("beforeend", `
					<td class="books-read">
						<div class="books-read-container" tabindex="0" aria-label="read, toggle to change to not read" role="button">
							<img class="books-read-icon read" src=${CheckIcon} alt="check icon">
						</div>
					</td>
				`);
			}
			// At the trashbin icon to the delete column
            item.insertAdjacentHTML("beforeend", `
            	<td class="books-delete">
            		<div class="books-delete-container" tabindex="0" aria-label="delete this book" role="button">
                        <img class="delete-png" src=${TrashIcon} alt="Trash bin">
                    </div>
                </td>
            `);

            // return the item so it can be used by other functions
        	return item;
	},
	// method that toggles the Read icon
	toggleReadIcon(readContainer, readIcon, newBook){
		if (readIcon.classList.contains("read")) {
			// Make it look like it's not read
			readIcon.classList.remove("read");
			readIcon.classList.add("not-read");
			readIcon.setAttribute("src", XIcon);
			readIcon.setAttribute("alt", "X icon");

			readContainer.setAttribute("aria-label", "not read, toggle to change to read");
			readContainer.setAttribute("role", "button");
		}
		else if (readIcon.classList.contains("not-read")) {
			// Make it look like it's not read
			readIcon.classList.remove("not-read");
			readIcon.classList.add("read");
			readIcon.setAttribute("src", CheckIcon);
			readIcon.setAttribute("alt", "check icon");

			readContainer.setAttribute("aria-label", "read, toggle to change to not read");
			readContainer.setAttribute("role", "button");
		}

		// Use the book toggle method to change the read property
		newBook.toggleRead();

		// Update the database with the updated library
		var firebaseRef = firebase.database().ref();
		firebaseRef.child("library").set(JSON.stringify(bookList.library));
		// localStorage.setItem("library", JSON.stringify(bookList.library));

	},
	// Method that creates the delete modal, this helps with different listeners, to avoid rewriting code
	createDeleteModal(newBook, item){

		// Generate the delete modal element then insert the appropriate HTML content
		let deleteModal = document.createElement("div");
		deleteModal.classList.add("backdrop");
		deleteModal.setAttribute("id", "delete-backdrop");
		deleteModal.insertAdjacentHTML("beforeend", `
					<section class="modal-container" id="delete-modal" tabindex="0" role="dialog" aria-hidden="false">
                		<div class="modal__close" id="delete-close" tabindex="-1" role="button" aria-label="close button">
                    		<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        	<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/silviu-runceanu" title="Silviu Runceanu">Silviu Runceanu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
                        	<image href="https://image.flaticon.com/icons/svg/53/53804.svg" src=${CloseIconSvg} width="90" height="90" alt="Close Button"/>
                    		</svg>
                    		<img class="hide-png no-display svg-fallback modal__close-png" src=${CloseIcon} alt="Close Button">
                		</div>
                		<h1 class="modal-header">Delete this Book</h1>
                		<p class="modal-paragraph">Are you sure you want to remove this book from the list?</p>
                		<div class="button-container">
                    		<button class="modal-button" id="cancel-modal-button">Cancel</button>
                    		<button class="modal-button" id="delete-modal-button">Delete</button>
                		</div>
                	</section>`);

		// Exit the modal when you press escape, Jump to the last  element inside the modal if you press shift + tab
		deleteModal.querySelector("#delete-modal").addEventListener("keydown", function(event){
			if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
				deleteModal.classList.remove("show");
				general.main.removeChild(deleteModal);
						helper.trappedObject.focus();
			}
			else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
				event.preventDefault();
				deleteModal.querySelector(".modal__close").focus();
			}
		});

		// Enable Escape and tabbing Through the delete modal And it's children nodes

					let tabbables = deleteModal.querySelectorAll("button, div[tabindex='-1']");
					for(let i = 0; i < tabbables.length; i++) {
						tabbables[i].addEventListener("keydown", function(event){
							event.stopPropagation();

							// pressing escape closes the modal and resstores focus to the last trapped element
							if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
								deleteModal.classList.remove("show");
								general.main.removeChild(deleteModal);
								helper.trappedObject.focus();
							}

							// pressing	shift + tab shifts the focus to the previous element, back to the last element if it is the first
							else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
								event.preventDefault();
								let previous = i - 1;

								if(previous < 0) {
									tabbables[tabbables.length - 1].focus();

								}
								else{
									tabbables[previous].focus();
								}
							}

							// pressing tab shifts the focus to the next element, back to the first element if it is the last
							else if(event.key === "Tab" || event.which === 9 || event.keyCode === 9) {
								event.preventDefault();
								let next = i + 1;

								if(next === tabbables.length) {
									tabbables[0].focus();

								}
								else{
									tabbables[next].focus();
								}
							}
						});

					}


				// Method for controlling focus after deleting an item
				function focusAfterDelete() {

					// the deleteIcon Refers to the item that was selected to be deleted
					let deleteIcon = item.querySelector(".books-delete-container");

					// Perform a check on all delete icons until you get a match, or you get none
					let deleteIcons = document.querySelectorAll(".books-delete-container");
					for(let i = 0; i < deleteIcons.length; i++) {

						// Check if it is not the first item in the booklist, If true, restore focus back to the previous item after deleting
						if(deleteIcons[i] === deleteIcon && i !== 0) {
							let previous = i - 1;
							deleteIcons[previous].focus();
							return;
						}
					}
					// If it is the first item, Or if there is no match, restore focus to the title of the page
					general.navTitle.focus();
				}

				// method for actually deleting an item after the prompt confirmation
				function confirmDeleteModal() {
						focusAfterDelete();

						// Remove the HTML element of the item
						bookList.tableBody.removeChild(item);

						// Get rid of the specific book bby using the counter as an identifier
						bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1);

						// update the database with the new library
						var firebaseRef = firebase.database().ref();
						firebaseRef.child("library").set(JSON.stringify(bookList.library));
						// localStorage.setItem("library", JSON.stringify(bookList.library));
						deleteModal.classList.remove("show");
						general.main.removeChild(deleteModal);

				};
				// Event listeners for the delete button in the delete modal
				setTimeout(function(){
					deleteModal.querySelector("#delete-modal-button").addEventListener("touchstart", function(){
						confirmDeleteModal();
						helper.touch();
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							confirmDeleteModal();
						}
						helper.untouch();
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("keydown", function(event){
						if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
							confirmDeleteModal();
						}
					});
				}, 0);
                // Event listeners for the cancel button in the delete modal
				setTimeout(function(){
					deleteModal.querySelector("#cancel-modal-button").addEventListener("touchstart", function(){
						deleteModal.classList.remove("show");
						general.main.removeChild(deleteModal);
						helper.trappedObject.focus();
						helper.touch();
					});

					deleteModal.querySelector("#cancel-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							deleteModal.classList.remove("show");
							general.main.removeChild(deleteModal);
							helper.trappedObject.focus();
						}
					helper.untouch();
					});

					deleteModal.querySelector("#cancel-modal-button").addEventListener("keydown", function(event){
							if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
								deleteModal.classList.remove("show");
								general.main.removeChild(deleteModal);
								helper.trappedObject.focus();
							}
					});
				}, 0);
				// Clicking the backdrop Will close the modal
                setTimeout(function(){
					deleteModal.addEventListener("touchstart", function(event){
						// Closing only happens if the backdrop is clicked, not its descendents
						if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
							deleteModal.classList.remove("show");
							general.main.removeChild(deleteModal);
							helper.trappedObject.focus();
						}
						helper.touch();
					});
						// Closing only happens if the backdrop is clicked, not its descendents
					deleteModal.addEventListener("click", function(event){
						if(!(helper.touched)) {
							if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
								deleteModal.classList.remove("show");
								general.main.removeChild(deleteModal);
								helper.trappedObject.focus();
							}
						}
						helper.untouch();
					});
				}, 0);
				// event listener for the close button of the delete modal
				setTimeout(function(){
					deleteModal.querySelector("#delete-close").addEventListener("touchstart", function(event){
						deleteModal.classList.remove("show");
						general.main.removeChild(deleteModal);
						helper.trappedObject.focus();
						helper.touch();
					});

					deleteModal.querySelector("#delete-close").addEventListener("click", function(event){
						if(!(helper.touched)) {
							deleteModal.classList.remove("show");
							general.main.removeChild(deleteModal);
						}
						helper.untouch();
					});
				}, 0);

				// Upon opening the delete modal after clicking the trashbin icon
				// Trap the last element focused
				helper.trap();
				// Make it a part of the Dom
				general.main.appendChild(deleteModal);
				// Show it via CSS
				deleteModal.classList.add("show");
				// focus on the modal after it is opened
				document.querySelector("#delete-modal").focus();

	},
	renderRow(title, author, pages, read){
		// To prevent bottleneck, Set timeouts are used
		setTimeout(function(){
			// Add the book to the HTML document
			let item = bookList.createBookRow(title, author, pages, read);

            // Add the book to the array
            let newBook = new bookList.Book(title, author, pages, read);

            // Unique counter system so each book has its unique value
            newBook.counter = bookList.counter;
            bookList.counter++;

            //push new book to the array, Update the database
			bookList.library.push(newBook);
			var firebaseRef = firebase.database().ref();
			firebaseRef.child("library").set(JSON.stringify(bookList.library));
			// localStorage.setItem("library", JSON.stringify(bookList.library));

			// Assign an event listener to the read container element, enabling toggle of the read status
			let readContainer = item.querySelector(".books-read-container");
			let readIcon = item.querySelector(".books-read-icon");
			setTimeout(function(){
				readContainer.addEventListener("touchstart", function(){
					bookList.toggleReadIcon(readContainer, readIcon, newBook);

					helper.touch();
				});
			}, 0);
			setTimeout(function(){
				readContainer.addEventListener("click", function(){
					if(!(helper.touched)) {
						bookList.toggleReadIcon(readContainer, readIcon, newBook);
					}

					helper.untouch();
				});
			}, 0);

			setTimeout(function(){
				readContainer.addEventListener("keydown", function(event){
					if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
						bookList.toggleReadIcon(readContainer, readIcon, newBook);
					}

				});
			}, 0);

			// Add event listeners to the  trash bin icon, Opening the delete modal
			let deleteIcon = item.querySelector(".books-delete-container");

			deleteIcon.addEventListener("touchstart", function(){
				event.preventDefault();
				bookList.createDeleteModal(newBook, item);
				helper.touch();
			});
			deleteIcon.addEventListener("click", function(){
				if(!(helper.touched)) {
					bookList.createDeleteModal(newBook, item);

				}
				helper.untouch();
			});
			deleteIcon.addEventListener("keydown", function(event){
				if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
					bookList.createDeleteModal(newBook, item);
					}
			});

			// Adds the item row To the Dom
			bookList.tableBody.appendChild(item);
		}, 0);

	},
	// Render each book in the library
	renderLibrary(library){
		for (let book of library){
			bookList.renderRow(book.title, book.author, book.pages, book.read);
		}
	},
	// Empty the library and the database
	emptyLibrary(library){
		library.length = 0;
		var firebaseRef = firebase.database().ref();
		firebaseRef.child("library").set(JSON.stringify(library));
		// localStorage.setItem("library", JSON.stringify(bookList.library));
	}

};

//Generate bookTitle image
general.navTitle.insertAdjacentHTML("beforeend", `
	<img class="nav__title-img" src=${BookTitle} alt="The Book List">
`)

//Generate closeIcon image
for(let i = 0; i < general.closeButtons.length; i++){
	general.closeButtons[i].insertAdjacentHTML("beforeend", `
		<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/silviu-runceanu" title="Silviu Runceanu">Silviu Runceanu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
				<image href="https://image.flaticon.com/icons/svg/53/53804.svg" src=${CloseIconSvg} width="90" height="90" alt="Close Button"/>
		</svg>
		<img class="hide-png no-display svg-fallback modal__close-png" src=${CloseIcon} alt="Close Button">
	`)
}



// Generate + image
bookList.addButton.insertAdjacentHTML("beforeend", `
	<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/egor-rumyantsev" title="Egor Rumyantsev">Egor Rumyantsev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
	<svg width="80" height="80" class="plus-svg">
			<image class="plus-image" href="https://image.flaticon.com/icons/svg/70/70421.svg" src=${PlusIconSvg} width="90" height="90" alt="Plus Sign"/>
	</svg>
	<img class="hide-png no-display svg-fallback plus-png" src=${PlusIcon} alt="Plus Sign">
`)

// Generate delete-all image
bookList.deleteAllButton.insertAdjacentHTML("beforeend", `
 	<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
	<img class="delete-all-png" src=${DeleteAll} alt="Man throwing out trash">
`)

// Add event listeners to the add book button
setTimeout(function(){
	bookList.addButton.addEventListener("touchstart", function(){
		event.preventDefault();
		helper.trap();
		helper.openModal(addModal.backdrop);
		addModal.content.focus();
		helper.touch();
	});

	bookList.addButton.addEventListener("click", function(){
		if(!(helper.touched)) {
			helper.trap();
			helper.openModal(addModal.backdrop);
			addModal.content.focus();
		}
		helper.untouch();

	});
}, 0);

// Add event listeners to the delete all books button
setTimeout(function(){
	bookList.deleteAllButton.addEventListener("touchstart", function(){
		event.preventDefault();
		helper.openModal(deleteAllModal.backdrop);
		helper.touch();
	});

	bookList.deleteAllButton.addEventListener("click", function(){
		if(!(helper.touched)) {
			helper.trap();
			helper.openModal(deleteAllModal.backdrop);
		}
		helper.untouch();

	});
}, 0);

setTimeout(function(){
	// Intended general modal backdrop closer
	for(let i = 0; i < general.backdrops.length; i++) {
		general.backdrops[i].addEventListener("touchstart", function(event){
			if(!((event.target === general.backdrops[i].firstElementChild) || (general.backdrops[i].firstElementChild.contains(event.target)))) {
				helper.clearEmptyErrors();
				helper.closeModal(general.backdrops[i]);
			}
			helper.touch();
		});

		general.backdrops[i].addEventListener("click", function(event){
			if(!(helper.touched)) {

				if(!((event.target === general.backdrops[i].firstElementChild) || (general.backdrops[i].firstElementChild.contains(event.target)))) {
					helper.clearEmptyErrors();
					helper.closeModal(general.backdrops[i]);
				}
			}
			helper.untouch();
		});
	}
}, 0);

setTimeout(function(){
	// General close button modal closer
	for(let i = 0; i < general.closeButtons.length; i++) {
		general.closeButtons[i].addEventListener("touchstart", function(event){
			helper.clearEmptyErrors();
			helper.closeModal(general.backdrops[i]);
			helper.touch();
		});

		general.closeButtons[i].addEventListener("click", function(event){
			if(!(helper.touched)) {
				helper.clearEmptyErrors();
				helper.closeModal(general.backdrops[i]);
			}
			helper.untouch();
		});
		general.closeButtons[i].addEventListener("keydown", function(event){
			if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
				event.preventDefault();
				helper.clearEmptyErrors();
				helper.closeModal(general.backdrops[i]);
			}
		});

	}
}, 0);


setTimeout(function(){
	// Enable escape button when focusing add modal
	addModal.content.addEventListener("keydown", function(event){
		if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
			helper.closeModal(addModal.backdrop);
		}
		else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
				event.preventDefault();
				document.getElementById("add-close").focus();
		}
	});
}, 0);

setTimeout(function(){
	// Enable tab scrolling in the add modal
	for(let i = 0; i < addModal.tabbables.length; i++) {
		addModal.tabbables[i].addEventListener("keydown", function(event){
			event.stopPropagation();
			// pressing escape closes modal
			if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
				helper.closeModal(addModal.backdrop);
			}
			// pressing shift + tab, if it is the first focusable element, go to the last, otherwise go to the previous focusable
			else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
				event.preventDefault();
				let previous = i - 1;
				if(previous < 0) {
					addModal.tabbables[addModal.tabbables.length - 1].focus();
				}
				else{
					addModal.tabbables[previous].focus();
				}
			}
			// pressing tab, if it is the last focusable element, go to the first, otherwise go to the next focusable
			else if(event.key === "Tab" || event.which === 9 || event.keyCode === 9) {
				event.preventDefault();
				let next = i + 1;
				if(next === addModal.tabbables.length) {
					addModal.tabbables[0].focus();
				}
				else{
					addModal.tabbables[next].focus();
				}
			}
		});
	}
}, 0);

setTimeout(function(){
	// Enable tab scrolling in the delete all modal
	for(let i = 0; i < deleteAllModal.tabbables.length; i++) {
		deleteAllModal.tabbables[i].addEventListener("keydown", function(event){
			event.stopPropagation();
			// pressing escape closes modal
			if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
				helper.closeModal(deleteAllModal.backdrop);
			}
			// pressing shift + tab, if it is the first focusable element, go to the last, otherwise go to the previous focusable
			else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
				event.preventDefault();
				let previous = i - 1;
				if(previous < 0) {
					deleteAllModal.tabbables[deleteAllModal.tabbables.length - 1].focus();
				}
				else{
					deleteAllModal.tabbables[previous].focus();
				}
			}
			// pressing tab, if it is the last focusable element, go to the first, otherwise go to the next focusable
			else if(event.key === "Tab" || event.which === 9 || event.keyCode === 9) {
				event.preventDefault();
				let next = i + 1;
				if(next === deleteAllModal.tabbables.length) {
					deleteAllModal.tabbables[0].focus();
				}
				else{
					deleteAllModal.tabbables[next].focus();
				}
			}
		});
	}
}, 0);

setTimeout(function () {
	//Listeners for the text fields
	let textFields = document.querySelectorAll(".text-field");
	for(let i = 0; i < textFields.length; i++) {
		// Make each counter start at 0
		helper.errorCounts[i] = 0;

		// When blurring a text field,
		textFields[i].addEventListener("blur", function(){
			// First check if there are any errors, if there are then delete them
			if(helper.errorCounts[i] !== 0) {
				let error = textFields[i].parentNode.querySelector(".modal-error-message");
				textFields[i].parentNode.removeChild(error);
				helper.errorCounts[i] = 0;
			}
			// Check if the text field is empty, give it an error and then increment the counter
			if(textFields[i].value === "") {
				textFields[i].classList.add("invalid");
				textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Please fill up this field.</p>`);
				helper.errorCounts[i]++;
			}

			// Check if it's the page number text field
			if(textFields[i] === document.querySelector("#book-pages-field")) {
				// Generate an error if the page number is less than one, increment the counter
				if(textFields[i].value <= 0 && textFields[i].value !== "") {
					textFields[i].classList.add("invalid");
					textFields[i].insertAdjacentHTML("afterend", `<p class="modal-error-message">Invalid page number.</p>`);
					helper.errorCounts[i]++;
				}
			}
		});
		// Remove the red color  CSS class  upon focusing text field
		textFields[i].addEventListener("focus", function(){
			textFields[i].classList.remove("invalid");
		});
	}
}, 0);

// Submit listener for the modal form
addModal.submit.addEventListener("touchstart", function(event){
	event.preventDefault();
	addModal.verifyThenSubmit();
	helper.touch();
});

addModal.submit.addEventListener("click", function(event){
	if(!(helper.touched)) {
		event.preventDefault();
		addModal.verifyThenSubmit();
	}
	helper.untouch();
});

addModal.submit.addEventListener("keydown", function(event){
	if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
		event.preventDefault();
		addModal.verifyThenSubmit();
	}
});

// Event listeners for the delete all modal
document.querySelector("#delete-all-modal").addEventListener("keydown", function(event){

						// Escape closes the modal
						if(event.key === "Escape" || event.which === 27 || event.keyCode === 27) {
							helper.closeModal(deleteAllModal.backdrop);
							helper.trappedObject.focus();
						}
						// Pressing shift tab it focuses on the last focusable
						else if(event.shiftKey && (event.key === "Tab" || event.which === 9 || event.keyCode === 9)) {
							event.preventDefault();
							deleteAllModal.content.querySelector(".modal__close").focus();
						}
});

// Event listeners for the cancel button, which closes the modal
deleteAllModal.cancel.addEventListener("touchstart", function(){
	helper.closeModal(deleteAllModal.backdrop);
	helper.touch();
});

deleteAllModal.cancel.addEventListener("click", function(){
	if(!(helper.touched)) {
		helper.closeModal(deleteAllModal.backdrop);

	}
	helper.untouch();
});

// Event listeners for the delete button
deleteAllModal.delete.addEventListener("touchstart", function(){
	deleteAllModal.confirmDeleteAll();
	helper.touch();
});

deleteAllModal.delete.addEventListener("click", function(){
	if(!(helper.touched)) {
		deleteAllModal.confirmDeleteAll();
	}
	helper.untouch();
});

setTimeout(function(){
	// Retrieve the library from storage and render it
	var temporary = {
		// library: JSON.parse(localStorage.getItem("library")),
		library: "",
	}

	// Retrieve the value of the library child
	var firebaseLibraryRef = firebase.database().ref().child("library");
	// .once is used so retrieving of the value only happens when the website is loaded
	firebaseLibraryRef.once('value', function(datasnapshot){

		// Use a temporary placeholder before rendering, So assign the data snapshots value to a variable first
		temporary.library = JSON.parse(datasnapshot.val());
		console.log(datasnapshot.val());

		// Check if the library has any contents before rendering
		if(temporary.library) {
			console.log("hello");
			bookList.renderLibrary(temporary.library);
		}
	});

	console.log(`Stored library contains:`);
	console.log(temporary.library);


}, 0);



if (process.env.NODE_ENV === 'production') {
  console.log("Production Mode");
}
else if (process.env.NODE_ENV === 'development') {
  console.log("Development Mode");
}
