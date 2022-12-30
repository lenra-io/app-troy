const categoryService = require('../../services/categoryService.js')

function content(categories, props) {
    return {
        type: "flex",
        direction: "vertical",
        // crossAxisAlignment: "stretch",
        padding: {
            left: 4,
            right: 4,
        },
        children: [
            {

                type: "container",
                constraints: { maxWidth: 1200 },
                child: {
                    type: "view",
                    name: "categoryList",
                    query: {
                        "$find": {
                            "_datastore": categoryService.collName,
                            "_refs": {
                                "$contains": ["@me"]
                            }
                        }
                    },
                    props: {
                        direction: "vertical",
                        actions: {
                            onPressed: {
                                action: "pushState",
                                props: {
                                    page: 'editCategory'
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
}

function menu(data, props) {
    return {
        type: "view",
        name: "menu",
        props: {
            mainAction: {
                text: "New category",
                onPressed: {
                    action: 'openModal',
                    props: {
                        modal: 'createCategory'
                    }
                }
            }
        }
    }
}

module.exports = {
    content,
    menu
}