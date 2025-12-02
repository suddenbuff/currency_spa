import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRate} from "./api/api";
import Rates from "./pages/Rates"
import Converter from "./pages/Converter"
import "./App.css"

const App = () => {
    const [rateData, setRateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRate()
            .then(data => {
                setRateData(data)
                setError(null);
            })
            .catch(err => {
                console.error(err)
                setError(true);
            })
            .finally(() =>
                setLoading(false));
    }, []);

    if (loading) return <p>Загрузка курсов</p>;
    if (error) return <p>Ошибка получения данных с api</p>

    return <>
        <BrowserRouter basename="/currency_spa">
            <div className="appContainer">
                <nav>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Конвертер</NavLink>
                    <NavLink to="/rates" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Валюты</NavLink>
                </nav>
                <Routes>
                    <Route path="/" element={<Converter/>}/>
                    <Route path="/rates" element={<Rates/>}/>
                </Routes>
                <footer>Последнее обновление:{" "}{new Date(rateData.time_last_updated * 1000).toLocaleString()}</footer>
            </div>
        </BrowserRouter>
    </>
}

export default App;