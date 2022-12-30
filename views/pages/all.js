const pages = ['home', 'categories', 'editCategory', 'createTry', 'editTry'];
const views = {};

pages.forEach(p => {
    const page = require(`./${p}`);
    const entries = Object.entries(page);
    entries.forEach(([key, value]) => {
        views[`${p}_${key}`] = value;
    });
});

module.exports = views;