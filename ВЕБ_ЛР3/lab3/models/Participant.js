import Model from './Model'

export default class Participant extends Model {
    static getName() {
        return 'participant';
    }

    constructor({first_name, second_name, last_name, balance} = {}) {
        super();
        this.first_name = first_name;
        this.second_name = second_name;
        this.last_name = last_name;
        this.balance = balance;
    }

    static participantFromRequest(req = {}) {
        return new Participant(req);
    }
}