import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { getXP, getHP, applyTemplates } from './CONSTANTS';
import SpellList from './SpellList';
import SpellLikeAbilitiesList from './SpellLikeAbilitiesList';
import TemplateSelector from './TemplateSelector';

const BestiaryDetails = props => {
    const { id } = props;
    const [ base, setBase ] = useState({});
    const [ creature, setCreature ] = useState({});
    const [ templates, setTemplates ] = useState([]);
    const [ activeTemplates, setAT ] = useState([]);

    const setActiveTemplates = templateArray =>{
        setCreature(applyTemplates(base, templateArray));
        setAT(templateArray);
        console.log(base)
    }

    useEffect(() => {
        Axios.get("http://localhost:8000/api/monsters/" + id)
            .then(res => {
                setBase(res.data.monster);
                setCreature(res.data.monster);
            }).then( Axios.get("http://localhost:8000/api/templates/")
                    .then(res => {
                    setTemplates(res.data.templates)
            }))
    }, [id])

    return (
        <div className="row">
            <h2 className="font-weight-bold col text-center col-12">
                { creature.name }
                &emsp;CR { creature.cr }
            </h2>
            <TemplateSelector templates={templates} activeTemplates={activeTemplates} setActiveTemplates={setActiveTemplates}/>
            <div className="col-lg-4 offset-lg-2">
                <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Creature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">XP</th>
                            <td>{ getXP(creature.cr ?? "1/8").toLocaleString() }</td>
                        </tr>
                        <tr>
                            <th scope="row">Type</th>
                            <td>
                                {
                                    `${
                                        creature.alignment !== undefined ?
                                        creature.alignment.order === creature.alignment.moral ?
                                            "N" :
                                            creature.alignment.order + creature.alignment.moral :
                                        ''
                                    } ` + 
                                    `${ creature.size } ${ creature.type ? creature.type[0] : '' }
                                    ${ creature.subtype !== undefined ? '[' + creature.subtype.join(", ") + ']' : '' }` 
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Init</th>
                            <td>
                                { (creature.initiative > -1 ? '+' : '') + creature.initiative }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Senses</th>
                            <td>
                                { (creature.senses ? creature.senses.join(", ") + ", " : '') +
                                `Perception +${ creature.statistics ? creature.statistics.skills.perception : '' }` }
                            </td>
                        </tr>
                        {
                            creature.aura ? 
                            <tr>
                                <th scope="row">Aura</th>
                                <td>
                                    { creature.aura }
                                </td>
                            </tr> : ''
                        }
                    </tbody>
                </table>
                <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Defense</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">AC</th>
                            <td>
                            {
                                creature.defense ?
                                <ul className="list-unstyled mb-0">
                                    <li>{ creature.defense.ac.ac }</li>
                                    <li>{ creature.defense.ac.touch } (Touch)</li>
                                    <li>{ creature.defense.ac.flatFooted } (Flat-Footed)</li>
                                </ul> : ''
                            }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">HP</th>
                            <td>
                            {
                                creature.defense ?
                                (
                                    getHP(creature.defense.hp.numOfDie, creature.defense.hp.hitDie, creature.defense.hp.bonus).toLocaleString() +
                                    ` (${ creature.defense.hp.numOfDie.map( (num, i) => 
                                            `${ i > 0 ? ' + ' : ''}${ num }d${ creature.defense.hp.hitDie[i] }`
                                        )} ${ creature.defense.hp.bonus < 0 ? `- ${ creature.defense.hp.bonus * -1 }` : `+ ${ creature.defense.hp.bonus }` })`
                                ) : ''
                            }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Saves</th>
                            <td>
                            {
                                creature.defense ?
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <span className="font-weight-bold">Fort</span>
                                        { (creature.defense.saves.fort < 0 ? ' -' : ' +') + Math.abs(creature.defense.saves.fort) }
                                    </li>
                                    <li>
                                        <span className="font-weight-bold">Ref</span>
                                        { (creature.defense.saves.ref < 0 ? ' -' : ' +') + Math.abs(creature.defense.saves.ref) }
                                    </li>
                                    <li>
                                        <span className="font-weight-bold">Will</span>
                                        { (creature.defense.saves.will < 0 ? ' -' : ' +') + Math.abs(creature.defense.saves.will) }
                                    </li>
                                </ul> : ''
                            }
                            </td>
                        </tr>
                        {
                            creature.defense && creature.defense.defensiveAbilities ?
                            <tr>
                                <th scope="row">Defensive<br/>Abilities</th>
                                <td>
                                <ul className="list-unstyled mb-0">
                                    {
                                    creature.defense.defensiveAbilities.map( (abl, i) => 
                                        <li key={i}>{ abl }</li>
                                    )
                                    }
                                </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.defense && creature.defense.dr ?
                            <tr>
                                <th scope="row">DR</th>
                                <td>
                                <ul className="list-unstyled mb-0">
                                    {
                                    creature.defense.dr
                                    .map((dr, i) => <li key={i}>{ dr.dr + '/' + dr.break }</li>)
                                    }
                                </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.defense && creature.defense.sr ?
                            <tr>
                                <th scope="row">SR</th>
                                <td>
                                { creature.defense.sr }
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.defense && creature.defense.immune ?
                            <tr>
                                <th scope="row">Immune</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                        {
                                        creature.defense.immune
                                        .map((immune, i) => <li key={i}>{ immune }</li>)
                                        }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.defense && creature.defense.resist ?
                            <tr>
                                <th scope="row">Resist</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                        {
                                        creature.defense.resist
                                        .map((resist, i) => <li key={i}>{ resist.resist + ' ' + resist.amount }</li>)
                                        }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.defense && creature.defense.weakness ?
                            <tr>
                                <th scope="row">Weakness</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                        {
                                        creature.defense.weakness
                                        .map((weakness, i) => <li key={i}>{ weakness }</li>)
                                        }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                    </tbody>
                </table>
                <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Offense</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Speed</th>
                            <td>
                                <ul className="list-unstyled mb-0">
                                {
                                creature.offense && creature.offense.speed.land ?
                                <li>{ creature.offense.speed.land + ' ft.' }</li> : ''
                                }
                                {
                                creature.offense && creature.offense.speed.swim ?
                                <li>{ creature.offense.speed.swim + ' ft. (Swim)' }</li> : ''
                                }
                                {
                                creature.offense && creature.offense.speed.burrow ?
                                <li>{ creature.offense.speed.burrow + ' ft. (Burrow)' }</li> : ''
                                }
                                {
                                creature.offense && creature.offense.speed.fly ?
                                <li>{ creature.offense.speed.fly.speed + ' ft. (Fly, ' + creature.offense.speed.fly.maneuverability + ')' }</li> : ''
                                }
                                </ul>
                            </td>
                        </tr>
                        {
                            creature.offense && creature.offense.attacks.melee ?
                            <tr>
                                <th scope="row">Melee</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        creature.offense.attacks.melee.map(
                                            (attack, i) =>
                                            <li key={i}>{ attack }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.offense && creature.offense.attacks.ranged ?
                            <tr>
                                <th scope="row">Ranged</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        creature.offense.attacks.ranged.map(
                                            (attack, i) =>
                                            <li key={i}>{ attack }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.offense && creature.offense.attacks.special ?
                            <tr>
                                <th scope="row">Special</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        creature.offense.attacks.special.map(
                                            (attack, i) =>
                                            <li key={i}>{ attack }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        <tr>
                            <th scope="row">Space</th>
                            <td>{ creature.offense ? (creature.offense.space == 0.5 ? "1/2" : creature.offense.space == 2.5 ? "2-1/2" : creature.offense.space) + ' ft.' : '' }</td>
                        </tr>
                        <tr>
                            <th scope="row">Reach</th>
                            <td>{ creature.offense ? creature.offense.reach + ' ft.' : '' }</td>
                        </tr>
                    </tbody>
                </table>
                {
                    creature.offense && creature.offense.spells ?
                    <SpellList spells={ creature.offense.spells }/> : ''
                }
                {
                    creature.offense && creature.offense.spellLikeAbilities ?
                    <SpellLikeAbilitiesList spells={ creature.offense.spellLikeAbilities }/> : ''
                }
            </div>
            <div className="col-lg-4">
            <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Statistics</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Str</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.str > 0 ?
                                    creature.statistics.str
                                    : '–'
                                : ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Dex</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.dex > 0 ?
                                    creature.statistics.dex
                                    : '–'
                                : ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Con</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.con > 0 ?
                                    creature.statistics.con
                                    : '–'
                                : ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Int</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.int > 0 ?
                                    creature.statistics.int
                                    : '–'
                                : ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Wis</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.wis > 0 ?
                                    creature.statistics.wis
                                    : '–'
                                : ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Cha</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.cha > 0 ?
                                    creature.statistics.cha
                                    : '–'
                                : ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">BAB</th>
                            <td>{ creature.statistics ? creature.statistics.bab : '' }</td>
                        </tr>
                        <tr>
                            <th scope="row">CMB</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.cmb > 0 ?
                                    '+' + creature.statistics.cmb
                                    : creature.statistics.cmb
                                : ''
                                }
                                {
                                creature.statistics && creature.statistics.cmbSpecial ?
                                <ul className="list-unstyled mb-0">
                                    {
                                    creature.statistics.cmbSpecial.map(
                                    (special, i) =>
                                    <li key={i}>({ special })</li>
                                    )
                                    }
                                </ul> : ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">CMD</th>
                            <td>
                                {
                                creature.statistics ?
                                creature.statistics.cmd > 0 ?
                                    '+' + creature.statistics.cmd
                                    : creature.statistics.cmd
                                : ''
                                }
                                {
                                creature.statistics && creature.statistics.cmdSpecial ?
                                <ul className="list-unstyled mb-0">
                                    {
                                    creature.statistics.cmdSpecial.map(
                                    (special, i) =>
                                    <li key={i}>({ isNaN(special[0]) ? special : '+' + special })</li>
                                    )
                                    }
                                </ul> : ''
                                }
                            </td>
                        </tr>
                        {
                            creature.statistics && creature.statistics.feats ?
                            <tr>
                                <th scope="row">Feats</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                    creature.statistics.feats.map(
                                        (feat, i) =>
                                        <li key={i}>{ feat }</li>
                                    )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            creature.statistics && creature.statistics.languages ?
                            <tr>
                                <th scope="row">Languages</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                    creature.statistics.languages.map(
                                        (language, i) =>
                                        <li key={i}>{ language }</li>
                                    )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                    </tbody>
                </table>
                <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        creature.statistics ?
                        Object.keys(creature.statistics.skills).map(
                            (skill, i) =>
                            <tr key={i}>
                                <th scope="row" className="text-capitalize">{ skill }</th>
                                <td>{ '+' + creature.statistics.skills[skill] }</td>
                            </tr>
                        ) : ''
                        }
                    </tbody>
                </table>
                    
                    {
                        creature.specialAbilities ?
                    <>
                    <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                    <tr>
                        <th>Special Abilities</th>
                    </tr>
                    </thead>
                    {
                    creature.specialAbilities.map(
                        (ability, i) =>
                        <>
                        <thead key={i+'n'}><tr><th>{ ability.name }</th></tr></thead>
                        <tbody key={i+'e'}><tr><td>{ ability.effect }</td></tr></tbody>
                        </>
                    )
                    }
                    </table>
                    </> : ''
                    }
                <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Ecology</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    creature.ecology ?
                    <>
                    <tr>
                        <th>Environment</th>
                        <td>
                            <ul className="list-unstyled mb-0">
                            {
                                creature.ecology.environment.map(
                                    (eco, i) =>
                                    <li key={i}>{ eco.includes(' ') || eco === "Any" ? eco : "Any " + eco }</li>
                                )
                            }
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Organization</th>
                        <td>{ creature.ecology.organization }</td>
                    </tr>
                    <tr>
                        <th>Treasure</th>
                        <td>
                            <ul className="list-unstyled mb-0 text-capitalize">
                            {
                                creature.ecology.treasure.map(
                                    (loot, i) =>
                                    <li key={i}>{ loot }</li>
                                )
                            }
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{ creature.ecology.description }</td>
                    </tr>
                    </> : ''
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BestiaryDetails
