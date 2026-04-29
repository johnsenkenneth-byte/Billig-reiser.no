
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
  fly: { label: "Fly", cta: "Søk fly", link: "flightDeals", fields: [["Fra","OSL","text"],["Til","BCN","text"],["Avreise","","date"],["Reisende","2 voksne","text"]] },
  hotell: { label: "Hotell", cta: "Søk hotell", link: "hotels", fields: [["By eller hotell","Barcelona","text"],["Innsjekk","","date"],["Utsjekk","","date"],["Gjester","2 voksne","text"]] },
  pakkereise: { label: "Pakkereise", cta: "Søk pakkereise", link: "packages", fields: [["Reisemål","Malaga","text"],["Avreise","","date"],["Varighet","7 netter","text"],["Reisende","2 voksne","text"]] },
  leiebil: { label: "Leiebil", cta: "Søk leiebil", link: "carDeals", fields: [["Hentested","Alicante flyplass","text"],["Leveringssted","Samme sted","text"],["Hentedato","","date"],["Returdato","","date"]] },
  aktiviteter: { label: "Aktiviteter", cta: "Søk aktiviteter", link: "activities", fields: [["By eller reisemål","Roma","text"],["Dato","","date"],["Personer","2 personer","text"],["Type","Guidet tur","text"]] }
};

const destinations = [
  ["Barcelona","Spania","Sol, byliv og strand","https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80"],
  ["Roma","Italia","Historie, mat og opplevelser","https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80"],
  ["Paris","Frankrike","Weekend, kultur og romantikk","https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80"],
  ["Malaga","Spania","Strand, varme og gode priser","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"]
];

function Button({ hrefKey, children, light = false, onClick }) {
  return <a className={light ? "button buttonLight" : "button"} href={LINKS[hrefKey] || "#"} target="_blank" rel="noopener noreferrer" onClick={onClick}>{children}</a>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("fly");
  const [notice, setNotice] = useState("");
  const current = useMemo(() => TABS[activeTab], [activeTab]);

  function handleSearch(event) {
    event.preventDefault();
    setNotice(activeTab === "fly"
      ? "Flysøk er klart for Amadeus API. Når API-nøklene legges i Vercel, kan vi vise ekte flypriser her."
      : `${current.label} sendes foreløpig videre til valgt samarbeidspartner.`
    );
  }

  return (
    <div className="site">
      <header className="header">
        <a href="#" className="brand"><img src="/logo.png" alt="Billig-reiser.no logo" /></a>
        <nav><a href="#sok">Søk</a><a href="#reisemal">Reisemål</a><a href="#fordeler">Fordeler</a><a href="#vilkar">Vilkår</a><a href="#kontakt">Kontakt</a></nav>
      </header>

      <main>
        <section className="hero">
          <div className="heroImage" /><div className="heroOverlay" />
          <div className="heroContent">
            <div className="heroCopy">
              <p className="eyebrow">Billige reiser · premium søk · norske brukere</p>
              <h1>Finn billigere reiser<span>uten å lete overalt</span></h1>
              <p className="lead">Sammenlign fly, hotell, pakkereiser, leiebil og aktiviteter. Billig-reiser.no sender deg videre til relevante samarbeidspartnere.</p>
              <div className="heroButtons"><a className="button" href="#sok">Start søk</a><Button hrefKey="weeklyDeals" light>Se ukens tilbud</Button></div>
            </div>

            <section id="sok" className="searchPanel">
              <div className="tabBar">
                {Object.entries(TABS).map(([key, tab]) => <button key={key} type="button" className={activeTab === key ? "tab active" : "tab"} onClick={() => {setActiveTab(key); setNotice("");}}>{tab.label}</button>)}
              </div>
              <form onSubmit={handleSearch}>
                <div className="fields">{current.fields.map(([label, placeholder, type]) => <label key={label}><span>{label}</span><input type={type} placeholder={placeholder} /></label>)}</div>
                <div className="actions"><button className="button" type="submit">{current.cta}</button><Button hrefKey={current.link} light>Gå til partner</Button></div>
              </form>
              {notice && <div className="notice">{notice}</div>}
            </section>
          </div>
        </section>

        <section id="fordeler" className="section introStrip">
          <div><span>01</span><h3>Én ryddig søkeflate</h3><p>Fly, hotell, pakkereise, leiebil og aktiviteter i samme modul.</p></div>
          <div><span>02</span><h3>Partnerbasert booking</h3><p>Bestillinger gjennomføres hos våre samarbeidspartnere.</p></div>
          <div><span>03</span><h3>Klar for API</h3><p>Amadeus-ruten ligger klar og kan aktiveres senere.</p></div>
        </section>

        <section className="section"><div className="sectionHeader"><p className="eyebrow">Utvalgte kategorier</p><h2>Finn reisen på din måte</h2></div>
          <div className="cleanCards">
            <article><h3>Fly + hotell</h3><p>Perfekt for deg som vil bestille reisen samlet.</p><Button hrefKey="packages">Se pakkereiser</Button></article>
            <article><h3>Hotell</h3><p>Finn hotell, strandhotell og overnatting.</p><Button hrefKey="hotels">Se hotell</Button></article>
            <article><h3>Leiebil</h3><p>Sammenlign leiebil og kampanjer.</p><Button hrefKey="carDeals">Se leiebil</Button></article>
          </div>
        </section>

        <section id="reisemal" className="section"><div className="sectionHeader"><p className="eyebrow">Inspirasjon</p><h2>Populære reisemål</h2></div>
          <div className="destinations">{destinations.map(([city,country,text,image]) => <article key={city}><img src={image} alt={city}/><div><h3>{city}</h3><p>{country}</p><span>{text}</span></div></article>)}</div>
        </section>

        <section className="section premiumPromo"><p className="eyebrow">Reisekupp</p><h2>Spar enda mer på reisen</h2><p>Se weekly deals, medlemsfordeler og reisetips samlet på ett sted.</p><div className="promoButtons"><Button hrefKey="weeklyDeals" light>Ukens tilbud</Button><Button hrefKey="rewards" light>Medlemsfordeler</Button><Button hrefKey="travelGuide" light>Reisetips</Button></div></section>

        <section id="vilkar" className="section legalGrid">
          <article><h2>Vilkår og betingelser</h2><p>Billig-reiser.no er en sammenligningstjeneste for reiser. Vi viser informasjon, kategorier og lenker som kan sende deg videre til eksterne samarbeidspartnere.</p><p>Selve bestillingen, betalingen, kundeservice, endringer og eventuell kansellering håndteres av den aktuelle leverandøren du bestiller hos.</p><p>Priser, tilgjengelighet og vilkår kan endres hos leverandørene. Endelig pris og informasjon vises hos leverandøren før bestilling.</p></article>
          <article><h2>Personvern</h2><p>Vi samler ikke inn betalingsinformasjon eller passopplysninger. Slike opplysninger gis kun direkte til leverandøren du eventuelt bestiller hos.</p><p>Vi kan bruke anonym statistikk, tekniske cookies og affiliate-sporing for å forbedre nettsiden og forstå hvilke lenker som brukes.</p><p>Kontakt oss på Post@billig-reiser.no dersom du har spørsmål om personvern eller behandling av opplysninger.</p></article>
        </section>

        <section id="kontakt" className="section contact"><div><p className="eyebrow">Kontakt</p><h2>Kontakt oss</h2><p>Har du spørsmål, trenger hjelp eller ønsker samarbeid?</p><a href="mailto:Post@billig-reiser.no">Post@billig-reiser.no</a></div></section>
      </main>

      <footer><p>© 2026 Billig-reiser.no · Org.nr: 937 505 248</p><p>Billig-reiser.no sammenligner priser på fly, hotell og opplevelser.</p><p>Bestillinger gjennomføres hos våre samarbeidspartnere.</p></footer>
    </div>
  );
}
