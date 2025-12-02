import { useState, useEffect } from 'react';
import ConverterInput from '../components/ConverterInput';

const Converter = () => {
    const [output, setOutput] = useState(localStorage.getItem("converterOutput") || "");

    useEffect(() => {
        localStorage.setItem("converterOutput", output);
    }, [output]);

    return <>
        <div className="pageFull">
            <div className="centerColumn">
                <h2>Конвертер валют</h2>
                <ConverterInput onOutput={setOutput}/>
                <div className="output">{output}</div>
            </div>
        </div>
    </>;
};

export default Converter;
