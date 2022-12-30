const Category = require("../../classes/Category");
const Try = require("../../classes/Try");
const categoryService = require("../../services/categoryService");
const tryService = require("../../services/tryService");

function menu() {
    return {
        type: "view",
        name: "menu",
        // props: {
        //     mainAction: {
        //         text: "Save",
        //         // disabled: category.modifications.length == 0,
        //         onPressed: {
        //             action: 'Try',
        //             props: {
        //                 action: 'save'
        //             }
        //         }
        //     }
        // }
    }
}

/**
 * @param {*} param0 
 * @param {*} _props 
 * @returns 
 */
function content(_data, props) {
    return {
        type: "view",
        name: "editTry_contentWithCategory",
        query: {
            "$find": {
                "_datastore": categoryService.collName,
                "_refBy": {
                    "$contains": [props.state.try]
                }
            }
        },
        props: {
            try: props.state.try
        }
    }
}

/**
 * 
 * @param {Category[]} categories 
 * @param {*} props 
 */
function contentWithCategory(categories, props) {
    const category = categories[0];
    return {
        type: "flex",
        direction: "vertical",
        spacing: 2,
        padding: {
            left: 4,
            right: 4
        },
        children: [
            {
                type: "text",
                value: category.name,
                style: {
                    fontSize: 20,
                    fontWeight: "w700"
                }
            },
            {
                type: "flex",
                direction: "vertical",
                spacing: 2,
                children: category.fields.map((field, i) => {
                    return {
                        type: "flex",
                        direction: "vertical",
                        crossAxisAlignment: "stretch",
                        spacing: 1,
                        children: [
                            {
                                type: "text",
                                value: field.name
                            },
                            {
                                type: "flex",
                                direction: "horizontal",
                                crossAxisAlignment: "center",
                                spacing: 2,
                                children: [
                                    {
                                        type: "flexible",
                                        child: {
                                            type: "view",
                                            name: "editTry_tryField",
                                            query: {
                                                "$find": {
                                                    "_datastore": tryService.collName,
                                                    "_id": props.try
                                                }
                                            },
                                            props: {
                                                field: i
                                            }
                                        }
                                    },
                                    {
                                        type: "text",
                                        value: field.unit.name
                                    }
                                ]
                            }
                        ]
                    };
                })
            }
        ]
    }
}

/**
 * 
 * @param {Try[]} tries 
 * @param {*} props 
 * @returns 
 */
function tryField(tries, props) {
    const currentTry = tries[0];
    return {
        type: "textfield",
        value: currentTry.values[props.field] || "",
        onChanged: {
            action: "setTryField",
            props: {
                try: currentTry._id,
                field: props.field
            }
        }
    }
}

module.exports = {
    menu,
    content,
    contentWithCategory,
    tryField
}