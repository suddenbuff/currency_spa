import { useState, useEffect, useCallback } from 'react';

export const useConverterInput = (rates) => {
    const [input, setInput] = useState(localStorage.getItem("converterInput") || "");

    useEffect(() => {
        localStorage.setItem("converterInput", input);
        }, [input]);

    const convert = useCallback((val) => {
        if (!rates) return { output: "Курсы валют не загружены" };
        const match = val.match(/^\s*(\d+(?:[,.]\d+)?)\s+([A-Za-z]{3})\s+in\s+([A-Za-z]{3})\s*$/i);
        if (!match) return { output: val.trim() ? "Формат: '100 USD in RUB'" : ""};

        const [, amountStr, from, to] = match;
        const amount = parseFloat(amountStr.replace(',', '.'));
        const f = from.toUpperCase();
        const t = to.toUpperCase();

        if (!rates.rates[f] || !rates.rates[t]) {
            return { output: "Одна из валют не поддерживается" };
        }

        const result = (amount / rates.rates[f]) * rates.rates[t];
        return { output: `${amountStr} ${f} ≈ ${result.toFixed(4)} ${t}`};
    }, [rates]);

    return { input, setInput, convert };
};
