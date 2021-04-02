import Model from './Model'

export default class Config extends Model {
    static getName() {
        return 'config';
    }

    constructor({datetime_begin, sell_timeout, before_sell_interval, pause_sell_interval} = {}) {
        super();
        this.datetime_begin = datetime_begin;
        this.sell_timeout = sell_timeout;
        this.before_sell_interval = before_sell_interval;
        this.pause_sell_interval = pause_sell_interval;
    }

    static configFromRequest(req = {}) {
        return new Config(req);
    }
}