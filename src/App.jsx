import { useState } from "react";

const LINKS = {
  flightDeals: "https://www.jdoqocy.com/click-101724638-14439716",
  weeklyDeals: "https://www.tkqlhce.com/click-101724638-14456522",
  packages: "https://www.kqzyfj.com/click-101724638-13852707",
  hotels: "https://www.tkqlhce.com/click-101724638-13852705",
  carDeals: "https://www.dpbolvw.net/click-101724638-13830502",
  vacationRentals: "https://www.anrdoezrs.net/click-101724638-14083843",
  activities: "https://www.kqzyfj.com/click-101724638-13852714",
  rewards: "https://www.jdoqocy.com/click-101724638-13852721",
  deals: "https://www.kqzyfj.com/click-101724638-13852827",
  lastMinute: "https://www.anrdoezrs.net/click-101724638-13852718",
  travelGuide: "https://www.tkqlhce.com/click-101724638-13983555"
};

function Button({ hrefKey, children, light }) {
  return (
    <a
      className={light ? "btn light" : "btn"}
      href={LINKS[hrefKey] || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

const destinations = [
  ["Barcelona", "Spania", "fra 748 kr", "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80"],
  ["Roma", "Italia", "fra 798 kr", "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80"],
  ["Paris", "Frankrike", "fra 699 kr", "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80"],
  ["Malaga", "Spania", "fra 899 kr", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"]
];

export default function App() {
  const [tab, setTab] = useState("fly");
  const [message, setMessage] = useState("");

  function search() {
    if (tab === "fly") {
      setMessage("Flysøk er klart for Amadeus API. Legg API-nøkler i Vercel når du får dem.");
    } else {
      const map = { hotell: "hotels", bil: "carDeals", opplevelser: "activities" };
      window.open(LINKS[map[tab]], "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div>
      <header className="topbar">
        <a href="#" className="brand"><img src="/logo.png" alt="Billig-reiser.no" /></a>
        <nav><a href="#sok">Søk</a><a href="#tilbud">Tilbud</a><a href="#reisemal">Reisemål</a><a href="#kontakt">Kontakt</a></nav>
      </header>

      <main>
        <section className="hero">
          <div className="heroImage"></div>
          <div className="overlay"></div>
          <div className="heroInner">
            <div>
              <p className="eyebrow">Billige reiser · fly · hotell · opplevelser</p>
              <h1>Finn reisen du drømmer om <span>til lavere pris</span></h1>
              <p className="lead">Søk fly, hotell, leiebil, pakkereiser og opplevelser. Vi samler tilbudene og sender deg videre til våre partnere.</p>
              <div className="heroActions"><a className="btn" href="#sok">Start søk</a><Button hrefKey="weeklyDeals" light>Se ukens tilbud</Button></div>
            </div>

            <section id="sok" className="searchCard">
              <div className="tabs">
                {["fly","hotell","bil","opplevelser"].map((key) => (
                  <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{key}</button>
                ))}
              </div>
              <div className="formGrid">
                <label><span>Fra</span><input placeholder="OSL" /></label>
                <label><span>Til</span><input placeholder="BCN" /></label>
                <label><span>Dato</span><input type="date" /></label>
                <label><span>Reisende</span><input placeholder="2 voksne" /></label>
              </div>
              <div className="searchActions"><button className="btn" onClick={search}>Søk {tab}</button><Button hrefKey="packages" light>Fly + hotell</Button></div>
              {message && <div className="alert">{message}</div>}
            </section>
          </div>
        </section>

        <section id="tilbud" className="section">
          <p className="eyebrow">Utvalgte tilbud</p><h2>Populære reisekupp</h2>
          <div className="deals">
            <article><h3>Ukens beste tilbud</h3><p>Fly, hotell, leiebil og ferie samlet på ett sted.</p><Button hrefKey="weeklyDeals">Se tilbud</Button></article>
            <article><h3>Fly + hotell</h3><p>Pakkereiser med høy verdi og enkel booking.</p><Button hrefKey="packages">Se pakkereiser</Button></article>
            <article><h3>Last minute</h3><p>Reiser med avreise snart og gode kampanjer.</p><Button hrefKey="lastMinute">Se last minute</Button></article>
          </div>
        </section>

        <section id="reisemal" className="section">
          <p className="eyebrow">Inspirasjon</p><h2>Populære reisemål</h2>
          <div className="destinations">
            {destinations.map(([city,country,price,img]) => <article key={city}><img src={img} alt={city}/><div><h3>{city}</h3><p>{country}</p><span>{price}</span></div></article>)}
          </div>
        </section>

        <section className="section categories">
          <article><h3>Billige fly</h3><p>Finn lave flypriser og kampanjer.</p><Button hrefKey="flightDeals">Se fly</Button></article>
          <article><h3>Hotell</h3><p>Sammenlign hotell og gode tilbud.</p><Button hrefKey="hotels">Se hotell</Button></article>
          <article><h3>Leiebil</h3><p>Leiebil, enveisleie og bil-deals.</p><Button hrefKey="carDeals">Se leiebil</Button></article>
          <article><h3>Opplevelser</h3><p>Turer, attraksjoner og billetter.</p><Button hrefKey="activities">Se aktiviteter</Button></article>
        </section>

        <section className="section promo">
          <h2>Spar enda mer på reisen</h2><p>Få tilgang til medlemsfordeler, weekly deals, last minute og reisetips.</p>
          <div><Button hrefKey="rewards" light>Medlemsfordeler</Button><Button hrefKey="travelGuide" light>Reisetips</Button></div>
        </section>

        <section id="kontakt" className="section legal">
          <div><h2>Kontakt oss</h2><p>Har du spørsmål, trenger hjelp eller ønsker samarbeid?</p><a href="mailto:Post@billig-reiser.no">Post@billig-reiser.no</a></div>
          <div><h3>Vilkår</h3><p>Vi videresender til partnere hvor bestilling gjennomføres. Affiliate-lenker kan gi oss provisjon.</p></div>
          <div><h3>Personvern</h3><p>Vi bruker begrenset data til analyse, funksjonalitet og affiliate-sporing.</p></div>
        </section>
      </main>
      <footer>© 2026 Billig-reiser.no · Affiliate-lenker kan gi oss provisjon uten ekstra kostnad for deg.</footer>
    </div>
  );
}
