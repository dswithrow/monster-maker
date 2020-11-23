import React from 'react'

const CRForm = props => {
    const { cr, setCR } = props;

    const crHandler = e => {
        let newCR = e.target.value;
        if (newCR.length === 4) { return }
        if (Number(newCR) && (1 <= newCR && newCR <= 30)){
            setCR(newCR);
        } else if (/1\/[23468]|1\/(?!0|1|5|7|9)/.test(newCR)){
            setCR(newCR);
        }
    }
    
    return (
        <>
            <label htmlFor="cr">CR</label>
            <input type="text" className="form-control" id="cr" value={ cr } required
                onChange={ e => crHandler(e) }/>
        </>
    )
}

export default CRForm
