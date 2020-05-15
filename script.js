const bookList = document.getElementById("bookList");
const addBook = document.getElementById("submitBtn");
//const deleteBtn = document.getElementsByClassName("")

library = [
    {
        title: "The Hobbit",
        author: "JRR Tolkien",
        pages: "342",
        read: "read"
    },
    {
        title: "Narnia",
        author: "Lewis",
        pages: "583",
        read: "not read"
    },
];

addBook.addEventListener("click", addBookToLibrary());


function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

Book.prototype.info = function() {
    return title + " by " + author + ", " + pages + " pages, " + this.read
}

function render (template, selector) {
	var node = document.querySelector(selector);
	if (!node) return;
	node.innerHTML = template;
};
function addBookToLibrary() {
    createNewBook();
    adjournLibrary();
}
function createNewBook() {
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let pages = document.getElementById("pages").value
    let read = document.getElementById("read").value
    let thisBook = new Book(title, author, pages, read);
    library.push(thisBook);
};

function resetLibrary() {
    library.map(thisOne => {

    })
};

function adjournLibrary() {
    library.map(thisOne => {
        const titleVoice = document.createElement('td')
        titleVoice.textContent = thisOne.title;
        const authorVoice = document.createElement('td')
        authorVoice.textContent = thisOne.author;
        const pagesVoice = document.createElement('td')
        pagesVoice.textContent = thisOne.pages;
        const readVoice = document.createElement('td')
        readVoice.textContent = thisOne.read;
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Delete"
        const newRow = document.createElement('tr');
        bookList.appendChild(newRow);
        newRow.appendChild(titleVoice);
        newRow.appendChild(authorVoice);
        newRow.appendChild(pagesVoice);
        newRow.appendChild(readVoice);
        newRow.appendChild(deleteBtn);
    });
}