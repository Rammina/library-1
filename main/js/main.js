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
			if(read === true) {
				item.insertAdjacentHTML("beforeend", `
					<img class="books-read-icon not-read" src="main/images/x-icon.png" alt="X icon">`);
				
			}
			else if(read === false) {
				item.insertAdjacentHTML("beforeend", `
					<img class="books-read-icon read" src="main/images/check.png" alt="check icon">`);
			}
            item.insertAdjacentHTML("beforeend", `
            	<td class="books-delete">
                        <svg width="80" height="80" class="delete-svg">
                            <!-- <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
                            <image class="delete-image" href="https://image.flaticon.com/icons/svg/121/121113.svg" src="main/images/delete.svg" width="90" height="90" alt="Trash bin"/>
                        </svg>
                        <img class="hide-png no-display svg-fallback delete-png" src="main/images/delete.png" alt="Trash bin">
                        `);
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
					<img class="books-read-icon not-read" src="main/images/x-icon.png" alt="X icon">`);
				
			}
			else if(book.read === false) {
				item.insertAdjacentHTML("beforeend", `
					<img class="books-read-icon read" src="main/images/check.png" alt="check icon">`);
			}
            item.insertAdjacentHTML("beforeend", `
            	<td class="books-delete">
                        <svg width="80" height="80" class="delete-svg">
                            <!-- <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->
                            <image class="delete-image" href="https://image.flaticon.com/icons/svg/121/121113.svg" src="main/images/delete.svg" width="90" height="90" alt="Trash bin"/>
                        </svg>
                        <img class="hide-png no-display svg-fallback delete-png" src="main/images/delete.png" alt="Trash bin">
                        `);
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
	submit: document.getElementById("book-submit")
}


// bookList.Book.prototype.toggleRead = function () {
// 	this.read = !(this.read);
// }

for(let i = 0; i < bookList.readIcons.length; i++) {
	bookList.readIcons[i].addEventListener("click", function(){
		if (bookList.readIcons[i].classList.contains("read")) {
			// Make it look like it's not read
			bookList.readIcons[i].classList.remove("read");
			bookList.readIcons[i].classList.add("not-read");
			bookList.readIcons[i].setAttribute("src", "main/images/x-icon.png");
			bookList.readIcons[i].setAttribute("alt", "X icon");

			// Actually change the property Of the object in the library
			bookList.library[i].read = false;

		}
		else if (bookList.readIcons[i].classList.contains("not-read")) {

			// Make it look like it's not read
			bookList.readIcons[i].classList.remove("not-read");
			bookList.readIcons[i].classList.add("read");
			bookList.readIcons[i].setAttribute("src", "main/images/check.png");
			bookList.readIcons[i].setAttribute("alt", "check icon");

			// Actually change the property Of the object in the library			
			bookList.library[i].read = true;
		}
	});
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


// delete an item from the book list
for(let i = 0; i < bookList.deleteIcons.length; i++) {
	bookList.deleteIcons[i].addEventListener("click", function(){
		bookList.tableBody.removeChild(bookList.tableRows[i]);
	});

}


// Submit listener for the modal form
bookModal.submit.addEventListener("submit", function(){
	bookList.addBook(bookModal.title.value, bookModal.author.value, bookModal.pages.value, bookModal.checkbox.checked);	
});
