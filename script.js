let myLibrary = [];

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = ''; // Clear the container

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
        <button onclick="removeBook(${index})">Remove</button>
        <button onclick="toggleRead(${index})">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
      `;
        bookContainer.appendChild(bookDiv);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

// Modal open/close logic
const modal = document.getElementById("bookModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

openModal.onclick = () => modal.style.display = "block";
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

// Form handling within modal
document.getElementById('modalForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('modalTitle').value;
    const author = document.getElementById('modalAuthor').value;
    const pages = document.getElementById('modalPages').value;
    const read = document.getElementById('modalRead').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Reset form and close modal
    e.target.reset();
    modal.style.display = "none";
});