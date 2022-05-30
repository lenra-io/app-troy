'use strict'

const dataService = require("./lenraDataService.js");
const Try = require('../classes/Try.js');
const categoryService = require('./categoryService.js');
const Category = require('../classes/Category.js');
const datastoreName = 'tries';

module.exports = {
    datastoreName,
    /**
     * @param {*} api 
     * @param {Try} tryData 
     * @returns {Promise<Try>}
     */
    async createTry(api, tryData) {
        return dataService.createData(api, datastoreName, tryData);
    },
    /**
     * @param {*} api 
     * @param {number} tryId 
     * @returns {Promise<Try>}
     */
    async getTry(api, tryId) {
        return dataService.getData(api, datastoreName, tryId);
    },
    /**
     * @param {*} api 
     * @returns {Promise<Try[]>}
     */
    async getUserTries(api) {
        return await dataService.executeQuery(api, {
            "$find": {
                "_datastore": datastoreName,
                "_refs": {
                    "$constains": "@me"
                }
            }
        });
    },
    /**
     * @param {*} api 
     * @param {number} tryId
     * @returns {Promise<Category>}
     */
    async getTryCategory(api, tryId) {
        return await dataService.executeQuery(api, {
            "$find": {
                "_datastore": categoryService.datastoreName,
                "_refBy": {
                    "$constains": tryId
                }
            }
        }).then(categories => categories[0]);
    },
    /**
     * @param {*} api 
     * @param {Try} tryData 
     * @returns {Promise<Try>}
     */
    async updateTry(api, tryData) {
        return await dataService.updateData(api, datastoreName, tryData);
    }
}
