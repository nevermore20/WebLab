const lib = require('../models/Db.js');

class Library {
    static getBook(id = undefined) {
        var books = lib.Db.get("library");
        if (id) {
            return books[id];
        }
        return books;
    }

    static addBook(id, book) {
        if (id === undefined) {
            id = Math.random().toString(36).substr(2, 8);
        }
        book.id = id;
        lib.Db.add("library", id, book);
    }

    static deleteBook(id) {
        lib.Db.delete("library", id);
    }
}

module.exports = {
    Library: Library
};