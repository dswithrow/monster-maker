import React from 'react'

const ListSortButton = props => {
    const { sortBy, arrowUp, callback } = props;
    return (
        <button className="btn btn-outline-secondary btn-sm ml-3" onClick={ e => callback() }>
        {
            arrowUp === sortBy ?
            '↑' : '↓'
        }
        </button>
    )
}

export default ListSortButton
