import React, { useState } from 'react'

const TemplateSelector = props => {
    const { templates, activeTemplates, setActiveTemplates } = props;
    const [ currentSelect, setCurrentSelect ] = useState(-1)

    const ActiveTemplateRow = props => {
        const { activeTemplates, setActiveTemplates, index } = props;

        return (
            <tr>
                <th>
                    { activeTemplates[index].name }
                </th>
                <td>
                    <button className="btn btn-sm btn-danger"
                        onClick={ e => {
                            let tempArr = activeTemplates;
                            setActiveTemplates(
                                tempArr.slice(0, index)
                                .concat(tempArr.slice(index+1))
                            );
                        }}>
                    🗙</button>
                </td>
            </tr>
        )
    }

    const addTemplate = e => {
        e.preventDefault();
        setActiveTemplates(activeTemplates.concat(templates[currentSelect]));
        setCurrentSelect(-1);
    }

    return (
        <div className="row col-12">
            <div className="col-md-5 offset-md-6 p-3">
                <form onSubmit={ e => addTemplate(e) }>
                    <div className="form-row">
                        <div className="col-md">
                            <label htmlFor="templates">Template</label>
                            <select name="templates" id="templates" className="col-8 mx-1"
                                value={ currentSelect } onChange={ e => setCurrentSelect(e.target.value) }>
                                <option value="-1" disabled hidden>Select A Template</option>
                                {
                                templates
                                    .map( (template, i) => 
                                    <option value={i}>{ template.name }</option>
                                )
                                }
                            </select>
                            <button className="btn btn-sm btn-success" type="submit">+</button>
                        </div>
                    </div>
                </form>
                <div className="col-11 row justify-content-end">
                <table className="">
                    <thead></thead>
                    <tbody>
                    {
                        activeTemplates.map( (template, i) => 
                            <ActiveTemplateRow activeTemplates={activeTemplates}
                                setActiveTemplates={setActiveTemplates} index={i} />
                        )
                    }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default TemplateSelector
