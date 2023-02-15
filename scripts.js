let myLibrary = []
let counter;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.counter = counter;
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBookToLibrary() {
        let title = document.getElementById("book-name").value
        let author = document.getElementById("book-author").value
        let pages = document.getElementById("book-pages").value
        let read = document.getElementById("book-read").checked
        let thisBook = new Book(title, author, pages, read)
        myLibrary.push(thisBook)
        this.books.push(thisBook)
    }

    addToScreen() {
        let container = document.getElementById("display-books")
        container.innerHTML = ''
        for (book in myLibrary) {
            let bookRow = 
                `<div class="book-row a${book}">
                    <div class="cell">${myLibrary[book].title}</div>
                    <div class="cell">${myLibrary[book].author}</div>
                    <div class="cell">Pages: ${myLibrary[book].pages}</div>
                    <div class="cell"><input type="checkbox" name="read" class="check-box"></div>
                    <div class="cell"><button class="delete">DELETE</button></div>
                </div>`
            container.innerHTML += bookRow
        }
        this.isChecked()
    }

    isChecked() {
        for (book in myLibrary) {
            if (myLibrary[book].read == true) {
                document.querySelector(`.a${book} input[type="checkbox"]`).checked = true
            }
        }
    }
}

let newLibrary = new Library();

function formReset() {
    document.getElementById("main-form").reset()
}

function addListeners() {
    let deleteBtn = document.querySelectorAll(".delete")
    let checkboxBtn = document.querySelectorAll(".check-box")
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", function() {
            myLibrary.splice(i, 1)
            assignPosition()
            newLibrary.addToScreen()
            addListeners()
        })
    }
    for (let i = 0; i < checkboxBtn.length; i++) {
        checkboxBtn[i].addEventListener("click", function() {
            checkboxBtn[i].checked ? myLibrary[i].read = true : myLibrary[i].read = false
        })
    }
}

function toggleForm() {
    let formList = document.getElementById("main-form").classList
    formList.contains("hidden") ? formList.remove("hidden") : formList.add("hidden")
}

function execute(event) {
    newLibrary.addBookToLibrary();
    assignPosition()
    toggleForm()
    formReset()
    newLibrary.addToScreen();
    addListeners()
    event.preventDefault()
}

function assignPosition() {
    for (book in myLibrary) {
        myLibrary[book].counter = myLibrary.indexOf(myLibrary[book])
    }
}