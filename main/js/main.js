//I'm a comment 
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
	library: [],
	Book(title, author, pages, read){
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
	}
	


	

};

bookList.Book.prototype.toggleRead = function () {
	this.read = !(this.read);
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





