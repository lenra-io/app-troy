'use strict'

const apiService = require("./api");
const Category = require("../classes/Category.js");
const collName = 'categories';

module.exports = {
    collName,
    /**
     * @param {*} api 
     * @param {Category} category The category 
     * @returns {Promise<Category>}
     */
    async createCategory(api, category) {
        return apiService.createDoc(api, collName, category);
    },
    /**
     * @param {*} api 
     * @param {number} categoryId The category id
     * @returns {Promise<Category>}
     */
    async getCategory(api, categoryId) {
        return apiService.getDoc(api, collName, categoryId);
    },
    /**
     * @param {*} api 
     * @returns {Promise<Category[]>}
     */
    async getUserCategories(api) {
        return await apiService.executeQuery(api, collName, {
            "_refs": {
                "$contains": "@me"
            }
        });
    },
    /**
     * @param {*} api 
     * @param {Category} category 
     * @returns {Promise<Category>}
     */
    async updateCategory(api, category) {
        return await apiService.updateDoc(api, collName, category);
    }
}
