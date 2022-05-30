'use strict'

const userService = require('./userService.js');
const homeNavigation = {
    state: {
        page: 'home'
    },
    history: []
};

module.exports = {
    homeNavigation,
    async home(api, userData) {
        userData = await userService.getUser(api, userData);
        userData.navigation = { ...homeNavigation };
        return userService.updateUser(api, userData);
    },
    async updateState(api, userData, stateData) {
        userData = await userService.getUser(api, userData);
        Object.entries(stateData)
            .forEach(([key, value]) => {
                userData.navigation.state[key] = value;
            });
        return userService.updateUser(api, userData);
    },
    async pushState(api, userData, state) {
        userData = await userService.getUser(api, userData);
        if (!userData.navigation) userData.navigation = { ...homeNavigation };
        userData.navigation.history.push(userData.navigation.state);
        userData.navigation.state = {
            ...state
        };
        return userService.updateUser(api, userData);
    },
    async popState(api, userData, times) {
        userData = await userService.getUser(api, userData);
        // TODO: manage editing category
        times = Math.max(1, Math.min(userData.navigation.history.length, times || 1));
        while (times-- > 0)
            userData.navigation.state = userData.navigation.history.pop();
        return userService.updateUser(api, userData);
    }
}
