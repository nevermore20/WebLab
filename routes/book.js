var express = require('express');
var router = express.Router();

const lib = require('../models/Library.js');
const book_lib = require('../models/Book.js');

router.get('/get', function (req, res, next) {
    let books = lib.Library.getBook();
    books = Object.values(books);
    console.log(req.query.field, req.query.dir);
    books = books.sort(function (a,b) {
        return (req.query.dir === "asc" ? a[req.query.field] > b[req.query.field] : a[req.query.field] < b[req.query.field]) ? 1 : -1;
    });
    res.send(JSON.stringify(books));
});

router.get('/get/:id', function (req, res, next) {
    let books = lib.Library.getBook(req.params.id);
    res.send(JSON.stringify(books));
});

router.get('/card/:id', function (req, res, next) {
    let book = lib.Library.getBook(req.params.id);
    res.render('book_card', {book: book, id: req.params.id});
});

router.post('/create', function (req, res, next) {
    lib.Library.addBook(undefined, book_lib.Book.bookFromRequest(req.body));
    res.send("ok");
});

router.get('/create', function (req, res, next) {
    res.render('create', {book: new book_lib.Book()});
});

router.post('/update/:id', function (req, res, next) {
    lib.Library.deleteBook(req.params.id);
    lib.Library.addBook(req.params.id, book_lib.Book.bookFromRequest(req.body));
    res.send("ok");
});

router.get('/update/:id', function (req, res, next) {
    res.render('update', {book: lib.Library.getBook(req.params.id)});
});

router.delete('/delete/:id', function (req, res, next) {
    lib.Library.deleteBook(req.params.id);
    res.send("ok");
});

module.exports = router;