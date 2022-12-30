const Category = require('../../classes/Category.js');
const Try = require('../../classes/Try.js');
const categoryService = require('../../services/categoryService.js');
const tryService = require('../../services/tryService.js');

/**
 * @param {any[]} children The card children
 * @param {any} actions Actions of the card
 * @returns 
 */
function card(children, actions, actionProps) {
    let child = {
        type: "flex",
        spacing: 2,
        mainAxisAlignment: "spaceEvenly",
        direction: "vertical",
        padding: {
            left: 2,
            right: 2
        },
        children
    };
    if (actions) {
        if (actionProps) {
            actions = Object.fromEntries(Object.entries(actions).map(([key, value]) => {
                const newValue = {
                    ...value,
                    props: {
                        ...value.props,
                        ...actionProps
                    }
                }
                return [key, newValue]
            }));
        }
        child = {
            ...actions,
            type: "actionable",
            child
        };
    }
    return {
        type: "container",
        border: {
            top: {
                width: 0.5,
                color: 0xFFDCE0E7
            },
            left: {
                width: 0.5,
                color: 0xFFDCE0E7
            },
            bottom: {
                width: 0.5,
                color: 0xFFDCE0E7
            },
            right: {
                width: 0.5,
                color: 0xFFDCE0E7
            }
        },
        decoration: {
            color: 0xFFFFFFFF,
            boxShadow: {
                blurRadius: 10,
                offset: {
                    dx: 4,
                    dy: 4
                },
                color: 0x1A000000
            },
        },
        child
    };
}

/**
 * @param {Try[]} tries 
 * @param {*} props 
 * @returns 
 */
function tryCard(tries, props) {
    console.log("tryCard", tries);
    const currentTry = tries[0];
    props = props || {};
    props.try = currentTry;
    return {
        type: "view",
        name: "tryCardWithCategory",
        query: {
            "$find": {
                "_datastore": categoryService.datastoreName,
                "_refBy": {
                    "$contains": currentTry._id
                }
            }
        },
        props
    }
}

/**
 * @param {Category[]} categories
 * @param {*} props 
 * @returns 
 */
function tryCardWithCategory(categories, props) {
    const category = categories[0];
    const currentTry = props.try;
    const date = new Date(currentTry.date);
    return {
        type: 'flex',
        direction: 'vertical',
        spacing: 1,
        children: [
            {
                type: 'text',
                value: date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR')
            },
            card(
                [
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
                        mainAxisAlignment: "spaceAround",
                        direction: "vertical",
                        spacing: 1,
                        children: currentTry.values.map((x, i) => ({
                            type: "text",
                            value: `${category.fields[i].name}: ${x}${category.fields[i].unit.shortName}`
                        }))
                    },
                    statusSticker(currentTry.status)
                ],
                props.actions,
                { try: currentTry._id }
            )
        ]
    };
}

/**
 * @param {Category[]} categories 
 * @param {*} props 
 * @returns 
 */
function categoryCard(categories, props) {
    const category = categories[0];
    const children = [
        {
            type: "text",
            value: category.name,
            style: {
                fontSize: 20,
                fontWeight: "w700"
            }
        }
    ];
    if (category.description) {
        children.push({
            type: "text",
            value: category.description
        });
    }
    children.push({
        type: "view",
        name: "categoryCardDetails",
        props: {
            fieldsNumber: category.fields.length
        },
        query: {
            "$find": {
                "_datastore": tryService.datastoreName,
                "_refs": {
                    "$contains": category._id
                }
            }
        }
    });
    return card(children, props.actions, { category: category._id });
}

/**
 * 
 * @param {Try[]} tries 
 * @param {*} props 
 * @returns 
 */
function categoryCardDetails(tries, props) {
    return {
        type: "flex",
        fillParent: true,
        mainAxisAlignment: "spaceBetween",
        children: [
            {
                type: "text",
                value: `${props.fieldsNumber} champs - ${tries.length} instances`,
                style: {
                    fontSize: 12,
                    color: 0xFF7A8598,
                }
            },
            statusSticker(
                tries
                    .filter(t => t.status)
                    .map(t => Try.statusList.indexOf(t.status))
                    .filter(pos => pos != -1)// Just in case
                    .sort()
                    .map(pos => Try.statusList[pos])
                    .find(status => status)
            )
        ]
    }
}

function statusSticker(status) {
    let stickerStatus;
    let text;
    switch (status) {
        case "good":
            stickerStatus = "success";
            text = "Good";
            break;
        case "ok":
            stickerStatus = "warning";
            text = "OK";
            break;
        case "bad":
            stickerStatus = "error";
            text = "Bad";
            break;
        default:
            stickerStatus = "pending";
            text = "No data";
            break;
    }
    return {
        type: "flex",
        spacing: 1,
        fillParent: true,
        mainAxisAlignment: "end",
        crossAxisAlignment: "center",
        children: [
            {
                type: "statusSticker",
                status: stickerStatus
            },
            {
                type: "text",
                value: text
            }
        ]
    };
}

module.exports = {
    tryCard,
    tryCardWithCategory,
    categoryCard,
    categoryCardDetails,
}