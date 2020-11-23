import React, { useState } from 'react'

const AlignmentSquare = props => {
    const { alignment, setAlignment } = props;
    const [ current, setCurrent ] = useState( alignment.order == alignment.moral == "N" ? "N" : alignment.order + alignment.moral)
    
    const alignmentHandler = newAlign => {
        setAlignment({
            order: newAlign[0],
            moral: newAlign[1]
        });
        setCurrent(newAlign);

    }
    
    return (
        <div className="form-group">
            <label htmlFor="alignment">Alignment</label>
            <br/>
            <button className={`alignment btn btn${ current == 'LG'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("LG") }>LG</button>
            <button className={`alignment btn btn${ current == 'NG'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("NG") }>NG</button>
            <button className={`alignment btn btn${ current == 'CG'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("CG") }>CG</button>
            <br/>
            <button className={`alignment btn btn${ current == 'LN'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("LN") }>LN</button>
            <button className={`alignment btn btn${ current == 'N' ? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("N") }>N</button>
            <button className={`alignment btn btn${ current == 'CN'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("CN") }>CN</button>
            <br/>
            <button className={`alignment btn btn${ current == 'LE'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("LE") }>LE</button>
            <button className={`alignment btn btn${ current == 'NE'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("NE") }>NE</button>
            <button className={`alignment btn btn${ current == 'CE'? '-primary' : '-outline-secondary' }`}
                onClick={ e => alignmentHandler("CE") }>CE</button>
        </div>
    )
}

export default AlignmentSquare
