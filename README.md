# Harjoitustyö Web-Sovellusten Perusteet

## Kansiorakenne

```text
Harjoitustyo_WebSovellustenPerusteet/
├── index.html
├── expenses.html
├── crypto.html
├── README.md
├── css/
│   └── style.css
├── images/
│   ├── home.png
│   └── ursos-fritando-bear.gif
├── js/
│   ├── expenseScript.js
│   └── crypto_chart.js
└── crypto_data/
	└── crypto_history.json
```

## Mitä kussakin kansiossa on

- `index.html`: projektin aloitussivu.
- `expenses.html`: budjetti- ja kululaskuri.
- `crypto.html`: kryptosivun näkymä.
- `css/`: koko projektin tyylit.
- `images/`: sivuston kuvat ja animaatiot.
- `js/`: sovelluksen JavaScript-tiedostot.
- `crypto_data/`: krypto­hintahistorian JSON-data.

## Aloitus sivu
Aloitus sivustolla törmäät tanssiviin karhuihin. 

Ylä- ja alapalkista voit navigoida eri sivustoille. Palkit ovat samanlaiset jokaisella sivulla.

## Krypto sivuston toiminta
Kryptosivustolla on kaksi kuvaajaa: omat Bitcoinille ja Ethereumille. Niissä näkyy kuluneen vuoden hintakehitys.

Logiikka tallentaa LocalStorageen vuoden datan, josta kuvaajat piirretään. Kun sovellus käynnistetään, se tarkistaa, onko data yli kuusi tuntia vanhaa. Jos on, tiedot päivitetään ja uusista tiedoista piirretään kuvaajat.

## Kululaskenta sivuston toiminta
Kululaskentasivulla voit seurata esimerkiksi kuukausibudjettia. Voit lisätä budjetin, lisätä kuluja eri selityksillä ja sovellus laskee budjetin automaattisesti. Voit myös poistaa kuluja tai muuttaa budjettia niin, että ohjelma huomioi muutokset.

Tiedot tallennetaan LocalStorageen, joten voit jatkaa siitä, mihin viimeksi jäit.