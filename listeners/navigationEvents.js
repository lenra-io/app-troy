const navigationService = require('../services/navigationService.js');

function home(props, event, api) {
    console.log("home");
    return navigationService.home(api);
}

function setPage(props, event, api) {
    console.log("setPage", props);
    return navigationService.pushState(api, null, {page: props.page});
}

function pushState(props, event, api) {
    console.log("pushState", props);
    return navigationService.pushState(api, null, props);
}

function popState(props, event, api) {
    console.log("popState", props);
    return navigationService.popState(api, null, props.times);
}

function setStateProperty(props, event, api) {
    console.log("setStateProperty", props, event);
    return navigationService.updateState(api, null, {[props.property]: event.value || props.value});
}

function openModal(props, event, api) {
    console.log("openModal", props, event);
    return navigationService.updateState(api, null, {modal: props.modal});
}

function closeModal(props, event, api) {
    console.log("closeModal", props, event);
    return navigationService.updateState(api, null, {modal: undefined});
}

module.exports = {
    home,
    setPage,
    pushState,
    popState,
    setStateProperty,
    openModal,
    closeModal
}