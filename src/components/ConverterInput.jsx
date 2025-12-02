import {useConverterInput} from '../hooks/useConverterInput';

const ConverterInput = ({onOutput }) => {
    const rates = JSON.parse(localStorage.getItem("rate_USD"));
    const { input, setInput, convert } = useConverterInput(rates);
    const handleChange = (e) => {
        const val = e.target.value;
        setInput(val);
        const { output } = convert(val);
        onOutput(output);
    };

    return (
        <input className="converterInput" type="text" placeholder="e.g. 100 USD in RUB" value={input} onChange={handleChange}/>
    );
};

export default ConverterInput;
