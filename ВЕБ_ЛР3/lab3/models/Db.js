import fs from "fs"

export default class Db {
    static get(property) {
        return JSON.parse(fs.readFileSync('db/db.json'))[property];
    }

    static add(property, key, value) {
        var current = JSON.parse(fs.readFileSync('db/db.json'));
        current[property][key] = value;
        fs.writeFileSync('db/db.json', JSON.stringify(current))
    }

    static delete(property, key) {
        var current = JSON.parse(fs.readFileSync('db/db.json'));
        delete current[property][key];
        fs.writeFileSync('db/db.json', JSON.stringify(current))
    }
}