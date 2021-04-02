import Db from "./Db"

export default class Model {
    static getName() {
        return '';
    }

    static getEntity(id = undefined) {
        var entities = Db.get(this.getName());
        if (id) {
            let data = entities[id];
            if(!data) throw `${this.getName()} with id='${id}' not found`;
            return data
        }
        return entities;
    }

    static addEntity(id, entity) {
        if (id === undefined) {
            id = Math.random().toString(36).substr(2, 8);
        }
        entity.id = id;
        Db.add(this.getName(), id, entity);
        return id;
    }

    static deleteEntity(id) {
        Db.delete(this.getName(), id);
    }
}