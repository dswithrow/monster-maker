import React, { useState } from 'react'

const HDInput = props => {
    const { index, hp, setHP } = props;

    const numOfDieHandler = e => {
        let dieCount = e.target.value;
        if (isNaN(dieCount)) { return }
        if (dieCount < 1) { dieCount = 1 }
        let temp = hp.numOfDie;
        temp[index] = Number(dieCount);
        setHP(temp);
    }

    return (
        <div className="form-row">
            <div className="col-5">
                <input type="text" className="form-control" value={ hp.numOfDie[index] }
                    onChange={ e => numOfDieHandler(e) }/>
            </div>
            <div className="col-5">
                {}
            </div>
        </div>
    )
}


const HitDieForm = props => {
    const { hp, setHP } = props;
    let totalHP = hp.bonus;
    hp.hitDie.forEach( (hd, i) => totalHP += Math.floor((hd + 1)/2 * hp.numOfDie[i]) );

    return (
        <>
        <h6>HP { totalHP }</h6>
        {
            hp.hitDie.map( (hd, index) => {
                <HDInput key={ index } index={ index } hp={ hp } setHP={ setHP }/>
            })
        }
        <div className="form-row">
            <div className="col-4">
                <label htmlFor="bonus">+</label>
                <input type="number" className="form-control" id="bonus" value={ hp.bonus }/>
            </div>
        </div>
        </>
    )
}

export default HitDieForm;