const bookList = document.getElementById("bookList");
const addBook = document.querySelector("#submitBtn");
const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const pagesForm = document.getElementById('pages');
const readForm = document.getElementById('read');
const notRreadForm = document.getElementById('not-read');
let deleteBtns = document.getElementsByClassName("deleteBtn");

let library = [
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
adjournLibrary()
addBook.addEventListener('click', addBookToLibrary);
/**deleteBtns.forEach(delBtn => {
    delBtn.addEventListener('click', deleteBook(delBtn.getAttribute('data-index')))
})**/

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
    document.getElementById("newBook").reset();
};

function checkMissingFields() {
    var error = true
        titleForm.value == "" ? alert("Missing title")
        : authorForm.value == "" ? alert("Missing author")
        : pagesForm.value == "" ? alert("Missing numbers of pages")
        : (error = false)
    return error
};

function createNewBook() { 
    if (checkMissingFields()) return;
    let title = titleForm.value
    let author = authorForm.value
    let pages = pagesForm.value
    let read
    readForm.checked ? read = "read" : notRreadForm.checked ? read = "not read" : alert("Please add read status.");
    let thisBook = new Book(title, author, pages, read);
    library.push(thisBook);
};

function resetLibrary() {
    const bookRows = document.querySelectorAll('.bookRow')
    bookRows.forEach(bookRow => {
        bookList.removeChild(bookRow);
    })
};

function adjournLibrary() {
    resetLibrary()
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
        deleteBtn.setAttribute('class','deleteBtn');
        deleteBtn.setAttribute('data-index',library.indexOf(thisOne));
        deleteBtn.addEventListener('click', (e) => {
            let indexNum = deleteBtn.getAttribute('data-index');
            deleteBook(indexNum)
        });
        const newRow = document.createElement('tr');
        newRow.setAttribute('class','bookRow')
        bookList.appendChild(newRow);
        newRow.appendChild(titleVoice);
        newRow.appendChild(authorVoice);
        newRow.appendChild(pagesVoice);
        newRow.appendChild(readVoice);
        newRow.appendChild(deleteBtn);
    });
}

function deleteBook(indexNum) {
    library.splice(indexNum,1);
    adjournLibrary()
}