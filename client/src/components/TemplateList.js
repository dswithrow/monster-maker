import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ListSortButton from './ListSortButton';

const TemplateList = () => {
    const [ templates, setTemplates ] = useState([]);
    const [ sort, setSort ] = useState("");
    const [ arrowUp, setArrowUp ] = useState("");

    const sortByName = () => {
        if (sort != "name") {
            setTemplates(templates.sort((a, b) => (a.name > b.name) ? 1 : -1));
            setArrowUp("name");
            setSort("name");
        } else {
            setTemplates(templates.sort((a, b) => (a.name < b.name) ? 1 : -1));
            setArrowUp("");
            setSort("");
        }
    }

    const sortByCR = () => {
        if (sort != "cr") {
            setTemplates(templates.sort((a, b) => (a.cr[0].crIncrease > b.cr[0].crIncrease) ? 1 : -1));
            setArrowUp("cr");
            setSort("cr");
        } else {
            setTemplates(templates.sort((a, b) => (a.cr[0].crIncrease < b.cr[0].crIncrease) ? 1 : -1));
            setArrowUp("");
            setSort("");
        }
    }

    useEffect( () => {
        Axios.get("http://localhost:8000/api/templates")
            .then(res => setTemplates(res.data.templates))
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
                    </tr>
                </thead>
                <tbody>
                    {
                    templates.map( (template, index) => 
                        <tr key={ index }>
                            <td><a href={ `templates/${template._id}` }>{ template.name }</a></td>
                            <td>{ template.cr.length === 1 ? template.cr[0].crIncrease < 0 ? template.cr[0].crIncrease : '+' + template.cr[0].crIncrease : "Varies"  }</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TemplateList
