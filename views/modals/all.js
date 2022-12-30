const modals = ['createCategory'];
const views = {};

modals.forEach(m => {
    const modal = require(`./${m}`);
    const entries = Object.entries(modal);
    entries.forEach(([key, value]) => {
        views[`modal_${m}_${key}`] = value;
    });
});

module.exports = views;