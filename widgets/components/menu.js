const Category = require('../../classes/Category.js');
const User = require('../../classes/User.js');
const categoryService = require('../../services/categoryService.js');
const userService = require('../../services/userService.js');
const ui = require('../utils/ui.js')

function menu(data, props) {
    const children = [{
        type: "widget",
        name: "ariane",
        query: {
            "$find": {
                "_datastore": userService.datastoreName,
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
function fillWidgetPageName(state, widget) {
    switch (state.page) {
        case 'home':
            return fillWidgetText(widget, 'Troy');
        case 'categories':
            return fillWidgetText(widget, 'Categories');
        case 'editCategory':
            return {
                type: "widget",
                name: "arianeCategoryName",
                props: { widget },
                query: {
                    "$find": {
                        "_datastore": categoryService.datastoreName,
                        "_id": state.category
                    }
                }
            }
        case 'createTry':
            return fillWidgetText(widget, 'New try');
        case 'editTry':
            // TODO: 
            return fillWidgetText(widget, 'New try');
        default:
            console.error(`Not managed page ${state.page}`);
            return fillWidgetText(widget, state.page);
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
    return fillWidgetText(props.widget, category.name);
}

/**
 * @param {*} widget
 * @param {string} text 
 * @returns 
 */
function fillWidgetText(widget, text) {
    switch (widget.type) {
        case "container":
            widget = { ...widget, child: fillWidgetText(widget.child, text) };
            break;
        case "text":
            widget = { ...widget, value: text };
            break;
        case "button":
            widget = { ...widget, text };
            break;
        default:
            console.error(`Not managed widget type ${widget.type}`);
    }
    return widget;
}

module.exports = {
    menu,
    ariane,
    arianeCategoryName: categoryName
}