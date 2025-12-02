const RatesList = ({ rates, baseCurrency = "USD" }) => {
    if (!rates) return <p>Курсы отсутствуют</p>;

    return (
        <div className="currencyList">
            {Object.entries(rates).map(([cur, rate]) => {
                const value = rate / rates[baseCurrency];
                return (
                    <div className="currencyItem" key={cur}>
                        <div className="rate">
                            {Number(value).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                        </div>{" "}
                        {cur}
                    </div>
                );
            })}
        </div>
    );
};

export default RatesList;
