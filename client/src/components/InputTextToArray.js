import React from 'react'

const InputTextToArray = props => {
    const { id, items, state, setState } = props;

    const changeHandler = e => {
        let arr = e.target.value.split(/,\s|,/);
        arr.map(str => str.trim());
        setState(arr);
    }
    return (
        <>
            <input type="text" className="form-control" id={ id } value={ state.join(", ") }
                onChange={ e => changeHandler(e) }/>
            <small>{ `List multiple ${ items } separated with a comma.` }</small>
        </>
    )
}

export default InputTextToArray
