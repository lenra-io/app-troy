const Category = require('../../classes/Category.js');
const User = require('../../classes/User.js');
const categoryService = require('../../services/categoryService.js');
const userService = require('../../services/userService.js');
const ui = require('../utils/ui.js')

function menu(data, props) {
    const children = [{
        type: "view",
        name: "ariane",
        query: {
            "$find": {
                "_datastore": userService.collName,
                "_id": "@me"
            }
        }
    }];
    if (props && props.mainAction) {
        children.push({
            ...props.mainAction,
            type: "button"
        });
    }
    return {
        type: "container",
        decoration: {
            color: 0xFFFFFFFF,
            boxShadow: {
                blurRadius: 8,
                color: 0x1A000000,
                offset: {
                    dx: 0,
                    dy: 1
                }
            },
        },
        child: {
            type: "flex",
            fillParent: true,
            mainAxisAlignment: "spaceBetween",
            crossAxisAlignment: "center",
            padding: ui.padding.symmetric(4, 2),
            children
        }
    }
}

/**
 * @param {User[]} users
 * @param {*} _props 
 * @returns 
 */
function ariane(users, _props) {
    const user = users[0];
    return {
        type: "flex",
        crossAxisAlignment: "center",
        children: [
            ...user.navigation.history.flatMap((state, i) => {
                return [
                    fillWidgetPageName(state, {
                        type: "button",
                        mainStyle: "tertiary",
                        onPressed: {
                            action: "popState",
                            props: {
                                times: user.navigation.history.length - i
                            }
                        }
                    }),
                    {
                        type: "text",
                        value: "/",
                    }
                ]
            }),
            fillWidgetPageName(user.navigation.state, {
                type: "container",
                padding: ui.padding.symmetric(2, 1),
                child: {
                    type: "text"
                }
            })
        ]
    };
}

/**
 * @param {User} user 
 * @param {*} state 
 * @returns 
 */
function fillWidgetPageName(state, view) {
    switch (state.page) {
        case 'home':
            return fillWidgetText(view, 'Troy');
        case 'categories':
            return fillWidgetText(view, 'Categories');
        case 'editCategory':
            return {
                type: "view",
                name: "arianeCategoryName",
                props: { view },
                query: {
                    "$find": {
                        "_datastore": categoryService.collName,
                        "_id": state.category
                    }
                }
            }
        case 'createTry':
            return fillWidgetText(view, 'New try');
        case 'editTry':
            // TODO: 
            return fillWidgetText(view, 'New try');
        default:
            console.error(`Not managed page ${state.page}`);
            return fillWidgetText(view, state.page);
    }
}

/**
 * 
 * @param {Category[]} categories 
 * @param {*} props 
 * @returns 
 */
function categoryName(categories, props) {
    const category = categories[0];
    return fillWidgetText(props.view, category.name);
}

/**
 * @param {*} view
 * @param {string} text 
 * @returns 
 */
function fillWidgetText(view, text) {
    switch (view.type) {
        case "container":
            view = { ...view, child: fillWidgetText(view.child, text) };
            break;
        case "text":
            view = { ...view, value: text };
            break;
        case "button":
            view = { ...view, text };
            break;
        default:
            console.error(`Not managed view type ${view.type}`);
    }
    return view;
}

module.exports = {
    menu,
    ariane,
    arianeCategoryName: categoryName
}