

module.exports = function (tries, props) {
  return {
    type: "flex",
    spacing: 3,
    direction: props.direction,
    fillParent: true,
    padding: {
      bottom: 4
    },
    children: tries
      .sort((a, b) => b.date - a.date)
      .map(t => ({
        type: "view",
        name: "tryCard",
        query: {
          "$find": {
            "_datastore": "tries",
            "_id": t._id
          }
        },
        props
      }))
  };
}