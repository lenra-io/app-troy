function all(value) {
    return {
        top: value,
        bottom: value,
        left: value,
        right: value
    }
}

function paddingSymmetric(horizontal, vertical) {
    return {
        top: vertical,
        bottom: vertical,
        left: horizontal,
        right: horizontal
    }
}

function radiusPoint(value) {
    return {
        x: value,
        y: value
    }
}

function borderRadiusAll(value) {
    return {
        topLeft: radiusPoint(value),
        topRight: radiusPoint(value),
        bottomRight: radiusPoint(value),
        bottomLeft: radiusPoint(value)
    }
}

module.exports = {
    padding: {
        all,
        symmetric: paddingSymmetric
    },
    border: {
        all
    },
    borderRadius: {
        all: borderRadiusAll
    }
}