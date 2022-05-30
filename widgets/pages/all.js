const pages = ['home', 'categories', 'editCategory', 'createTry', 'editTry'];
const widgets = {};

pages.forEach(p => {
    const page = require(`./${p}`);
    const entries = Object.entries(page);
    entries.forEach(([key, value]) => {
        widgets[`${p}_${key}`] = value;
    });
});

module.exports = widgets;