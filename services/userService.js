'use strict'

const apiService = require("./api");
const User = require("../classes/User.js");
const collName = '_users';

module.exports = {
    collName,
    /**
     * @param {*} api 
     * @param {User | number} userData 
     * @returns {Promise<User>}
     */
    async getUser(api, userData) {
        if (userData) {
            if (userData._id) return userData;
            return await apiService.getDoc(api, collName, userData);
        }
        return await apiService.executeQuery(api, collName, {
            "_id": "@me"
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
        return dataService.updateData(api, collName, user);
    }
}
