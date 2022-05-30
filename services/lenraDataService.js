'use strict'

const { default: axios } = require("axios");
const LenraData = require('../classes/LenraData.js');

module.exports = {
    /**
     * Gets a Lenra data by id
     * @param {*} api The API call data
     * @param {string} datastore The datastore name
     * @param {number} id The data id
     * @returns {Promise<LenraData>}
     */
    getData(api, datastore, id) {
        return axios.get(`${api.url}/app/datastores/${datastore}/data/${id}`, options(api)).then(handleResponse);
    },
    /**
     * Gets all the data of a datastore
     * @param {*} api The API call data
     * @param {string} datastore The datastore name
     * @returns {Promise<LenraData[]>}
     */
    getAll(api, datastore) {
        // Not implemented yet
        // return axios.get(`${api.url}/app/datastores/${datastore}/data/`, options(api)).then(handleResponse);
        this.executeQuery(api, {
            "$find": {
                "_datastore": datastore
            }
        })
    },
    /**
     * Update a given data in the datastore
     * @param {*} api The API call data
     * @param {string} datastore The datastore name
     * @param {LenraData} data The data to save
     * @returns {Promise<LenraData>}
     */
    updateData(api, datastore, data) {
        return axios.put(`${api.url}/app/datastores/${datastore}/data/${data._id}`, data, options(api)).then(handleResponse);
    },
    /**
     * Create a data in a given datastore
     * @param {*} api The API call data
     * @param {string} datastore The datastore name
     * @param {LenraData} data The data to create in datastore
     * @returns {Promise<LenraData>}
     */
    createData(api, datastore, data) {
        return axios.post(`${api.url}/app/datastores/${datastore}/data`, data, options(api)).then(handleResponse);
    },
    /**
     * Delete a data by id from a datastore
     * @param {*} api The API call data
     * @param {string} datastore The datastore name
     * @param {number} id The data id
     * @returns {Promise<void>}
     */
    deleteData(api, datastore, id) {
        return axios.delete(`${api.url}/app/datastores/${datastore}/data/${id}`, options(api)).then(handleResponse);
    },
    /**
     * Creates a datastore
     * @param {*} api The API call data
     * @param {string} datastore The datastore name
     * @returns 
     */
    createDatastore(api, datastore) {
        return axios.post(`${api.url}/app/datastores`, { "name": datastore }, options(api)).then(handleResponse);
    },
    /**
     * Executes a given query
     * @param {*} api The API call data
     * @param {*} query The query
     * @returns 
     */
    executeQuery(api, query) {
        return axios.post(`${api.url}/app/query`, query, options(api)).then(handleResponse);
    }
}

function handleResponse(response) {
    if (response.data.success) {
        return response.data.data;
    }
    else {
        console.error(response.data);
        throw new Error("There were errors while calling the API");
    }
}

function options(api) {
    return { headers: headers(api) }
}

function headers(api) {
    return { Authorization: `Bearer ${api.token}` }
}