const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Templates must be named"]
    },
    title: {
        type: String,
        required: [true, "Templates must have a title"]
    },
    cr: {
        type:[{
            baseHD: Number,
            crIncrease: Number
        }],
        required: [true, "Templates need a CR adjustment"]
    },
    alignment: {
        order: {
            type: String,
            default: undefined
        },
        moral: {
            type: String,
            default: undefined
        }
    },
    sizeChange: {
        type: Number,
        default: undefined
    },
    type: {
        type: String,
        default: undefined
    },
    subtype: {
        type: [String],
        default: undefined
    },
    senses: {
        type: [String],
        default: undefined
    },
    aura: {
        type: String,
        default: undefined
    },
    defense: {
        ac: {
            ac: {
                type: Number,
                default: undefined
            },
            touch: {
                type: Number,
                default: undefined
            },
            flatFooted: {
                type: Number,
                default: undefined
            }
        },
        hp: {
            type: Number,
            default: undefined
        },
        saves: {
            fort: {
                type: Number,
                default: undefined
            },
            ref: {
                type: Number,
                default: undefined
            },
            will: {
                type: Number,
                default: undefined
            },
            special: {
                type: [{
                    bonus: {
                        type: Number
                    },
                    throw: {
                        type: String
                    }
                }],
                default: undefined
            }
        },
        defensiveAbilities: {
            type: [String],
            default: undefined
        },
        dr: {
            type: [{
                baseHD: Number,
                dr: [Number],
                break: [String]
            }],
            default: undefined
        },
        sr: {
            base: Number,
            perBaseHD: Number,
            plusCR: Number
        },
        immune: {
            type: [String],
            default: undefined
        },
        resist: {
            type: [{
                baseHD: Number,
                resist: [String],
                amount: [Number]
            }],
            default: undefined
        },
        weakness: {
            type: [String],
            default: undefined
        }
    },
    offense: {
        speed: {
            land: {
                type: Number,
                default: undefined
            },
            swim: {
                type: Number,
                default: undefined
            },
            burrow: {
                type: Number,
                default: undefined
            },
            climb: {
                type: Number,
                default: undefined
            },
            fly: {
                speed: {
                    type: Number,
                    default: undefined
                },
                maneuverability: {
                    type: String,
                    default: undefined
                }
            }
        },
        attacks: {
            melee: {
                type: [String],
                default: undefined
            },
            ranged: {
                type: [String],
                default: undefined
            },
            special: {
                type: [String],
                default: undefined
            }
        }
    },
    statistics: {
        str: {
            bonus: Number,
            threshold: Number
        },
        dex: {
            bonus: Number,
            threshold: Number
        },
        con: {
            bonus: Number,
            threshold: Number
        },
        int: {
            bonus: Number,
            threshold: Number
        },
        wis: {
            bonus: Number,
            threshold: Number
        },
        cha: {
            bonus: Number,
            threshold: Number
        }
    },
    specialAbilities: {
        type: [{
            baseHD: Number,
            name: [String],
            effect: [String]
        }],
        default: undefined
    }
}, { timestamps: true });

const Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;