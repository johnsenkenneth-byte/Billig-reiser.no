import { useState } from "react";

const AFFILIATE_LINKS = {
  cheapTickets: "https://www.jdoqocy.com/click-101724638-13852706",
  flightDeals: "https://www.jdoqocy.com/click-101724638-14439716",
  weeklyDeals: "https://www.tkqlhce.com/click-101724638-14456522",
  packages: "https://www.kqzyfj.com/click-101724638-13852707",
  hotels: "https://www.tkqlhce.com/click-101724638-13852705",
  beachHotels: "https://www.kqzyfj.com/click-101724638-13983498",
  carDeals: "https://www.dpbolvw.net/click-101724638-13830502",
  vacationRentals: "https://www.anrdoezrs.net/click-101724638-14083843",
  activities: "https://www.kqzyfj.com/click-101724638-13852714",
  eventTickets: "https://www.tkqlhce.com/click-101724638-14302722",
  rewards: "https://www.jdoqocy.com/click-101724638-13852721",
  deals: "https://www.kqzyfj.com/click-101724638-13852827",
  lastMinute: "https://www.anrdoezrs.net/click-101724638-13852718",
  travelGuide: "https://www.tkqlhce.com/click-101724638-13983555",
  instaHotels: "https://www.dpbolvw.net/click-101724638-15786128"
};

function trackEvent(name, data = {}) {
  console.log("TRACK_EVENT", name, data);
}

function link(key) {
  return AFFILIATE_LINKS[key] || "#";
}

function AffiliateButton({ hrefKey, children, light = false }) {
  return (
    <a
      className={light ? "btn btn-light" : "btn"}
      href={link(hrefKey)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("affiliate_click", { provider: hrefKey })}
    >
      {children} →
    </a>
  );
}

const destinations = [
  { city: "Barcelona", country: "Spania", price: "fra 748 kr", img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80" },
  { city: "Roma", country: "Italia", price: "fra 798 kr", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80" },
  { city: "Paris", country: "Frankrike", price: "fra 699 kr", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80" },
  { city: "Malaga", country: "Spania", price: "fra 899 kr", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" }
];

const deals = [
  { title: "Ukens beste tilbud", text: "Fly, hotell, leiebil og ferie samlet på ett sted.", hrefKey: "weeklyDeals", img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=900&q=80" },
  { title: "Fly + hotell", text: "Pakkereiser med høy verdi og enkel booking.", hrefKey: "packages", img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80" },
  { title: "Last minute", text: "Reiser med avreise snart og gode kampanjer.", hrefKey: "lastMinute", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80" }
];

export default function App() {
  const [tab, setTab] = useState("fly");
  const [from, setFrom] = useState("OSL");
  const [to, setTo] = useState("BCN");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSearch() {
    trackEvent("search_submit", { tab, from, to, date, adults });

    if (tab !== "fly") {
      const redirectMap = { hotell: "hotels", bil: "carDeals", opplevelser: "activities" };
      window.open(link(redirectMap[tab]), "_blank", "noopener,noreferrer");
      return;
    }

    if (!date) {
      setMessage("Velg dato for å teste flysøk. Uten Amadeus-nøkler kan du fortsatt bruke affiliate-knappene.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setFlights([]);

      const params = new URLSearchParams({
        originLocationCode: from.toUpperCase(),
        destinationLocationCode: to.toUpperCase(),
        departureDate: date,
        adults
      });

      const response = await fetch(`/api/flights?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Kunne ikke hente flypriser.");
      setFlights(data.flights || []);
      if (!data.flights?.length) setMessage(data.error || "Ingen flyresultater akkurat nå. Bruk affiliate-knappene foreløpig.");
    } catch (error) {
      setMessage(error.message || "Kunne ikke hente flypriser akkurat nå.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="header">
        <a className="logo" href="#">
          <span className="logo-mark">✈</span>
          <span>Billig<span>-reiser</span>.no</span>
        </a>
        <nav>
          <a href="#sok">Søk</a>
          <a href="#tilbud">Tilbud</a>
          <a href="#reisemal">Reisemål</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-text">
              <p className="eyebrow">Premium reisesøk med affiliate-tilbud</p>
              <h1>Finn de billigste reisene <span>raskt og enkelt</span></h1>
              <p className="lead">Sammenlign fly, hotell, leiebil, pakkereiser og opplevelser. Vi sender deg videre til beste tilbud hos våre partnere.</p>
              <div className="trust-row">
                <div>✓ Utvalgte deals</div>
                <div>✓ Affiliate klart</div>
                <div>✓ API kan kobles</div>
              </div>
            </div>

            <section id="sok" className="search-card">
              <div className="tabs">
                {[
                  ["fly", "Fly"],
                  ["hotell", "Hotell"],
                  ["bil", "Leiebil"],
                  ["opplevelser", "Opplevelser"]
                ].map(([key, label]) => (
                  <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
                    {label}
                  </button>
                ))}
              </div>

              <div className="notice">
                {tab === "fly" ? "Fly er klargjort for Amadeus API. Uten API-nøkler fungerer affiliate-knappene fortsatt." : "Denne kategorien sender foreløpig videre via affiliate-lenke."}
              </div>

              <div className="form-grid">
                <label><span>Fra</span><input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="OSL" /></label>
                <label><span>Til</span><input value={to} onChange={(e) => setTo(e.target.value)} placeholder="BCN" /></label>
                <label><span>Dato</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
                <label><span>Reisende</span><input value={adults} onChange={(e) => setAdults(e.target.value)} placeholder="2" /></label>
              </div>

              <div className="search-actions">
                <button className="btn" onClick={handleSearch} disabled={loading}>{loading ? "Søker..." : `Søk ${tab}`}</button>
                <AffiliateButton hrefKey="packages" light>Fly + hotell</AffiliateButton>
              </div>
            </section>
          </div>
        </section>

        {(message || flights.length > 0) && (
          <section className="section">
            <p className="eyebrow">Live flysøk</p>
            <h2>Flypriser fra Amadeus</h2>
            {message && <div className="alert">{message}</div>}
            <div className="grid three">
              {flights.map((flight) => (
                <article className="simple-card" key={flight.id}>
                  <p className="tag">{flight.airline}</p>
                  <h3>{flight.from} → {flight.to}</h3>
                  <p>Avreise: {flight.departure || "Ikke oppgitt"}</p>
                  <strong>{flight.price}</strong>
                  <AffiliateButton hrefKey="cheapTickets">Bestill hos partner</AffiliateButton>
                </article>
              ))}
            </div>
          </section>
        )}

        <section id="tilbud" className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Utvalgte tilbud</p>
              <h2>Reisekupp som selger</h2>
            </div>
            <AffiliateButton hrefKey="deals" light>Alle deals</AffiliateButton>
          </div>

          <div className="grid three">
            {deals.map((deal) => (
              <article className="image-card" key={deal.title}>
                <img src={deal.img} alt={deal.title} />
                <div>
                  <h3>{deal.title}</h3>
                  <p>{deal.text}</p>
                  <AffiliateButton hrefKey={deal.hrefKey}>Se tilbud</AffiliateButton>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="reisemal" className="section">
          <p className="eyebrow">SEO + inspirasjon</p>
          <h2>Populære reisemål</h2>
          <div className="grid four">
            {destinations.map((dest) => (
              <article className="destination" key={dest.city}>
                <img src={dest.img} alt={dest.city} />
                <div>
                  <h3>{dest.city}</h3>
                  <p>{dest.country}</p>
                  <span>{dest.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="grid four">
            <article className="simple-card"><h3>Billige fly</h3><p>Finn lave flypriser og kampanjer.</p><AffiliateButton hrefKey="flightDeals">Se fly</AffiliateButton></article>
            <article className="simple-card"><h3>Hotell</h3><p>Sammenlign hotell og gode tilbud.</p><AffiliateButton hrefKey="hotels">Se hotell</AffiliateButton></article>
            <article className="simple-card"><h3>Leiebil</h3><p>Leiebil, enveisleie og bil-deals.</p><AffiliateButton hrefKey="carDeals">Se leiebil</AffiliateButton></article>
            <article className="simple-card"><h3>Ferieboliger</h3><p>Leiligheter, hus og unike opphold.</p><AffiliateButton hrefKey="vacationRentals">Se ferieboliger</AffiliateButton></article>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Mer enn transport</p>
          <h2>Opplevelser og inspirasjon</h2>
          <div className="grid three">
            <article className="simple-card"><h3>Aktiviteter</h3><p>Turer, attraksjoner og billetter.</p><AffiliateButton hrefKey="activities">Se aktiviteter</AffiliateButton></article>
            <article className="simple-card"><h3>Event-billetter</h3><p>Sport, konserter og show.</p><AffiliateButton hrefKey="eventTickets">Se events</AffiliateButton></article>
            <article className="simple-card"><h3>Insta-hoteller</h3><p>Visuelle hotellopplevelser og inspirasjon.</p><AffiliateButton hrefKey="instaHotels">Se inspirasjon</AffiliateButton></article>
          </div>
        </section>

        <section className="section">
          <div className="promo">
            <h2>Spar enda mer på reisen</h2>
            <p>Få tilgang til rabatter, fordeler, ukentlige kampanjer og ekstra reisetilbud.</p>
            <div className="promo-actions">
              <AffiliateButton hrefKey="rewards" light>Medlemsfordeler</AffiliateButton>
              <AffiliateButton hrefKey="weeklyDeals" light>Ukens deals</AffiliateButton>
              <AffiliateButton hrefKey="travelGuide" light>Reisetips</AffiliateButton>
            </div>
          </div>
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
