# Harjoitustyö Web-Sovellusten Perusteet

## Yleistä
Tämä projekti on tehty 2026 keväällä Web-sovellusten perusteet kurssilla harjoitustyönä. Projektissa on käytetty yksinkertaista laskentaa, logiikkaa ja localstoragen käyttöä. Sivustolla on kululaskentaan ja kryptokolikoiden hinta historiaa.

Käytetyt kielet: HTML, CSS, JavaScript

Kirjastot: Chart.js

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

Voit liikutella kursoria kuvaajan päällä, josta näet tarkemmin kursorin kohdalta tarkan hinnan ja päivämäärän.

Krypto data haetaan coingeko rajapinnasta.

## Kululaskenta sivuston toiminta
Kululaskentasivulla voit seurata esimerkiksi kuukausibudjettia. Voit lisätä budjetin, lisätä kuluja eri selityksillä ja sovellus laskee budjetin automaattisesti. Voit myös poistaa kuluja tai muuttaa budjettia niin, että ohjelma huomioi muutokset.

Tiedot tallennetaan LocalStorageen, joten voit jatkaa siitä, mihin viimeksi jäit.

## Käyttöön otto ja testaus

**Tapa 1: Cloonaaminen Gitillä**
```bash
git clone https://github.com/Tkarsikas/Harjoitustyo_WebSovellustenPerusteet.git
```

**Tapa 2: ZIP-tiedosto**
Klikkaa GitHubissa vihreää "Code"-painiketta ja valitse "Download ZIP". Pura ZIP-tiedosto haluamaasi kansioon.

**Sovelluksen käynnistys (suositeltu)**
- Asenna VS Code -laajennus "Live Server" (Ritchie Chen)
- Klikkaa `index.html`:ää hiiren oikealla näppäimellä → "Open with Live Server"
- Selain avautuu automaattisesti osoitteeseen `http://localhost:5500`

**Vaihtoehto: Suora avaus**
- Tuplaklikkaa `index.html` -tiedostoa kansiossa
- Huomio: Joillakin selaimilla LocalStorage-toiminto saattaa olla rajoitettu

## 