import { useMemo } from "react";
import Select from "react-select";

const RatesSelector = ({ baseCurrency, setBaseCurrency, rates }) => {
    const options = useMemo(() => rates ? Object.keys(rates).sort().map(c => ({ value: c, label: c })) : [], [rates]);

    return (
        <div className="selectorWrapper">
            <label>Базовая валюта</label>
            <Select value={options.find(o => o.value === baseCurrency) || null} onChange={opt => setBaseCurrency(opt.value)} options={options} isSearchable/>
        </div>
    );
};

export default RatesSelector;
