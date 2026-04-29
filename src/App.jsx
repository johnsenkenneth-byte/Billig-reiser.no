import { useMemo, useState } from "react";

const LINKS = {
  flightDeals: "https://www.jdoqocy.com/click-101724638-14439716",
  weeklyDeals: "https://www.tkqlhce.com/click-101724638-14456522",
  packages: "https://www.kqzyfj.com/click-101724638-13852707",
  hotels: "https://www.tkqlhce.com/click-101724638-13852705",
  carDeals: "https://www.dpbolvw.net/click-101724638-13830502",
  activities: "https://www.kqzyfj.com/click-101724638-13852714",
  travelGuide: "https://www.tkqlhce.com/click-101724638-13983555",
  rewards: "https://www.jdoqocy.com/click-101724638-13852721"
};

const TABS = {
  fly: {
    label: "Fly",
    cta: "Søk flytilbud",
    link: "flightDeals",
    fields: [["Fra", "Oslo", "text"], ["Til", "Hvor som helst", "text"], ["Avreise", "", "date"], ["Reisende", "1 voksen", "text"]]
  },
  hotell: {
    label: "Hotell",
    cta: "Finn hotell",
    link: "hotels",
    fields: [["Reisemål", "Barcelona", "text"], ["Innsjekk", "", "date"], ["Utsjekk", "", "date"], ["Gjester", "2 voksne", "text"]]
  },
  aktiviteter: {
    label: "Turer & Aktiviteter",
    cta: "Se aktiviteter",
    link: "activities",
    fields: [["Sted", "Roma", "text"], ["Dato", "", "date"], ["Personer", "2 personer", "text"], ["Type", "Opplevelser", "text"]]
  }
};

const cards = [
  { title: "Beste flytilbud", text: "Finn billige flybilletter fra Norge til populære reisemål.", cta: "Se flytilbud", link: "flightDeals", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
  { title: "Hotellkupp", text: "Spar opptil 50% på hotell i hele verden.", cta: "Finn hotell", link: "hotels", image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=900&q=80" },
  { title: "Opplevelser & Aktiviteter", text: "Bestill turer, utflukter og opplevelser før du reiser.", cta: "Se aktiviteter", link: "activities", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80" }
];

const destinations = [
  { city: "Bangkok", text: "Billige fly og hotell i Bangkok", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80", link: "packages" },
  { city: "Barcelona", text: "Perfekt for weekendtur", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80", link: "hotels" },
  { city: "New York", text: "Opplev storbyen til lav pris", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=80", link: "flightDeals" },
  { city: "Tenerife", text: "Sol og varme året rundt", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80", link: "weeklyDeals" }
];

const partners = ["Expedia", "Hotels.com", "Cheap Travels", "EconomyBookings", "Enjoy Travel", "Amadeus API"];

function PartnerButton({ hrefKey, children, className = "" }) {
  return <a className={`btn ${className}`} href={LINKS[hrefKey]} target="_blank" rel="noopener noreferrer sponsored">{children}</a>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("fly");
  const [message, setMessage] = useState("");
  const current = useMemo(() => TABS[activeTab], [activeTab]);

  function handleSearch(e) {
    e.preventDefault();
    setMessage(activeTab === "fly" ? "Live flypriser kan kobles til Amadeus API. Inntil videre sender knappen deg til en relevant affiliate-partner." : "Du sendes videre til valgt partner for pris, tilgjengelighet og bestilling.");
  }

  return (
    <div className="page">
      <header className="topbar">
        <a className="logoWrap" href="#top"><img src="/logo.png" alt="Billig-Reiser.no" /></a>
        <nav>
          <a href="#sok">Fly</a><a href="#hotell">Hotell</a><a href="#aktiviteter">Turer & Aktiviteter</a><a href="#guider">Reiseguider</a>
        </nav>
        <PartnerButton hrefKey="weeklyDeals" className="topDeal">Ukens Tilbud</PartnerButton>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroBg" />
          <div className="heroShade" />
          <div className="heroInner">
            <div className="heroText">
              <p className="mini">Billig-reiser.no</p>
              <h1>Finn Billige Reiser fra Norge ✈</h1>
              <p>Sammenlign fly, hotell, leiebil og aktiviteter — og spar penger på din neste reise.</p>
            </div>

            <section id="sok" className="searchBox">
              <div className="tabs">
                {Object.entries(TABS).map(([key, tab]) => <button key={key} className={key === activeTab ? "active" : ""} onClick={() => { setActiveTab(key); setMessage(""); }}>{tab.label}</button>)}
              </div>
              <form onSubmit={handleSearch} className="searchForm">
                {current.fields.map(([label, placeholder, type]) => <label key={label}><span>{label}</span><input type={type} placeholder={placeholder} /></label>)}
                <button className="searchBtn" type="submit">Søk</button>
              </form>
              {message && <p className="status">{message}</p>}
              <div className="quickLinks">
                <PartnerButton hrefKey={current.link}>Gå til partner</PartnerButton>
                <PartnerButton hrefKey="packages" className="ghost">Pakkereiser</PartnerButton>
                <PartnerButton hrefKey="carDeals" className="ghost">Leiebil</PartnerButton>
              </div>
            </section>
          </div>
        </section>

        <section className="section" id="hotell">
          <h2>🔥 Beste <span>reisetilbud</span> akkurat nå</h2>
          <div className="featureGrid">
            {cards.map((card) => <article className="featureCard" key={card.title} style={{ backgroundImage: `linear-gradient(0deg, rgba(10,8,16,.9), rgba(10,8,16,.2)), url(${card.image})` }}>
              <div><h3>{card.title}</h3><p>{card.text}</p></div><PartnerButton hrefKey={card.link}>{card.cta} ›</PartnerButton>
            </article>)}
          </div>
        </section>

        <section className="section" id="aktiviteter">
          <h2>Populære reisemål fra Norge 🌴</h2>
          <div className="destinationGrid">
            {destinations.map((dest) => <a className="destination" href={LINKS[dest.link]} target="_blank" rel="noopener noreferrer sponsored" key={dest.city}>
              <img src={dest.image} alt={dest.city} /><div><h3>{dest.city}</h3><p>{dest.text}</p></div>
            </a>)}
          </div>
        </section>

        <section className="dealBand">
          <div><p className="mini">Interaktiv logo</p><h2>Hold over logoen – flyet tar av</h2><p>Logoen i toppen har hover-effekt og passer som merkevare for en mer moderne affiliate-side.</p></div>
          <PartnerButton hrefKey="weeklyDeals">Se ukens tilbud</PartnerButton>
        </section>

        <section className="section partners" id="guider">
          <h2>Vi samarbeider med</h2>
          <div className="partnerRow">{partners.map((p) => <span key={p}>{p}</span>)}</div>
          <p className="legal">Billig-Reiser.no er en affiliate- og sammenligningsside. Endelige priser, vilkår, betaling og kundeservice håndteres av leverandøren du bestiller hos.</p>
        </section>
      </main>

      <footer><strong>Billig-Reiser.no</strong><span> · </span><a href="mailto:Post@billig-reiser.no">Post@billig-reiser.no</a><span> · © 2026</span></footer>
    </div>
  );
}
