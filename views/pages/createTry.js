const categoryService = require('../../services/categoryService.js')
const tryService = require('../../services/tryService.js')

function menu(_data, props) {
    return {
        type: "view",
        name: "menu"
    }
}

function content(_data, props) {
    return {
        type: "flex",
        direction: "vertical",
        spacing: 2,
        padding: {
            left: 4,
            right: 4,
        },
        children: [
            {
                type: "flex",
                direction: "vertical",
                spacing: 2,
                children: [
                    {
                        type: "text",
                        value: "From a category",
                        style: {
                            fontSize: 20,
                            fontWeight: "w700"
                        }
                    },
                    {
                        type: "view",
                        name: "categoryList",
                        query: {
                            "$find": {
                                "_datastore": categoryService.datastoreName,
                                "_refs": {
                                    "$contains": ["@me"]
                                }
                            }
                        },
                        props: {
                            // direction: "vertical",
                            actions: {
                                onPressed: {
                                    action: "createTry"
                                }
                            }
                        }
                    }
                    // {
                    //     type: "flex",
                    //     scroll: true,
                    //     children: Object.entries(categories)
                    //         .filter(([_, c]) => c.ready)
                    //         .sort(([_a, a], [_b, b]) => a.name.localeCompare(b.name))
                    //         .map(([id, _]) => ({
                    //             type: "view",
                    //             name: "categoryCard",
                    //             props: {
                    //                 id,
                    //                 actions: {
                    //                     onPressed: {
                    //                         action: "Try",
                    //                         props: {
                    //                             action: "new",
                    //                             category: id
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }))
                    // }
                ]
            },
            {
                type: "flex",
                direction: "vertical",
                spacing: 2,
                children: [
                    {
                        type: "text",
                        value: "From a try",
                        style: {
                            fontSize: 20,
                            fontWeight: "w700"
                        }
                    },
                    {

                        type: "container",
                        constraints: { maxWidth: 1200 },
                        child: {
                            type: "view",
                            name: "tryList",
                            query: {
                                "$find": {
                                    "_datastore": tryService.datastoreName,
                                    "_refs": {
                                        "$contains": ["@me"]
                                    }
                                }
                            },
                            props: {
                                direction: "vertical",
                                actions: {
                                    onPressed: {
                                        action: "createTry"
                                    }
                                }
                            }
                        }
                    }
                    // {
                    //     type: "flex",
                    //     direction: "vertical",
                    //     spacing: 2,
                    //     children: Object.values(tries)
                    //         .sort((a, b) => b.date - a.date)
                    //         .map(t => ({
                    //             type: "view",
                    //             name: "tryCard",
                    //             props: {
                    //                 id: t.id,
                    //                 actions: {
                    //                     onPressed: {
                    //                         action: "Try",
                    //                         props: {
                    //                             action: "new",
                    //                             try: t.id
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }))
                    // }
                ]
            }
        ]
    }
}


module.exports = {
    menu,
    content,
}