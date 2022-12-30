const User = require('../../classes/User.js');
const userService = require('../../services/userService.js');

const modalName = "createCategory";

function content(user, { state }) {
    return {
        type: "container",
        constraints: { maxWidth: 600 },
        child: {
            type: 'flex',
            direction: 'vertical',
            spacing: 2,
            children: [
                {
                    type: 'text',
                    value: 'New Category',
                    style: {
                        fontSize: 20,
                        fontWeight: "w700"
                    }
                },
                {
                    type: "textfield",
                    value: state.categoryName || '',
                    onChanged: {
                        action: "setStateProperty",
                        props: {
                            property: "categoryName"
                        }
                    }
                },
                {
                    type: 'flex',
                    direction: 'horizontal',
                    mainAxisAlignment: "end",
                    fillParent: true,
                    children: [
                        {
                            type: "button",
                            text: 'Create',
                            disabled: !state.categoryName,
                            onPressed: {
                                action: "createCategory"
                            }
                        }
                    ]
                }
            ]
        }
    }
}

module.exports = {
    content
};