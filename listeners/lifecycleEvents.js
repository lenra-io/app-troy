'use strict'

const categoryService = require('../services/categoryService.js');
const lenraDataService = require("../services/lenraDataService.js");
const navigationService = require('../services/navigationService.js');
const tryService = require('../services/tryService.js');

const datastores = [tryService.collName, categoryService.collName];

function onEnvStart(props, event, api) {
    const promises = datastores.map(ds => lenraDataService.createDatastore(api, ds).catch((e => { })));
    return Promise.all(promises);
}

function onEnvStop(props, event, api) {
    // TODO: do something
}

function onUserFirstJoin(props, event, api) {
    return navigationService.home(api);
}

function onUserQuit(props, event, api) {
    // TODO: remove user data
}

function onSessionStart(props, event, api) {
    // TODO: do something
}

function onSessionStop(props, event, api) {
    // TODO: do something
}

module.exports = {
    onEnvStart,
    onEnvStop,
    onUserFirstJoin,
    onUserQuit,
    onSessionStart,
    onSessionStop
}