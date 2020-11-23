import React, { useState } from 'react'

import { getXP } from './CONSTANTS';
import AlignmentSquare from './AlignmentSquare';
import CRForm from './CRForm';
import InputTextToArray from './InputTextToArray';
import HitDieForm from './HitDieForm';

const BestiaryEntryForm = () => {
    const [ name, setName ] = useState("");
    const [ cr, setCR ] = useState("");
    const [ alignment, setAlignment ] = useState({});
    const [ size, setSize ] = useState("Medium");
    const [ type, setType ] = useState("");
    const [ subtype, setSubtype ] = useState([]);
    const [ init, setInit ] = useState(0);
    const [ senses, setSenses ] = useState([]);
    const [ aura, setAura ] = useState("");
    const [ ac, setAC ] = useState({
        ac: 0,
        touch: 0,
        flatFooted: 0
    });
    const [ hp, setHP ] = useState({
        hitDie: [1],
        numOfDie: [8],
        bonus: 0
    });
    const [ saves, setSaves ] = useState({
        fort: 0,
        ref: 0,
        will: 0,
        special: []
    });
    const [ defensiveAbilities, setDefensiveAbilities ] = useState([]);
    const [ dr, setDR ] = useState([]);
    const [ sr, setSR ] = useState(0);
    const [ immune, setImmune ] = useState([]);
    const [ resist, setResist ] = useState([]);
    const [ weakness, setWeakness ] = useState([]);
    const [ speed, setSpeed ] = useState({
        land: 0,
        swim: 0,
        burrow: 0,
        climb: 0,
        fly:{
            speed: 0,
            maneuverability: ""
        }
    });
    const [ melee, setMelee ] = useState([]);
    const [ ranged, setRanged ] = useState([]);
    const [ special, setSpecial ] = useState([]);
    const [ spells, setSpells ] = useState({
        cl: 0,
        concentration: 0,
        baseDC: 0,
        castingStat: ""
    });
    const [ spellLikeAbilities, setSpellLikeAbilities ] = useState({
        cl: 0,
        concentration: 0,
        baseDC: 0,
        castingStat: ""
    });
    const [ space, setSpace ] = useState(0);
    const [ reach, setReach ] = useState(0);
    const [ str, setStr ] = useState(0);
    const [ dex, setDex ] = useState(0);
    const [ con, setCon ] = useState(0);
    const [ int, setInt ] = useState(0);
    const [ wis, setWis ] = useState(0);
    const [ cha, setCha ] = useState(0);
    const [ bab, setBAB ] = useState(0);
    const [ cmb, setCMB ] = useState(0);
    const [ cmbSpecial, setCMBSpecial ] = useState([]);
    const [ cmd, setCMD ] = useState(0);
    const [ cmdSpecial, setCMDSpecial ] = useState([]);
    const [ feats, setFeats ] = useState([]);
    const [ skills, setSkills ] = useState({});
    const [ languages, setLanguages ] = useState([]);
    const [ specialAbilities, setSpecialAbilities ] = useState([]);
    const [ environment, setEnvironment ] = useState([]);
    const [ organization, setOrganization ] = useState("");
    const [ treasure, setTreasure ] = useState([]);
    const [ description, setDescription ] = useState("");

    return (
        <>
        <form>
            <div className="row">
                <div className="col-4 offset-2 border-right">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={ name } required
                            onChange={ e => setName(e.target.value) }/>
                    </div>
                    <div className="form-row">
                        <div className="col-6">
                            <CRForm cr={ cr } setCR={ setCR }/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="xp">XP</label>
                            <input type="text" className="form-control" id="xp" value={ getXP(cr) } disabled/>
                        </div>
                    </div>
                    <AlignmentSquare  alignment={ alignment } setAlignment={ setAlignment }/>
                    <div className="form-group">
                        <label htmlFor="size">Size</label>
                        <select name="size" id="size" value={ size } onChange={ e => setSize(e.target.value) }>
                            { ["Diminutive", "Tiny", "Small",
                                "Medium", "Large", "Huge", "Gargantuan"].map(
                                    (s, i) => <option value={ s } key={ i }>{ s }</option>
                                ) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <InputTextToArray id="type" items="types" state={ type } setState={ setType }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtype">Subtype</label>
                        <InputTextToArray id="subtype" items="subtypes" state={ subtype } setState={ setSubtype }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="senses">Senses</label>
                        <InputTextToArray id="senses" items="senses" state={ senses } setState={ setSenses }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="aura">Aura</label>
                        <input type="text" className="form-control" id="aura" value={ aura }/>
                    </div>
                    <hr/>
                        <h6>Defense</h6>
                    <hr/>
                    <div className="form-row">
                        <div className="col-4">
                            <label htmlFor="ac">AC</label>
                            <input type="number" className="form-control" id="ac" value={ ac.ac }
                                onChange={ e => setAC({ ...ac, ac: e.target.value }) }/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="touch">Touch</label>
                            <input type="number" className="form-control" id="touch" value={ ac.touch }
                                onChange={ e => setAC({ ...ac, touch: e.target.value }) }/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="flatFooted">Flat-Footed</label>
                            <input type="number" className="form-control" id="flatFooted" value={ ac.flatFooted }
                                onChange={ e => setAC({ ...ac, flatFooted: e.target.value }) }/>
                        </div>
                    </div>
                    <HitDieForm hp={ hp } setHP={ setHP }/>
                </div>
            </div>
        </form>
        </>
    )
}

export default BestiaryEntryForm
