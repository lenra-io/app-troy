module.exports = class Category {
    constructor(title, description, lastStatus, instances, fields) {
        this.title = title;
        this.description = description;
        this.lastStatus = lastStatus;
        this.instances = instances;
        this.fields = fields;
    }

    toJSON() {
        return {
            type: "container",
            decoration: {
                color: 0xFFFFFFFF,
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
                boxShadow: {
                    blurRadius: 10,
                    offset: {
                        dx: 4,
                        dy: 4
                    },
                    color: 0x1A000000
                },
            },
            child: {
                type: "flex",

                spacing: 2,
                mainAxisAlignment: "spaceEvenly",
                direction: "vertical",
                padding: {
                    left: 2,
                    right: 2
                },
                children: [
                    {
                        type: "flex",
                        direction: "horizontal",
                        spacing: 1,
                        crossAxisAlignment: "center",
                        children: [
                            {
                                type: "image",
                                path: "try_image_placeholder.png"
                            },
                            {
                                type: "text",
                                value: this.title,
                                style: {
                                    fontSize: 20,
                                    fontWeight: "w700"
                                }
                            },
                        ]
                    },
                    {
                        type: "flex",
                        mainAxisAlignment: "spaceAround",
                        direction: "vertical",
                        spacing: 1,
                        children: [],//this.fields.map(function (field) { return { type: field.name, value: field.value }; }),
                    },
                    this.lastStatus.toJSON()
                ]
            }
        };
    }
}