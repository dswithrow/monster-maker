const mongoose = require("mongoose");

const MonsterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Bestiary entries must be named"]
    },
    cr: {
        type: String,
        required: [true, "Bestiary entries need a CR"]
    },
    alignment: {
        order: {
            type: String,
            required: [true, "Bestiary entries need a Lawful-Neutral-Chaotic alignment"]
        },
        moral: {
            type: String,
            required: [true, "Bestiary entries need a Good-Neutral-Evil alignment"]
        }
    },
    size: {
        type: String,
        required: [true, "Bestiary entries need a size"]
    },
    type: {
        type: [String],
        required: [true, "Bestiary entries need at least one type"],
        default: undefined
    },
    subtype: {
        type: [String],
        default: undefined
    },
    initiative: {
        type: Number,
        required: [true, "Bestiary entries need an initiative"]
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
                required: [true, "Bestiary entries need an AC"],
                min: 0
            },
            touch: {
                type: Number,
                required: [true, "Bestiary entries need a touch AC"],
                min: 0
            },
            flatFooted: {
                type: Number,
                required: [true, "Bestiary entries need a flat-footed AC"],
                min: 0
            }
        },
        hp: {
            hitDie: {
                type: [Number],
                required: [true, "Bestiary entries need a hit die size"]
            },
            numOfDie: {
                type: [Number],
                required: [true, "Bestiary entries need at least on hit die per size"]
            },
            bonus: {
                type: Number,
                required: [true, "Bestiary entries need an HP bonus, even if it is 0."]

            }
        },
        saves: {
            fort: {
                type: Number,
                required: [true, "Bestiary entries need a fortitude save"],
                min: 0
            },
            ref: {
                type: Number,
                required: [true, "Bestiary entries need a reflex save"],
                min: 0
            },
            will: {
                type: Number,
                required: [true, "Bestiary entries need a will save"],
                min: 0
            },
            special: {
                type: [new mongoose.Schema({
                    bonus: {
                        type: Number
                    },
                    throw: {
                        type: String
                    }
                })],
                default: undefined
            }
        },
        defensiveAbilities: {
            type: [String],
            default: undefined
        },
        dr: {
            type: [{
                dr: Number,
                break: String
            }],
            default: undefined
        },
        sr: {
            type: Number,
            default: undefined
        },
        immune: {
            type: [String],
            default: undefined
        },
        resist: {
            type: [{
                resist: String,
                amount: Number
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
        },
        spells: {
            cl: {
                type: Number,
                default: undefined
            },
            concentration: {
                type: Number,
                default: undefined
            },
            "0": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "1": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "2": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "3": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "4": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "5": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "6": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "7": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "8": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            },
            "9": {
                perDay: {
                    type: Number,
                    min: -1,
                    default: undefined
                },
                known: {
                    type: [String],
                    default: undefined
                }
            }
        },
        spellLikeAbilities: {
            cl: {
                type: Number,
                default: undefined
            },
            concentration: {
                type: Number,
                default: undefined
            },
            constant: {
                type: [String],
                default: undefined
            },
            perDay: {
                type: Map,
                of: [String]
            }
        },
        space: {
            type: Number,
            required: [true, "Bestiary entries needs a space size"]
        },
        reach: {
            type: Number,
            required: [true, "Bestiary entries needs a reach length"]
        }
    },
    statistics: {
        str: {
            type: Number,
            min: 0,
            required: [true, "Bestiary entries need a strength score"]
        },
        dex: {
            type: Number,
            min: 1,
            required: [true, "Bestiary entries need a dexterity score"]
        },
        con: {
            type: Number,
            min: 0,
            required: [true, "Bestiary entries need a consitution score"]
        },
        int: {
            type: Number,
            min: 0,
            required: [true, "Bestiary entries need a intelligence score"]
        },
        wis: {
            type: Number,
            min: 1,
            required: [true, "Bestiary entries need a wisdom score"]
        },
        cha: {
            type: Number,
            min: 1,
            required: [true, "Bestiary entries need a charisma score"]
        },
        bab: {
            type: Number,
            required: [true, "Bestiary entries need a base attack bonus"]
        },
        cmb: {
            type: Number,
            required: [true, "Bestiary entries need a combat maneuver bonus"]
        },
        cmbSpecial: {
            type: [String],
            default: undefined
        },
        cmd: {
            type: Number,
            required: [true, "Bestiary entries need a combat maneuver defense"]
        },
        cmdSpecial: {
            type: [String],
            default: undefined
        },
        feats: {
            type: [String],
            default: undefined
        },
        skills: {
            type: Map,
            of: Number
        },
        languages: {
            type: [String],
            default: undefined
        }
    },
    specialAbilities: {
        type: [{
            name: String,
            effect: String
        }],
        default: undefined
    },
    ecology: {
        environment: [String],
        organization: String,
        treasure: [String],
        description: String
    }
}, { timestamps: true });

const Monster = mongoose.model("Monster", MonsterSchema);

module.exports = Monster;