class Book {
    constructor(author, title, publication_date, status, reader_name, return_date) {
        this.author = author;
        this.title = title;
        this.publication_date = publication_date;
        this.status = status;
        this.reader_name = reader_name;
        this.return_date = return_date;
    }

    static bookFromRequest(req = {}) {
        return new Book(req.author, req.title, req.publication_date, req.status, req.reader_name, req.return_date);
    }
}

module.exports = {
    Book: Book
};