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
	counter: 0,

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
	itemCounter: [0, 1],
	Book: function(title, author, pages, read){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	},
	refreshBookListeners(){
		bookList.readContainer = document.querySelectorAll(".books-read-container");
		bookList.readIcons = document.querySelectorAll(".books-read-icon");
		bookList.deleteIcons = document.querySelectorAll(".books-delete-container");
		
		
		
		
	},
	renderRow(title, author, pages, read){
			// Getting the size of the library before adding this book
			// let librarySize = bookList.library.length;

			// To prevent bottleneck
			setTimeout(function(){ 
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
            // Add the book to the array
            let newBook = new bookList.Book(title, author, pages, read);
            newBook.counter = helper.counter;

            helper.counter++;
            bookList.library.push(newBook);

			let readContainer = item.querySelector(".books-read-container");
			let readIcon = item.querySelector(".books-read-icon");
			setTimeout(function(){
				readContainer.addEventListener("touchstart", function(){
				
					if (readIcon.classList.contains("read")) {
						// Make it look like it's not read
						readIcon.classList.remove("read");
						readIcon.classList.add("not-read");
						readIcon.setAttribute("src", "main/images/x-icon.png");
						readIcon.setAttribute("alt", "X icon");
						// readIcon.setAttribute("tabindex", "0");
			
						// Actually change the property Of the object in the library
						// console.log(i);
						// newBook.read = false;
			
					}
					else if (readIcon.classList.contains("not-read")) {
			
						// Make it look like it's not read
						readIcon.classList.remove("not-read");
						readIcon.classList.add("read");
						readIcon.setAttribute("src", "main/images/check.png");
						readIcon.setAttribute("alt", "check icon");
						// bookList.readIcons[i].setAttribute("tabindex", "0");
			
						// Actually change the property Of the object in the library
						// console.log(i);			
						// newBook.read = true;
					}
					newBook.toggleRead();
					helper.touch();
				});
			}, 0);
			setTimeout(function(){ 
				readContainer.addEventListener("click", function(){
					if(!(helper.touched)) {


					
					// Indent everything here
					if (readIcon.classList.contains("read")) {
						// Make it look like it's not read
						readIcon.classList.remove("read");
						readIcon.classList.add("not-read");
						readIcon.setAttribute("src", "main/images/x-icon.png");
						readIcon.setAttribute("alt", "X icon");
						// readIcon.setAttribute("tabindex", "0");
			
						// Actually change the property Of the object in the library
						// console.log(i);
						// newBook.read = false;
			
					}
					else if (readIcon.classList.contains("not-read")) {
			
						// Make it look like it's not read
						readIcon.classList.remove("not-read");
						readIcon.classList.add("read");
						readIcon.setAttribute("src", "main/images/check.png");
						readIcon.setAttribute("alt", "check icon");
						// bookList.readIcons[i].setAttribute("tabindex", "0");
			
						// Actually change the property Of the object in the library
						// console.log(i);			
						// newBook.read = true;
					}

					newBook.toggleRead();

				}
			
					helper.untouch();
				});
			}, 0);

			readContainer.addEventListener("keydown", function(event){
				if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
					if (readIcon.classList.contains("read")) {
						// Make it look like it's not read
						readIcon.classList.remove("read");
						readIcon.classList.add("not-read");
						readIcon.setAttribute("src", "main/images/x-icon.png");
						readIcon.setAttribute("alt", "X icon");
						// readIcon.setAttribute("tabindex", "0");
			
						// Actually change the property Of the object in the library
						// console.log(i);
						// newBook.read = false;
			
					}
					else if (readIcon.classList.contains("not-read")) {
			
						// Make it look like it's not read
						readIcon.classList.remove("not-read");
						readIcon.classList.add("read");
						readIcon.setAttribute("src", "main/images/check.png");
						readIcon.setAttribute("alt", "check icon");
						// bookList.readIcons[i].setAttribute("tabindex", "0");
			
						// Actually change the property Of the object in the library
						// console.log(i);			
						// newBook.read = true;
					}
					newBook.toggleRead();
				}
				
			});
			
			let deleteIcon = item.querySelector(".books-delete-container");

			deleteIcon.addEventListener("touchstart", function(){
				
				let deleteModal = document.createElement("div");
				deleteModal.classList.add("backdrop");
				deleteModal.classList.add("show");
				deleteModal.setAttribute("id", "delete-backdrop");
				deleteModal.insertAdjacentHTML("beforeend", `
					<section class="modal-container" id="delete-modal" tabindex="0">
                		<div class="modal__close" id="delete-close" tabindex="-1">
                    		<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        	<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/silviu-runceanu" title="Silviu Runceanu">Silviu Runceanu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
                        	<image href="https://image.flaticon.com/icons/svg/53/53804.svg" src="main/images/close.svg" width="90" height="90" alt="Close Button"/>
                    		</svg>
                    		<img class="hide-png no-display svg-fallback modal__close-png" src="main/images/close.png" alt="Close Button">
                		</div>
                		<h1 class="modal-header">Delete this Book</h1>
                		<p class="modal-paragraph">Are you sure you want to remove this book from the list?</p>
                		<div class="button-container">
                    		<button class="modal-button" id="cancel-modal-button">Cancel</button>
                    		<button class="modal-button" id="delete-modal-button">Delete</button>
                		</div>
                	</section>`);
				setTimeout(function(){
					deleteModal.querySelector("#delete-modal-button").addEventListener("touchstart", function(){
						bookList.tableBody.removeChild(item);
						bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
						general.main.removeChild(deleteModal);
						helper.touch();
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							bookList.tableBody.removeChild(item);
							bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
							general.main.removeChild(deleteModal);

						}
						helper.untouch();
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("keydown", function(event){
						if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
							bookList.tableBody.removeChild(item);
							bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
							general.main.removeChild(deleteModal);
						}
					});
				}, 0);
                
				setTimeout(function(){ 
					deleteModal.querySelector("#cancel-modal-button").addEventListener("touchstart", function(){
						general.main.removeChild(deleteModal);
						helper.touch();
					});
					deleteModal.querySelector("#cancel-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							general.main.removeChild(deleteModal);

						}
						
					helper.untouch();
					});
					deleteModal.querySelector("#cancel-modal-button").addEventListener("keydown", function(event){
							if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
								general.main.removeChild(deleteModal);
							}
						});
				}, 0);

                setTimeout(function(){ 
					deleteModal.addEventListener("touchstart", function(event){
						if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
							general.main.removeChild(deleteModal);
						}
	
						helper.touch();	
					});
	
					deleteModal.addEventListener("click", function(event){
						if(!(helper.touched)) {
							if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
								general.main.removeChild(deleteModal);
							}
						}
						helper.untouch();
					});
				}, 0);
				setTimeout(function(){ 
					deleteModal.querySelector("#delete-close").addEventListener("touchstart", function(event){
						general.main.removeChild(deleteModal);
						helper.touch();	
					});

					deleteModal.querySelector("#delete-close").addEventListener("click", function(event){
						if(!(helper.touched)) {
							general.main.removeChild(deleteModal);
						}
						helper.untouch();
					});
				}, 0);
				
				general.main.appendChild(deleteModal);
				document.querySelector("#delete-modal").focus();




				helper.touch();
			});
			deleteIcon.addEventListener("click", function(){


				if(!(helper.touched)) {

				let deleteModal = document.createElement("div");
				deleteModal.classList.add("backdrop");
				deleteModal.classList.add("show");
				deleteModal.setAttribute("id", "delete-backdrop");
				deleteModal.insertAdjacentHTML("beforeend", `
					<section class="modal-container" id="delete-modal" tabindex="0">
                		<div class="modal__close" id="delete-close" tabindex="-1">
                    		<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        	<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/silviu-runceanu" title="Silviu Runceanu">Silviu Runceanu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
                        	<image href="https://image.flaticon.com/icons/svg/53/53804.svg" src="main/images/close.svg" width="90" height="90" alt="Close Button"/>
                    		</svg>
                    		<img class="hide-png no-display svg-fallback modal__close-png" src="main/images/close.png" alt="Close Button">
                		</div>
                		<h1 class="modal-header">Delete this Book</h1>
                		<p class="modal-paragraph">Are you sure you want to remove this book from the list?</p>
                		<div class="button-container">
                    		<button class="modal-button" id="cancel-modal-button">Cancel</button>
                    		<button class="modal-button" id="delete-modal-button">Delete</button>
                		</div>
                	</section>`);
				setTimeout(function(){
					deleteModal.querySelector("#delete-modal-button").addEventListener("touchstart", function(){
						bookList.tableBody.removeChild(item);
						bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
						general.main.removeChild(deleteModal);
						helper.touch();
	
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							bookList.tableBody.removeChild(item);
							bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
							general.main.removeChild(deleteModal);
	
						}
						helper.untouch();
					});
					deleteModal.querySelector("#delete-modal-button").addEventListener("keydown", function(event){
						if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
							bookList.tableBody.removeChild(item);
							bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
							general.main.removeChild(deleteModal);
						}
					});
				}, 0);
                
				setTimeout(function(){
					deleteModal.querySelector("#cancel-modal-button").addEventListener("touchstart", function(){
						general.main.removeChild(deleteModal);
						helper.touch();
					});
					deleteModal.querySelector("#cancel-modal-button").addEventListener("click", function(){
						if(!(helper.touched)) {
							general.main.removeChild(deleteModal);
	
						}
						
						helper.untouch();
					});
					deleteModal.querySelector("#cancel-modal-button").addEventListener("keydown", function(event){
							if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
								general.main.removeChild(deleteModal);
							}
						});
				}, 0);
                
				setTimeout(function(){
					deleteModal.addEventListener("touchstart", function(event){
						if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
							general.main.removeChild(deleteModal);
						}
	
						helper.touch();	
					});
	
					deleteModal.addEventListener("click", function(event){
						if(!(helper.touched)) {
							if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
								general.main.removeChild(deleteModal);
							}
						}
						helper.untouch();
					});
				}, 0);
				
				setTimeout(function(){
					deleteModal.querySelector("#delete-close").addEventListener("touchstart", function(event){
					general.main.removeChild(deleteModal);
					helper.touch();	
				});

				deleteModal.querySelector("#delete-close").addEventListener("click", function(event){
					if(!(helper.touched)) {
						general.main.removeChild(deleteModal);
					}
					helper.untouch();
				});
				}, 0);
				
                general.main.appendChild(deleteModal);
				document.querySelector("#delete-modal").focus();


				// helper.untouch();
				}
				helper.untouch();
			});
			deleteIcon.addEventListener("keydown", function(event){
				if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
					let deleteModal = document.createElement("div");
					deleteModal.classList.add("backdrop");
					deleteModal.classList.add("show");
					deleteModal.setAttribute("id", "delete-backdrop");
					deleteModal.insertAdjacentHTML("beforeend", `
						<section class="modal-container" id="delete-modal" tabindex="0">
							<div class="modal__close" id="delete-close" tabindex="-1">
								<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<!-- <div>Icons made by <a href="https://www.flaticon.com/authors/silviu-runceanu" title="Silviu Runceanu">Silviu Runceanu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
								<image href="https://image.flaticon.com/icons/svg/53/53804.svg" src="main/images/close.svg" width="90" height="90" alt="Close Button"/>
								</svg>
								<img class="hide-png no-display svg-fallback modal__close-png" src="main/images/close.png" alt="Close Button">
							</div>
							<h1 class="modal-header">Delete this Book</h1>
							<p class="modal-paragraph">Are you sure you want to remove this book from the list?</p>
							<div class="button-container">
								<button class="modal-button" id="cancel-modal-button">Cancel</button>
								<button class="modal-button" id="delete-modal-button">Delete</button>
							</div>
						</section>`);
					setTimeout(function(){
						deleteModal.querySelector("#delete-modal-button").addEventListener("touchstart", function(){
							bookList.tableBody.removeChild(item);
							bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
							general.main.removeChild(deleteModal);
							helper.touch();
						});
						deleteModal.querySelector("#delete-modal-button").addEventListener("click", function(){
							if(!(helper.touched)) {
								bookList.tableBody.removeChild(item);
								bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
								general.main.removeChild(deleteModal);

							}
							helper.untouch();
						});
						deleteModal.querySelector("#delete-modal-button").addEventListener("keydown", function(event){
							if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
								bookList.tableBody.removeChild(item);
								bookList.library.splice(bookList.library.findIndex(book => book.counter === newBook.counter), 1)
								general.main.removeChild(deleteModal);
							}
					});
					}, 0);
					// To be continued....->
					setTimeout(function(){ 
						deleteModal.querySelector("#cancel-modal-button").addEventListener("touchstart", function(){
							general.main.removeChild(deleteModal);
							helper.touch();
						});
						deleteModal.querySelector("#cancel-modal-button").addEventListener("click", function(){
							if(!(helper.touched)) {
								general.main.removeChild(deleteModal);

							}
							
						helper.untouch();
						});
						deleteModal.querySelector("#cancel-modal-button").addEventListener("keydown", function(event){
							if(event.key === "Enter" || event.which === 13 || event.keyCode === 13) {
								general.main.removeChild(deleteModal);
							}
						});
					}, 0);

					setTimeout(function(){ 
						deleteModal.addEventListener("touchstart", function(event){
							if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
								general.main.removeChild(deleteModal);
							}
		
							helper.touch();	
						});
		
						deleteModal.addEventListener("click", function(event){
							if(!(helper.touched)) {
								if(!((event.target === deleteModal.firstElementChild) || (deleteModal.firstElementChild.contains(event.target)))) {
									general.main.removeChild(deleteModal);
								}
							}
							helper.untouch();
						});
					}, 0);
					setTimeout(function(){ 
						deleteModal.querySelector("#delete-close").addEventListener("touchstart", function(event){
							general.main.removeChild(deleteModal);
							helper.touch();	
						});

						deleteModal.querySelector("#delete-close").addEventListener("click", function(event){
							if(!(helper.touched)) {
								general.main.removeChild(deleteModal);
							}
							helper.untouch();
						});
					}, 0);
					general.main.appendChild(deleteModal);
					document.querySelector("#delete-modal").focus();
					}	
			});
			bookList.tableBody.appendChild(item);
			// bookList.refreshBookListeners();
			// counter++;

			 }, 1);
			
	},
	
	renderLibrary(library){
		// let counter = 1;
		for (let book of library){

			bookList.renderRow(book.title, book.author, book.pages, book.read);

		}
	},

};





bookList.Book.prototype.toggleRead = function () {
	this.read = !(this.read);
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
		}

		helper.touch();	
	});

	general.backdrops[i].addEventListener("click", function(event){
		if(!(helper.touched)) {


			if(!((event.target === general.backdrops[i].firstElementChild) || (general.backdrops[i].firstElementChild.contains(event.target)))) {
				helper.closeModal(general.backdrops[i]);
			}
		}
		helper.untouch();
	});
}

// General close button modal closer
for(let i = 0; i < general.closeButtons.length; i++) {
	general.closeButtons[i].addEventListener("touchstart", function(event){
		helper.closeModal(general.backdrops[i]);
		helper.touch();	
	});

	general.closeButtons[i].addEventListener("click", function(event){
		if(!(helper.touched)) {
			helper.closeModal(general.backdrops[i]);
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
	
	bookList.renderRow(addModal.title.value, addModal.author.value, addModal.pages.value, addModal.checkbox.checked);
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
		

		
		
		bookList.renderRow(addModal.title.value, addModal.author.value, addModal.pages.value, addModal.checkbox.checked);
		addModal.clearForm();
		helper.closeModal(addModal.backdrop);
	}
	helper.untouch();

});

setTimeout(function(){ 
	bookList.renderLibrary(bookList.library);
 }, 0);


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