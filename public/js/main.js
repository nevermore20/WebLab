var book_cards = document.getElementById('book_cards');

var last_field = 'title';
var last_dir = 'asc';

function updateTable() {
    fetch('/book/get?field=' + last_field + '&dir=' + last_dir).then(function (resp) {
        return resp.json()
    }).then(function (response) {
        let books = response;
        book_cards.innerHTML = '';
        for (let i = 0; i < books.length; i++) {
            fetch('/book/card/' + books[i]['id']).then(function (resp) {
                return resp.text()
            }).then(function (response) {
                var newNode = document.createElement('div');
                newNode.innerHTML = response;
                book_cards.appendChild(newNode);
            });
        }
    });
}

function setOrder(field, dir) {
    last_field = field;
    last_dir = dir;
    updateTable();
}

function createButtonClicked() {
    openButtonClicked('/book/create');
}

function updateButtonClicked(id) {
    openButtonClicked('/book/update/' + id);
}

function deleteButtonClicked(id) {
    deleteClicked('/book/delete/' + id);
}

function openButtonClicked(url) {
    fetch(url).then(function (resp) {
        return resp.text()
    }).then(function (response) {
        document.getElementById("form-modal-content").innerHTML = response;
        document.getElementById("form-modal").style.display = 'block';
        document.getElementById("book-form").action = url;
        displayFields();
    });
}

function deleteClicked(url) {
    if (confirm("Вы уверены, что хотите удалить эту книгу?")) {
        fetch(url, {
            method: 'delete',
        }).then(function () {
            updateTable()
        });
    }
}

function sendForm(url) {
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Array.from(new FormData(document.getElementById("book-form")), e => e.map(encodeURIComponent).join('=')).join('&')
    }).then(function () {
        document.getElementById("form-modal").style.display = 'none';
        updateTable()
    });
}

window.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);
    sendForm(event.target.action);
});

function displayFields() {
    if (document.getElementById("form-status").value === "1") {
        document.getElementById('form-additional').style.display = '';
    } else {
        document.getElementById('form-additional').style.display = 'none';
        document.getElementById('form-reader-name').value = '';
        document.getElementById('form-return-date').value = '';
    }
}

updateTable();
