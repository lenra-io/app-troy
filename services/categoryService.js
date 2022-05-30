'use strict'

const dataService = require("./lenraDataService.js");
const Category = require("../classes/Category.js");
const datastoreName = 'categories';

module.exports = {
    datastoreName,
    /**
     * @param {*} api 
     * @param {Category} category The category 
     * @returns {Promise<Category>}
     */
    async createCategory(api, category) {
        return dataService.createData(api, datastoreName, category);
    },
    /**
     * @param {*} api 
     * @param {number} categoryId The category id
     * @returns {Promise<Category>}
     */
    async getCategory(api, categoryId) {
        return dataService.getData(api, datastoreName, categoryId);
    },
    /**
     * @param {*} api 
     * @returns {Promise<Category[]>}
     */
    async getUserCategories(api) {
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
     * @param {Category} category 
     * @returns {Promise<Category>}
     */
    async updateCategory(api, category) {
        return await dataService.updateData(api, datastoreName, category);
    }
}
