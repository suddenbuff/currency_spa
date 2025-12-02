export async function getRate(currency = "USD") {
    const storageKey = `rate_${currency}`;
    const saved = localStorage.getItem(storageKey);
    const now = Math.floor(Date.now() / 1000);

    if (saved) {
        const parsed = JSON.parse(saved);
        if (now - parsed.time_last_updated < 86400) {
            return parsed;
        }
    }

    const URL = `https://api.exchangerate-api.com/v4/latest/${currency}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`Ошибка загрузки курса ${currency}`);

    const data = await res.json();

    localStorage.setItem(storageKey, JSON.stringify(data));

    return data;
}
