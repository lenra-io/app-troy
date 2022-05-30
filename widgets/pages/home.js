const Category = require('../../classes/Category.js');
const categoryService = require('../../services/categoryService.js');
const tryService = require('../../services/tryService.js')

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, props) {
    let tryListFind = {
        "_datastore": tryService.datastoreName,
        "_refs": {
            "$contains": "@me"
        }
    };
    if (props.state.category) {
        tryListFind["_refs"] = {
            "$and": [
                tryListFind["_refs"],
                {
                    "$contains": props.state.category
                }
            ]
        }
    }
    return {
        type: "flex",
        direction: "vertical",
        crossAxisAlignment: "center",
        spacing: 2,
        padding: {
            left: 4,
            right: 4,
        },
        children: [
            {
                type: "flex",
                mainAxisAlignment: "spaceBetween",
                fillParent: true,
                children: [
                    {
                        type: "widget",
                        name: "home_categoryFilter",
                        query: {
                            "$find": {
                                "_datastore": categoryService.datastoreName,
                                "_refs": {
                                    "$contains": "@me"
                                }
                            }
                        },
                        props: {
                            category: props.state.category
                        }
                    },
                    {
                        type: "button",
                        text: "Manage categories",
                        mainStyle: "secondary",
                        onPressed: {
                            action: "setPage",
                            props: {
                                page: "categories"
                            }
                        }
                    }
                ]
            },
            {
                type: "container",
                constraints: { maxWidth: 1200 },
                child: {
                    type: "widget",
                    name: "tryList",
                    query: {
                        "$find": tryListFind
                    },
                    props: {
                        direction: "vertical"
                    }
                }
            }
        ]
    }
}

/**
 * @param {Category[]} categories 
 * @param {*} props 
 * @returns 
 */
function categoryFilter(categories, props) {
    console.log("categoryFilter", props);
    const selectedCategory = categories.find(c => c._id == props.category) || { name: "All categories" };
    return {
        type: "dropdownButton",
        text: selectedCategory.name,
        mainStyle: "tertiary",
        disabled: categories.length == 0,
        icon: {
            type: "icon",
            value: "expand_more",
        },
        child: {
            type: "menu",
            children: [
                {
                    type: "menuItem",
                    text: "All categories",
                    isSelected: !props.category,
                    onPressed: {
                        action: "setStateProperty",
                        props: {
                            property: "category"
                        }
                    }
                },
                ...categories.map(c => ({
                    type: "menuItem",
                    text: c.name,
                    isSelected: c._id == props.category,
                    onPressed: {
                        action: "setStateProperty",
                        props: {
                            property: "category",
                            value: c._id
                        }
                    }
                }))
            ]
        }
    };
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, props) {
    return {
        type: "widget",
        name: "home_menuWithCategories",
        query: {
            "$find": {
                "_datastore": categoryService.datastoreName,
                "_refs": {
                    "$contains": "@me"
                },
                // ready: true
            }
        }
    }
}

function menuWithCategories(categories, props) {
    return {
        type: "widget",
        name: "menu",
        props: {
            mainAction: {
                text: "New Try",
                disabled: !categories.find(c => c.ready),
                onPressed: {
                    action: "setPage",
                    props: {
                        page: "createTry"
                    }
                }
            }
        }
    }
}

module.exports = {
    content,
    categoryFilter,
    menu,
    menuWithCategories
}