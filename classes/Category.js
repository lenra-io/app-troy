const LenraData = require('./LenraData.js');
const Unit = require('./Unit.js');

class Field {
    /**
     * @param {string|number} _id The field id
     * @param {string} name The field name
     * @param {Unit} unit The field unit
     */
    constructor(_id, name, unit) {
        this._id = _id;
        this.name = name;
        this.unit = unit;
    }
}

class Modification {
    /**
     * 
     * @param {string} property The property name of the modification
     * @param {string | Field} data The new property data
     * @param {string} action For field modification, specify the desired modification (add, remove)
     * @param {string} id For field modification, a unique ID to edit the modification
     */
    constructor(property, data, action, id) {
        this.property = property;
        this.data = data;
        this.action = action;
        this.id = id;
    }
}

module.exports = class Category extends LenraData {
    /**
     * @param {number} _id Data id
     * @param {string} _datastore The datastore where the data is stored
     * @param {number[]} _refs The data references to other datas
     * @param {number[]} _refBy The other datas referencing the current data
     * @param {string} name The category name
     * @param {string} description The category description
     * @param {Field[]} fields The fields
     * @param {string[]} tries The tries ids of the category
     * @param {Modification[]} modifications The modifications of the category
     * @param {any[]} errors The modifications of the category
     * @param {number} creationDate
     * @param {boolean} ready
     */
    constructor(_id, _datastore, _refs, _refBy, name, description, fields, tries, modifications, errors, creationDate, ready) {
        super(_id, _datastore, _refs, _refBy);
        this.name = name;
        this.description = description;
        this.fields = fields || [];
        this.tries = tries || [];
        this.modifications = modifications || [];
        this.errors = errors || [];
        this.creationDate = creationDate || new Date().getTime();
        this.ready = ready;
    }

    static Field = Field;
    static Modification = Modification;
}