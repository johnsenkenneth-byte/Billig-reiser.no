import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const TODAY = "2026-06-27";
const CSS_VERSION = "129";
const BOOKING_AID = "1522412";
const GYG = "https://www.getyourguide.no/s/?partner_id=FIQDAEB&utm_medium=local_partners&q=";
const FERRYHOPPER = "https://clk.tradedoubler.com/click?p=382549&a=3480427&url=https%3A%2F%2Fwww.ferryhopper.com%2Fno%2F";

const img = {
  crete: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Aerial_view_of_Balos_Beach_and_Lagoon_on_Crete%2C_Greece.jpg/1280px-Aerial_view_of_Balos_Beach_and_Lagoon_on_Crete%2C_Greece.jpg",
  chania: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chania%2C_old_harbour_2019a.jpg/1280px-Chania%2C_old_harbour_2019a.jpg",
  creteRethymno: "/assets/hellas/kreta/rethymno-harbour.webp",
  creteElounda: "/assets/hellas/kreta/elounda-bay.webp",
  creteAgiosNikolaos: "/assets/hellas/kreta/agios-nikolaos-harbour.webp",
  cretePeskesi: "/assets/hellas/kreta/peskesi-restaurant.webp",
  creteTamam: "/assets/hellas/kreta/tamam-restaurant-chania.webp",
  creteAvli: "/assets/hellas/kreta/avli-rustic-fine-dining.webp",
  creteBalos: "/assets/hellas/kreta/balos-beach.webp",
  creteElafonissi: "/assets/hellas/kreta/elafonissi-beach.webp",
  creteFalassarna: "/assets/hellas/kreta/falassarna-beach.webp",
  cretePreveli: "/assets/hellas/kreta/preveli-beach.webp",
  rhodes: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Pier_at_Lindos._Rhodes%2C_Greece.jpg/1280px-Pier_at_Lindos._Rhodes%2C_Greece.jpg",
  rhodesOld: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Lindos_Windmill.jpg/1280px-Lindos_Windmill.jpg",
  kos: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Kos_-_Strand_beiTigkaki.JPG/1280px-Kos_-_Strand_beiTigkaki.JPG",
  santorini: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Oia%2C_Santorini_HDR_sunset.jpg/1280px-Oia%2C_Santorini_HDR_sunset.jpg",
  santoriniImerovigli: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imerovigli_01.jpg/1280px-Imerovigli_01.jpg",
  santoriniFira: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Nea_Kameni_seen_from_Fira_-_Santorini_-_Greece.jpg/1280px-Nea_Kameni_seen_from_Fira_-_Santorini_-_Greece.jpg",
  santoriniKamari: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Kamari_Beach%2C_Santorini%2C_Greece_-_panoramio.jpg/1280px-Kamari_Beach%2C_Santorini%2C_Greece_-_panoramio.jpg",
  santoriniPerissa: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Beach_-_Perissa_-_Santorini_-_Greece_-_02.jpg/1280px-Beach_-_Perissa_-_Santorini_-_Greece_-_02.jpg",
  santoriniPerivolos: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Perivolos_beach%2C_Santorini_%281335681187%29.jpg/1280px-Perivolos_beach%2C_Santorini_%281335681187%29.jpg",
  santoriniVlychada: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Santorin_%28GR%29%2C_Exomytis%2C_Vlychada_Beach_--_2017_--_2791.jpg/1280px-Santorin_%28GR%29%2C_Exomytis%2C_Vlychada_Beach_--_2017_--_2791.jpg",
  santoriniRedBeach: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Red_Beach_in_Santorini.jpg/1280px-Red_Beach_in_Santorini.jpg",
  santoriniAkrotiri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Archaeological_site_of_Akrotiri_-_Santorini_-_July_12th_2012_-_98.jpg/1280px-Archaeological_site_of_Akrotiri_-_Santorini_-_July_12th_2012_-_98.jpg",
  santoriniCaldera: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Alexander_-_Cycladic_Cruises_tour_ship_-_Santorini_-_Greece_-_01.jpg/1280px-Alexander_-_Cycladic_Cruises_tour_ship_-_Santorini_-_Greece_-_01.jpg",
  santoriniVineyard: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Santorini_vineyard.jpg/1280px-Santorini_vineyard.jpg",
  santoriniFood: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Tomato_fritters_of_Santorini_%28Tomatokeftedes%29.jpg/1280px-Tomato_fritters_of_Santorini_%28Tomatokeftedes%29.jpg",
  santoriniBeach: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Kamari_Beach%2C_Santorini%2C_Greece_-_panoramio.jpg/1280px-Kamari_Beach%2C_Santorini%2C_Greece_-_panoramio.jpg",
  corfu: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Old_Corfu_town_aerial_01.jpg/1280px-Old_Corfu_town_aerial_01.jpg",
  zakynthos: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Navagio%2C_Zante_02.jpg/1280px-Navagio%2C_Zante_02.jpg",
  mykonos: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Little_Venice%2C_Mykonos.jpg/1280px-Little_Venice%2C_Mykonos.jpg",
  naxos: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Portara_Naxos_31.jpg/1280px-Portara_Naxos_31.jpg",
  paros: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Castle_of_Naoussa%2C_Paros%2C_119120.jpg/1280px-Castle_of_Naoussa%2C_Paros%2C_119120.jpg",
  athens: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg/1280px-The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg",
  ferry: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Castle_of_Naoussa%2C_Paros%2C_119120.jpg/1280px-Castle_of_Naoussa%2C_Paros%2C_119120.jpg",
  knossos: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Knossos_Palace_Crete.jpg/1280px-Knossos_Palace_Crete.jpg",
  hotelCrete: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chania%2C_old_harbour_2019a.jpg/1280px-Chania%2C_old_harbour_2019a.jpg",
  hotelRhodes: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Pier_at_Lindos._Rhodes%2C_Greece.jpg/1280px-Pier_at_Lindos._Rhodes%2C_Greece.jpg",
  hotelKos: "https://www.staysomedays.com/wp-content/uploads/2018/08/oku-kos-casa-cook-hotel-grece-piscine-800x800.jpg",
  hotelSantorini: "https://www.thegreekfoundation.com/wp-content/uploads/2021/07/katikies-santorini-760x760.jpg",
  hotelKatikies: "https://www.thegreekfoundation.com/wp-content/uploads/2021/07/katikies-santorini-760x760.jpg",
  hotelAthens: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg/1280px-The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg"
};

const bookingHotel = (slug) => `https://www.booking.com/hotel/gr/${slug}.no.html?aid=${BOOKING_AID}&no_rooms=1&group_adults=2&selected_currency=NOK`;
const bookingSearch = (query) => `https://www.booking.com/searchresults.no.html?aid=${BOOKING_AID}&ss=${encodeURIComponent(query)}&group_adults=2&no_rooms=1&selected_currency=NOK`;
const gyg = (query) => `${GYG}${encodeURIComponent(query)}`;
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const attr = (value) => esc(value).replace(/`/g, "&#96;");

const islands = [
  {
    name: "Kreta",
    slug: "kreta",
    region: "Størst og mest variert",
    hero: img.crete,
    cardImage: img.crete,
    summary: "Best for førstegangstur, familier, par, roadtrip, Chania, Elafonissi, Balos, Knossos og Samaria-ravinen.",
    intro: [
      "Kreta er Hellas-valget når du vil ha mest mulig på én tur: byliv i Chania, store strender, små fjellandsbyer, historiske steder, familiehotell og nok variasjon til en hel uke.",
      "Velg vest hvis du vil ha Chania, Balos, Elafonissi og finere bykvelder. Velg Heraklion eller Hersonissos hvis Knossos, resortlogistikk og kortere transport er viktigere."
    ],
    bestFor: "Familier, par, roadtrip, første Hellas-tur",
    airport: "Chania (CHQ) eller Heraklion (HER)",
    season: "Mai-juni og september er best. Juli og august er varmest og travlest.",
    areas: [
      ["Chania", "Best for gamleby, havn, mat, par og kort vei til vestkystens strender."],
      ["Rethymno", "God mellomting med gamleby, strand og roligere tempo.", img.creteRethymno, "Rethymno på Kreta"],
      ["Elounda", "Best for rolige resorts, Spinalonga-tur og penere feriedager ved Mirabello-bukten.", img.creteElounda, "Elounda på Kreta"],
      ["Agios Nikolaos", "Best for havneby, restauranter, innsjøen Voulismeni og kort vei til Elounda.", img.creteAgiosNikolaos, "Agios Nikolaos på Kreta"]
    ],
    hotels: [
      ["Domes Zeen Chania", "Luksus/familie", "Chania", "★★★★★", "Stilig strandresort nær Chania for par og familier.", img.hotelCrete, bookingHotel("domes-zeen-chania-a-luxury-collection-resort-chania")],
      ["Kapsaliana Village Hotel", "Boutique", "Rethymno", "★★★★", "Rolig landsbyhotell for deg som vil ha mer lokal Kreta-følelse.", img.chania, bookingHotel("kapsaliana-village")],
      ["Lyttos Mare", "Familie", "Hersonissos", "★★★★★", "Sterkt familievalg med basseng, strand og enkel charterlogistikk.", img.crete, bookingHotel("lyttos-mare")]
    ],
    food: [
      ["Peskesi", "Heraklion-klassiker for kretisk mat med råvarer og tradisjon i sentrum.", img.cretePeskesi, "Peskesi på Kreta"],
      ["TAMAM Restaurant Chania", "Populær Chania-favoritt i gamlebyen. Bestill bord i høysesong.", img.creteTamam, "TAMAM Restaurant Chania på Kreta"],
      ["Avli Rustic Fine Dining Restaurant", "Rethymno-valg for en penere middag i historiske omgivelser.", img.creteAvli, "Avli Rustic Fine Dining Restaurant på Kreta"],
      ["Billig tips", "Se etter grillsteder, dakos, gyros og små tavernaer et par kvartaler fra havnefronten."]
    ],
    beaches: [
      ["Balos", "Wow-stranden. Best tidlig, og enklest med planlagt båt/transport.", img.creteBalos, "Balos på Kreta"],
      ["Elafonissi", "Rosa sand og grunt vann, men svært populær i høysesong.", img.creteElafonissi, "Elafonissi på Kreta"],
      ["Falassarna", "Lang strand, solnedgang og ofte bedre plass.", img.creteFalassarna, "Falassarna på Kreta"],
      ["Preveli", "Palmer, elv og annerledes stranddag på sørkysten.", img.cretePreveli, "Preveli på Kreta"]
    ],
    activities: [
      ["Knossos og Heraklion", "Historie og museum som passer godt tidlig i ferien.", gyg("Crete Knossos Heraklion tour")],
      ["Balos og Gramvousa", "Båttur som gjør logistikken enklere og gir en fin heldag på sjøen.", gyg("Crete Balos Gramvousa boat trip")],
      ["Samaria-ravinen", "Heldagstur for aktive reisende og naturinteresserte.", gyg("Crete Samaria Gorge hike")]
    ]
  },
  {
    name: "Rhodos",
    slug: "rhodos",
    region: "Charterklassiker",
    hero: img.rhodes,
    cardImage: img.rhodes,
    summary: "Best for Lindos, gamlebyen, barnevennlige resorts, varme kvelder, Anthony Quinn Bay og båtutflukter.",
    intro: [
      "Rhodos fungerer godt fordi øya kombinerer sol, gamleby, familiehotell, Lindos og varme kvelder. Det er et trygt valg for charter og enkle ukeferier.",
      "Bo nær Rhodos by hvis du vil ha mat, historie og kvelder. Velg Faliraki, Kolymbia eller Kiotari for resortferie. Lindos passer best for par og voksne."
    ],
    bestFor: "Charter, familier, par, all inclusive",
    airport: "Rhodos (RHO)",
    season: "Mai-oktober. September er ofte en veldig god måned.",
    areas: [
      ["Rhodos by", "Best for gamleby, restauranter, shopping og korte taxiturer."],
      ["Lindos", "Best for par, utsikt, penere kvelder og St Paul's Bay."],
      ["Faliraki/Kolymbia", "Best for familier, strandhotell og enklere pakkereiser."]
    ],
    hotels: [
      ["Lindos Blu Luxury Hotel", "Adults only", "Lindos", "★★★★★", "Rolig luksusvalg for par nær Lindos.", img.hotelRhodes, bookingHotel("lindos-blu")],
      ["Mitsis Selection Alila", "All inclusive", "Faliraki", "★★★★★", "Stort resortvalg med strand og enkel familieferie.", img.rhodes, bookingHotel("mitsis-alila-resort-spa")],
      ["Atrium Platinum Resort", "Luksus", "Ixia", "★★★★★", "God base mellom Rhodos by og strand, med høyere komfort.", img.rhodesOld, bookingHotel("atrium-platinum-resort-spa")]
    ],
    food: [
      ["Marco Polo Cafe", "Atmosfærisk middag i gamlebyen. Bestill i høysesong."],
      ["Mavrikos", "Lindos-klassiker for en penere gresk middag."],
      ["Kerasma", "Godt restaurantvalg i Rhodos by."],
      ["Billig tips", "Gyros, souvlaki og familietavernaer utenfor de mest trafikkerte gamlebygatene."]
    ],
    beaches: [
      ["Anthony Quinn Bay", "Vakker bukt, best tidlig på dagen."],
      ["Tsambika", "Lang sandstrand og et trygt familievalg."],
      ["St Paul's Bay", "Flott ved Lindos, men liten og populær."],
      ["Prasonisi", "Vind, surf og annerledes sørspiss."]
    ],
    activities: [
      ["Lindos dagstur", "Akropolis, hvite gater og strand i samme dag.", gyg("Rhodes Lindos tour")],
      ["Rhodos gamleby", "Guidet tur gir mer mening i middelalderbyen.", gyg("Rhodes Old Town walking tour")],
      ["Båttur fra Rhodos", "Fin dag med bukter, snorkling og roligere badestopp.", gyg("Rhodes boat trip Anthony Quinn Bay")]
    ]
  },
  {
    name: "Kos",
    slug: "kos",
    region: "Billig og enkelt",
    hero: img.kos,
    cardImage: img.kos,
    summary: "Best for sykkelvennlige dager, strandhotell, Kos by, Tigaki, Paradise Beach og dagstur til Nisyros.",
    intro: [
      "Kos er et av de enkleste Hellas-valgene når du vil ha strand, sykkel, korte avstander og ofte litt lavere pris enn Santorini/Mykonos.",
      "Kos by passer hvis du vil ha mat og kveldsliv. Tigaki og Marmari passer bedre for strand og roligere dager. Kardamena gir mer charter- og resortfølelse."
    ],
    bestFor: "Budsjett, strand, par, enkel familieferie",
    airport: "Kos (KGS)",
    season: "Mai-oktober, med juni og september som mest behagelige valg.",
    areas: [
      ["Kos by", "Best for restauranter, havn, historie og kveldsliv."],
      ["Tigaki", "Best for lang sandstrand og roligere ferie."],
      ["Marmari", "Best for strandresort og voksne som vil senke tempoet."]
    ],
    hotels: [
      ["OKU Kos", "Boutique", "Marmari", "★★★★★", "Designhotell ved stranden for par og voksne.", img.hotelKos, bookingHotel("casa-cook-kos")],
      ["Mitsis Blue Domes", "All inclusive", "Kardamena", "★★★★★", "Stort resortvalg med mye inkludert og enkel familieferie.", img.kos, bookingHotel("mitsis-blue-domes-resort-spa")],
      ["Blue Lagoon City Hotel", "Billig og bra", "Kos by", "★★★★", "Praktisk bybase nær mat, havn og kvelder.", img.kos, bookingHotel("blue-lagoon-city")]
    ],
    food: [
      ["Oromedon", "Zia-klassiker med utsikt og gresk mat."],
      ["Broadway", "Populært og moderne valg i Kos by."],
      ["Petrino", "Godt middagsvalg i Kos by."],
      ["Billig tips", "Gyros, bakerier og strandtavernaer i Tigaki gir mye ferie for pengene."]
    ],
    beaches: [
      ["Tigaki", "Lang, enkel og familievennlig."],
      ["Paradise Beach", "Populær sandstrand med klart vann."],
      ["Marmari", "Roligere stranddager og god resortlogistikk."],
      ["Agios Stefanos", "Fotogen strand med utsikt mot Kastri-øya."]
    ],
    activities: [
      ["Nisyros dagstur", "Vulkanøy og en tydelig opplevelse fra Kos.", gyg("Kos Nisyros volcano day trip")],
      ["Kos by og Asklepieion", "Historie, havn og enkel halvdagstur.", gyg("Kos Asklepieion tour")],
      ["Båttur fra Kos", "3-øyers turer passer godt for familier og førstegangsreisende.", gyg("Kos three islands boat trip")]
    ]
  },
  {
    name: "Santorini",
    slug: "santorini",
    region: "Romantikk og utsikt",
    hero: img.santorini,
    cardImage: img.santorini,
    summary: "Best for Oia, Imerovigli, caldera-hotell, solnedgang, vin, Akrotiri og båttur i vulkanområdet.",
    intro: [
      "Santorini er spektakulær, men ikke den beste øya for billig lang strandferie. Den er best når du vil ha utsikt, hotellopplevelse, solnedgang, vin og 2-4 netter som føles spesielle.",
      "Oia er mest ikonisk og dyrest. Imerovigli er ofte det beste parvalget. Fira gir mer liv og bedre logistikk. Kamari/Perissa er rimeligere hvis strand betyr mer enn caldera."
    ],
    bestFor: "Par, bryllupsreise, kort luksustur",
    airport: "Santorini (JTR)",
    season: "Mai-juni og september-oktober. Juli og august er svært travelt.",
    areas: [
      ["Oia", "Best for ikonisk utsikt, romantikk og høy pris.", img.santorini, "Oia på Santorini"],
      ["Imerovigli", "Best for roligere luksus og caldera uten like mye trengsel.", img.santoriniImerovigli, "Imerovigli på Santorini"],
      ["Fira", "Best for logistikk, buss, restauranter og mer kveldsliv.", img.santoriniFira, "Utsikt fra Fira på Santorini"]
    ],
    hotels: [
      ["Canaves Oia Suites", "Luksus", "Oia", "★★★★★", "Ikonisk caldera-hotell for en stor parreise.", img.santorini, bookingHotel("canaves-oia-suites"), "Oia på Santorini"],
      ["Katikies Santorini", "Boutique", "Oia", "★★★★★", "Klassisk Santorini-hotell med hvit arkitektur og utsikt.", img.hotelKatikies, bookingHotel("katikies")],
      ["Anassa Deluxe Suites", "Billigere base", "Kamari", "★★★★", "Smart valg når strand og pris er viktigere enn caldera.", img.santoriniKamari, bookingHotel("anassa-deluxe-suites"), "Kamari-stranden på Santorini"]
    ],
    food: [
      ["Metaxi Mas", "Et av øyas beste allround-valg, litt unna Oia-prisene.", img.santoriniFood, "Santorini-mat"],
      ["Selene", "Finere Santorini-middag for matinteresserte.", img.santoriniVineyard, "Vinmarker på Santorini"],
      ["To Psaraki", "Godt sjømatvalg ved Vlychada.", img.santoriniVlychada, "Vlychada på Santorini"],
      ["Billig tips", "Gyros i Fira, bakerier og enklere steder i Karterados/Firostefani.", img.santoriniFood, "Tomatokeftedes fra Santorini"]
    ],
    beaches: [
      ["Perissa og Perivolos", "Mest praktiske strandvalg med svart sand.", img.santoriniPerivolos, "Perivolos-stranden på Santorini"],
      ["Kamari", "Enkel strandbase med hoteller og restauranter.", img.santoriniKamari, "Kamari-stranden på Santorini"],
      ["Vlychada", "Mer dramatisk landskap og roligere følelse.", img.santoriniVlychada, "Vlychada-stranden på Santorini"],
      ["Red Beach", "Fotogen, men best som kort stopp, ikke heldagsstrand.", img.santoriniRedBeach, "Red Beach på Santorini"]
    ],
    activities: [
      ["Caldera cruise", "Klassisk tur med caldera-utsikt, badestopp og solnedgang.", gyg("Santorini caldera sunset cruise"), img.santoriniCaldera, "Båt i calderaen på Santorini"],
      ["Akrotiri", "Historie og arkeologi som gir variasjon fra utsikt og solnedgang.", gyg("Santorini Akrotiri tour"), img.santoriniAkrotiri, "Akrotiri-utgravningene på Santorini"],
      ["Vinsmaking", "Santorini-vin og solnedgang passer svært godt for par.", gyg("Santorini wine tasting tour"), img.santoriniVineyard, "Vinmarker på Santorini"]
    ]
  },
  {
    name: "Korfu",
    slug: "korfu",
    region: "Grønn øyferie",
    hero: img.corfu,
    cardImage: img.corfu,
    summary: "Best for gamleby, Paleokastritsa, Porto Timoni, grønt landskap, familieferie og roligere taverna-kvelder.",
    intro: [
      "Korfu er grønnere og mer venetiansk enn mange andre greske øyer. Den passer godt når du vil ha gamleby, strender, bilturer og en litt mykere øyfølelse.",
      "Korfu by er best for korte turer og mat. Paleokastritsa og nordvest passer for natur og bukter. Dassia/Gouvia/Benitses er enklere resortvalg."
    ],
    bestFor: "Familier, par, natur, gamleby",
    airport: "Korfu (CFU)",
    season: "Mai-juni og september. Øya er grønnere enn Kykladene og kan få mer vær utenfor høysesong.",
    areas: [
      ["Korfu by", "Best for mat, shopping, gamleby og korttur."],
      ["Paleokastritsa", "Best for bukter, båtturer og vakker kyst."],
      ["Dassia/Gouvia", "Best for enkel resortlogistikk og familier."]
    ],
    hotels: [
      ["Angsana Corfu", "Luksus", "Benitses", "★★★★★", "Resortfølelse, basseng og høy komfort.", img.corfu, bookingHotel("angsana-corfu-resort-spa")],
      ["Corfu Imperial", "Resort", "Kommeno", "★★★★★", "Klassisk luksusresort med strand og familiekomfort.", img.corfu, bookingHotel("corfu-imperial-grecotel-exclusive-resort")],
      ["Mon Repos Palace", "Billig og bra", "Korfu by", "★★★★", "God bybase for voksne, gamleby og korte opphold.", img.corfu, bookingHotel("mayor-mon-repos-palace-art-hotel")]
    ],
    food: [
      ["Rex", "Klassisk Korfu by-valg."],
      ["Venetian Well", "Romantisk og penere middag i gamlebyen."],
      ["Salto", "Moderne og godt byvalg."],
      ["Billig tips", "Sofrito, pastitsada, gyros og små grillsteder utenfor Liston-området."]
    ],
    beaches: [
      ["Paleokastritsa", "Vakker, men populær. Kombiner med båt."],
      ["Porto Timoni", "Fotogen dobbeltstrand, krever litt innsats."],
      ["Glyfada", "God sandstrand og enkel dagstur."],
      ["Issos", "Lang strand med mer plass og sanddyner."]
    ],
    activities: [
      ["Paxos og Antipaxos", "Båttur med blått vann, små øyer og fine badestopp.", gyg("Corfu Paxos Antipaxos boat trip")],
      ["Paleokastritsa båttur", "Enkelt strand- og grottevalg.", gyg("Corfu Paleokastritsa boat tour")],
      ["Korfu by walking tour", "Fin måte å forstå den venetianske gamlebyen.", gyg("Corfu Old Town walking tour")]
    ]
  },
  {
    name: "Zakynthos",
    slug: "zakynthos",
    region: "Blå grotter og båtturer",
    hero: img.zakynthos,
    cardImage: img.zakynthos,
    summary: "Best for båtturer, skilpadder, Blue Caves, Porto Limnionas, Gerakas og utsikt over Navagio.",
    intro: [
      "Zakynthos er øya for båtturer, blått vann, grotter og utsikt. Ikke legg hele ferien til Laganas hvis du vil ha ro; velg heller Tsilivi, Alykes, Vasilikos eller Kalamaki.",
      "Navagio er mest ikonisk fra utsiktspunkt og båt. Den beste vanlige stranddagen finner du ofte på Gerakas, Banana Beach eller Porto Limnionas."
    ],
    bestFor: "Båtturer, familier, par, strandjakt",
    airport: "Zakynthos (ZTH)",
    season: "Mai-oktober. Juni og september gir best balanse.",
    areas: [
      ["Tsilivi", "Best for familier, restauranter og enkel strandferie."],
      ["Vasilikos", "Best for roligere strender og natur."],
      ["Kalamaki", "Best for familier og kort transfer."]
    ],
    hotels: [
      ["Olea All Suite Hotel", "Luksus", "Tsilivi", "★★★★★", "Stilig suitehotell for par og voksne.", img.zakynthos, bookingHotel("olea-all-suite")],
      ["Lesante Blu", "Adults only", "Tragaki", "★★★★★", "Rolig luksusvalg ved sjøen.", img.zakynthos, bookingHotel("lesante-blu-exclusive-beach-resort")],
      ["Bitzaro Boutique Hotel", "Billig og bra", "Zakynthos by", "★★★★", "Praktisk base for by, havn og utflukter.", img.zakynthos, bookingHotel("bitzaro-boutique")]
    ],
    food: [
      ["Nobelos", "Penere sjømat- og kystmåltid nord på øya."],
      ["Prosilio", "Godt middagsvalg i Zakynthos by."],
      ["To Ladofanaro", "Tavernafølelse og lokale retter."],
      ["Billig tips", "Gyros, bakerier og små tavernaer i Tsilivi/Kalamaki gir best verdi."]
    ],
    beaches: [
      ["Navagio", "Ikonisk, men sjekk tilgang og båtforhold."],
      ["Gerakas", "Vakker, roligere og naturpreget."],
      ["Porto Limnionas", "Klipper, klart vann og annerledes badedag."],
      ["Banana Beach", "Enkel stranddag med fasiliteter."]
    ],
    activities: [
      ["Blue Caves", "Klassisk båttur med klart vann, grotter og badestopp.", gyg("Zakynthos Blue Caves boat trip")],
      ["Skilpadder i Laganas-bukten", "Populært for familier.", gyg("Zakynthos turtle spotting boat trip")],
      ["Navagio utsikt og båt", "Kombiner utsiktspunkt med sjøtur når forholdene tillater det.", gyg("Zakynthos Navagio Shipwreck tour")]
    ]
  },
  {
    name: "Mykonos",
    slug: "mykonos",
    region: "Dyrere og livligere",
    hero: img.mykonos,
    cardImage: img.mykonos,
    summary: "Best for designhotell, strandklubber, Little Venice, Delos-dagstur og kortere voksenferie.",
    intro: [
      "Mykonos er vakkert, dyrt og sosialt. Det er ikke øya for mest mulig billig ferie, men den passer når du vil ha designhotell, strandklubber, restauranter og korte voksenreiser.",
      "Mykonos by er best for kvelder. Ornos og Platis Gialos er mer praktiske strandbaser. Elia og Agios Ioannis er roligere og mer resortpreget."
    ],
    bestFor: "Voksne, venner, par, design og natteliv",
    airport: "Mykonos (JMK)",
    season: "Juni og september er best. Juli og august er dyrest og mest intenst.",
    areas: [
      ["Mykonos by", "Best for kvelder, shopping og Little Venice."],
      ["Ornos", "Best for praktisk strandbase og kort vei til byen."],
      ["Platis Gialos", "Best for strand, restauranter og båt videre til andre strender."]
    ],
    hotels: [
      ["Aeolos Resort", "Billig og bra", "Mykonos by", "★★★★", "Godt vurdert base med mer verdi enn mange Mykonos-hoteller.", img.mykonos, bookingHotel("aeolos-mykonos")],
      ["Myconian Kyma", "Boutique", "Mykonos by", "★★★★★", "Designhotell for par nær byen.", img.mykonos, bookingHotel("myconian-kyma")],
      ["Cavo Tagoo Mykonos", "Luksus", "Mykonos by", "★★★★★", "Ikonisk luksusvalg med utsikt, basseng og høy komfort.", img.mykonos, bookingHotel("cavo-tagoo-mykonos")]
    ],
    food: [
      ["Kiki's Tavern", "Kultsted ved Agios Sostis, kjent for enkel grillmat."],
      ["M-Eating", "Penere middag i Mykonos by."],
      ["Kastro's", "Little Venice-stemning og utsikt."],
      ["Billig tips", "Bakerier, gyros og enkle steder i byen før strandklubbene tar budsjettet."]
    ],
    beaches: [
      ["Ornos", "Praktisk og familievennlig."],
      ["Platis Gialos", "Enkel base med mange tilbud."],
      ["Elia", "Større og litt roligere."],
      ["Agios Sostis", "Mer naturlig og mindre organisert."]
    ],
    activities: [
      ["Delos dagstur", "Den viktigste kulturutflukten fra Mykonos.", gyg("Mykonos Delos day trip")],
      ["South Coast cruise", "Båt mellom strender gjør logistikken enklere.", gyg("Mykonos south coast cruise")],
      ["Mykonos by walking tour", "Fint første kveldsvalg for Little Venice og vindmøllene.", gyg("Mykonos town walking tour")]
    ]
  },
  {
    name: "Naxos",
    slug: "naxos",
    region: "Bedre verdi",
    hero: img.naxos,
    cardImage: img.naxos,
    summary: "Best for lang strand, god mat, familie, landsbyer, Plaka, Agios Prokopios og mer ferie for pengene.",
    intro: [
      "Naxos er et av de beste øyvalgene når du vil ha Kykladene uten Santorini/Mykonos-priser. Her får du lange strender, god mat, landsbyer og en mer avslappet ferie.",
      "Bo i Naxos by for kveldsliv og ferge. Velg Agios Prokopios, Agia Anna eller Plaka hvis strand er viktigst."
    ],
    bestFor: "Familier, par, bedre verdi, strand",
    airport: "Naxos (JNX) eller ferge fra Athen/Mykonos/Santorini",
    season: "Mai-juni og september. Juli og august er travlere, men ofte mindre hektisk enn Mykonos.",
    areas: [
      ["Naxos by", "Best for ferge, mat, kveld og uten leiebil."],
      ["Agios Prokopios", "Best for strand og enkel ferie."],
      ["Plaka", "Best for lang strand og roligere tempo."]
    ],
    hotels: [
      ["Nissaki Beach Hotel", "Strand", "Agios Georgios", "★★★★★", "Strandnært og praktisk nær Naxos by.", img.naxos, bookingHotel("nissaki-beach-naxos")],
      ["Naxos Island Hotel", "Boutique", "Agios Prokopios", "★★★★★", "God strandbase for par og familier.", img.naxos, bookingHotel("naxos-island")],
      ["Galaxy Hotel", "Billig og bra", "Agios Georgios", "★★★", "Smart verdi nær strand og by.", img.naxos, bookingHotel("galaxy-naxos")]
    ],
    food: [
      ["To Elliniko", "Populær taverna med god lokal mat."],
      ["Axiotissa", "Sterkt matvalg på veien mot Kastraki."],
      ["Nostimon Hellas", "Godt byvalg med greske retter."],
      ["Billig tips", "Prøv lokale oster, poteter, souvlaki og bakerier i Naxos by."]
    ],
    beaches: [
      ["Agios Prokopios", "Et av de beste allround-strandvalgene."],
      ["Agia Anna", "Mer taverna- og familiefølelse."],
      ["Plaka", "Lang, bred og avslappet."],
      ["Mikri Vigla", "Bra for vind, kiting og aktiv stranddag."]
    ],
    activities: [
      ["Landsbytur på Naxos", "Halki, Apeiranthos og fjellområder gir øya dybde.", gyg("Naxos villages tour")],
      ["Seil- og båttur", "Bra for små bukter og badestopp.", gyg("Naxos sailing cruise")],
      ["Ferge videre", "Naxos passer perfekt med Paros, Santorini eller Mykonos.", FERRYHOPPER]
    ]
  },
  {
    name: "Paros",
    slug: "paros",
    region: "Kykladisk balanse",
    hero: img.paros,
    cardImage: img.paros,
    summary: "Best for Naoussa, Kolymbithres, par, venner og en mer avslappet Santorini/Mykonos-følelse.",
    intro: [
      "Paros er et godt kompromiss: pen kykladisk stemning, bedre priser enn Mykonos, fine strender og mer liv enn Naxos hvis du bor i Naoussa.",
      "Naoussa er penest og mest populær. Parikia er mest praktisk for ferge. Piso Livadi og Aliki gir roligere ferie."
    ],
    bestFor: "Par, venner, øyhopping, strender",
    airport: "Paros (PAS) eller ferge fra Athen/Naxos/Santorini",
    season: "Mai-juni og september. Høysesong gir mer liv, men høyere priser.",
    areas: [
      ["Naoussa", "Best for kvelder, restauranter og kykladisk stemning."],
      ["Parikia", "Best for ferge, budsjett og logistikk."],
      ["Piso Livadi", "Best for roligere strandbase."]
    ],
    hotels: [
      ["Cosme, a Luxury Collection Resort", "Luksus", "Naoussa", "★★★★★", "Luksusvalg for par nær Naoussa.", img.paros, bookingHotel("cosme-a-luxury-collection-resort-paros")],
      ["Parilio", "Boutique", "Kolymbithres", "★★★★★", "Designhotell for en roligere og penere Paros-tur.", img.paros, bookingHotel("parilio-a-member-of-design-hotels")],
      ["Senia Hotel", "Billig og bra", "Naoussa", "★★★★", "God beliggenhet og ofte sterk verdi i Naoussa.", img.paros, bookingHotel("senia")]
    ],
    food: [
      ["Barbarossa", "Kjent Naoussa-valg, best for en penere kveld."],
      ["Soso", "Lite og populært middagssted i Naoussa."],
      ["Mario", "Sjømat og kykladisk stemning."],
      ["Billig tips", "Parikia har ofte bedre verdi enn Naoussa for gyros, bakerier og enkle tavernaer."]
    ],
    beaches: [
      ["Kolymbithres", "Mest kjent, med runde granittformer og klart vann."],
      ["Santa Maria", "Populær strand med mer liv."],
      ["Golden Beach", "Bra for windsurfing og aktiv stranddag."],
      ["Monastiri", "Pen bukt nær Naoussa."]
    ],
    activities: [
      ["Antiparos dagstur", "Kort, enkel og veldig naturlig utflukt fra Paros.", gyg("Paros Antiparos day trip")],
      ["Båttur rundt Paros", "Bra for badestopp og mindre bukter.", gyg("Paros boat trip")],
      ["Ferge videre", "Paros passer perfekt med Naxos, Mykonos og Santorini.", FERRYHOPPER]
    ]
  },
  {
    name: "Athen",
    slug: "athen",
    region: "By og fergehavn",
    hero: img.athens,
    cardImage: img.athens,
    summary: "Best for Akropolis, mat, rooftopbarer, 2-3 netter og ferge videre fra Pireus til øyene.",
    intro: [
      "Athen er ikke en øy, men den er nøkkelen til mange Hellas-reiser. Bruk byen som start eller slutt på øyhopping, eller som egen storbytur med mat, historie og rooftopbarer.",
      "Bo rundt Syntagma, Plaka, Monastiraki, Koukaki eller Psyrri hvis du vil gå til det meste. Pireus er mer praktisk hvis du skal tidlig med ferge."
    ],
    bestFor: "Storby, mat, historie, øyhopping",
    airport: "Athen (ATH), ferger fra Pireus",
    season: "Mars-juni og september-november. Sommeren er varm.",
    areas: [
      ["Syntagma/Plaka", "Best for første tur, trygg logistikk og severdigheter."],
      ["Koukaki", "Best for Akropolis, kaféer og litt roligere kvelder."],
      ["Psyrri/Monastiraki", "Best for mat, barer og mer energi."]
    ],
    hotels: [
      ["Hotel Grande Bretagne", "Luksus", "Syntagma", "★★★★★", "Klassisk luksus og topp beliggenhet.", img.hotelAthens, bookingHotel("grande-bretagne")],
      ["Electra Metropolis", "Rooftop", "Syntagma", "★★★★★", "Sterkt valg for utsikt, frokost og kort vei til alt.", img.athens, bookingHotel("electra-metropolis")],
      ["The Foundry Suites", "Boutique", "Psyrri", "★★★★", "Leilighetshotell med stil og god mat-/barbase.", img.athens, bookingHotel("the-foundry-suites")]
    ],
    food: [
      ["Nolan", "Moderne og populært byvalg."],
      ["Cookoovaya", "Gresk mat med høy kvalitet."],
      ["Varoulko Seaside", "Sjømat i Pireus-området for en større middag."],
      ["Billig tips", "O Thanasis, Kostarelos, Diporto og gyros rundt Monastiraki."]
    ],
    beaches: [
      ["Athens Riviera", "Glyfada og Vouliagmeni hvis du vil ha sjøpause."],
      ["Lake Vouliagmeni", "Annerledes badestopp utenfor sentrum."],
      ["Aegina", "Kort øytur fra Pireus hvis du har en ekstra dag."],
      ["Hydra", "Pen dagstur/overnatting uten biler."]
    ],
    activities: [
      ["Akropolis", "Må bookes smart i varme perioder.", gyg("Athens Acropolis tour")],
      ["Mattur i Athen", "Veldig god aktivitet for første kveld eller første hele dag.", gyg("Athens food tour")],
      ["Ferge fra Pireus", "Start øyhopping til Naxos, Paros, Santorini, Hydra eller Aegina.", FERRYHOPPER]
    ]
  }
];

function pageHead({ title, description, canonical, image, jsonHeadline }) {
  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(description)}" />
  <link rel="canonical" href="${attr(canonical)}" />
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Billig-reiser.no" />
  <meta property="og:title" content="${attr(jsonHeadline)}" />
  <meta property="og:description" content="${attr(description)}" />
  <meta property="og:image" content="${attr(image)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/spania/spania-city.css?v=${CSS_VERSION}" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#020913" />
  <script defer src="/pwa-register.js?v=221"></script>
  <link rel="stylesheet" href="/app-features.css?v=221" />
  <script defer src="/app-features.js?v=221"></script>
  <style>
    .greece-hub-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
    .greece-route-strip{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
    .greece-route-strip a{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);border-radius:999px;padding:10px 13px;font-weight:950;color:#e8f5ff}
    .greece-note{border:1px solid rgba(103,232,249,.22);background:rgba(103,232,249,.08);border-radius:20px;padding:18px;color:#cfe7f2}
    @media(max-width:900px){.greece-hub-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:620px){.greece-hub-grid{grid-template-columns:1fr}}
  </style>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: jsonHeadline,
    description,
    about: jsonHeadline,
    author: { "@type": "Organization", name: "Billig-Reiser.no" },
    publisher: { "@type": "Organization", name: "Billig-Reiser.no" },
    mainEntityOfPage: canonical
  })}</script>
</head>`;
}

function nav(active = "Hellas") {
  return `<nav class="spain-nav">
    <a class="brand-logo" href="/index.html"><img src="/assets/billig-reiser-logo-full-v116.png" alt="Billig-reiser.no" width="1200" height="360" /></a>
    <div class="spain-menu">
      <a href="/reisemagasinet.html">Magasinet</a>
      <a class="${active === "Hellas" ? "active" : ""}" href="/hellas/">Hellas</a>
      <a href="/hellas/#oyer">Øyer</a>
      <a href="#hoteller">Hoteller</a>
      <a href="#opplevelser">Opplevelser</a>
      <a href="/index.html">Forside</a>
    </div>
  </nav>`;
}

function hotelCard([name, type, location, stars, why, image, link, imageAlt], island) {
  const altText = imageAlt || `${name} i ${island}`;
  return `<article class="mockup-hotel-card">
          <div class="mockup-hotel-media">
            <img src="${attr(image)}" alt="${attr(altText)}" loading="lazy" decoding="async" />
            <div class="mockup-photo-stars">${esc(stars)}</div>
          </div>
          <div class="mockup-hotel-content">
            <h3>${esc(name)}</h3>
            <p class="mockup-best">${esc(type)} · ${esc(location)}</p>
            <div class="mockup-location"><span>${esc(why)}</span></div>
            <p class="mockup-why">${esc(why)}</p>
            <div class="mockup-tags"><span>${esc(island)}</span><span>${esc(type)}</span><span>${esc(location)}</span></div>
            <a class="mockup-cta" href="${attr(link)}" target="_blank" rel="nofollow sponsored noopener">Sjekk pris hos Booking.com →</a>
          </div>
        </article>`;
}

function guideCard([title, text, itemImage, itemAlt], image, island) {
  const photo = itemImage || image;
  const altText = itemAlt || `${title} i ${island}`;
  return `<article class="guide-card">
          <img class="guide-card-photo" src="${attr(photo)}" alt="${attr(altText)}" loading="lazy" decoding="async" />
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </article>`;
}

function activityCard([title, text, link, itemImage, itemAlt], image, island) {
  const photo = itemImage || image;
  const altText = itemAlt || `${title} i ${island}`;
  return `<article class="activity-card">
          <img class="activity-photo" src="${attr(photo)}" alt="${attr(altText)}" loading="lazy" decoding="async" />
          <span class="badge">${link === FERRYHOPPER ? "Ferryhopper" : "GetYourGuide"}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
          <a href="${attr(link)}" target="_blank" rel="nofollow sponsored noopener">Se ${esc(title)} →</a>
        </article>`;
}

function islandPage(island) {
  const description = `${island.name} guide med hotell hos Booking.com, områder, restauranter, strender og opplevelser.`;
  return `${pageHead({
    title: `${island.name} guide 2026 | Hotell, strender og opplevelser | Billig-reiser.no`,
    description,
    canonical: `https://billig-reiser.no/hellas/${island.slug}/`,
    image: island.hero,
    jsonHeadline: `${island.name} guide 2026`
  })}
<body>
  ${nav("Hellas")}
  <header class="hero-city" style="--hero-image:url('${attr(island.hero)}')">
    <div class="hero-inner">
      <div class="kicker">Hellas · ${esc(island.region)}</div>
      <h1>${esc(island.name)}</h1>
      <p>${esc(island.summary)}</p>
      <div class="hero-actions">
        <a class="btn primary" href="#hoteller">Se hotellvalg</a>
        <a class="btn secondary" href="#opplevelser">Se opplevelser</a>
      </div>
      <div class="quick-links">
        <a href="#omrader">Hvor bo</a>
        <a href="#restauranter">Restauranter</a>
        <a href="#strender">Strender</a>
        <a href="/hellas/">Alle øyer</a>
      </div>
    </div>
  </header>
  <main>
    <section class="wrap">
      <div class="story-grid">
        <article class="story-box">
          <span class="badge">Øyguide</span>
          <h2>Derfor velger du ${esc(island.name)}</h2>
          ${island.intro.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        </article>
        <aside class="facts-box">
          <span class="badge">Kort fortalt</span>
          <ul>
            <li><strong>Passer best for:</strong> ${esc(island.bestFor)}</li>
            <li><strong>Flyplass/ankomst:</strong> ${esc(island.airport)}</li>
            <li><strong>Beste tid:</strong> ${esc(island.season)}</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="wrap" id="omrader">
      <div class="section-head">
        <div><span class="badge">Områder</span><h2>Hvor bør du bo?</h2></div>
        <p class="lead">Velg område før hotell. Det gjør hotellvalget mye enklere.</p>
      </div>
      <div class="grid">${island.areas.map((item) => guideCard(item, island.cardImage, island.name)).join("")}</div>
    </section>

    <section class="wrap wide-wrap" id="hoteller">
      <div class="section-head">
        <div><span class="badge">Booking.com</span><h2>Hotellvalg på ${esc(island.name)}</h2></div>
        <p class="lead">Utvalgte hotell hvor du kan sjekke pris og tilgjengelighet.</p>
      </div>
      <div class="hotel-list">${island.hotels.map((hotel) => hotelCard(hotel, island.name)).join("")}</div>
    </section>

    <section class="wrap" id="restauranter">
      <div class="section-head">
        <div><span class="badge">Mat</span><h2>Restauranter og billig mat</h2></div>
        <p class="lead">En miks av steder å sjekke, og hva du bør spise billig når budsjettet skal vare.</p>
      </div>
      <div class="grid">${island.food.map((item) => guideCard(item, island.cardImage, island.name)).join("")}</div>
    </section>

    <section class="wrap" id="strender">
      <div class="section-head">
        <div><span class="badge">Strender</span><h2>Beste strender</h2></div>
        <p class="lead">Velg strand etter vær, transport og reisefølge, ikke bare Instagram-bildet.</p>
      </div>
      <div class="grid">${island.beaches.map((item) => guideCard(item, island.hero, island.name)).join("")}</div>
    </section>

    <section class="wrap" id="opplevelser">
      <div class="section-head">
        <div><span class="badge">Opplevelser</span><h2>Ting å gjøre på ${esc(island.name)}</h2></div>
        <p class="lead">Aktiviteter som passer naturlig inn i reisen, med direkte vei videre.</p>
      </div>
      <div class="activity-grid">${island.activities.map((item) => activityCard(item, island.hero, island.name)).join("")}</div>
    </section>

    <section class="wrap">
      <div class="section-head">
        <div><span class="badge">Reis videre</span><h2>Flere Hellas-guider</h2></div>
      </div>
      <div class="quick-links">${islands.filter((entry) => entry.slug !== island.slug).slice(0, 8).map((entry) => `<a href="/hellas/${entry.slug}/">${esc(entry.name)}</a>`).join("")}</div>
    </section>
  </main>
  <footer class="footer">© 2026 Billig-reiser.no · Partnerlenker kan gi oss provisjon uten ekstra kostnad for deg.</footer>
</body>
</html>
`;
}

function hubPage() {
  const description = "Ryddig Hellas-guide med egne sider for Kreta, Rhodos, Kos, Santorini, Korfu, Zakynthos, Mykonos, Naxos, Paros og Athen.";
  return `${pageHead({
    title: "Hellas guide 2026 | Velg riktig øy | Billig-reiser.no",
    description,
    canonical: "https://billig-reiser.no/hellas/",
    image: img.crete,
    jsonHeadline: "Hellas guide 2026"
  })}
<body>
  ${nav("Hellas")}
  <header class="hero-city" style="--hero-image:url('${attr(img.crete)}')">
    <div class="hero-inner">
      <div class="kicker">Hellas · øy for øy</div>
      <h1>Velg riktig gresk øy.</h1>
      <p>Hellas blir mye enklere når øyene får hver sin guide. Start her, velg reisestil, og gå videre til hotell, restauranter, strender og opplevelser for akkurat den øya.</p>
      <div class="hero-actions">
        <a class="btn primary" href="#oyer">Se alle øyene</a>
        <a class="btn secondary" href="#oyhopping">Øyhopping</a>
      </div>
    </div>
  </header>
  <main>
    <section class="wrap">
      <div class="story-grid">
        <article class="story-box">
          <span class="badge">Start her</span>
          <h2>Finn øya som passer reisen</h2>
          <p>Kreta, Rhodos, Kos, Santorini, Korfu, Zakynthos, Mykonos, Naxos, Paros og Athen har egne guider med hotell, restauranter, strender og aktiviteter.</p>
          <p>Velg øy etter reisestil: enkel charterferie, romantisk korttur, familiehotell, øyhopping eller mest mulig ferie for pengene.</p>
        </article>
        <aside class="facts-box">
          <span class="badge">Raskt valg</span>
          <ul>
            <li><strong>Allround:</strong> Kreta</li>
            <li><strong>Charter:</strong> Rhodos og Kos</li>
            <li><strong>Romantikk:</strong> Santorini og Paros</li>
            <li><strong>Verdi:</strong> Naxos og Kos</li>
            <li><strong>Øyhopping:</strong> Athen, Naxos, Paros og Santorini</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="wrap" id="oyer">
      <div class="section-head">
        <div><span class="badge">Øyguider</span><h2>Velg øy</h2></div>
        <p class="lead">Trykk på øya du vil utforske videre.</p>
      </div>
      <div class="city-grid">
        ${islands.map((island) => `<article class="city-card island-card" style="--card-image:url('${attr(island.cardImage)}')">
          <div class="city-card-media"></div>
          <div class="city-card-body">
            <span class="badge">${esc(island.region)}</span>
            <h3>${esc(island.name)}</h3>
            <p>${esc(island.summary)}</p>
            <a href="/hellas/${island.slug}/">Åpne ${esc(island.name)}-guiden →</a>
          </div>
        </article>`).join("")}
      </div>
    </section>

    <section class="wrap" id="oyhopping">
      <div class="section-head">
        <div><span class="badge">Øyhopping</span><h2>Enkle Hellas-ruter</h2></div>
      </div>
      <div class="grid">
        <article class="guide-card"><h3>7 netter familie</h3><p>Kreta, Rhodos eller Kos. Velg ett område, ett hotell med basseng, én stor utflukt og resten strand/logistikk.</p></article>
        <article class="guide-card"><h3>5 netter par</h3><p>Athen 1 natt + Santorini 3 netter + siste natt i Athen, eller Chania 5 netter med leiebil én dag.</p></article>
        <article class="guide-card"><h3>10 netter øyhopping</h3><p>Athen 2 netter, Naxos 4 netter, Paros 3 netter og siste natt nær Pireus eller flyplassen.</p></article>
      </div>
      <div class="greece-route-strip">
        <a href="/index.html#travelSearch">Søk fly til Hellas</a>
        <a href="${FERRYHOPPER}" target="_blank" rel="nofollow sponsored noopener">Sjekk ferger hos Ferryhopper</a>
        <a href="${bookingSearch("Hellas")}" target="_blank" rel="nofollow sponsored noopener">Søk hotell på Booking.com</a>
      </div>
    </section>
  </main>
  <footer class="footer">© 2026 Billig-reiser.no · Partnerlenker kan gi oss provisjon uten ekstra kostnad for deg.</footer>
</body>
</html>
`;
}

fs.mkdirSync(path.join(root, "hellas"), { recursive: true });
fs.writeFileSync(path.join(root, "hellas", "index.html"), hubPage());
for (const island of islands) {
  const dir = path.join(root, "hellas", island.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), islandPage(island));
}

console.log(`Built ${islands.length + 1} Greece pages.`);
