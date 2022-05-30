module.exports = class LenraData {
    /**
     * @param {number} _id Data id
     * @param {string} _datastore The datastore where the data is stored
     * @param {number[]} _refs The data references to other datas
     * @param {number[]} _refBy The other datas referencing the current data
     */
    constructor(_id, _datastore, _refs, _refBy) {
        this._id = _id;
        this._datastore = _datastore;
        this._refs = _refs || [];
        this._refBy = _refBy || [];
    }
}