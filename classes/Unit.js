module.exports = class Unit {
    constructor(name, shortName) {
        this.name = name;
        this.shortName = shortName;
    }

    static list = [
        new Unit("Kilograms", "kg"),
        new Unit("Grams", "g"),
        new Unit("Liters", "l"),
        new Unit("Milliliters", "ml"),
        new Unit("Seconds", "s"),
        new Unit("Minutes", "min"),
        new Unit("Hours", "h"),
    ]
}