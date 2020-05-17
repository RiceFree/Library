const bookList = document.getElementById('bookList');
const addBook = document.getElementById('submitBtn');
const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const pagesForm = document.getElementById('pages');
const readForm = document.getElementById('read');
const notRreadForm = document.getElementById('not-read');

let book1 = new Book("The Hobbit","JRR Tolkien", "342", "read");
let book2 = new Book ("Narnia", "CS Lewis", "583", "not read");
let library = [book1, book2];
adjournLibrary()
addBook.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read
}
Book.prototype.readStatusToggle = function() {
    return this.read == "read" ? this.read = "not read" : this.read = "read";
}

function render (template, selector) {
	var node = document.querySelector(selector);
	if (!node) return;
	node.innerHTML = template;
};

function addBookToLibrary() {
    createNewBook();
    adjournLibrary();
    document.getElementById('newBook').reset();
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
        const deleteContainer = document.createElement('td');
        const changeContainer = document.createElement('td');
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = "Delete"
        deleteBtn.setAttribute('class','deleteBtn');
        deleteBtn.setAttribute('data-index',library.indexOf(thisOne));
        deleteBtn.addEventListener('click', (e) => {
            let indexNum = deleteBtn.getAttribute('data-index');
            deleteBook(indexNum)
        });
        const changeReadStatusBtn = document.createElement('button')
        changeReadStatusBtn.textContent = "Change";
        changeReadStatusBtn.setAttribute('class','changeBtn');
        changeReadStatusBtn.setAttribute('data-index',library.indexOf(thisOne));
        changeReadStatusBtn.addEventListener('click', (e) => {
            let bookElem = library[changeReadStatusBtn.getAttribute('data-index')];
            switchReadStatus(bookElem);
        } )
        const newRow = document.createElement('tr');
        newRow.setAttribute('class','bookRow')
        bookList.appendChild(newRow);
        newRow.appendChild(titleVoice);
        newRow.appendChild(authorVoice);
        newRow.appendChild(pagesVoice);
        newRow.appendChild(readVoice);
        newRow.appendChild(deleteContainer);
        newRow.appendChild(changeContainer);
        deleteContainer.appendChild(deleteBtn);
        changeContainer.appendChild(changeReadStatusBtn);
    });
};

function deleteBook(indexNum) {
    library.splice(indexNum,1);
    adjournLibrary();
};

function switchReadStatus(bookElem) {
    bookElem.readStatusToggle();
    adjournLibrary();
};