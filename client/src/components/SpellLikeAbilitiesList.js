import React from 'react'

const SpellLikeAbilitiesList = props => {
    const {spells} = props;

    function getNumberWithOrdinal(n) {
        var s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    function sortLessThanDaily(a, b) {
        function toFreq(x) {
            if (!isNaN(x)) { return x }
            if (x == "at will"){ return 100 }
            x = x.replace("Week", "7");
            x = x.replace("Month", "30");
            x = x.replace("Year", "365");
            x = x.replace("Decade", "3650");
            x = x.replace("Century", "36500");
            x = x.replace("Ever", "10000000");
            return eval(x);
        }
        return toFreq(a) < toFreq(b) ? 1 : -1;
    }

    return (
        <table className="table table-sm table-hover mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th colSpan={2}>Spell-Like Abilities</th>
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
                            spells.constant ?
                            <tr>
                                <th scope="row">Constant</th>
                                <td>
                                    <ul className="list-unstyled mb-0">
                                    {
                                        spells.constant.map(
                                            (spell, i) =>
                                            <li key={i}>{ spell }</li>
                                        )
                                    }
                                    </ul>
                                </td>
                            </tr> : ''
                        }
                        {
                            Object.keys(spells.perDay).sort((a, b) => sortLessThanDaily(a, b)).map(
                                (freq, i) => 
                                <tr key={i}>
                                    <th scope="row" className="text-capitalize">{ isNaN(freq) ? freq : freq + "/Day" }</th>
                                    <td>
                                        <ul className="list-unstyled mb-0">
                                        {
                                            spells.perDay[freq].map(
                                                (spell, i) =>
                                                <li key={i}>{ spell }</li>
                                            )
                                        }
                                        </ul>
                                    </td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
    )
}

export default SpellLikeAbilitiesList
