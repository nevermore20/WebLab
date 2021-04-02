import Model from "./Model";

export default class Picture extends Model {
    static getName() {
        return 'picture';
    }

    constructor({author, title, description, status, start_price, min_step, max_step} = {}) {
        super();
        this.author = author;
        this.title = title;
        this.description = description;
        this.status = status;
        this.start_price = start_price;
        this.min_step = min_step;
        this.max_step = max_step;
    }

    static pictureFromRequest(req = {}) {
        return new Picture(req);
    }
}