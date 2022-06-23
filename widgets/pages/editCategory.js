const Category = require('../../classes/Category.js');
const Unit = require('../../classes/Unit.js');
const categoryService = require('../../services/categoryService.js');
const unitList = Unit.list;

function menu(_data, props) {
    return {
        type: "widget",
        name: "editCategory_menuSave",
        query: {
            "$find": {
                "_datastore": categoryService.datastoreName,
                "_id": props.state.category
            }
        }
    };
}

/**
 * @param {Category[]} categories 
 * @returns 
 */
function menuSave(categories, props) {
    const category = categories[0];
    return {
        type: "widget",
        name: "menu",
        props: {
            mainAction: {
                text: "Save",
                disabled: category.modifications.length == 0,
                onPressed: {
                    action: 'saveCategory',
                    props: {
                        categoryId: category._id
                    }
                }
            }
        }
    }
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return {
        type: "widget",
        name: "editCategory_category",
        query: {
            "$find": {
                "_datastore": categoryService.datastoreName,
                "_id": state.category
            }
        }
    };
}

/**
 * 
 * @param {Category[]} categories 
 * @param {*} props 
 * @returns 
 */
function category(categories, props) {
    const category = categories[0];
    const nameErrors = {},
        fieldListErrors = [],
        fieldsErrors = {};
    if (category.errors && category.errors.length) {
        // nameErrors = category.errors.filter(er => er.target == "name");
        fieldListErrors.push.apply(fieldListErrors, category.errors.filter(er => er.target == "fields"));
        category.errors
            .filter(er => er.target.startsWith("fields."))
            .forEach(er => {
                let target = er.target.substring("fields.".length).split(".");
                let fEr = fieldsErrors[target[0]];
                if (!fEr)
                    fEr = fieldsErrors[target[0]] = {};
                if (!fEr[target[1]])
                    fEr[target[1]] = [];
                fEr[target[1]].push(er.message);
            });
    }
    let name = category.name;
    let modification = category.modifications.find(m => m.property == 'name');
    if (modification)
        name = modification.data;
    let description = category.description || "";
    modification = category.modifications.find(m => m.property == 'description');
    if (modification)
        description = modification.data;
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
                crossAxisAlignment: "stretch",
                spacing: 2,
                children: [
                    {
                        type: "flex",
                        direction: "vertical",
                        // crossAxisAlignment: "stretch",
                        spacing: 1,
                        children: [
                            {
                                type: "text",
                                value: "Name"
                            },
                            {
                                type: "textfield",
                                value: name,
                                onChanged: {
                                    action: "setCategoryProperty",
                                    props: {
                                        categoryId: category._id,
                                        property: "name"
                                    }
                                }
                            },
                            // ...nameErrors
                        ]
                    },
                    {
                        type: "textfield",
                        // hintText: "Description",
                        value: description,
                        minLines: 3,
                        maxLines: 3,
                        onChanged: {
                            action: "setCategoryProperty",
                            props: {
                                categoryId: category._id,
                                property: "description"
                            }
                        }
                    },
                    ...category.fields.map(field => fieldUI(category, field)),
                    ...category.modifications
                        .filter(m => m.action == 'add' && m.property == 'fields')
                        .map(m => {
                            return fieldUI(category, {
                                ...m.data,
                                id: m.id
                            }, true);
                        })
                ]
            },
            {
                type: "flex",
                fillParent: true,
                mainAxisAlignment: "end",
                children: [
                    {
                        type: "button",
                        text: "Add field",
                        onPressed: {
                            action: 'addCategoryField',
                            props: {
                                categoryId: category._id
                            }
                        }
                    }
                ]
            },

        ]
    };
}

/**
 * 
 * @param {Category} category 
 * @param {Category.Field} field 
 * @param {*} editable 
 * @returns 
 */
function fieldUI(category, field, editable) {
    var fieldErrors = [];
    (category.errors).forEach(err => {
        if (err.target.split('.')[1] == field.id) {
            fieldErrors.push(err);
        }
    });
    return {
        type: "flex",
        direction: "vertical",
        children: [
            {
                type: "flex",
                crossAxisAlignment: "center",
                fillParent: true,
                spacing: 2,
                children: [
                    {
                        type: "flexible",
                        fit: "tight",
                        flex: 1,
                        child: {
                            type: "textfield",
                            enabled: !!editable,
                            // hintText: "Field name",
                            value: field.name || "",
                            onChanged: {
                                action: "setCategoryFieldName",
                                props: {
                                    categoryId: category._id,
                                    fieldId: field.id
                                }
                            }
                        }
                    },
                    {
                        type: "dropdownButton",
                        text: field.unit ? `${field.unit.name} (${field.unit.shortName})` : 'Choose unit',
                        mainStyle: "secondary",
                        disabled: !editable,
                        // icon: "expand_more",
                        child: {
                            type: "menu",
                            children:
                                unitList.map((unit) => {
                                    return {
                                        type: "menuItem",
                                        text: `${unit.name} (${unit.shortName})`,
                                        onPressed: {
                                            action: "setCategoryFieldUnit",
                                            props: {
                                                categoryId: category._id,
                                                fieldId: field.id,
                                                unit: unit,
                                            }
                                        }
                                    }
                                }),
                        }
                    },
                    {
                        type: "button",
                        mainStyle: "tertiary",
                        text: "X",
                        disabled: !editable,
                        onPressed: {
                            action: "removeCategoryField",
                            props: {
                                categoryId: category._id,
                                fieldId: field.id
                            }
                        }
                    }
                ]
            },
            ...fieldErrors.map(err => {
                return {
                    type: "container",
                    padding: {
                        top: 0.5,
                        left: 0.5,
                        bottom: 0.5,
                        right: 0.5
                    },
                    child: {
                        type: "text",
                        value: err.message + " !",
                        style: {
                            color: 0xFFFF5555,
                        }
                    }
                }
            }),
        ]
    };
}

module.exports = {
    menu,
    menuSave,
    content,
    category
}