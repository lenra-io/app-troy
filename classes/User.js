const LenraData = require('./LenraData.js');

module.exports = class User extends LenraData {
    /**
     * @param {number} _id 
     * @param {*} navigation 
     */
    constructor(_id, _datastore, _refs, _refBy, navigation) {
        super(_id, _datastore, _refs, _refBy);
        this.navigation = navigation;
    }
}