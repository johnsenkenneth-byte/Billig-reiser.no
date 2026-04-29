import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Bell, Heart, UserCircle, Plane, CalendarDays, Search, Globe2, Dice5,
  Flame, Radar, ShieldCheck, Users, Zap, MapPin, ChevronRight, Car, Hotel,
  BadgePercent, Menu, X, RefreshCw
} from "lucide-react";
import "./style.css";

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

const ticker = [
  ["Oslo", "Roma", "499 kr", "-52%"],
  ["Bergen", "Nice", "649 kr", "-41%"],
  ["Stavanger", "Krakow", "399 kr", "-56%"],
  ["Trondheim", "Bangkok", "3290 kr", "-35%"]
];

const pins = [
  { name: "New York", price: "fra 2990 kr", off: "-41%", x: 23, y: 26, tone: "blue", img: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=300&q=80" },
  { name: "Roma", price: "fra 499 kr", off: "-52%", x: 60, y: 24, tone: "pink", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=80" },
  { name: "Dubai", price: "fra 1499 kr", off: "-36%", x: 70, y: 43, tone: "green", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80" },
  { name: "Bali", price: "fra 3290 kr", off: "-35%", x: 89, y: 48, tone: "pink", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80" },
  { name: "Rio de Janeiro", price: "fra 5280 kr", off: "-28%", x: 33, y: 62, tone: "orange", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=300&q=80" },
  { name: "Cape Town", price: "fra 3990 kr", off: "-32%", x: 63, y: 72, tone: "blue", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=300&q=80" }
];

const deals = [
  { city: "Roma", route: "Oslo (OSL) → Roma (FCO)", price: "499 kr", old: "1049 kr", off: "-52%", seats: "Kun 2 seter igjen!", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80", link: LINKS.flightDeals },
  { city: "Nice", route: "Bergen (BGO) → Nice (NCE)", price: "649 kr", old: "1099 kr", off: "-41%", seats: "3 seter igjen!", image: "https://images.unsplash.com/photo-1533614767277-878cc6d7c18b?auto=format&fit=crop&w=900&q=80", link: LINKS.flightDeals },
  { city: "Bangkok", route: "Oslo (OSL) → Bangkok (BKK)", price: "3290 kr", old: "5090 kr", off: "-35%", seats: "5 seter igjen!", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80", link: LINKS.packages },
  { city: "Barcelona", route: "Stavanger (SVG) → Barcelona (BCN)", price: "799 kr", old: "1459 kr", off: "-45%", seats: "4 seter igjen!", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80", link: LINKS.flightDeals }
];

const partners = ["Expedia", "Hotels.com", "Cheap Travels", "EconomyBookings", "Enjoy Travel", "Amadeus API"];

function go(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function Header() {
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function logoClick(event) {
    event.preventDefault();
    setActive(true);
    window.setTimeout(() => setActive(false), 900);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <header className="topbar">
        <a className={`brand ${active ? "isActive" : ""}`} href="#" onClick={logoClick} aria-label="Billig-reiser.no hjem">
          <span className="logoOrbit" />
          <img src="/logo-active.png" alt="Billig-reiser.no" />
        </a>
        <nav className={menuOpen ? "open" : ""}>
          <a href="#deals">DEALS</a>
          <a href={LINKS.flightDeals} target="_blank" rel="noreferrer">FLY</a>
          <a href={LINKS.hotels} target="_blank" rel="noreferrer">HOTELL</a>
          <a href={LINKS.carDeals} target="_blank" rel="noreferrer">LEIEBIL</a>
          <a href="#hack">REISEHACKS</a>
          <a href={LINKS.travelGuide} target="_blank" rel="noreferrer">GUIDER</a>
        </nav>
        <div className="topActions">
          <span><Bell size={20}/> Varsler</span>
          <span><Heart size={22}/> Favoritter</span>
          <UserCircle size={34}/>
        </div>
        <button className="menuBtn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Meny">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
    </>
  );
}

function LiveTicker() {
  return (
    <div className="ticker">
      <b><span className="liveDot"/> LIVE DEALS</b>
      {ticker.map((t, i) => (
        <a key={i} href={LINKS.flightDeals} target="_blank" rel="noreferrer">
          <Zap size={15}/>{t[0]} → <em>{t[1]}</em> fra {t[2]} <strong>{t[3]}</strong>
        </a>
      ))}
      <a className="all" href={LINKS.weeklyDeals} target="_blank" rel="noreferrer">Se alle deals →</a>
    </div>
  );
}

function SearchPanel() {
  return (
    <div className="searchBox" id="sok">
      <div className="tabs">
        <button className="active"><Plane size={18}/>Hvor vil du reise?</button>
        <button><Globe2 size={18}/>Hvor som helst</button>
        <button><Dice5 size={18}/>Ta meg et sted!</button>
      </div>
      <div className="fieldGrid">
        <label><small>Fra</small><span><Plane size={20}/>Oslo (OSL)</span></label>
        <label><small>Til</small><span><Plane size={20}/>Hvor som helst</span></label>
        <label><small>Avreise</small><span><CalendarDays size={18}/>Når som helst</span></label>
        <label><small>Retur</small><span><CalendarDays size={18}/>Når som helst</span></label>
        <label><small>Reisende</small><span><UserCircle size={19}/>1 voksen, Økonomi</span></label>
      </div>
      <button className="primary" onClick={() => go(LINKS.flightDeals)}>SØK REISER <Search size={23}/></button>
    </div>
  );
}

function MapPanel() {
  return (
    <section className="mapPanel" aria-label="Live reisekart">
      <div className="mapTitle">LIVE REISEKART <b>+LIVE</b></div>
      <div className="routeLine line1" />
      <div className="routeLine line2" />
      <div className="routeLine line3" />
      {pins.map((p) => (
        <button key={p.name} className={`pin ${p.tone}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => go(LINKS.weeklyDeals)}>
          <span className="pinPulse"><MapPin size={18}/></span>
          <img src={p.img} alt="" />
          <span className="pinText"><b>{p.name}</b><small>{p.price}</small><em>{p.off}</em></span>
        </button>
      ))}
      <div className="zoom"><button>+</button><button>−</button><button>⌾</button></div>
    </section>
  );
}

function Hero() {
  return (
    <main className="heroShell">
      <section className="leftHero">
        <h1>Finn din neste reise.<span>For mindre.</span></h1>
        <p>Live priser. Smarte hacks. De beste tilbudene – samlet fra våre partnere.</p>
        <SearchPanel />
      </section>
      <MapPanel />
    </main>
  );
}

function FeatureGrid() {
  return (
    <section className="contentGrid">
      <div className="feature"><Bell/><b>Prisfall-alerter</b><p>Bli varslet når prisen på dine favorittruter faller.</p><button>SE ALERTS (12)</button></div>
      <div className="feature"><Radar/><b>Hvor langt kommer jeg for 2000 kr?</b><p>Se alle destinasjoner du kan reise til innenfor ditt budsjett.</p><button>UTFORSK PÅ KART</button></div>
      <div className="feature"><Dice5/><b>Random deal generator</b><p>La oss finne et sted billig for deg!</p><button onClick={() => go(LINKS.weeklyDeals)}>TA MEG ET STED!</button></div>
      <div className="feature orange"><Flame/><b>Stealth Deals</b><p>Eksklusive tilbud du ikke finner andre steder.</p><button onClick={() => go(LINKS.rewards)}>VIS SKJULTE DEALS (3)</button></div>
      <aside className="routeCard" id="hack">
        <h3>HACK RUTEN DIN <span>NY</span></h3>
        <p>Oslo (OSL) → Bali (DPS)</p>
        <div className="route"><span>OSL</span><i></i><span>IST</span><i></i><span>KUL</span><i></i><span>DPS</span></div>
        <div className="routeMeta"><small>Smart rute<br/>13t 35m reisetid</small><div>Totalpris<b>3 100 kr</b><del>7500 kr</del></div></div>
        <button onClick={() => go(LINKS.packages)}>SE RUTEN OG BOOK <ChevronRight size={20}/></button>
      </aside>
    </section>
  );
}

function Deals() {
  return (
    <section className="deals" id="deals">
      <h2>🔥 HOTTEST DEALS RIGHT NOW</h2>
      <div className="dealGrid">
        {deals.map((d) => (
          <article key={d.city} className="deal">
            <img src={d.image} alt={d.city}/>
            <span className="discount">{d.off}</span>
            <Heart className="heart"/>
            <div>
              <h3>{d.route}</h3>
              <p><CalendarDays size={14}/> 14. mai - 18. mai · 4 dager</p>
              <b>{d.price}</b> <del>{d.old}</del>
              <small>{d.seats}</small>
              <button onClick={() => go(d.link)}>SE DEAL</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Bottom() {
  return (
    <>
      <section className="bottomRow">
        <div><BadgePercent/> <b>Eksklusive tilbud</b><span>Kun for våre brukere</span></div>
        <div><Zap/> <b>Live priser</b><span>Oppdatert hvert minutt</span></div>
        <div><ShieldCheck/> <b>Trygt og enkelt</b><span>Vi sammenligner – du sparer</span></div>
        <div><Users/> <b>Tusener av reisende</b><span>Stoler på oss hver dag</span></div>
        <div><Globe2/> <b>Hele verden</b><span>Én søk. Uendelige muligheter</span></div>
      </section>
      <section className="miniSections">
        <article><Plane/><h3>Fly</h3><p>Affiliate nå. Amadeus API senere.</p></article>
        <article><Hotel/><h3>Hotell</h3><p>Send trafikk til hotellpartnere.</p></article>
        <article><Car/><h3>Leiebil</h3><p>Koble EconomyBookings og Enjoy Travel.</p></article>
      </section>
      <section className="partners"><h2>Vi samarbeider med</h2><div>{partners.map((p) => <span key={p}>{p}</span>)}</div></section>
      <footer>© 2026 Billig-reiser.no · Affiliate-lenker kan gi provisjon · Kontakt: Post@billig-reiser.no</footer>
    </>
  );
}

function App() {
  return <div className="app"><Header/><LiveTicker/><Hero/><FeatureGrid/><Deals/><Bottom/></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
