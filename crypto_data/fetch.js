import fs from 'fs';

async function fetchCryptoHistory() {
  const coins = ['bitcoin', 'ethereum'];
  const days = 365; // viimeiset 365 päivää

  let result = [];

  for (let coin of coins) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`);
    const data = await response.json();
    
    data.prices.forEach((p, index) => {
      if (!result[index]) result[index] = { date: new Date(p[0]).toISOString().slice(0, 10) };
      result[index][coin === 'bitcoin' ? 'btc' : 'eth'] = p[1];
    });
  }

  fs.writeFileSync('crypto_history.json', JSON.stringify(result, null, 2));
  console.log('Tiedosto crypto_history.json luotu onnistuneesti!');
}

fetchCryptoHistory();