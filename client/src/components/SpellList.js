import React from 'react'

const SpellList = props => {
    const {spells} = props;

    function getNumberWithOrdinal(n) {
        var s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    return (
        <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Spells Known</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">CL</th>
                            <td>{ getNumberWithOrdinal(spells.cl) }</td>
                        </tr>
                        <tr>
                            <th scope="row">Concentration</th>
                            <td>{ `+${spells.concentration}` }</td>
                        </tr>
                        {
                            spells[9] ?
                            <tr>
                                <th scope="row">9th {spells[9].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[9].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[8] ?
                            <tr>
                                <th scope="row">8th {spells[8].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[8].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[7] ?
                            <tr>
                                <th scope="row">7th {spells[7].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[7].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[6] ?
                            <tr>
                                <th scope="row">6th {spells[6].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[6].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[5] ?
                            <tr>
                                <th scope="row">5th {spells[5].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[5].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[4] ?
                            <tr>
                                <th scope="row">4th {spells[4].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[4].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[3] ?
                            <tr>
                                <th scope="row">3rd {spells[3].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[3].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[2] ?
                            <tr>
                                <th scope="row">2nd {spells[2].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[2].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[1] ?
                            <tr>
                                <th scope="row">1st {spells[1].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[1].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            spells[0] ?
                            <tr>
                                <th scope="row">0th {spells[0].perDay}/Day</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells[0].known.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                    </tbody>
                </table>
    )
}

export default SpellList
