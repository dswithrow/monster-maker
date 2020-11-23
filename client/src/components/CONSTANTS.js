const expTable = {
    cr: ["1/8", "1/6", "1/4", "1/3", "1/2",
        "1", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "11", "12", "13",
        "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "24", "25",
        "26", "27", "28", "29", "30"],
    totalXP: [50, 65, 100, 135, 200, 400, 600,
        800, 1200, 1600, 2400, 3200, 4800, 6400,
        9600, 12800, 19200, 25600, 38400, 51200,
        76800, 102400, 153600, 204800, 307200,
        409600, 614400, 819200, 1228800, 1638400,
        2457600, 3276800, 4915200, 6553600, 9830400],
    div1: /* For parties up to three */
        [15, 20, 35, 45, 65, 135, 200, 265, 400,
        535, 800, 1070, 1600, 2130, 3200, 4270, 6400,
        8530, 12800, 17100, 25600, 34100, 51200, 68300,
        102000, 137000, 205000, 273000, 410000, 546000,
        820000, 1092000, 1640000, 2184000, 3280000],
    div2: /* For parties of four or five */
        [15, 15, 25, 35, 50, 100, 150, 200, 300, 400, 600,
        800, 1200, 1600, 2400, 3200, 4800, 6400, 9600,
        12800, 19200, 25600, 38400, 51200, 76800, 102400,
        153600, 204800, 307200, 409600, 614400, 819200,
        1228800, 1638400, 2457600],
    div3: /* for parties exceeding six */
        [10, 10, 15, 25, 35, 65, 100, 135, 200, 265, 400,
        535, 800, 1070, 1600, 2130, 3200, 4270, 6400,
        8530, 12800, 17100, 25600, 34100, 51200, 68300,
        102400, 137000, 204800, 273000, 409600, 546000,
        819200, 1092000, 1638400]
}

export const getXP = (cr, playerCount = 1) => {
    let i = expTable.cr.indexOf(cr);
    if (i < 0) { return null }
    if (playerCount >= 6) { return expTable.div3[i]}
    if (playerCount >= 4) { return expTable.div2[i]}
    if (playerCount >= 2) { return expTable.div1[i]}
    return expTable.totalXP[i]
}

export const getHP = (dieCount, hd, bonus) => {
    let totalHP = bonus;
    hd.forEach( (hd, i) => totalHP += Math.floor((hd/2 + .5) * dieCount[i] ) );
    return totalHP;
}

export const getHD = dieCount => {
    return dieCount.reduce((sum, cur) => sum + cur)
}

export const highestSpeed = speed => {
    let highest = 0;

    highest = speed.land > highest ? speed.land : highest;
    highest = speed.swim > highest ? speed.swim : highest;
    highest = speed.burrow > highest ? speed.burrow : highest;
    if (speed.fly) {
        highest = speed.fly.speed > highest ? speed.fly.speed : highest;
    }
    console.log(highest)
    return highest;
}

export const bestFly = (fly1, fly2) => {
    let best = {speed: 0, maneuverability: ""};
    best.speed = Math.max(fly1.speed, fly2.speed)
    let scale = ["Clumsy", "Poor", "Average", "Good", "Perfect"];
    best.maneuverability = Math.max(scale.indexOf(fly1.maneuverability), scale.indexOf(fly2.maneuverability));
    best.maneuverability = scale[best.maneuverability];
    return best;
    
}

export const applyTemplates = (base, templates) => {
    let creature = JSON.parse(JSON.stringify(base));

    templates.forEach( template => {
        creature.name = `${ template.title } ${ creature.name }`;
        let totalHD = getHD(base.defense.hp.numOfDie);
        for (let i=template.cr.length-1; i>=0; i--) {
            if (totalHD >= template.cr[i].baseHD) {
                if (template.cr[i].crIncrease !== 0) {
                    creature.cr = eval(creature.cr) + template.cr[i].crIncrease;
                }
                if ((creature.cr % 1 !== 0 && creature.cr > 1)){
                    creature.cr = '' + Math.floor(creature.cr);
                }
                break;
            }
        }
        creature.cr = String(creature.cr)
        if (template.alignment) {
            creature.alignment.order = template.alignment.order ?? creature.alignment.order;
            creature.alignment.moral = template.alignment.moral ?? creature.alignment.moral;
        }
        if (template.sizeChange) {
            // ToDo
        }
        if (template.type) {
            if (!creature.type.includes(template.type)) {
                creature.type.push(template.type);
            }
        }
        if (template.subtype) {
            template.subtype.forEach( subtype => {
                if (!creature.subtype) { creature.subtype = template.subtype }
                else if (!creature.subtype.includes(subtype)) {
                    creature.subtype.push(subtype);
                }
            });
        }
        if (template.senses) {
            template.senses.forEach( sense => {
                if (!creature.senses.includes(sense)) {
                    creature.senses.push(sense);
                }
            });
        }
        if (template.defense) {
            if (template.defense.ac) {
                Object.keys(template.defense.ac).forEach( key => {
                    creature.defense.ac[key] += template.defense.ac[key];
                });
            }
            if (template.defense.hp) { creature.defense.hp.bonus += template.defense.hp }
            if (template.defense.saves) {
                Object.keys(template.defense.saves).forEach( key => {
                    creature.defense.saves[key] += template.defense.saves[key];
                });
            }
            if (template.defense.dr) {
                if (creature.defense.dr){
                    for (let i=template.defense.dr.length-1; i>=0; i--){
                        if (totalHD < template.defense.dr[i].baseHD) { continue }
                        template.defense.dr[i].break.forEach( (tDR, k) => {
                            creature.defense.dr.map( cDR => {
                                if (tDR === cDR.break) {
                                    cDR.dr = Math.max(cDR.dr, 
                                        template.defense.dr[i].dr[k]);
                                }
                            })
                        });
                        break;
                    }
                    
                } else {
                    creature.defense.dr = [];
                    for (let i=template.defense.dr.length-1; i>=0; i--){
                        if (totalHD < template.defense.dr[i].baseHD) { continue }
                        template.defense.dr[i].break.forEach( (tDR, k) => {
                            creature.defense.dr.push({  break: tDR,
                                                        dr: template.defense.dr[i].dr[k]})
                        });
                        break;
                    }
                    if (creature.defense.dr.length === 0) { creature.defense.dr = undefined }
                }
            }
            if (template.defense.sr) {
                if (template.defense.sr.perBaseHD) {
                    creature.defense.sr = Math.max(creature.defense.sr,
                        template.defense.sr.base + template.defense.sr.perBaseHD * totalHD)
                } else if (template.defense.sr.plusCR) {
                    creature.defense.sr = Math.max(creature.defense.sr,
                        Math.floor(eval(creature.cr)) + template.defense.sr.plusCR)
                }
            }
            if (template.defense.immune) {
                template.defense.immune.forEach( immune => {
                    if (!creature.defense.immune.includes(immune)) {
                        creature.defense.immune.push(immune);
                    }
                });
            }
            if (template.defense.resist) {
                if (creature.defense.resist){
                    for (let i=template.defense.resist.length-1; i>=0; i--){
                        if (totalHD < template.defense.resist[i].baseHD) { continue }
                        template.defense.resist[i].resist.forEach( (tRes, k) => {
                            let notThere = true;
                            creature.defense.resist.map( cRes => {
                                if (tRes === cRes.resist) {
                                    cRes.amount = Math.max(cRes.amount, 
                                        template.defense.resist[i].amount[k]);
                                    notThere = false;
                                }
                            });
                            if (notThere) {
                                creature.defense.resist.push({
                                    resist: tRes,
                                    amount: template.defense.resist[i].amount[k]
                                })
                            }
                        });
                        break;
                    }
                    
                } else {
                    creature.defense.resist = [];
                    for (let i=template.defense.resist.length-1; i>=0; i--){
                        if (totalHD < template.defense.resist[i].baseHD) { continue }
                        template.defense.resist[i].resist.forEach( (tRes, k) => {
                            creature.defense.resist.push({  resist: tRes,
                                                            amount: template.defense.resist[i].amount[k]})
                        });
                        break;
                    }
                    if (creature.defense.resist.length === 0) { creature.defense.resist = undefined }
                }
            }
            if (template.defense.weakness) {
                if (!creature.defense.weakness) { creature.defense.weakness = [] }
                template.defense.weakness.forEach( weakness => {
                    if (!creature.defense.weakness.includes(weakness)) {
                        creature.defense.weakness.push(weakness);
                    }
                });
                if (creature.defense.weakness.length === 0) {creature.defense.weakness = undefined}
            }
        }
        if (template.offense) {
            if (template.offense.speed) {
                Object.keys(template.offense.speed).forEach( key => {
                    if (key === "land"){
                        creature.offense.speed.land = Math.max( creature.offense.speed.land, template.offense.speed.land)
                    }
                    if (key === "burrow") {
                        if (template.offense.speed.burrow === 0) {
                            template.offense.speed.burrow = (highestSpeed(creature.offense.speed) / 2);
                        }
                        creature.offense.speed.burrow = Math.max( creature.offense.speed.burrow, template.offense.speed.burrow)
                    }
                    if (key === "swim") {
                        if (template.offense.speed.swim === 0) {
                            template.offense.speed.swim = highestSpeed(creature.offense.speed) + 10;
                        }
                        creature.offense.speed.swim = Math.max( creature.offense.speed.swim, template.offense.speed.swim)
                    }
                    if (key === "fly") {
                        if (template.offense.speed.fly.speed === 0) {
                            template.offense.speed.fly.speed = totalHD * 10;
                        }
                        if (creature.offense.speed.fly){
                            creature.offense.speed.fly = bestFly(creature.offense.speed.fly, template.offense.speed.fly);
                        } else {
                            creature.offense.speed.fly = template.offense.speed.fly;
                        }
                    }
                });
            }
            if (template.offense.attacks) {
                Object.keys(template.offense.attacks).forEach( key => {
                    creature.offense.attacks[key] += template.offense.attacks[key]
                });
            }
        }
        if (template.statistics) {
            Object.keys(template.statistics).forEach( key => {
                if (creature.statistics[key] >= template.statistics[key].threshold){
                    creature.statistics[key] += template.statistics[key].bonus
                }
            });
        }
        if (template.specialAbilities) {
            if (!creature.specialAbilities) { creature.specialAbilities = [] }
            for (let i=template.specialAbilities.length-1; i>=0; i--){
                if (totalHD < template.specialAbilities[i].baseHD) { continue }
                template.specialAbilities[i].name.forEach( (name, k) => {
                    creature.specialAbilities.push({
                        name: name,
                        effect: template.specialAbilities[i].effect[k]
                    })
                });
                break;
            }
            if (creature.specialAbilities.length === 0) { creature.specialAbilities = undefined }
        }
    });
    return creature;
}