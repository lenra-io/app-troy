const categoryService = require('../../services/categoryService.js');

module.exports = function (categories, props) {
  return {
    type: "flex",
    spacing: 3,
    direction: props.direction,
    fillParent: props.fillParent,
    crossAxisAlignment: props.crossAxisAlignment,
    padding: {
      bottom: 4
    },
    children: categories
      .sort((a, b) => b.date - a.date)
      .map(c => {
        console.log(c);
        return {
          type: "view",
          name: "categoryCard",
          query: {
            "$find": {
              "_datastore": categoryService.collName,
              "_id": c._id
            }
          },
          props
        }
      })
  };
}