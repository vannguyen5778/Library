const library = document.querySelector(".library");

const myLibrary = [];


class Book {
    constructor(
      title = 'Unknown',
      author = 'Unknown',
      pages = '0',
      read = false,
      info = null
    ) {
      this.title = title,
      this.author = author,
      this.pages = pages,
      this.read = read,
      this.info = function() {
        return(`${title} by ${author}, ${pages} pages, ${read}`)
    }
    }
  }
  
function addLocalStorage() {
    myLibrary = JSON.parse(localStorage.getItem("library")) || [];
    saveAndRenderBooks();
}

function addBookToLibrary() {
    let title = document.getElementById('bookTitle').value;
    let author = document.getElementById('bookAuthor').value;
    let pages = Number(document.getElementById('bookPages').value);
    let read = document.getElementById('bookRead').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    updateStats();
    saveAndRenderBooks();
    // renderBooks();

}

document.getElementById('modalContent').addEventListener('submit', function() {
    event.preventDefault();
    console.log('hello');
    addBookToLibrary();
    console.log('hello', myLibrary);
    closeModal();
})

function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
}



function createBookItem(book, index) {
    const bookItem = document.createElement('div');
    const bottom = createBookElement('div', '', 'card-bottom');
    const buttonCover = createBookElement('div', '', 'button-cover');
    const toggleRead = createBookElement('div', '', 'button r');
    const input = createBookElement('input', '', 'checkbox');
    const ribbonText = document.createElement('span');
    const removeWrap = createBookElement('div', '', 'garbage-wrapper');
    const removeImg = createBookElement('img', '', 'remove-img');

    bookItem.setAttribute('id', index);
    bookItem.setAttribute('key', index);
    bookItem.setAttribute('class', 'card');
    const ribbon = createBookElement('div', '', "ribbon");

   

    bookItem.appendChild(createBookElement('p', `${book.title}`, "book-title"));
    bookItem.appendChild(createBookElement('p', `by ${book.author}`, "author"));
    bookItem.appendChild(createBookElement('p', `Pages: ${book.pages} pages`, "pages"));
    bookItem.appendChild(bottom);
    bottom.appendChild(buttonCover);
    buttonCover.appendChild(createBookElement('p', 'Completed?', 'completed'));

    toggleRead.setAttribute("id", "button-1");
    buttonCover.appendChild(toggleRead);
    input.type = "checkbox";
    toggleRead.appendChild(input);
    toggleRead.appendChild(createBookElement('div', '', 'knobs'));
    toggleRead.appendChild(createBookElement('div', '', 'layer'));

    if (book.read) {
        input.checked = false;
        ribbon.setAttribute("style", "display: block");
    } else {
        input.checked = true;
        ribbon.setAttribute("style", "display: none");
    }
    ribbonText.textContent = 'read';
    ribbon.appendChild(ribbonText);
    bookItem.appendChild(ribbon);

    input.addEventListener('click', (e) => {
        if (book.read) {
            book.read = false;
        }
        if (ribbon.style.display !== 'none') {
            window.setTimeout(function(){
                ribbon.style.opacity = 0;
                ribbon.style.display = 'none';
            },200);
            book.read = false;
        }
        else {
            window.setTimeout(function(){
                ribbon.style.display = 'block';
                ribbon.style.opacity = 1;               
            },200);
            book.read = true;
            }
        updateStats();
        })
    

    bottom.appendChild(removeWrap);
    removeWrap.appendChild(removeImg);
    removeImg.src = 'img/garbage.png';
    removeImg.alt = 'garbage bin';
    removeWrap.addEventListener('click', () => {
        removeBook(index);
    })
    library.appendChild(bookItem);
    

}


function renderBooks() {
    let addBtn = library.lastElementChild;
    library.textContent = "";
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    })
    library.append(addBtn);
    updateStats();
}

function saveAndRenderBooks() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
    renderBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    saveAndRenderBooks();
    // renderBooks();
}

function updateStats() {
    let totalPages = document.querySelector('#totalPages');
    let totalBooks = document.querySelector('#totalBooks');
    let totalRead = document.querySelector('#totalRead');
    totalPages.textContent = `${myLibrary.reduce((totalPages, book) => {
        return totalPages + book.pages}, 0)}`;
    totalBooks.textContent = `${myLibrary.length}`;
    totalRead.textContent = `${myLibrary.filter(book => book.read).length}`;
}

const statsBtn = document.querySelector('.tooltip');
const stats = document.querySelector('.stats');
statsBtn.onclick = () => {
    if (stats.style.display !== 'none') {
                        stats.style.display = 'none';
                }
                else {
                        stats.style.display = 'flex';            
                    }


}


// MODAL
const modal = document.getElementById('modal');
const modalBtn = document.getElementById('addIcon');
const modalClose = document.getElementById('modalClose');

modalBtn.onclick = function() {
    modal.style.display = "block";
}

modalClose.onclick = closeModal;

function closeModal() {
    resetModal();
    modal.style.display = "none";
}

function resetModal() {
    document.getElementById('bookTitle').value = "";
    document.getElementById('bookAuthor').value = "";
    document.getElementById('bookPages').value = "";
    document.getElementById("bookRead").checked = false;

}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



