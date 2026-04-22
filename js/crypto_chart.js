
const CACHE_KEY = "cryptoHistoryCache";
const CACHE_TIME_KEY = "cryptoHistoryCacheTime";
const UPDATE_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6h

function isNormalizedHistory(data) {
  return Array.isArray(data) && data.every((row) => (
    row && typeof row.date === "string" && typeof row.btc === "number" && typeof row.eth === "number"
  ));
}

function getCachedData() {
  const raw = localStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function getCacheAgeMs() {
  const t = Number(localStorage.getItem(CACHE_TIME_KEY) || 0);
  return Date.now() - t;
}

function saveCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
}

function shouldUpdate() {
  const hasData = !!localStorage.getItem(CACHE_KEY);
  if (!hasData) return true;
  return getCacheAgeMs() > UPDATE_INTERVAL_MS;
}

async function fetchFreshData() {
  const days = 365;
  const [btcResponse, ethResponse] = await Promise.all([
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`),
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${days}`)
  ]);

  if (!btcResponse.ok || !ethResponse.ok) {
    throw new Error("API error");
  }

  const [btcData, ethData] = await Promise.all([
    btcResponse.json(),
    ethResponse.json()
  ]);

  const size = Math.min(btcData.prices.length, ethData.prices.length);
  const merged = [];

  for (let i = 0; i < size; i += 1) {
    const btcPoint = btcData.prices[i];
    const ethPoint = ethData.prices[i];
    merged.push({
      date: new Date(btcPoint[0]).toISOString().slice(0, 10),
      btc: btcPoint[1],
      eth: ethPoint[1]
    });
  }

  return merged;
}

async function loadDataSmart() {
  try {
    const cached = getCachedData();
    const hasValidCache = isNormalizedHistory(cached);

    if (shouldUpdate()) {
      const fresh = await fetchFreshData();
      saveCache(fresh);
      return fresh;
    }

    if (hasValidCache) {
      return cached;
    }

    const fresh = await fetchFreshData();
    saveCache(fresh);
    return fresh;
  } catch (err) {
    // fallback: käytä vanhaa välimuistia, jos netti/API kaatuu
    const cached = getCachedData();
    if (isNormalizedHistory(cached)) {
      return cached;
    }
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadDataSmart();
  if (!data) return;
  // piirrä chart tästä datasta
  drawCharts(data);
});

function drawCharts(data) {
  if (!isNormalizedHistory(data) || data.length === 0) {
    console.error("Kaaviodata puuttuu tai on väärässä muodossa.");
    return;
  }

  // Luodaan graafille tarvittavat taulukot
  const labels = data.map(d => d.date); // päivämäärät X-akselille
  const btcPrices = data.map(d => d.btc);
  const ethPrices = data.map(d => d.eth);

  const btcCanvas = document.getElementById('btcChart');
  const ethCanvas = document.getElementById('ethChart');

  if (!btcCanvas || !ethCanvas) {
    console.error("Canvas-elements not found");
    return;
  }

  const ctxbtc = btcCanvas.getContext('2d');
  const ctxeth = ethCanvas.getContext('2d');

  new Chart(ctxbtc, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Bitcoin (BTC)',
          data: btcPrices,
          borderColor: 'yellow',
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Bitcoin hinnat viimeisen vuoden aikana'
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Päivämäärä'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Hinta (USD)'
          }
        }
      }
    }
  });

  new Chart(ctxeth, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Ethereum (ETH)',
          data: ethPrices,
          borderColor: 'purple',
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Ethereum hinnat viimeisen vuoden aikana'
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Päivämäärä'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Hinta (USD)'
          }
        }
      }
    }
  });
}
