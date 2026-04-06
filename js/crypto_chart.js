fetch('../crypto_data/crypto_history.json')
    .then(response => response.json())
    .then(data => {
      // Luodaan graafille tarvittavat taulukot
      const labels = data.map(d => d.date); // päivämäärät X-akselille
      const btcPrices = data.map(d => d.btc);
      const ethPrices = data.map(d => d.eth);

      const ctx = document.getElementById('cryptoChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Bitcoin (BTC)',
              data: btcPrices,
              borderColor: 'orange',
              fill: false,
            },
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
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: 'Bitcoin ja Ethereum hinnat viimeisen vuoden aikana'
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
    })
    .catch(err => console.error('JSON-tiedoston lukeminen epäonnistui:', err));