const modals = ['createCategory'];
const widgets = {};

modals.forEach(m => {
    const modal = require(`./${m}`);
    const entries = Object.entries(modal);
    entries.forEach(([key, value]) => {
        widgets[`modal_${m}_${key}`] = value;
    });
});

module.exports = widgets;