const fs = require("fs");

class Db {
    static get(property) {
        return JSON.parse(fs.readFileSync('database.json'))[property];
    }

    static add(property, key, value) {
        var current = JSON.parse(fs.readFileSync('database.json'));
        current[property][key] = value;
        fs.writeFileSync('database.json', JSON.stringify(current))
    }

    static delete(property, key) {
        var current = JSON.parse(fs.readFileSync('database.json'));
        delete current[property][key];
        fs.writeFileSync('database.json', JSON.stringify(current))
    }
}

module.exports = {
    Db: Db
};