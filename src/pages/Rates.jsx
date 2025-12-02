import {useState, useEffect} from 'react';
import {getRate} from '../api/api';
import RatesSelector from '../components/RatesSelector.jsx';
import RatesList from '../components/RatesList';

const Rates = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rates, setRates] = useState();
    const saved = localStorage.getItem(`baseCurrency`) || 'USD';
    const [baseCurrency, setBaseCurrency] = useState(saved);

    useEffect(() => {
        setLoading(true);
        getRate(baseCurrency)
            .then(data => {
                setRates(data);
                setError(null);
                localStorage.setItem('baseCurrency', baseCurrency)
            })
            .catch(err => {
                console.error('API Error:', err); // оставлять?
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [baseCurrency]);

    if (loading) return <p>Загрузка курсов</p>;
    if (error) return <p>Ошибка получения данных с api</p>

    return (
        <div className="pageFull">
            <div className="centerColumn">
                <h2>Список валют</h2>
                <RatesSelector baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} rates={rates.rates}/>
            </div>
            <RatesList rates={rates.rates} baseCurrency={baseCurrency} />
        </div>
    );
};

export default Rates;

