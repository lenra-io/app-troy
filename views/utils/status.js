module.exports = class Status {
    constructor(status) {
        this.status = status;
    }

    get text() {
        switch (this.status) {
            case "success":
                return "Good";
            case "warning": 
                return "Acceptable";
            case "error":
                return "Bad";
            default:
                return "Status unknown";
        }
    }

    toJSON() {
        return {
            type: "flex",
            spacing: 1,
            fillParent: true,
            mainAxisAlignment: "end",
            crossAxisAlignment: "center",
            children: [
                {
                    type: "statusSticker",
                    status: this.status
                },
                {
                    type: "text",
                    value: text()
                }
            ]
        };
    }
}