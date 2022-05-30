const LenraData = require('./LenraData.js');

module.exports = class Try extends LenraData {
    /**
     * @param {number} _id Data id
     * @param {string} _datastore The datastore where the data is stored
     * @param {number[]} _refs The data references to other datas
     * @param {number[]} _refBy The other datas referencing the current data
     * @param {any[]} values The values
     * @param {string} status The status
     * @param {number} date The creation date
     * @param {{message: string, target: string}[]} errors The errors
     * @param {boolean} ready A try is ready when all the fields are setted
     */
    constructor(_id, _datastore, _refs, _refBy, values, status, date, errors, ready) {
        super(_id, _datastore, _refs, _refBy);
        this.values = values || [];
        this.status = status;
        this.date = date || new Date().getTime();
        this.errors = errors || [];
        this.ready = !!ready;
    }

    static statusGood = "good";
    static statusOK = "ok";
    static statusBad = "bad";
    static statusList = [this.statusGood, this.statusOK, this.statusBad];
}