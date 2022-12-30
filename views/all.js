const userService = require('../services/userService.js');
const views = {
  main,
  app: require('./app'),
  ...require("./components/all.js"),
  ...require("./pages/all.js"),
  ...require("./modals/all.js"),
};

module.exports = views;


function main() {
  return {
    type: "view",
    name: "app",
    query: {
      "$find": {
        "_datastore": userService.datastoreName,
        "_id": "@me"
      }
    }
  };
}