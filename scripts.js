let counter;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.counter = counter;
    };
};

class Library {
    constructor() {
        this.books = []
    };

    addListeners() {
        let deleteBtn = document.querySelectorAll(".delete")
        let checkboxBtn = document.querySelectorAll(".check-box")
        for (let i = 0; i < deleteBtn.length; i++) {
            deleteBtn[i].addEventListener("click", function(event) {
                let targetBook = new String(event.target.parentElement.classList[1]);
                newLibrary.books.splice(targetBook.charAt(1), 1);
                newLibrary.assignPosition();
                newLibrary.addToScreen();
            })
        }
        for (let i = 0; i < checkboxBtn.length; i++) {
            checkboxBtn[i].addEventListener("click", function() {
                checkboxBtn[i].checked ? newLibrary.books[i].read = true : newLibrary.books[i].read = false
            })
        }
    }

    addBookToLibrary() {
        let title = document.getElementById("book-name").value;
        let author = document.getElementById("book-author").value;
        let pages = document.getElementById("book-pages").value;
        let read = document.getElementById("book-read").checked;
        let thisBook = new Book(title, author, pages, read);
        this.books.push(thisBook);
        this.assignPosition();
        this.addToScreen();
    };

    addToScreen() {
        let container = document.getElementById("display-books");
        container.innerHTML = '';
        newLibrary.books.forEach((book) => {
            let bookRow = 
                `<div class="book-row a${book.counter}">
                    <div class="cell">${book.title}</div>
                    <div class="cell">${book.author}</div>
                    <div class="cell">Pages: ${book.pages}</div>
                    <div class="cell"><input type="checkbox" name="read" class="check-box"></div>
                    <button class="delete">DELETE</button>
                </div>`
            container.innerHTML += bookRow;
        });
        this.isChecked();
        this.addListeners();
    };

    isChecked() {
        newLibrary.books.forEach((book) => {
            if (book.read == true) {
                document.querySelector(`.a${book.counter} input[type="checkbox"]`).checked = true
            }
        });
    };

    assignPosition() {
        this.books.forEach((book) => {
            book.counter = this.books.indexOf(book);
        })
    };

};

const FormController = (function() {
    const formReset = () => {
        document.getElementById("main-form").reset()
    };

    const toggleForm = () => {
        let formList = document.getElementById("main-form").classList
        formList.contains("hidden") ? formList.remove("hidden") : formList.add("hidden")
    };

    const execute = (event) => {
        newLibrary.addBookToLibrary();
        toggleForm();
        formReset();
        event.preventDefault();
    };

    return {
        execute,
        toggleForm
    };
})();

let newLibrary = new Library();