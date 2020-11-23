import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ListSortButton from './ListSortButton';

const BestiaryList = () => {
    const [ bestiary, setBestiary ] = useState([]);
    const [ sort, setSort ] = useState("");
    const [ arrowUp, setArrowUp ] = useState("");

    const sortByName = () => {
        if (sort != "name") {
            setBestiary(bestiary.sort((a, b) => (a.name > b.name) ? 1 : -1));
            setArrowUp("name");
            setSort("name");
        } else {
            setBestiary(bestiary.sort((a, b) => (a.name < b.name) ? 1 : -1));
            setArrowUp("");
            setSort("");
        }
    }

    const sortByCR = () => {
        if (sort != "cr") {
            setBestiary(bestiary.sort((a, b) => (eval(a.cr) > eval(b.cr)) ? 1 : -1));
            setArrowUp("cr");
            setSort("cr");
        } else {
            setBestiary(bestiary.sort((a, b) => (eval(a.cr) < eval(b.cr)) ? 1 : -1));
            setArrowUp("");
            setSort("");
        }
    }

    const sortByType = () => {
        if (sort != "type") {
            setBestiary(bestiary.sort((a, b) => (a.type[0] > b.type[0]) ? 1 : -1));
            setArrowUp("type");
            setSort("type");
        } else {
            setBestiary(bestiary.sort((a, b) => (a.type[0] < b.type[0]) ? 1 : -1));
            setArrowUp("");
            setSort("");
        }
    }

    useEffect( () => {
        Axios.get("http://localhost:8000/api/monsters")
            .then(res => setBestiary(res.data.monsters))
    }, []);

    return (
        <div className="row">
            <table className="table table-sm table-hover col-8 offset-2">
                <thead className="thead-light">
                    <tr>
                        <th>
                            Name
                            <ListSortButton sortBy="name" arrowUp={ arrowUp } callback={ sortByName } />
                        </th>
                        <th>
                            CR
                            <ListSortButton sortBy="cr" arrowUp={ arrowUp } callback={ sortByCR } />
                        </th>
                        <th>
                            Type
                            <ListSortButton sortBy="type" arrowUp={ arrowUp } callback={ sortByType } />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                    bestiary.map( (creature, index) => 
                        <tr key={ index }>
                            <td><a href={ `bestiary/${creature._id}` }>{ creature.name }</a></td>
                            <td>{ creature.cr }</td>
                            <td>{ creature.type[0] }</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BestiaryList
