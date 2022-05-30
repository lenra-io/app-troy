'use strict'

const dataService = require("./lenraDataService.js");
const User = require("../classes/User.js");
const datastoreName = '_users';

module.exports = {
    datastoreName,
    /**
     * @param {*} api 
     * @param {User | number} userData 
     * @returns {Promise<User>}
     */
    async getUser(api, userData) {
        if (userData) {
            if (userData._id) return userData;
            return await dataService.getData(api, datastoreName, userData);
        }
        return await dataService.executeQuery(api, {
            "$find": {
                "_datastore": datastoreName,
                "_id": "@me"
            }
        }).then(users => users[0]);
    },
    /**
     * @param {*} api 
     * @param {User} user 
     * @param {boolean} keepRefs
     * @returns {Promise<User>}
     */
    updateUser(api, user, keepRefs) {
        if (!keepRefs) {
            // Handle to do not override references
            user._refs = undefined;
            user._refBy = undefined;
        }
        return dataService.updateData(api, datastoreName, user);
    }
}
