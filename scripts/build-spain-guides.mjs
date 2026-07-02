import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const HOTELS_CJ = "https://www.tkqlhce.com/click-101724638-14361426";
const HOTELS_CREATOR = "https://www.hotels.com/affiliates/hotelscom-home.rEFvN68";
const KLOOK_FALLBACK = "https://klook.tpx.gr/Tmj2PfPe";
const GYG_HOME = "https://www.getyourguide.com/?partner_id=FIQDAEB&utm_medium=local_partners";
const HERO_IMAGE = "/spania/assets/spania-hero.png";
const ITEM_IMAGES_PATH = path.join(root, "spania", "item-images.json");
const ITEM_IMAGES = fs.existsSync(ITEM_IMAGES_PATH) ? JSON.parse(fs.readFileSync(ITEM_IMAGES_PATH, "utf8")) : {};
const TODAY = "2026-06-14";
const SPAIN_CSS_VERSION = "129";
const HOTEL_DEEP_LINKS = {
  "Barcelona|H10 Madison Barcelona": "https://www.hotels.com/affiliates/h10-madison-barcelona-spania.FHqIi8c",
  "Barcelona|Aparthotel Arai 4 Superior": "https://www.hotels.com/affiliates/arai-aparthotel-barcelona-spania.L7Y7QPw",
  "Barcelona|Hotel Arts Barcelona": "https://www.hotels.com/affiliates/hotel-arts-barcelona-barcelona-spania.JmWQEaS",
  "Barcelona|Motel One Barcelona-Ciutadella": "https://www.hotels.com/affiliates/motel-one-barcelona-ciutadella-barcelona-spania.sP4tD0p",
  "Barcelona|Novotel Barcelona City": "https://www.hotels.com/affiliates/novotel-barcelona-city-barcelona-spania.abjoGV0",
  "Madrid|Only YOU Boutique Hotel Madrid": "https://www.hotels.com/affiliates/only-you-hotel-atocha-madrid-spania.sLaWtyO",
  "Madrid|Suites Viena Plaza de Espana": "https://www.hotels.com/affiliates/suites-viena-plaza-de-espana-madrid-spania.1lNa3DV",
  "Madrid|Four Seasons Hotel Madrid": "https://www.hotels.com/affiliates/four-seasons-hotel-madrid-madrid-spania.tPa95Ij",
  "Madrid|Hotel Regina Madrid": "https://www.hotels.com/affiliates/hotel-regina-madrid-spania.OAembPm",
  "Madrid|Novotel Madrid Center": "https://www.hotels.com/affiliates/novotel-madrid-center-madrid-spania.sqNQGy9",
  "Valencia|Hospes Palau de la Mar": "https://www.hotels.com/affiliates/hotel-hospes-palau-de-la-mar-valencia-spania.ldKuvZ5",
  "Valencia|Barcelo Valencia": "https://www.hotels.com/affiliates/barcelo-valencia-hotel-valencia-spania.nb7aXBw",
  "Valencia|Las Arenas Balneario Resort": "https://www.hotels.com/affiliates/hotel-las-arenas-balneario-resort-valencia-spania.fFhXn1Q",
  "Valencia|Venecia Plaza Centro": "https://www.hotels.com/affiliates/venecia-plaza-centro-valencia-spania.fDjS5AF",
  "Valencia|Ilunion Aqua 4": "https://www.hotels.com/affiliates/hotel-ilunion-aqua-4-valencia-spania.V3Kf6yq",
  "Sevilla|H10 Casa de la Plata": "https://www.hotels.com/affiliates/h10-casa-de-la-plata-sevilla-spania.rbpnyuP",
  "Sevilla|Hotel Alfonso XIII": "https://www.hotels.com/affiliates/hotel-alfonso-xiii-a-luxury-collection-hotel-seville-sevilla-spania.6KOJONZ",
  "Sevilla|Hotel Becquer": "https://www.hotels.com/affiliates/becquer-hotel-sevilla-spania.p7IGqy7",
  "Sevilla|Novotel Sevilla": "https://www.hotels.com/affiliates/novotel-sevilla-sevilla-spania.ATjuoQ7",
  "Malaga|Palacio Solecio": "https://www.hotels.com/affiliates/palacio-solecio-malaga-spania.Ep9Tcre",
  "Malaga|Barcelo Malaga": "https://www.hotels.com/affiliates/barcelo-malaga-hotel-malaga-spania.3eb8YwM",
  "Malaga|Gran Hotel Miramar": "https://www.hotels.com/affiliates/gran-hotel-miramar-gl-malaga-spania.WX10HA1",
  "Malaga|Casual del Mar Malaga": "https://www.hotels.com/affiliates/casual-del-mar-malaga-malaga-spania.3nIRCo3",
  "Malaga|Sol Guadalmar": "https://www.hotels.com/affiliates/sol-guadalmar-hotel-malaga-spania.0tR7PPh",
  "Marbella|Amare Beach Hotel Marbella": "https://www.hotels.com/affiliates/amare-beach-hotel-marbella-marbella-spania.iQgNXTw",
  "Marbella|Marriott's Marbella Beach Resort": "https://www.hotels.com/affiliates/marriott-s-marbella-beach-resort-marbella-spania.4SH2GLB",
  "Marbella|Puente Romano Beach Resort": "https://www.hotels.com/affiliates/puente-romano-beach-resort-marbella-spania.9uXezl8",
  "Marbella|Ona Marbella Inn": "https://www.hotels.com/affiliates/marbella-inn-marbella-spania.fzNvqEV",
  "Alicante|Hospes Amerigo": "https://www.hotels.com/affiliates/hotel-hospes-amerigo-alicante-spania.gSpL6XZ",
  "Alicante|Melia Alicante": "https://www.hotels.com/affiliates/melia-alicante-alicante-spania.fZ98PLL",
  "Alicante|Hotel Casa Alberola Alicante": "https://www.hotels.com/affiliates/casa-alberola-alicante-curio-collection-by-hilton-alicante-spania.ZybjKQp",
  "Alicante|Hotel Maya Alicante": "https://www.hotels.com/affiliates/hotel-maya-alicante-spania.jMHDmTx",
  "Alicante|Port Alicante City & Beach": "https://www.hotels.com/affiliates/port-hotel-alicante-playa-de-san-juan-alicante-spania.370coFD",
  "Benidorm|Villa Venecia Hotel Boutique Gourmet": "https://www.hotels.com/affiliates/villa-venecia-hotel-boutique-benidorm-spania.QunpOVe",
  "Benidorm|Hotel RH Princesa": "https://www.hotels.com/affiliates/hotel-rh-princesa-benidorm-spania.kLXTPBR",
  "Benidorm|Asia Gardens Hotel & Thai Spa": "https://www.hotels.com/affiliates/asia-gardens-hotel-thai-spa-a-royal-hideaway-hotel-golf-bahia-spania.QdFXatY",
  "Benidorm|Hotel Helios Benidorm": "https://www.hotels.com/affiliates/helios-benidorm.wS6HXPW",
  "Benidorm|Magic Robin Hood Resort": "https://www.hotels.com/affiliates/magic-robin-hood-waterpark-lodge-resort-l-alfas-del-pi-spania.Q6bku6Y",
  "Palma og Mallorca|Hotel Can Cera": "https://www.hotels.com/affiliates/hotel-can-cera-adults-only-palma-de-mallorca-spania.DcfZhyW",
  "Palma og Mallorca|Zafiro Palace Palmanova": "https://www.hotels.com/affiliates/zafiro-palmanova-calvia-spania.ErOFyCR",
  "Palma og Mallorca|Cap Rocat": "https://www.hotels.com/affiliates/cap-rocat-llucmajor-spania.keCZGYO",
  "Palma og Mallorca|Hotel Almudaina": "https://www.hotels.com/affiliates/hotel-almudaina-palma-de-mallorca-spania.nOiyd9v",
  "Palma og Mallorca|Zafiro Palace Alcudia": "https://www.hotels.com/affiliates/zafiro-tropic-alcudia-spania.NFY73dd",
  "Ibiza|Hotel Mirador de Dalt Vila": "https://www.hotels.com/affiliates/mirador-de-dalt-vila-relais-chateaux-ibiza-by-spania.xfAlkkv",
  "Ibiza|Grand Palladium Palace Ibiza Resort & Spa": "https://www.hotels.com/affiliates/grand-palladium-palace-ibiza-resort-spa-sant-josep-de-sa-talaia-spania.mQmpJ5S",
  "Ibiza|Six Senses Ibiza": "https://www.hotels.com/affiliates/six-senses-ibiza-sant-joan-de-labritja-spania.UjRwEAH",
  "Ibiza|Hotel Gran Sol": "https://www.hotels.com/affiliates/hotel-gran-sol-ibiza-sant-antoni-de-portmany-spania.O19vW9U",
  "Ibiza|Invisa Hotel Club Cala Verde": "https://www.hotels.com/affiliates/invisa-hotel-club-cala-verde-santa-eulalia-del-rio-spania.QEnjEIO",
  "Tenerife|Royal Hideaway Corales Beach": "https://www.hotels.com/affiliates/royal-hideaway-corales-beach-part-of-barcelo-hotel-group-adults-only-adeje-spania.k0JoumK",
  "Tenerife|GF Victoria": "https://www.hotels.com/affiliates/gf-victoria-adeje-spania.I6mPwXI",
  "Tenerife|The Ritz-Carlton Tenerife, Abama": "https://www.hotels.com/affiliates/the-ritz-carlton-abama-guia-de-isora-spania.5qVkIRW",
  "Tenerife|MYND Adeje": "https://www.hotels.com/affiliates/mynd-adeje-adeje-spania.jydTSVP",
  "Tenerife|Bahia del Duque": "https://www.hotels.com/affiliates/bahia-del-duque-adeje-spania.unynpUu",
  "Gran Canaria|Bohemia Suites & Spa": "https://www.hotels.com/affiliates/bohemia-suites-spa-adults-only-san-bartolome-de-tirajana-spania.JPW1wIG",
  "Gran Canaria|Lopesan Baobab Resort": "https://www.hotels.com/affiliates/lopesan-baobab-resort-san-bartolome-de-tirajana-spania.6pGGxfe",
  "Gran Canaria|Seaside Grand Hotel Residencia": "https://www.hotels.com/affiliates/seaside-grand-hotel-residencia-san-bartolome-de-tirajana-spania.hPZ0BNM",
  "Gran Canaria|TC Hotel Dona Luisa": "https://www.hotels.com/affiliates/hotel-dona-luisa-las-palmas-de-gran-canaria-spania.F1UTzBG",
  "Gran Canaria|Radisson Blu Resort & Spa Gran Canaria Mogan": "https://www.hotels.com/affiliates/radisson-blu-resort-spa-gran-canaria-mogan-mogan-spania.Ub9bGdO"
};

const HOTEL_IMAGES = {
  "Barcelona|H10 Madison Barcelona": "https://pro-static.h10hotels.com/gallery/T4D3/13_HMDTerrassadelGotic.jpg",
  "Barcelona|Aparthotel Arai 4 Superior": "https://api.fishhotels.com/api/sites/cd158fb4-9389-47d1-bc89-e401b5da7ca3/media-images/ar-piscina-2.jpg?cw=2000&ch=1126&cx=0&cy=34&s=xl&w=1200&h=676",
  "Barcelona|Hotel Arts Barcelona": "https://cache.marriott.com/content/dam/marriott-digital/rz/emea/hws/b/bcnrz/en_us/photo/unlimited/assets/rz-bcnrz-hotel-tower-11556.jpg",
  "Barcelona|Motel One Barcelona-Ciutadella": "https://image.motel-one.com/fileadmin/dam/_processed_/a/a/csm_hotel_barcelona_ciutadella_motel_one.JPG_d70bbb97d3.jpeg?h=1920&quality=78",
  "Barcelona|Novotel Barcelona City": "https://www.ahstatic.com/photos/5560_ho_00_p_2048x1536.jpg",
  "Madrid|Only YOU Boutique Hotel Madrid": "https://images.trvl-media.com/lodging/7000000/6430000/6427300/6427217/bd98624e.jpg?impolicy=resizecrop&ra=fit&rw=598",
  "Madrid|Suites Viena Plaza de Espana": "https://www.hotelscombined.com/rimg/himg/28/ed/d9/expedia_group-163078-264656514-968759.jpg?crop=true&height=607&width=968",
  "Madrid|Four Seasons Hotel Madrid": "https://www.fourseasons.com/alt/img-opt/~75.701.0,0000-0,0000-1600,0000-900,0000/publish/content/dam/fourseasons/images/web/MMD/MMD_1096_aspect16x9.jpg",
  "Madrid|Hotel Regina Madrid": "https://www.hotelreginamadrid.com/wp-content/uploads/2025/05/regina-intro-edit.jpg",
  "Madrid|Novotel Madrid Center": "https://www.ahstatic.com/photos/9298_ho_00_p_2048x1536.jpg",
  "Valencia|Hospes Palau de la Mar": "https://www.hospes.com/wp-content/uploads/sites/1676/nggallery/new-palau//hotel-header.jpg",
  "Valencia|Barcelo Valencia": "https://static.barcelo.com/content/dam/bhg/master/es/hoteles/spain/valencia/barcelo-valencia/main-photos/hotel/bval_view_19.jpg",
  "Valencia|Las Arenas Balneario Resort": "https://www.hotelvalencialasarenas.com/wp-content/blogs.dir/1493/files/home//home_placer_descansar.jpg",
  "Valencia|Venecia Plaza Centro": "https://hotelvenecia.com/wp-content/uploads/IMG_8344-1200x800.jpg",
  "Valencia|Ilunion Aqua 4": "https://objectstore.true.nl/prijsvrij%3Aaccommodations/626x416/70XGSG97N17TPN7LO5L33YDGB019V29QBA37PKLA.jpg",
  "Sevilla|Hotel Casa 1800 Sevilla": "https://www.americanexpress.com/en-us/travel/discover/photos/482863/89656/1600/HOTEL-CASA-1800-SEVILLA-HABITACION-DELUXE-PREMIUM.jpg?ch=560",
  "Sevilla|H10 Casa de la Plata": "https://pro-static.h10hotels.com/gallery/T4D3/07_HCTAtriumDoubleRoom2.jpg",
  "Sevilla|Hotel Alfonso XIII": "https://www.americanexpress.com/en-us/travel/discover/photos/911/152828/530/Exterior_day-3650.jpg?ch=310",
  "Sevilla|Hotel Becquer": "https://static-resources-elementor.mirai.com/wp-content/uploads/sites/1523/menu-bg-hotel002-2048x1152-1.webp",
  "Sevilla|Novotel Sevilla": "https://www.ahstatic.com/photos/3210_ho_00_p_2048x1536.jpg",
  "Malaga|Palacio Solecio": "https://b4283699.smushcdn.com/4283699/wp-content/uploads/2020/10/Suite_Torre_Hero_Shot-1200x800.jpg?lossy=2&strip=1&webp=1",
  "Malaga|Barcelo Malaga": "https://static.barcelo.com/content/dam/bhg/master/es/hoteles/spain/andalucia/malaga/barcelo-malaga/main-photos/hotel/BMAL_POOL_001.jpg",
  "Malaga|Gran Hotel Miramar": "https://www.granhotelmiramarmalaga.com/wp-content/blogs.dir/1833/files/home//home-alojese-bajo-el-sol.jpg",
  "Malaga|Casual del Mar Malaga": "https://images.trvl-media.com/lodging/19000000/18770000/18760200/18760144/6886b762.jpg?impolicy=resizecrop&ra=fit&rw=598",
  "Malaga|Sol Guadalmar": "https://dam.melia.com/melia/accounts/f8/4000018/projects/127/assets/31/29897/1fe882fb0ff5b2d9cd772a23efc02982-1600695413.jpg?im=RegionOfInterestCrop=(11,15),regionOfInterest=(1771.5,454)",
  "Marbella|Amare Beach Hotel Marbella": "https://www.amarehotels.com/wp-content/uploads/2025/11/galeria-principal-amare-marbella-11.jpg",
  "Marbella|Marriott's Marbella Beach Resort": "https://content.vistana.com/files/live/sites/vistana-digital-content-manager/files/images/properties/Marriott%20Vacation%20Club/MB/SUP-11876_MarbellaBeachClub_exterior_HERO_mvcAGPMBex-204670_16x9.jpg",
  "Marbella|Puente Romano Beach Resort": "https://www.puenteromano.com/media/moypxst1/grand-suites-heropuenteromano_z31_imperial_suite_livingroom.jpg?rxy=0.4664710225491733,0.6341079663474728&width=420&height=290&quality=80&v=1d9af3001755ce0",
  "Marbella|Ona Marbella Inn": "https://oh-inn.hotels-andalucia.com/data/Pictures/150x150w/12727/1272773/1272773809/marbella-ona-marbella-inn-picture-14.JPEG",
  "Marbella|AluaSun Marbella Park": "https://gips.ltur.com/gips/scalr/666x528/pics.tui.com/pics/pics1600x1200/tui/5/514a7910-e8b2-46c9-9f74-b755b4557a71.jpg",
  "Alicante|Hospes Amerigo": "https://www.hospes.com/wp-content/uploads/sites/1676/nggallery/new-amerigo//recep.jpg",
  "Alicante|Melia Alicante": "https://dam.melia.com/melia/accounts/f8/4000018/projects/127/assets/78/25181/6f9ca02f6567d43e3f7357fbbba89df4-1600597881.jpg?im=RegionOfInterestCrop=(15,8),regionOfInterest=(1181,1771.5)",
  "Alicante|Hotel Casa Alberola Alicante": "https://x.cdrst.com/foto/hotel-sf/13ff7305/granderesp/foto-hotel-13ff685b.jpg",
  "Alicante|Hotel Maya Alicante": "https://maya-hotel-alicante.hotel-dir.com/data/Photos/OriginalPhoto/2204/220464/220464809.JPEG",
  "Alicante|Port Alicante City & Beach": "https://cdn2.paraty.es/port-corpo/images/dfb88ad11dcf566%3Ds1900",
  "Benidorm|Villa Venecia Hotel Boutique Gourmet": "https://www.hotelvillavenecia.com/media/uploads/cms_apps/imagenes/Screenshot_8_8kGWdx6.png?q=pr:sharp/rs:fill/w:1920/h:500/g:ce/f:jpg",
  "Benidorm|Hotel RH Princesa": "https://www.hotelesrh.com/content/dam/rhhoteles/assets/hoteles/benidorm/rh-princesa/imagenes/hotel/multimosaico-princesa-01.jpg/_jcr_content/renditions/mobile-jpg.jpeg",
  "Benidorm|Asia Gardens Hotel & Thai Spa": "https://www.wellbeingescapes.com/images/hotel/233x100/d33153215e5ed7f072da94a095cf4230.webp",
  "Benidorm|Hotel Helios Benidorm": "https://images.trvl-media.com/lodging/39000000/38570000/38569400/38569375/1e2fe63f.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Benidorm|Magic Robin Hood Resort": "https://images.trvl-media.com/lodging/68000000/67430000/67420800/67420769/22c04cc9.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Palma og Mallorca|Hotel Can Cera": "https://images.trvl-media.com/lodging/5000000/4330000/4326800/4326722/a3f50543.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Palma og Mallorca|Zafiro Palace Palmanova": "https://images.trvl-media.com/lodging/2000000/1210000/1200300/1200269/9427a0a7.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Palma og Mallorca|Cap Rocat": "https://b4412011.smushcdn.com/4412011/wp-content/uploads/2019/04/caprocat_exterior_vertical_MEDIA-768x1024.jpg?lossy=2&strip=1&webp=1",
  "Palma og Mallorca|Hotel Almudaina": "https://www.hotelalmudaina.com/dms/monoHotel-Almudaina-New/GaleriaSkyBar/sky-bar-vistas-2.jpg",
  "Palma og Mallorca|Zafiro Palace Alcudia": "https://media-cdn.holidaycheck.com/w_1280%2Ch_720%2Cc_fit%2Cq_auto%2Cf_auto/ugc/images/fed58cd1-0667-435a-82d4-1b590964471e",
  "Ibiza|Hotel Mirador de Dalt Vila": "https://images2.neobookings.com/cms/devel.www.hotelmiradoribiza.com/section/quality-accommodation-br-in-formentera-and-ibiza/pics/quality-accommodation-br-in-formentera-and-ibiza-dm1lkk7lrz.jpeg?width=1920&height=1080&aspect_ratio=1.7778:1&quality=80",
  "Ibiza|Grand Palladium Palace Ibiza Resort & Spa": "https://images.trvl-media.com/lodging/2000000/1440000/1439800/1439711/a5011072.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Ibiza|Hotel Gran Sol": "https://images.trvl-media.com/lodging/3000000/2010000/2005100/2005081/b2133dbc.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Ibiza|Six Senses Ibiza": "https://media.sixsenses.com/B60H3R33/at/3mr4fqhv5t73vwbk3mtf53/Swimming_Pool_aerial.jpg??format=webp&width=1600",
  "Ibiza|Invisa Hotel Club Cala Verde": "https://www.invisahoteles.com/uploads/cms_apps/imagenes/inner-invisa-c_1_1_bkGtrSd_IQ5Uy7A.jpg",
  "Tenerife|Royal Hideaway Corales Beach": "https://images.trvl-media.com/lodging/19000000/18750000/18741400/18741335/9d06b917.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Tenerife|GF Victoria": "https://images.trvl-media.com/lodging/21000000/20460000/20455000/20454982/d17f2f51.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Tenerife|The Ritz-Carlton Tenerife, Abama": "https://cache.marriott.com/content/dam/marriott-renditions/TFSRZ/tfsrz-lobby-bar-4984-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1200px:*",
  "Tenerife|MYND Adeje": "https://www.myndhotels.com/media/uploads/cms_apps/imagenes/bg.jpg?q=pr:sharp/rs:fill/w:1920/h:800/f:jpg",
  "Tenerife|Bahia del Duque": "https://images.trvl-media.com/lodging/1000000/860000/859500/859471/217fbc20.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "Gran Canaria|Bohemia Suites & Spa": "https://bohemia-grancanaria.com/media/6254/home-suite.jpg?anchor=center&mode=crop&width=884&height=1013&rnd=133910050270000000",
  "Gran Canaria|Lopesan Baobab Resort": "https://www.lopesan.com/documents/49789/1471305/2%2BLODGE%2BZONE%2B%285%29.jpg/9ade769d-6e00-5797-feae-bf57e4a65ab5?t=1762949494019&version=4.0",
  "Gran Canaria|Seaside Grand Hotel Residencia": "https://www.grand-hotel-residencia.com/sites/default/files/styles/imagen_slider_y_galeria_pequ_400x250_/public/Seaside_GHR_Pool_2%20%281%29_0.jpg?itok=x0w3mNL3",
  "Gran Canaria|TC Hotel Dona Luisa": "https://trujillocastellanos.com/_images/sites/trujillo-castellanos1625/img/61-recepcion-dona-luisa-700x410.jpg?c=0&h=410&w=700",
  "Gran Canaria|Radisson Blu Resort & Spa Gran Canaria Mogan": "https://images.trvl-media.com/lodging/17000000/16090000/16085800/16085753/fc23d9d4.jpg?impolicy=resizecrop&rw=1200&ra=fit"
};
const ACTIVITY_DEEP_LINKS = {
  "Sevilla|Alcazar Sevilla": "https://klook.tpx.gr/QehAvSfc",
  "Sevilla|Flamenco Sevilla": "https://klook.tpx.gr/lfaBEUZW",
  "Sevilla|Triana walking tour": "https://klook.tpx.gr/Bb4CuQOd",
  "Barcelona|Sagrada Familia": "https://klook.tpx.gr/Za88OISd",
  "Barcelona|Casa Batllo": "https://klook.tpx.gr/bXPIhKAt",
  "Barcelona|Tapas og vinsmaking": "https://klook.tpx.gr/ebDbimPN",
  "Alicante|Santa Barbara Castle Alicante": "https://klook.tpx.gr/0PuA77ig",
  "Alicante|Guadalest and Algar waterfalls": "https://klook.tpx.gr/ZTD3leWf",
  "Alicante|Alicante wine tour": "https://gyg.me/KvGjOCfA",
  "Benidorm|Terra Mitica": "https://klook.tpx.gr/Vsot3Gyi",
  "Benidorm|Mundomar Benidorm": "https://klook.tpx.gr/IQ0R68wY",
  "Benidorm|Guadalest and Algar from Benidorm": "https://klook.tpx.gr/5huW3ICh",
  "Malaga|Caminito del Rey from Malaga": "https://klook.tpx.gr/PnMiFptv",
  "Malaga|Malaga Alcazaba": "https://klook.tpx.gr/1EXCNksC",
  "Malaga|Malaga tapas tour": "https://klook.tpx.gr/jaxlFHkp",
  "Marbella|Marbella yacht": "https://klook.tpx.gr/LJgrS1IC",
  "Marbella|Ronda from Marbella": "https://klook.tpx.gr/tZ4y6Gm3",
  "Marbella|Marbella tapas tour": "https://klook.tpx.gr/lza1N7fw",
  "Ibiza|Formentera boat from Ibiza": "https://klook.tpx.gr/faFUfMcO",
  "Ibiza|Ibiza sunset cruise": "https://gyg.me/keM6Kxn0",
  "Ibiza|Ibiza beach hopping": "https://gyg.me/d0vxwRhZ",
  "Gran Canaria|Maspalomas dunes": "https://klook.tpx.gr/NfLvOhRB",
  "Gran Canaria|Roque Nublo tour": "https://klook.tpx.gr/Pnoo4WCO",
  "Gran Canaria|Gran Canaria buggy tour": "https://gyg.me/6gXLoxTv",
  "Tenerife|Teide National Park": "https://klook.tpx.gr/L1Acz1gQ",
  "Tenerife|Siam Park Tenerife": "https://klook.tpx.gr/qjRGjnU1",
  "Tenerife|Anaga rural park": "https://gyg.me/U2qtuMzI",
  "Madrid|Prado Museum": "https://klook.tpx.gr/fdmkYQ4S",
  "Madrid|Toledo dagstur": "https://klook.tpx.gr/ihp8uQWy",
  "Madrid|Tapasvandring": "https://klook.tpx.gr/QewZSbpp",
  "Palma og Mallorca|Palma Cathedral": "https://klook.tpx.gr/4RZNDJdS",
  "Palma og Mallorca|Drach Caves Mallorca": "https://klook.tpx.gr/BM4nTnZJ",
  "Palma og Mallorca|Mallorca boat trip": "https://klook.tpx.gr/RiV3knvH",
  "Valencia|Oceanografic Valencia": "https://klook.tpx.gr/hVe4ifYB",
  "Valencia|Paella cooking class": "https://klook.tpx.gr/dZNtREgo",
  "Valencia|Valencia bike tour": "https://klook.tpx.gr/AnAtN3sr"
};

const cities = [
  {
    name: "Barcelona",
    path: "spania/barcelona-nordkysten/barcelona",
    region: "Catalonia",
    type: "Storby + strand",
    intro: [
      "Barcelona er Spania-guiden som nesten alle bør lese først. Byen gir deg arkitektur i verdensklasse, sterke matområder, shopping, strand, fotball, museer og dagsturer til fjell eller vinland.",
      "Den vanligste feilen er å bo tilfeldig. Eixample, El Born, Barri Gotic, Barceloneta og Poblenou gir helt ulike ferier. Velg område etter rytmen du vil ha, ikke bare laveste pris."
    ],
    best: "3-5 netter, vår og høst, par, venner og førstegangsreisende",
    airport: "Barcelona El Prat, cirka 25-35 minutter til sentrum",
    season: "April-juni og september-oktober er best. Juli og august er varmest og travlest.",
    areas: [
      ["Eixample", "Beste allround-område for arkitektur, shopping, metro og pene hotellvalg."],
      ["El Born og Gotiske kvarter", "Best for tapas, gamlebyen, små butikker og første byhelg."],
      ["Barceloneta og Poblenou", "Best når strand, promenader og litt mer luft betyr mest."]
    ],
    hotels: [
      ["H10 Madison Barcelona", "Par", "Gothic Quarter", "Boutique", "4*", "Takterrasse", "Svært sentralt hotell med utsikt, takterrasse og kort vei til gamlebyen, Born og shopping."],
      ["Aparthotel Arai 4 Superior", "Familie", "Gothic Quarter", "Leilighetshotell", "4*", "Kjøkken", "Et smart valg når familien vil bo midt i byen, men trenger mer plass enn et vanlig rom."],
      ["Hotel Arts Barcelona", "Luksus", "Port Olimpic", "Resortby", "5*", "Havutsikt", "Stort luksushotell ved stranden, med basseng, spa, restauranter og mer resortfølelse enn sentrumshotellene."],
      ["Motel One Barcelona-Ciutadella", "Billig og bra", "El Born/Ciutadella", "Designbudsjett", "3*", "Park", "God verdi for deg som vil bo nær Born, strandretning og sentrum uten luksuspris."],
      ["Novotel Barcelona City", "Barnevennlig", "Glories/Poblenou", "Familiebase", "4*", "Basseng", "Praktisk hotell med familierom, takbasseng og kort vei til metro, strand og shopping på Glories."]
    ],
    food: [
      ["Bar Canete", "Livlig tapas og sjømat i Raval. Bestill bord hvis du vil spise sent."],
      ["El Xampanyet", "Klassiker i Born for cava, ansjos og enkel tapasstemning."],
      ["Disfrutar", "Verdensklasse for matinteresserte. Dette er planleggingsrestaurant, ikke spontanvalg."],
      ["La Boqueria og Sant Antoni", "Bra for snacks, frokost og matvandring når du vil se flere smaker på kort tid."]
    ],
    shopping: [
      ["Passeig de Gracia", "Luksus, kjeder, arkitektur og hotellbar-pauser i samme område."],
      ["El Born", "Små butikker, design, sko, smykker og kveldsvennlige gater."],
      ["Portal de l'Angel", "Praktisk shoppinggate nær Placa Catalunya for kjeder og raske kjøp."]
    ],
    beaches: [
      ["Barceloneta", "Nærmest sentrum og mest livlig. Best for kort strandpause, ikke total ro."],
      ["Bogatell", "Bedre plass og mer lokalfølelse. Godt valg for familier og par."],
      ["Ocata", "Togtur ut av byen for lengre sandstrand og roligere dag."]
    ],
    gems: [
      ["Bunkers del Carmel", "Utsikt over hele byen. Dra tidlig eller mot solnedgang."],
      ["Sant Pau Modernista", "Vakkert modernistisk anlegg som ofte er roligere enn Gaudi-klassikerne."],
      ["Gracia", "Små plasser, kaféer og lokal kveld uten samme turisttrykk."],
      ["Poble-sec", "Bra tapasområde når du vil ut av de mest åpenbare gatene."]
    ],
    activities: ["Sagrada Familia", "Park Guell", "Casa Batllo", "Montserrat dagstur", "Tapas og vinsmaking", "Sykkeltur i Barcelona"]
  },
  {
    name: "Madrid",
    path: "spania/madrid",
    region: "Madrid",
    type: "Mat, museer og storby",
    intro: [
      "Madrid er Spania for deg som vil ha museer, parker, tapasbarer, fotball, shopping og kvelder som starter sent. Byen har ikke strand, men den har en veldig sterk storbyrytme.",
      "Bo sentralt hvis du er førstegangsreisende. Sol, Gran Via, Letras, Chueca og Salamanca gir forskjellige opplevelser, men alle gjør det lett å gå, spise og bruke metro."
    ],
    best: "3-4 netter, vår og høst, mat, museer, fotball og par",
    airport: "Madrid Barajas, cirka 25-40 minutter til sentrum",
    season: "Mars-juni og september-november er mest behagelig. Sommeren kan bli svært varm.",
    areas: [
      ["Barrio de las Letras", "Best for museer, tapas og klassisk Madrid-stemning."],
      ["Chueca og Malasana", "Best for restauranter, barer, vintage og yngre byliv."],
      ["Salamanca", "Best for luksushotell, shopping og roligere gater."]
    ],
    hotels: [
      ["Only YOU Boutique Hotel Madrid", "Par", "Chueca", "Boutique", "4*", "Design", "Romantisk, sentralt og stilig hotell med sterk byfølelse og kort vei til restauranter."],
      ["Suites Viena Plaza de Espana", "Familie", "Plaza de Espana", "Leilighetshotell", "3*", "Kjøkken", "Godt valg for familier som vil ha mer plass, enkel metro og kort vei til parker og sentrum."],
      ["Four Seasons Hotel Madrid", "Luksus", "Centro Canalejas", "Grand hotel", "5*", "Spa", "Et av byens mest komplette luksushotellvalg med topp beliggenhet, spa og shopping rett utenfor."],
      ["Hotel Regina Madrid", "Billig og bra", "Sol/Sevilla", "Sentrumshotell", "4*", "Metro", "Sterk verdi for deg som vil bo midt i Madrid og bruke pengene på mat og opplevelser."],
      ["Novotel Madrid Center", "Barnevennlig", "Salamanca/Retiro", "Familiebase", "4*", "Basseng", "Trygt og praktisk hotell for barn, Retiro-parken, metro og litt roligere kvelder."]
    ],
    food: [
      ["Sobrino de Botin", "Historisk Madrid-restaurant kjent for klassisk kastiljansk mat."],
      ["Casa Lucio", "Kjent for huevos rotos og klassisk La Latina-kveld."],
      ["Sala de Despiece", "Moderne, uformell og morsom matopplevelse i Chamberi."],
      ["Mercado de San Miguel", "Turistisk, men praktisk for første smaksrunde i byen."]
    ],
    shopping: [
      ["Gran Via", "Kjeder, varehus, kinoer og enkel shopping mellom hotell og severdigheter."],
      ["Salamanca og Calle Serrano", "Luksus, spanske merker og finere handlegater."],
      ["El Rastro", "Søndagsmarked i La Latina. Best tidlig før gatene blir fulle."]
    ],
    beaches: [
      ["Madrid Rio", "Ikke strand, men bra for sykkel, lekeplasser og pause ved elven."],
      ["Casa de Campo", "Stor grønn lomme for gondol, piknik og ro fra sentrum."],
      ["Valencia med tog", "Hvis du vil ha strand, tar hurtigtoget deg til Middelhavet på rundt to timer."]
    ],
    gems: [
      ["Templo de Debod", "Solnedgang, utsikt og rolig pause vest i sentrum."],
      ["Sorolla-museet", "Vakkert kunstnerhjem som ofte føles mer personlig enn de store museene."],
      ["Matadero Madrid", "Kultur, utstillinger og lokal helgestemning ved Madrid Rio."],
      ["Chamberi spøkelsesstasjon", "Nedlagt metrostasjon som gir et lite historisk sidespor."]
    ],
    activities: ["Prado Museum", "Royal Palace Madrid", "Toledo dagstur", "Santiago Bernabeu", "Tapasvandring", "Flamenco i Madrid"]
  },
  {
    name: "Valencia",
    path: "spania/valencia",
    region: "Valencia",
    type: "Strand + storby",
    intro: [
      "Valencia er et av de smarteste Spania-valgene akkurat nå: lavere tempo enn Barcelona, bedre strandkobling enn Madrid og en gammelby som er lett å bruke.",
      "Byen passer spesielt godt for familier, par og matglade reisende. Du får paella, sykkelvennlige parker, akvarium, moderne arkitektur og brede strender uten å måtte velge bort storbyfølelsen."
    ],
    best: "4-6 netter, familier, par, strand og mat",
    airport: "Valencia Airport, cirka 20-30 minutter til sentrum",
    season: "April-juni og september-oktober. Sommeren er strandvennlig, men varm.",
    areas: [
      ["Ciutat Vella", "Best for første tur, gamlebyen, markeder og kvelder til fots."],
      ["Ruzafa", "Best for restauranter, barer, design og mer lokal energi."],
      ["Malvarrosa og Cabanyal", "Best for strand, sjømat og ferie uten full storbypuls."]
    ],
    hotels: [
      ["Hospes Palau de la Mar", "Par", "Eixample", "Boutique", "5*", "Spa", "Elegant og rolig hotell med kort vei til gamlebyen, Turia-parken og restauranter."],
      ["Barcelo Valencia", "Familie", "City of Arts", "Praktisk", "4*", "Takterrasse", "Smart base for Oceanografic, parker og familier som vil ha moderne område."],
      ["Las Arenas Balneario Resort", "Luksus", "Malvarrosa", "Strandresort", "5*", "Basseng", "Byens klassiske luksusvalg ved stranden, godt for deg som vil ha resort og storby i samme tur."],
      ["Venecia Plaza Centro", "Billig og bra", "Plaza del Ayuntamiento", "Sentrum", "2-3*", "Gåavstand", "Enkelt, sentralt og praktisk når beliggenhet betyr mer enn store fasiliteter."],
      ["Ilunion Aqua 4", "Barnevennlig", "Aqua/Arts", "Familiebase", "4*", "Akvarium", "Rimelig og enkel base nær Oceanografic, shopping og buss mot strand."]
    ],
    food: [
      ["Casa Carmela", "Klassisk paella ved stranden. Bestill på forhånd."],
      ["La Pepica", "Historisk strandrestaurant med paella og sjømat."],
      ["Central Bar", "Godt stopp inne i Mercado Central."],
      ["Ricard Camarena", "For matinteresserte som vil ha en større restaurantopplevelse."]
    ],
    shopping: [
      ["Mercado Central", "Mat, råvarer, keramikk, smågaver og en av byens fineste bygninger."],
      ["Colon og Calle Jorge Juan", "Butikker, kaféer og penere shopping nær sentrum."],
      ["Aqua og El Saler", "Praktisk shopping nær City of Arts and Sciences."]
    ],
    beaches: [
      ["Malvarrosa", "Den mest kjente stranden, enkel å nå og fin for familier."],
      ["Patacona", "Litt roligere nordover med gode strandbarer."],
      ["El Saler", "Mer naturlig strand sør for byen, fin med bil eller utflukt."]
    ],
    gems: [
      ["Jardin del Turia", "Den gamle elveleien er byens beste transportåre for sykkel og gåturer."],
      ["Cabanyal", "Fargerike hus, strandfølelse og mer lokal mat."],
      ["Albufera", "Lagune, risåkre og solnedgang utenfor byen."],
      ["Centro del Carmen", "Kulturhus med utstillinger og rolig gårdsrom."]
    ],
    activities: ["Oceanografic Valencia", "City of Arts and Sciences", "Paella cooking class", "Albufera sunset", "Valencia bike tour", "Bioparc Valencia"]
  },
  {
    name: "Sevilla",
    path: "spania/andalucia/sevilla",
    region: "Andalusia",
    type: "Kultur og romantikk",
    intro: [
      "Sevilla er flamenco, appelsintrær, palasser, tapasbarer og varme kvelder. Byen er mindre strandferie og mer atmosfære, mat, arkitektur og rolig vandring.",
      "Første gang bør du bo nær Santa Cruz, El Arenal eller Centro. Da ligger Alcazar, katedralen, Giralda, Triana og de beste kveldsområdene innenfor en enkel tur."
    ],
    best: "3-4 netter, vår og høst, par, kultur og mat",
    airport: "Sevilla Airport, cirka 20-30 minutter til sentrum",
    season: "Mars-mai og oktober-november er best. Juli og august kan bli veldig varmt.",
    areas: [
      ["Santa Cruz", "Best for første besøk, romantiske gater og kort vei til Alcazar."],
      ["El Arenal", "Best for sentrum, elven, tapas og klassiske severdigheter."],
      ["Triana", "Best for keramikk, lokal kveld, flamenco og litt mer nabolagsfølelse."]
    ],
    hotels: [
      ["Hotel Casa 1800 Sevilla", "Par", "Santa Cruz", "Historisk", "4*", "Takterrasse", "Romantisk hotell i gamlebyen med klassisk Sevilla-følelse og kort vei til alt."],
      ["H10 Casa de la Plata", "Familie", "Centro", "Boutique", "4*", "Basseng", "Godt familievalg med sentral beliggenhet, moderne rom og en enkel base for varme dager."],
      ["Hotel Alfonso XIII", "Luksus", "Centro", "Palasshotell", "5*", "Ikonisk", "Sevillas store luksusklassiker, perfekt hvis hotellet skal være en del av opplevelsen."],
      ["Hotel Becquer", "Billig og bra", "Centro", "Verdi", "4*", "Takbasseng", "Svært praktisk hotell med god beliggenhet og takbasseng uten luksuspris."],
      ["Novotel Sevilla", "Barnevennlig", "Nervion", "Familiebase", "4*", "Basseng", "Bra med barn når du vil ha basseng, enklere logistikk og metro/taxi til sentrum."]
    ],
    food: [
      ["El Rinconcillo", "Historisk tapasbar og godt første stopp."],
      ["Eslava", "Populært tapasvalg med høy kvalitet og livlig stemning."],
      ["Casa Morales", "Klassisk baropplevelse nær katedralområdet."],
      ["Abantal", "Michelin-nivå for deg som vil gjøre én stor middag."]
    ],
    shopping: [
      ["Calle Sierpes og Tetuan", "Klassiske handlegater i sentrum."],
      ["Triana keramikk", "Fliser, keramikk og lokale gaver på andre siden av elven."],
      ["Mercado de Triana", "Mat, småbutikker og lokal hverdagsfølelse."]
    ],
    beaches: [
      ["Matalascanas", "Nærmeste strandretning for en lang dagstur fra Sevilla."],
      ["Cadiz", "By og strand med tog. Bedre hvis du har en ekstra dag."],
      ["Bolonia", "Spektakulær strand lenger sør, best med bil og god tid."]
    ],
    gems: [
      ["Casa de Pilatos", "Vakkert palass som ofte er roligere enn Alcazar."],
      ["Hospital de los Venerables", "Kunst og arkitektur i Santa Cruz."],
      ["Metropol Parasol", "Utsikt og solnedgang over bytakene."],
      ["Alameda de Hercules", "Mer lokal kveld med barer og restauranter."]
    ],
    activities: ["Alcazar Sevilla", "Seville Cathedral and Giralda", "Flamenco Sevilla", "Tapas tour Sevilla", "Triana walking tour", "Cordoba day trip from Seville"]
  },
  {
    name: "Malaga",
    path: "spania/costa-del-sol/malaga",
    region: "Costa del Sol",
    type: "Strand, mat og byliv",
    intro: [
      "Malaga er blitt et av de beste inngangspunktene til Spania fra Norge. Du får strand, gamleby, museer, tapas, takbarer, kort transfer og enkel tilgang til resten av Costa del Sol.",
      "Byen fungerer både som helgetur og base for en uke. Velg sentrum hvis mat og kvelder er viktigst, eller strandnære områder hvis du vil senke tempoet."
    ],
    best: "4-7 netter, par, familier, kort transfer og Costa del Sol",
    airport: "Malaga Airport, cirka 15-25 minutter til sentrum",
    season: "Mars-juni og september-november er svært gode. Sommeren passer best for strand.",
    areas: [
      ["Centro Historico", "Best for tapas, museer, kvelder og første Malaga-tur."],
      ["La Malagueta", "Best for strandnær byferie og kort vei til sentrum."],
      ["Soho og havnen", "Best for moderne hotell, kunst, havnepromenade og Muelle Uno."]
    ],
    hotels: [
      ["Palacio Solecio", "Par", "Centro Historico", "Boutique", "4*", "Restaurant", "Elegant byhotell med historisk ramme og perfekt beliggenhet for tapas og gamlebyen."],
      ["Barcelo Malaga", "Familie", "Maria Zambrano", "Praktisk", "4*", "Tog", "Veldig enkel base med tog, metro, shopping og kort vei videre langs Costa del Sol."],
      ["Gran Hotel Miramar", "Luksus", "La Malagueta", "Grand hotel", "5*", "Strand", "Malagas klassiske luksushotell ved stranden, med basseng, spa og kort vei til sentrum."],
      ["Casual del Mar Malaga", "Billig og bra", "Soho", "Verdi", "3*", "Sentrum", "Fargerikt og praktisk hotell når du vil bo sentralt uten å bruke opp budsjettet."],
      ["Sol Guadalmar", "Barnevennlig", "Guadalmar", "Strandbase", "4*", "Basseng", "Godt strandvalg med barn, basseng og kort vei til flyplassen."]
    ],
    food: [
      ["El Pimpi", "Klassiker for første kveld, vin, tapas og Malaga-stemning."],
      ["Los Mellizos", "Sjømat og andalusisk ferieenergi nær sentrum."],
      ["Casa Lola", "Uformell tapas som fungerer godt tidlig på kvelden."],
      ["Jose Carlos Garcia", "Finere middag ved Muelle Uno for matinteresserte."]
    ],
    shopping: [
      ["Calle Larios", "Byens hovedgate for butikker, ispauser og kveldslys."],
      ["Muelle Uno", "Butikker, havn, restauranter og fin promenade."],
      ["Atarazanas-markedet", "Matmarked for lokal frokost, råvarer og småsmaking."]
    ],
    beaches: [
      ["La Malagueta", "Nærmest sentrum og lettest å kombinere med lunsj og gamleby."],
      ["Pedregalejo", "Bedre for strandlunsj, fiskespyd og lokal søndagsfølelse."],
      ["El Palo", "Mer lokal strandretning med rimeligere restauranter."]
    ],
    gems: [
      ["Gibralfaro ved solnedgang", "Beste utsikt over havn, by og tyrefekterarena."],
      ["Automobil- og motemuseet", "Overraskende god regnværs- eller pauseaktivitet."],
      ["Pedregalejo kveldstur", "Gå østover for roligere strand og fiskerestauranter."],
      ["Soho street art", "Kort, enkel runde med muralkunst nær havnen."]
    ],
    activities: ["Caminito del Rey from Malaga", "Ronda and white villages", "Malaga Alcazaba", "Picasso Museum Malaga", "Malaga tapas tour", "Catamaran Malaga"]
  },
  {
    name: "Marbella",
    path: "spania/costa-del-sol/marbella",
    region: "Costa del Sol",
    type: "Luksus, strand og gamleby",
    intro: [
      "Marbella er Costa del Sol med penere hotell, beach clubs, Puerto Banus, golf, gamleby og lange restaurantkvelder. Det er ikke det billigste valget, men det kan være et av de mest komfortable.",
      "Velg mellom Marbella sentrum, Golden Mile, Puerto Banus og roligere strandsoner østover. Avstandene betyr mer enn man tror, særlig uten leiebil."
    ],
    best: "4-7 netter, par, luksus, strandklubber og voksne familier",
    airport: "Malaga Airport, cirka 40-55 minutter med bil",
    season: "Mai-juni og september-oktober gir best balanse mellom vær og pris.",
    areas: [
      ["Gamlebyen", "Best for restauranter, kveldsliv, små gater og mer spansk følelse."],
      ["Golden Mile", "Best for luksusresorter, strandklubber og kort vei til alt med taxi."],
      ["Puerto Banus", "Best for shopping, marina, nattliv og mer glamorøs ferie."]
    ],
    hotels: [
      ["Amare Beach Hotel Marbella", "Par", "Marbella strand", "Adults only", "4*", "Beach club", "Stilrent voksenhotell med strand, basseng og gangavstand til gamlebyen."],
      ["Marriott's Marbella Beach Resort", "Familie", "Elviria", "Leilighetsresort", "4*", "Kjøkken", "Sterkt familievalg med leiligheter, basseng og strandnær base øst for Marbella."],
      ["Puente Romano Beach Resort", "Luksus", "Golden Mile", "Resort", "5*", "Restauranter", "Ikonisk luksusresort med strand, hager, tennis, restauranter og veldig høy Marbella-faktor."],
      ["Ona Marbella Inn", "Billig og bra", "Marbella sentrum", "Verdi", "3*", "Sentrum", "Praktisk og rimeligere valg når beliggenhet og enkel strandtilgang betyr mest."],
      ["AluaSun Marbella Park", "Barnevennlig", "Elviria", "Familiehotell", "4*", "Basseng", "Godt valg for barn med basseng, aktiviteter og enklere budsjett enn strandresortene."]
    ],
    food: [
      ["Skina", "Finere matopplevelse i gamlebyen."],
      ["Lobito de Mar", "Sjømat og polert kyststemning."],
      ["Bibo Marbella", "Livlig og moderne Marbella-middag."],
      ["Altamirano", "Klassisk sjømat i gamlebyen."]
    ],
    shopping: [
      ["Puerto Banus", "Luksusbutikker, marina og vindusshopping."],
      ["La Canada", "Stort kjøpesenter for praktisk shopping."],
      ["Gamlebyen", "Små butikker, keramikk, klær og kveldsvandring."]
    ],
    beaches: [
      ["Playa de la Fontanilla", "Sentralt og enkelt fra Marbella by."],
      ["Nagueles og Golden Mile", "Penere strandfølelse ved luksushotellene."],
      ["Cabopino", "Finere sand, roligere preg og godt familievalg."]
    ],
    gems: [
      ["Plaza de los Naranjos tidlig", "Gå før lunsjrushet for roligere gamleby."],
      ["Dunas de Artola", "Naturlig strand- og sanddyneområde ved Cabopino."],
      ["Benahavis", "Matlandsby i fjellene, perfekt kveldstur med bil."],
      ["Istán", "Liten fjellby og grønn kontrast til kysten."]
    ],
    activities: ["Marbella yacht", "Puerto Banus tour", "Ronda from Marbella", "Caminito del Rey Marbella", "Marbella tapas tour", "Canyoning Costa del Sol"]
  },
  {
    name: "Alicante",
    path: "spania/costa-blanca/alicante",
    region: "Costa Blanca",
    type: "Prisgunstig strandby",
    intro: [
      "Alicante er et av de enkleste og mest prisvennlige Spania-valgene. Flyplassen ligger nær byen, strendene er lett tilgjengelige, og gamlebyen er liten nok til at du raskt finner rytmen.",
      "Byen passer for korttur, rimelig hotelluke, familier, par og reisende som vil kombinere strand med leiebil til Costa Blanca."
    ],
    best: "4-7 netter, budsjett, strand, barnefamilier og kort transfer",
    airport: "Alicante Airport, cirka 20 minutter til sentrum",
    season: "April-juni og september-november. Sommeren er varm og strandvennlig.",
    areas: [
      ["Centro og gamlebyen", "Best for tapas, strand, havn og kort første tur."],
      ["Postiguet", "Best for strandnært byhotell og enkel feriehverdag."],
      ["San Juan", "Best for lengre strand, mer plass og roligere familiedager."]
    ],
    hotels: [
      ["Hospes Amerigo", "Par", "Gamlebyen", "Boutique", "5*", "Takterrasse", "Elegant hotell i sentrum med spa, takbasseng og kort vei til strand og restauranter."],
      ["Melia Alicante", "Familie", "Postiguet", "Strandby", "4*", "Havn", "Svært praktisk hotell mellom stranden og havnen, med kort vei til alt."],
      ["Hotel Casa Alberola Alicante", "Luksus", "Havnen", "Boutique", "4*", "Utsikt", "Voksen og stilig base ved vannet, best for par som vil bo pent og sentralt."],
      ["Hotel Maya Alicante", "Billig og bra", "Santa Barbara", "Verdi", "3*", "Basseng", "God verdi med basseng, enkel strandvei og kort avstand til sentrum."],
      ["Port Alicante City & Beach", "Barnevennlig", "San Juan", "Familiebase", "4*", "Basseng", "Bedre for familier som vil ha mer strandplass, basseng og roligere dager."]
    ],
    food: [
      ["Nou Manolin", "Klassiker for tapas, sjømat og byfølelse."],
      ["La Taberna del Gourmet", "Trygt valg for første kveld og deling av småretter."],
      ["Darsena", "Kjent for risretter og utsikt ved havnen."],
      ["Monastrell", "Finere matopplevelse for en mer spesiell middag."]
    ],
    shopping: [
      ["Avenida Maisonnave", "Hovedgate for shopping og varehus."],
      ["Mercado Central", "Mat, råvarer og lokal stemning."],
      ["Plaza Mar 2", "Praktisk kjøpesenter nær strand og slott."]
    ],
    beaches: [
      ["Playa del Postiguet", "Bystranden under Santa Barbara-slottet."],
      ["Playa de San Juan", "Lang og bred strand, best for familier og god plass."],
      ["Tabarca", "Øytur med klart vann og snorkling på riktig dag."]
    ],
    gems: [
      ["Barrio de Santa Cruz", "Små hvite gater under slottet."],
      ["Serra Grossa", "Enkel utsiktstur mellom sentrum og San Juan-retningen."],
      ["Altea", "Pen hvit gamleby som passer som dagstur."],
      ["Villajoyosa", "Fargerike hus, strand og sjokoladehistorie."]
    ],
    activities: ["Santa Barbara Castle Alicante", "Tabarca Island", "Guadalest and Algar waterfalls", "Alicante food tour", "Alicante wine tour", "Alicante bike tour"]
  },
  {
    name: "Benidorm",
    path: "spania/costa-blanca/benidorm",
    region: "Costa Blanca",
    type: "Familie, strand og underholdning",
    intro: [
      "Benidorm er stort, praktisk og mye bedre for familier enn ryktet tilsier når du velger riktig område. Her får du lange strender, fornøyelsesparker, badeland, rimelige hotell og mye å gjøre.",
      "Levante gir mest liv, Poniente er roligere og bedre for familier, mens Finestrat og områdene rundt passer hvis du vil ha resort, bil og mer plass."
    ],
    best: "5-8 netter, familier, strand, badeland og budsjett",
    airport: "Alicante Airport, cirka 40-50 minutter med bil",
    season: "Mai-juni og september-oktober gir god strandtemperatur uten topptrykk.",
    areas: [
      ["Levante", "Best for liv, restauranter, strandpromenade og underholdning."],
      ["Poniente", "Best for familier, roligere hoteller og penere stranddager."],
      ["Finestrat", "Best for resortfølelse, leiebil og familieaktiviteter."]
    ],
    hotels: [
      ["Villa Venecia Hotel Boutique Gourmet", "Par", "Gamlebyen", "Boutique", "5*", "Utsikt", "Romantisk hotell med havutsikt og voksen stemning ved gamlebyen."],
      ["Hotel RH Princesa", "Familie", "Sentrum", "Familiehotell", "4*", "Basseng", "Trygt familievalg med basseng, aktiviteter og kort vei til strand og sentrum."],
      ["Asia Gardens Hotel & Thai Spa", "Luksus", "Finestrat", "Resort", "5*", "Spa", "Luksusresort utenfor byen med hager, basseng og roligere atmosfære."],
      ["Hotel Helios Benidorm", "Billig og bra", "Levante", "Verdi", "3*", "Basseng", "Populært budsjettvalg nær Levante, restauranter og enkel feriehverdag."],
      ["Magic Robin Hood Resort", "Barnevennlig", "Alfaz/Finestrat", "Familieresort", "4*", "Vannpark", "Sterkt barnevalg med temaresort, vannparkpreg og mye aktivitet på stedet."]
    ],
    food: [
      ["La Cava Aragonesa", "Tapas i gamlebyen, fint for en første Benidorm-kveld."],
      ["Ulia", "Sjømat og risretter ved Poniente."],
      ["The Vagabond", "Lite, populært middagssted i gamlebyen."],
      ["Amigos Bistro", "Trygt og vennlig restaurantvalg for par og voksne familier."]
    ],
    shopping: [
      ["Gamlebyen", "Småbutikker, tapasgater og kveldsvandring."],
      ["La Marina", "Stort kjøpesenter i Finestrat."],
      ["Levante promenade", "Enkelt for strandutstyr, sko, suvenirer og småhandel."]
    ],
    beaches: [
      ["Levante", "Mest liv og mest sentralt."],
      ["Poniente", "Bredere, roligere og ofte bedre for familier."],
      ["Cala Tio Ximo", "Liten vik for snorkling og mer skjermet følelse."]
    ],
    gems: [
      ["Balcon del Mediterraneo", "Klassisk utsiktspunkt mellom strendene."],
      ["Benidorm Island", "Kort båttur og fin kontrast til hotellsonen."],
      ["Sierra Helada", "Utsiktstur og natur rett utenfor byen."],
      ["Villajoyosa", "Fargerik naboby som gir roligere dagstur."]
    ],
    activities: ["Terra Mitica", "Aqualandia Benidorm", "Mundomar Benidorm", "Benidorm Island boat", "Guadalest and Algar from Benidorm", "Sierra Helada kayak"]
  },
  {
    name: "Palma og Mallorca",
    path: "spania/mallorca",
    region: "Balearene",
    type: "Øyferie for alle",
    intro: [
      "Mallorca er et av de tryggeste Spania-valgene fordi øya kan være nesten alt: Palma-helg, familieferie i Alcudia, voksen strandferie i Port de Soller, luksus ved kysten eller roadtrip i Tramuntana.",
      "Tenk på Mallorca som flere ferier i én. Velg Palma for by og mat, nordkysten for barn, sørøst for penere viker og vestkysten for fjell, utsikt og roligere tempo."
    ],
    best: "5-10 netter, familier, par, strand, fjell og mat",
    airport: "Palma de Mallorca Airport, cirka 15 minutter til Palma",
    season: "April-juni og september-oktober er best. Juli og august er mest populære og dyrest.",
    areas: [
      ["Palma", "Best for par, helgetur, shopping, mat og kort transfer."],
      ["Alcudia og Playa de Muro", "Best for barnefamilier og lang, grunn sandstrand."],
      ["Port de Soller og Cala d'Or", "Best for roligere ferie, småbyfølelse og penere kyst."]
    ],
    hotels: [
      ["Hotel Can Cera", "Par", "Palma gamleby", "Boutique", "5*", "Historisk", "Romantisk byhotell i et gammelt palass, perfekt for mat, kultur og korte avstander."],
      ["Zafiro Palace Palmanova", "Familie", "Palmanova", "Familieresort", "5*", "Basseng", "Sterkt familievalg med store rom, basseng og enkel strandferie."],
      ["Cap Rocat", "Luksus", "Cala Blava", "Fort-hotell", "5*", "Privatliv", "Et av øyas mest spesielle luksushoteller, best for par og voksne som vil ha ro."],
      ["Hotel Almudaina", "Billig og bra", "Palma", "Sentrum", "4*", "Takterrasse", "God verdi i Palma med kort vei til shopping, gamlebyen og havneområdet."],
      ["Zafiro Palace Alcudia", "Barnevennlig", "Alcudia", "Familieresort", "5*", "Basseng", "Svært barnevennlig resort nær nordkystens beste familieområder."]
    ],
    food: [
      ["Marc Fosh", "Finere Palma-middag med moderne middelhavskjøkken."],
      ["Ca'n Joan de s'Aigo", "Klassiker for iskrem, ensaimada og søt pause."],
      ["Forn de Sant Joan", "Godt middagsvalg i Palma gamleby."],
      ["La Rosa Vermuteria", "Uformell og hyggelig vermut- og tapasstemning."]
    ],
    shopping: [
      ["Passeig del Born", "Palmas peneste shoppingakse."],
      ["Jaime III", "Butikker, varehus og enkel sentrumsshopping."],
      ["Santa Catalina-markedet", "Mat, snacks og lokal stemning før lunsj."]
    ],
    beaches: [
      ["Playa de Muro", "Lang, familievennlig og ofte det tryggeste strandvalget med barn."],
      ["Cala Mondrago", "Vakker vik i naturpark, best med tidlig start."],
      ["Es Trenc", "Lang naturstrand med karibisk følelse på riktig dag."]
    ],
    gems: [
      ["Deia", "Kunstnerby, fjell, utsikt og romantisk dagstur."],
      ["Valldemossa", "Vakre gater, kaker og fjellfølelse."],
      ["Cala Figuera", "Liten havn med postkortstemning."],
      ["Soller-toget", "Klassisk rute fra Palma til fjell og havn."]
    ],
    activities: ["Palma Cathedral", "Soller train Mallorca", "Drach Caves Mallorca", "Serra de Tramuntana tour", "Mallorca boat trip", "Mallorca wine tasting"]
  },
  {
    name: "Ibiza",
    path: "spania/ibiza",
    region: "Balearene",
    type: "Strand, club og roligere nord",
    intro: [
      "Ibiza er mer enn nattklubber. Øya har små viker, roligere landsbyer, god mat, Dalt Vila, solnedganger, Formentera-turer og hotell for både par, familier og vennegjenger.",
      "Velg område nøye: Ibiza by og Talamanca gir by og marina, Santa Eularia er roligere, San Antonio har solnedgang og mer budsjett, mens nordkysten er mer voksen og avslappet."
    ],
    best: "4-7 netter, par, venner, strand, solnedgang og uteliv",
    airport: "Ibiza Airport, cirka 15-25 minutter til Ibiza by",
    season: "Mai-juni og september er best. Juli og august er dyrest og mest intenst.",
    areas: [
      ["Ibiza by og Talamanca", "Best for Dalt Vila, marina, restauranter og kort transfer."],
      ["Santa Eularia", "Best for roligere ferie, familier og bedre søvn."],
      ["San Antonio og vestkysten", "Best for solnedgang, budsjett og mer uteliv."]
    ],
    hotels: [
      ["Hotel Mirador de Dalt Vila", "Par", "Dalt Vila", "Boutique", "5*", "Historisk", "Romantisk og eksklusivt hotell i gamlebyen, perfekt for par som vil bo spesielt."],
      ["Grand Palladium Palace Ibiza Resort & Spa", "Familie", "Playa d'en Bossa", "Resort", "5*", "All inclusive", "Trygt familievalg med resortfasiliteter, basseng og kort vei til strand."],
      ["Six Senses Ibiza", "Luksus", "Xarraca", "Retreat", "5*", "Spa", "Øyas mest eksklusive roligere hotellvalg, best for luksus, spa og nordlig kyst."],
      ["Hotel Gran Sol", "Billig og bra", "San Antonio", "Verdi", "3*", "Basseng", "Godt budsjettvalg med ryddig standard, basseng og kort vei til solnedgangssonen."],
      ["Invisa Hotel Club Cala Verde", "Barnevennlig", "Es Figueral", "Familiehotell", "4*", "Aktiviteter", "Barnevennlig hotell ved roligere strand, godt for familier som vil vekk fra klubbområdene."]
    ],
    food: [
      ["La Brasa", "Hyggelig hage og grillmat i Ibiza by."],
      ["La Oliva", "Klassiker i Dalt Vila for kveldsmat i gamlebyen."],
      ["Sa Capella", "Stemningsfull restaurant i gammelt kapell nær San Antonio."],
      ["La Paloma", "Roligere nordlig matopplevelse med landlig preg."]
    ],
    shopping: [
      ["La Marina", "Småbutikker, hvite klær og Ibiza-stil."],
      ["Las Dalias", "Kjent hippiemarked med klær, smykker og musikk."],
      ["Sant Jordi-markedet", "Mer lokalt loppemarked med lavere glans og bedre funn."]
    ],
    beaches: [
      ["Cala Comte", "Klassisk solnedgangsstrand med klart vann."],
      ["Cala Saladeta", "Vakker vik, best tidlig før det blir fullt."],
      ["Ses Salines", "Lang strand, beach clubs og mer glamorøs energi."]
    ],
    gems: [
      ["Dalt Vila tidlig morgen", "Gamlebyen før varmen og folkemengdene."],
      ["Santa Gertrudis", "Innlandsby for lunsj, butikker og roligere Ibiza."],
      ["Es Vedra utsikt", "Dra mot solnedgang, men kom tidlig for plass."],
      ["Formentera", "Dagstur når du vil se noen av Balearenes fineste strender."]
    ],
    activities: ["Formentera boat from Ibiza", "Dalt Vila walking tour", "Ibiza sunset cruise", "Ibiza snorkeling", "Ibiza beach hopping", "Ibiza club tickets"]
  },
  {
    name: "Tenerife",
    path: "spania/kanarioyene-tenerife",
    region: "Kanariøyene",
    type: "Vintervarme og vulkan",
    intro: [
      "Tenerife er det mest komplette vintervarme-valget i Spania. Du får strender i sør, Teide, fjellandsbyer, hvalsafari, badeland og nok variasjon til at en uke ikke føles lang.",
      "Sørkysten er tryggest for sol og resortferie. Nordkysten er grønnere, mer lokal og mer værutsatt. Leiebil gjør Tenerife mye bedre."
    ],
    best: "7-10 netter, vintervarme, familier, natur og resort",
    airport: "Tenerife South for sørkysten, Tenerife North for nord og La Laguna",
    season: "November-mars for vintervarme. Mai-juni og september er roligere og behagelig.",
    areas: [
      ["Costa Adeje", "Best for resort, familier, restauranter og høyere hotellstandard."],
      ["Los Cristianos og Playa de las Americas", "Best for strand, liv, shopping og enkel logistikk."],
      ["Puerto de la Cruz", "Best for grønnere nord, lokal følelse og botaniske hager."]
    ],
    hotels: [
      ["Royal Hideaway Corales Beach", "Par", "La Caleta", "Adults only", "5*", "Design", "Elegant voksenhotell med rolig luksusfølelse, sjøutsikt og gode restauranter."],
      ["GF Victoria", "Familie", "Costa Adeje", "Familieresort", "5*", "Basseng", "Et av de sterkeste familiehotellene på Tenerife med basseng, aktiviteter og god beliggenhet."],
      ["The Ritz-Carlton Tenerife, Abama", "Luksus", "Guia de Isora", "Resort", "5*", "Golf", "Stor luksusresort med spa, strand, golf og mer tilbaketrukket ferie."],
      ["MYND Adeje", "Billig og bra", "Callao Salvaje", "Moderne", "4*", "Verdi", "Godt verdi-alternativ med moderne preg og roligere base enn de største ferieområdene."],
      ["Bahia del Duque", "Barnevennlig", "Costa Adeje", "Luksusfamilie", "5*", "Strand", "Klassisk resort med strandnær beliggenhet, hager og god plass for familier."]
    ],
    food: [
      ["El Rincon de Juan Carlos", "Finere matopplevelse for en spesiell kveld."],
      ["La Vieja", "Sjømat ved La Caleta."],
      ["Mercado Nuestra Senora de Africa", "Matmarked i Santa Cruz for lokal smaking."],
      ["Casa Pache", "Klassisk kanarisk mat i fjellområdene."]
    ],
    shopping: [
      ["Plaza del Duque", "Penere shopping i Costa Adeje."],
      ["Safari Centre", "Butikker og kveldsliv ved Playa de las Americas."],
      ["Santa Cruz", "Mer lokal byshopping og varehus."]
    ],
    beaches: [
      ["Playa del Duque", "Pen resortstrand i Costa Adeje."],
      ["Las Vistas", "Familievennlig strand mellom Los Cristianos og Americas."],
      ["Playa de Benijo", "Dramatisk naturstrand i nord, best som utflukt."]
    ],
    gems: [
      ["Masca", "Fjellandsby og dramatisk vei. Best tidlig med bil."],
      ["Anaga", "Grønn natur, utsikt og roligere Tenerife."],
      ["La Laguna", "Historisk by med mer lokal atmosfære."],
      ["Garachico", "Vulkanbasseng og pen liten by på nordvestkysten."]
    ],
    activities: ["Teide National Park", "Tenerife whale watching", "Siam Park Tenerife", "Masca Tenerife", "Anaga rural park", "Tenerife stargazing"]
  },
  {
    name: "Gran Canaria",
    path: "spania/kanarioyene-gran-canaria",
    region: "Kanariøyene",
    type: "Vinterklassiker",
    intro: [
      "Gran Canaria er den klassiske vinterøya for nordmenn: korte avstander, stabil sørkyst, mange hotell, strender, shopping og nok fjellnatur til at du kan bryte opp bassengdagene.",
      "Sørkysten gir mest sol. Las Palmas gir byliv og strand i samme pakke. Puerto de Mogan er roligere og penere, men mindre praktisk uten bil."
    ],
    best: "7-10 netter, vintervarme, familier, pensjonister, par og strand",
    airport: "Gran Canaria Airport, cirka 20-40 minutter til sørkysten",
    season: "November-mars for vintervarme. April-juni og september er ofte bedre pris.",
    areas: [
      ["Maspalomas og Meloneras", "Best for resort, strand, sanddyner og roligere kvelder."],
      ["Playa del Ingles", "Best for liv, shopping, strand og bredt hotellutvalg."],
      ["Puerto de Mogan", "Best for roligere ferie, marina og pen småbyfølelse."]
    ],
    hotels: [
      ["Bohemia Suites & Spa", "Par", "Playa del Ingles", "Adults only", "5*", "Utsikt", "Stilrent voksenhotell med takbar, spa og kort vei til strand og kveldsliv."],
      ["Lopesan Baobab Resort", "Familie", "Meloneras", "Resort", "5*", "Basseng", "Stor resortfavoritt for familier med mange basseng og kort vei til Meloneras."],
      ["Seaside Grand Hotel Residencia", "Luksus", "Maspalomas", "Grand hotel", "5*", "Rolig", "Et av øyas mest elegante hotellvalg, med rolig luksus og klassisk service."],
      ["TC Hotel Dona Luisa", "Billig og bra", "Las Palmas", "Bystrand", "3*", "Las Canteras", "God verdi nær Las Canteras når du vil kombinere strand og by."],
      ["Radisson Blu Resort & Spa Gran Canaria Mogan", "Barnevennlig", "Puerto de Mogan", "Familieresort", "5*", "Basseng", "Sterkt barnevalg med basseng, aktiviteter og roligere område."]
    ],
    food: [
      ["Que Leche", "Kreativ og populær restaurant i Las Palmas."],
      ["Casa Montesdeoca", "Historisk ramme og kanarisk preg i Vegueta."],
      ["La Aquarela", "Finere middag sør på øya."],
      ["Mercado del Puerto", "Uformell smaking ved Las Canteras."]
    ],
    shopping: [
      ["Triana Las Palmas", "Historisk handlegate med butikker og kaféer."],
      ["Las Arenas", "Kjøpesenter ved Las Canteras."],
      ["Yumbo Centre", "Shopping, barer og kveldsliv i Playa del Ingles."]
    ],
    beaches: [
      ["Maspalomas", "Ikonisk strand med sanddyner og god plass."],
      ["Amadores", "Familievennlig bukt med roligere vann."],
      ["Las Canteras", "En av Spanias beste bystrender."]
    ],
    gems: [
      ["Roque Nublo", "Fjelltur og øyas mest kjente naturikon."],
      ["Agaete", "Liten nordvestlig by med hav, fjell og roligere energi."],
      ["Teror", "Pen innlandsby med balkonger og søndagsmarked."],
      ["Barranco de Guayadeque", "Dramatisk dal med grotterestauranter."]
    ],
    activities: ["Maspalomas dunes", "Gran Canaria dolphin watching", "Roque Nublo tour", "Las Palmas Vegueta", "Gran Canaria buggy tour", "Puerto de Mogan boat"]
  }
];

const P = {
  barcelona: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Aerial_view_of_Barcelona%2C_Spain_%2851227309370%29_edited.jpg/1280px-Aerial_view_of_Barcelona%2C_Spain_%2851227309370%29_edited.jpg",
  madrid: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Plaza_Mayor_De_Madrid_%28215862629%29_edited.jpeg/1280px-Plaza_Mayor_De_Madrid_%28215862629%29_edited.jpeg",
  valencia: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Malvarrosa_Beach%2C_Valencia%2C_Spain_%2829812271043%29.jpg/1280px-Malvarrosa_Beach%2C_Valencia%2C_Spain_%2829812271043%29.jpg",
  seville: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Sevilla_Cathedral_-_Southeast.jpg/1280px-Sevilla_Cathedral_-_Southeast.jpg",
  malaga: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Da_Gibralfaro_%28cropped%292.jpg/1280px-Da_Gibralfaro_%28cropped%292.jpg",
  marbella: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Captivating_Views_of_Old_Town_Marbella.jpg/1280px-Captivating_Views_of_Old_Town_Marbella.jpg",
  alicante: "https://upload.wikimedia.org/wikipedia/commons/8/85/Alicante%2C_Spain.jpg",
  benidorm: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Benidorm-pano-160410.jpg/1280px-Benidorm-pano-160410.jpg",
  palma: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Kathedrale_von_Palma_II.jpg/1280px-Kathedrale_von_Palma_II.jpg",
  ibiza: "https://mundodele.com/en/wp-content/uploads/2025/10/Ibiza-Old-Town-Walking-Tour-.webp",
  tenerife: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Teide_qtl1.jpg/1280px-Teide_qtl1.jpg",
  granCanaria: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/GC_Dunas_de_Maspalomas_R04.jpg/1280px-GC_Dunas_de_Maspalomas_R04.jpg",
  sagrada: "https://upload.wikimedia.org/wikipedia/commons/e/ef/SF_maig_2_cropped.jpg",
  parkGuell: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Parc_guell_-_panoramio.jpg/1280px-Parc_guell_-_panoramio.jpg",
  casaBatllo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Casa_Batllo_roof.JPG/1280px-Casa_Batllo_roof.JPG",
  montserrat: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/MontserratMonastery02.jpg/1280px-MontserratMonastery02.jpg",
  boqueria: "https://upload.wikimedia.org/wikipedia/commons/b/be/La_Boqueria.JPG",
  tapas: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/TapasenBarcelona.JPG/1280px-TapasenBarcelona.JPG",
  prado: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Museo_del_Prado_%28Madrid%29_06.jpg/1280px-Museo_del_Prado_%28Madrid%29_06.jpg",
  royalPalace: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Royal_Palace_of_Madrid_01.jpg/1280px-Royal_Palace_of_Madrid_01.jpg",
  bernabeu: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Estadio_Santiago_Bernab%C3%A9u_-_01.jpg/1280px-Estadio_Santiago_Bernab%C3%A9u_-_01.jpg",
  sanMiguel: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Mercado_de_San_Miguel_-_Madrid.png/1280px-Mercado_de_San_Miguel_-_Madrid.png",
  oceanografic: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Oceanografic.JPG/1280px-Oceanografic.JPG",
  artsSciences: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/L%27Umbracle%2C_Valencia%2C_Spain_-_Jan_2007.jpg/1280px-L%27Umbracle%2C_Valencia%2C_Spain_-_Jan_2007.jpg",
  albufera: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/ES_Valencia_Albufera.jpg/1280px-ES_Valencia_Albufera.jpg",
  paella: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/01_Paella_Valenciana_original.jpg/1280px-01_Paella_Valenciana_original.jpg",
  giralda: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Plaza_Virgen_de_los_Reyes%2C_Seville%2C_Spain_-_Sep_2009.jpg/1280px-Plaza_Virgen_de_los_Reyes%2C_Seville%2C_Spain_-_Sep_2009.jpg",
  triana: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Triana_embankment_Seville_Spain.jpg/1280px-Triana_embankment_Seville_Spain.jpg",
  caminito: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Caminito_del_Rey%2C_M%C3%A1laga%2C_Espa%C3%B1a%2C_2023-05-18%2C_DD_46.jpg/1280px-Caminito_del_Rey%2C_M%C3%A1laga%2C_Espa%C3%B1a%2C_2023-05-18%2C_DD_46.jpg",
  ronda: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/View_of_Puente_Nuevo_bridge_in_Ronda_Spain.jpg/1280px-View_of_Puente_Nuevo_bridge_in_Ronda_Spain.jpg",
  alcazaba: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Spain_Andalusia_Malaga_BW_2015-10-24_14-59-25.jpg/1280px-Spain_Andalusia_Malaga_BW_2015-10-24_14-59-25.jpg",
  puertoBanus: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Puerto_Ban%C3%BAs_3.jpg/1280px-Puerto_Ban%C3%BAs_3.jpg",
  guadalest: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/View_of_the_Guadalest_Castle%2C_Alicante_%28Valencia%2C_Spain%29_I.jpg/1280px-View_of_the_Guadalest_Castle%2C_Alicante_%28Valencia%2C_Spain%29_I.jpg",
  terraMitica: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Magnus_Colossus_tematizaci%C3%B3n.JPG/1280px-Magnus_Colossus_tematizaci%C3%B3n.JPG",
  aqualandia: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Aqualandia.jpg",
  mundomar: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/MundoMar_Benidorm_%2815382242782%29.jpg/1280px-MundoMar_Benidorm_%2815382242782%29.jpg",
  drach: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Interior_de_las_Cuevas_del_Drach.jpg/1280px-Interior_de_las_Cuevas_del_Drach.jpg",
  tramuntana: "https://upload.wikimedia.org/wikipedia/commons/8/8b/SerraTramuntana2.jpg",
  calaComte: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Balearen%2C_Ibiza%2C_Wanderung_NW_Cala_Codolar_-_Cala_Comte_-_Punta_de_sa_Torre_-_panoramio.jpg/1280px-Balearen%2C_Ibiza%2C_Wanderung_NW_Cala_Codolar_-_Cala_Comte_-_Punta_de_sa_Torre_-_panoramio.jpg",
  formentera: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Formentera_beach_restaurant.jpg/1280px-Formentera_beach_restaurant.jpg",
  siam: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/A0455_Tenerife%2C_Siam_Park_aerial_view.jpg/1280px-A0455_Tenerife%2C_Siam_Park_aerial_view.jpg",
  anaga: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Parque_rural_de_Anaga%2C_Tenerife%2C_Espa%C3%B1a%2C_2022-01-09%2C_DD_57-59_HDR.jpg/1280px-Parque_rural_de_Anaga%2C_Tenerife%2C_Espa%C3%B1a%2C_2022-01-09%2C_DD_57-59_HDR.jpg",
  masca: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Masca_auf_Teneriffa_%28Zuschnitt%29.jpg/1280px-Masca_auf_Teneriffa_%28Zuschnitt%29.jpg",
  roqueNublo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Roque_Nublo_-_Gran_Canaria.JPG/1280px-Roque_Nublo_-_Gran_Canaria.JPG",
  puertoMogan: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Playa_puerto_mogan_gran_canaria.jpg/1280px-Playa_puerto_mogan_gran_canaria.jpg",
  lasCanteras: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Playa_de_las_canteras_24_Dec2006_palmas_gran_canaria.jpg"
};

const photoLibrary = {
  Barcelona: {
    hero: [P.barcelona],
    hotels: [P.barcelona, P.sagrada, P.parkGuell, P.casaBatllo, P.montserrat],
    areas: [P.barcelona, P.sagrada, P.parkGuell],
    food: [P.tapas, P.casaBatllo, P.sagrada, P.barcelona],
    shopping: [P.casaBatllo, P.barcelona, P.parkGuell],
    beaches: [P.barcelona, P.parkGuell, P.montserrat],
    gems: [P.montserrat, P.parkGuell, P.sagrada, P.barcelona],
    activities: [P.sagrada, P.parkGuell, P.casaBatllo, P.montserrat, P.tapas, P.barcelona]
  },
  Madrid: {
    hero: [P.madrid],
    hotels: [P.madrid, P.sanMiguel, P.royalPalace, P.prado, P.bernabeu],
    areas: [P.madrid, P.sanMiguel, P.royalPalace],
    food: [P.sanMiguel, P.tapas, P.madrid, P.prado],
    shopping: [P.madrid, P.royalPalace, P.sanMiguel],
    beaches: [P.madrid, P.royalPalace, P.valencia],
    gems: [P.royalPalace, P.prado, P.sanMiguel, P.madrid],
    activities: [P.prado, P.royalPalace, P.madrid, P.bernabeu, P.tapas, P.sanMiguel]
  },
  Valencia: {
    hero: [P.artsSciences],
    hotels: [P.valencia, P.artsSciences, P.oceanografic, P.paella, P.albufera],
    areas: [P.valencia, P.artsSciences, P.albufera],
    food: [P.paella, P.valencia, P.oceanografic, P.albufera],
    shopping: [P.artsSciences, P.valencia, P.paella],
    beaches: [P.valencia, P.albufera, P.artsSciences],
    gems: [P.albufera, P.valencia, P.artsSciences, P.oceanografic],
    activities: [P.oceanografic, P.artsSciences, P.paella, P.albufera, P.valencia, P.oceanografic]
  },
  Sevilla: {
    hero: [P.seville],
    hotels: [P.seville, P.giralda, P.triana, P.seville, P.ronda],
    areas: [P.seville, P.giralda, P.triana],
    food: [P.tapas, P.triana, P.seville, P.giralda],
    shopping: [P.triana, P.seville, P.giralda],
    beaches: [P.seville, P.triana, P.giralda],
    gems: [P.giralda, P.triana, P.seville, P.tapas],
    activities: [P.seville, P.giralda, P.tapas, P.triana, P.triana, P.ronda]
  },
  Malaga: {
    hero: [P.malaga],
    hotels: [P.malaga, P.alcazaba, P.caminito, P.ronda, P.malaga],
    areas: [P.malaga, P.alcazaba, P.tapas],
    food: [P.tapas, P.malaga, P.alcazaba, P.ronda],
    shopping: [P.malaga, P.tapas, P.alcazaba],
    beaches: [P.malaga, P.alcazaba, P.caminito],
    gems: [P.alcazaba, P.caminito, P.ronda, P.malaga],
    activities: [P.caminito, P.ronda, P.alcazaba, P.malaga, P.tapas, P.malaga]
  },
  Marbella: {
    hero: [P.marbella],
    hotels: [P.marbella, P.puertoBanus, P.ronda, P.marbella, P.caminito],
    areas: [P.marbella, P.puertoBanus, P.ronda],
    food: [P.tapas, P.marbella, P.puertoBanus, P.ronda],
    shopping: [P.puertoBanus, P.marbella, P.ronda],
    beaches: [P.marbella, P.puertoBanus, P.ronda],
    gems: [P.marbella, P.ronda, P.caminito, P.puertoBanus],
    activities: [P.puertoBanus, P.marbella, P.ronda, P.caminito, P.tapas, P.caminito]
  },
  Alicante: {
    hero: [P.alicante],
    hotels: [P.alicante, P.guadalest, P.valencia, P.alicante, P.guadalest],
    areas: [P.alicante, P.guadalest, P.valencia],
    food: [P.tapas, P.paella, P.alicante, P.guadalest],
    shopping: [P.alicante, P.tapas, P.valencia],
    beaches: [P.alicante, P.guadalest, P.valencia],
    gems: [P.guadalest, P.alicante, P.valencia, P.tapas],
    activities: [P.alicante, P.guadalest, P.guadalest, P.tapas, P.paella, P.alicante]
  },
  Benidorm: {
    hero: [P.benidorm],
    hotels: [P.benidorm, P.terraMitica, P.aqualandia, P.mundomar, P.guadalest],
    areas: [P.benidorm, P.terraMitica, P.guadalest],
    food: [P.tapas, P.benidorm, P.guadalest, P.mundomar],
    shopping: [P.benidorm, P.terraMitica, P.aqualandia],
    beaches: [P.benidorm, P.guadalest, P.mundomar],
    gems: [P.guadalest, P.benidorm, P.terraMitica, P.mundomar],
    activities: [P.terraMitica, P.aqualandia, P.mundomar, P.benidorm, P.guadalest, P.benidorm]
  },
  "Palma og Mallorca": {
    hero: [P.palma],
    hotels: [P.palma, P.tramuntana, P.drach, P.calaComte, P.palma],
    areas: [P.palma, P.tramuntana, P.drach],
    food: [P.paella, P.tapas, P.palma, P.tramuntana],
    shopping: [P.palma, P.tapas, P.tramuntana],
    beaches: [P.calaComte, P.tramuntana, P.drach],
    gems: [P.tramuntana, P.palma, P.drach, P.calaComte],
    activities: [P.palma, P.tramuntana, P.drach, P.tramuntana, P.calaComte, P.paella]
  },
  Ibiza: {
    hero: [P.ibiza],
    hotels: [P.ibiza, P.calaComte, P.formentera, P.ibiza, P.calaComte],
    areas: [P.ibiza, P.calaComte, P.formentera],
    food: [P.tapas, P.ibiza, P.calaComte, P.formentera],
    shopping: [P.ibiza, P.calaComte, P.formentera],
    beaches: [P.calaComte, P.formentera, P.ibiza],
    gems: [P.ibiza, P.calaComte, P.formentera, P.ibiza],
    activities: [P.formentera, P.ibiza, P.calaComte, P.formentera, P.calaComte, P.ibiza]
  },
  Tenerife: {
    hero: [P.tenerife],
    hotels: [P.tenerife, P.siam, P.anaga, P.masca, P.tenerife],
    areas: [P.tenerife, P.siam, P.anaga],
    food: [P.tapas, P.tenerife, P.masca, P.anaga],
    shopping: [P.tenerife, P.siam, P.anaga],
    beaches: [P.tenerife, P.siam, P.anaga],
    gems: [P.masca, P.anaga, P.tenerife, P.siam],
    activities: [P.tenerife, P.tenerife, P.siam, P.masca, P.anaga, P.tenerife]
  },
  "Gran Canaria": {
    hero: [P.granCanaria],
    hotels: [P.granCanaria, P.roqueNublo, P.puertoMogan, P.lasCanteras, P.granCanaria],
    areas: [P.granCanaria, P.lasCanteras, P.puertoMogan],
    food: [P.tapas, P.lasCanteras, P.puertoMogan, P.roqueNublo],
    shopping: [P.lasCanteras, P.granCanaria, P.puertoMogan],
    beaches: [P.granCanaria, P.lasCanteras, P.puertoMogan],
    gems: [P.roqueNublo, P.puertoMogan, P.granCanaria, P.lasCanteras],
    activities: [P.granCanaria, P.lasCanteras, P.roqueNublo, P.lasCanteras, P.granCanaria, P.puertoMogan]
  }
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cssUrl(value) {
  return String(value || HERO_IMAGE).replaceAll("'", "%27").replaceAll(")", "%29");
}

function cityPhoto(city, section = "hero", index = 0) {
  const photos = photoLibrary[city.name] || {};
  const set = photos[section] || photos.hero || [HERO_IMAGE];
  return set[index % set.length] || HERO_IMAGE;
}

function itemPhoto(city, section, title, index = 0) {
  return ITEM_IMAGES[`${city.name}|${section}|${title}`] || cityPhoto(city, section, index);
}

function renderPhoto(src, alt, className) {
  return `<img class="${className}" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />`;
}

function stars(value = "4*") {
  const count = String(value).startsWith("5") ? 5 : String(value).startsWith("3") ? 3 : 4;
  return "★".repeat(count);
}

function cjHotelLink(city, hotel) {
  const target = new URL("https://no.hotels.com/Hotel-Search");
  target.searchParams.set("destination", `${hotel}, ${city}, Spain`);
  target.searchParams.set("rooms", "1");
  target.searchParams.set("adults", "2");
  target.searchParams.set("locale", "no_NO");
  target.searchParams.set("currency", "NOK");
  target.searchParams.set("pos", "HCOM_NO");
  target.searchParams.set("siteid", "300000012");
  const url = new URL(HOTELS_CJ);
  url.searchParams.set("url", target.toString());
  return url.toString();
}

function hotelsBrowserBridge(targetUrl) {
  return `/go/hotels.html#to=${encodeURIComponent(targetUrl)}`;
}

function hotelDeepLink(city, hotel) {
  return HOTEL_DEEP_LINKS[`${city}|${hotel}`] || "";
}

function hotelPhoto(city, hotel, index) {
  return HOTEL_IMAGES[`${city.name}|${hotel}`] || cityPhoto(city, "hotels", index);
}

function klookLink(query) {
  const url = new URL("https://www.klook.com/nb/search/result/");
  url.searchParams.set("query", `${query} Spain`);
  return url.toString();
}

function gygLink(query) {
  const url = new URL("https://www.getyourguide.no/s/");
  url.searchParams.set("q", `${query} Spain`);
  url.searchParams.set("partner_id", "FIQDAEB");
  url.searchParams.set("utm_medium", "local_partners");
  return url.toString();
}

function activityDeepLink(city, activity) {
  return ACTIVITY_DEEP_LINKS[`${city.name}|${activity}`] || "";
}

function activityProviderFromUrl(url, fallbackProvider) {
  if (url.includes("gyg.me") || url.includes("getyourguide.")) return "GetYourGuide";
  if (url.includes("klook.")) return "Klook";
  return fallbackProvider;
}

function renderList(items, city, section) {
  return items.map(([title, text], index) => `
        <article class="guide-card">
          ${renderPhoto(itemPhoto(city, section, title, index), `${title} i ${city.name}`, "guide-card-photo")}
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(text)}</p>
        </article>`).join("");
}

function renderMagazine(city) {
  const area = city.areas[0];
  const secondArea = city.areas[1] || area;
  const food = city.food[0];
  const beach = city.beaches[0];
  const gem = city.gems[0];
  const activity = city.activities[0];
  const familyHotel = city.hotels.find((hotel) => hotel[1] === "Familie") || city.hotels[1];
  const valueHotel = city.hotels.find((hotel) => hotel[1] === "Billig og bra") || city.hotels[3];
  const luxuryHotel = city.hotels.find((hotel) => hotel[1] === "Luksus") || city.hotels[2];
  const cards = [
    {
      title: `Slik føles ${city.name}`,
      photo: cityPhoto(city, "areas", 0),
      text: `${city.name} fungerer best når du lar dagene få en tydelig rytme: bo i eller nær ${area[0]} hvis du vil ha de enkleste kveldene, bruk ${secondArea[0]} når du vil se mer av hverdagsbyen, og legg inn pauser som faktisk passer reisefølget. Det er denne miksen av områdevalg, måltider og korte stopp som gjør guiden mer nyttig enn en vanlig liste over severdigheter.`
    },
    {
      title: "En god første dag",
      photo: itemPhoto(city, "food", food[0], 0),
      text: `Start rolig med kaffe og en spasertur i ${area[0]}, legg lunsjen rundt ${food[0]}, og bruk ettermiddagen på ${activity}. Mot kvelden kan du velge mellom ${beach[0]} for en enklere pause eller ${gem[0]} hvis du vil ha en mer lokal opplevelse. Denne rekkefølgen gir mindre transport og mer feriefølelse.`
    },
    {
      title: "Slik velger du hotell",
      photo: hotelPhoto(city, luxuryHotel[0], 2),
      text: `Hotellvalget bør styres av reisetypen, ikke bare stjerner. ${familyHotel[0]} passer når logistikk og plass betyr mest, ${valueHotel[0]} er et bedre valg når budsjettet skal tåle flere middager og aktiviteter, mens ${luxuryHotel[0]} er riktig når hotellet skal være en stor del av selve reisen.`
    },
    {
      title: "Book smartere",
      photo: itemPhoto(city, "activities", activity, 0),
      text: `Bruk ${city.season.toLowerCase()} som pekepinn når du planlegger. De mest populære restaurantene og aktivitetene bør sjekkes før avreise, mens strand, shopping og små hidden gems ofte blir bedre når du lar været og dagsformen bestemme. Kombiner én booket opplevelse per dag med åpne lommer i programmet.`
    }
  ];
  return cards.map((card) => `
        <article class="guide-card magazine-card">
          ${renderPhoto(card.photo, card.title, "guide-card-photo")}
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.text)}</p>
        </article>`).join("");
}

function renderHotels(city) {
  return city.hotels.map((hotel, index) => {
    const [name, best, area, style, level, strength, why] = hotel;
    const directHref = hotelDeepLink(city.name, name);
    const rawHotelHref = directHref || cjHotelLink(city.name, name);
    const hotelHref = hotelsBrowserBridge(rawHotelHref);
    const hotelCta = directHref ? "Sjekk pris hos Hotels.com →" : "Søk hos Hotels.com →";
    return `
        <article class="mockup-hotel-card">
          <div class="mockup-hotel-media">
            <img src="${escapeHtml(hotelPhoto(city, name, index))}" alt="${escapeHtml(`${name} i ${city.name}`)}" loading="lazy" decoding="async" />
            <div class="mockup-photo-stars">${stars(level)}</div>
          </div>
          <div class="mockup-hotel-content">
            <h3>${escapeHtml(name)}</h3>
            <p class="mockup-best">${escapeHtml(best)} · ${escapeHtml(style)} · ${stars(level)}</p>
            <div class="mockup-location"><span>${escapeHtml(area)}</span></div>
            <p class="mockup-why">${escapeHtml(why)}</p>
            <div class="mockup-tags"><span>${escapeHtml(best)}</span><span>${escapeHtml(area)}</span><span>${escapeHtml(strength)}</span></div>
            <a class="mockup-cta" href="${escapeHtml(hotelHref)}" target="_blank" rel="nofollow sponsored noopener">${hotelCta}</a>
          </div>
        </article>`;
  }).join("");
}

function renderActivities(city) {
  return city.activities.map((activity, index) => {
    const fallbackProvider = index % 2 === 0 ? "Klook" : "GetYourGuide";
    const deepLink = activityDeepLink(city, activity);
    const href = deepLink || (fallbackProvider === "Klook" ? klookLink(activity) : gygLink(activity));
    const provider = activityProviderFromUrl(href, fallbackProvider);
    const text = provider === "Klook"
      ? "Billetter, dagsutflukter og praktiske opplevelser som passer godt inn i reiseruten."
      : "Guidede turer, skip-the-line og dagsturer med en enkel vei videre til booking.";
    return `
        <article class="activity-card">
          ${renderPhoto(itemPhoto(city, "activities", activity, index), `${activity} i ${city.name}`, "activity-photo")}
          <span class="badge">${provider}</span>
          <h3>${escapeHtml(activity)}</h3>
          <p>${escapeHtml(text)}</p>
          <a href="${escapeHtml(href)}" target="_blank" rel="nofollow sponsored noopener">Se ${escapeHtml(activity)} →</a>
        </article>`;
  }).join("");
}

function renderCityPage(city) {
  const links = cities.filter((item) => item.name !== city.name).slice(0, 6);
  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(city.name)} guide 2026 | Hotell, mat, strender og opplevelser | Billig-reiser.no</title>
  <meta name="description" content="${escapeHtml(`${city.name}-guide med hotellvalg for par, familie, luksus, billig og barnevennlig, pluss restauranter, shopping, strender, hidden gems og Klook/GetYourGuide-opplevelser.`)}" />
  <link rel="canonical" href="https://billig-reiser.no/${city.path}/" />
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Billig-reiser.no" />
  <meta property="og:title" content="${escapeHtml(city.name)} guide 2026 | Billig-reiser.no" />
  <meta property="og:description" content="${escapeHtml(city.intro[0])}" />
  <meta property="og:image" content="${escapeHtml(cityPhoto(city, "hero", 0))}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/spania/spania-city.css?v=${SPAIN_CSS_VERSION}" />
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${city.name} guide 2026`,
    description: city.intro[0],
    about: city.name,
    author: { "@type": "Organization", name: "Billig-Reiser.no" },
    publisher: { "@type": "Organization", name: "Billig-Reiser.no" },
    mainEntityOfPage: `https://billig-reiser.no/${city.path}/`
  })}</script>
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#020913" />
  <script defer src="/pwa-register.js?v=221"></script>
  <link rel="stylesheet" href="/app-features.css" />
  <script defer src="/app-features.js?v=221"></script>
</head>
<body>
  <nav class="spain-nav">
    <a class="brand-logo" href="/index.html"><img src="/assets/billig-reiser-logo-full-v116.png" alt="Billig-reiser.no" width="1200" height="360" /></a>
    <div class="spain-menu">
      <a href="/reisemagasinet.html">Magasinet</a>
      <a class="active" href="/spania/">Spania</a>
      <a href="#hoteller">Hoteller</a>
      <a href="#opplevelser">Opplevelser</a>
      <a href="/index.html">Forside</a>
    </div>
  </nav>

  <header class="hero-city" style="--hero-image:url('${cssUrl(cityPhoto(city, "hero", 0))}')">
    <div class="hero-inner">
      <div class="kicker">${escapeHtml(city.region)} · ${escapeHtml(city.type)}</div>
      <h1>${escapeHtml(city.name)}</h1>
      <p>${escapeHtml(city.intro[0])}</p>
      <div class="hero-actions">
        <a class="btn primary" href="#hoteller">Se hotellvalg</a>
        <a class="btn secondary" href="#opplevelser">Se opplevelser</a>
      </div>
      <div class="quick-links">
        <a href="#omrader">Hvor bo</a>
        <a href="#restauranter">Restauranter</a>
        <a href="#shopping">Shopping</a>
        <a href="#strender">Strender</a>
        <a href="#hidden-gems">Hidden gems</a>
      </div>
    </div>
  </header>

  <main>
    <section class="wrap">
      <div class="story-grid">
        <article class="story-box">
          <span class="badge">Magasinguide</span>
          <h2>Derfor velger du ${escapeHtml(city.name)}</h2>
          ${city.intro.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
        </article>
        <aside class="facts-box">
          <span class="badge">Kort fortalt</span>
          <ul>
            <li><strong>Passer best for:</strong> ${escapeHtml(city.best)}</li>
            <li><strong>Flyplass:</strong> ${escapeHtml(city.airport)}</li>
            <li><strong>Beste tid:</strong> ${escapeHtml(city.season)}</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="wrap" id="magasin">
      <div class="section-head">
        <div>
          <span class="badge">Magasin</span>
          <h2>Reis smartere i ${escapeHtml(city.name)}</h2>
        </div>
        <p class="lead">Mer enn en sjekkliste: dette er rytmen, valgene og smågrepene som gjør byen enklere å bruke.</p>
      </div>
      <div class="grid">${renderMagazine(city)}</div>
    </section>

    <section class="wrap" id="omrader">
      <div class="section-head">
        <div>
          <span class="badge">Områder</span>
          <h2>Hvor bør du bo?</h2>
        </div>
        <p class="lead">Velg område før hotell. Det er den enkleste måten å få riktig ferie, riktigere pris og mindre transport.</p>
      </div>
      <div class="grid">${renderList(city.areas, city, "areas")}</div>
    </section>

    <section class="wrap wide-wrap" id="hoteller">
      <div class="section-head">
        <div>
          <span class="badge">Hotels.com</span>
          <h2>Beste hotellvalg i ${escapeHtml(city.name)}</h2>
        </div>
        <p class="lead">Fem håndplukkede valg for ulike reisetyper, med kort forklaring på hvem hotellet passer best for.</p>
      </div>
      <div class="hotel-list">${renderHotels(city)}</div>
    </section>

    <section class="wrap" id="restauranter">
      <div class="section-head">
        <div>
          <span class="badge">Mat</span>
          <h2>Restauranter og matområder</h2>
        </div>
        <p class="lead">Gode steder å starte når du vil spise bedre enn nærmeste turistmeny.</p>
      </div>
      <div class="grid">${renderList(city.food, city, "food")}</div>
    </section>

    <section class="wrap" id="shopping">
      <div class="section-head">
        <div>
          <span class="badge">Shopping</span>
          <h2>Shopping som passer byen</h2>
        </div>
      </div>
      <div class="grid">${renderList(city.shopping, city, "shopping")}</div>
    </section>

    <section class="wrap" id="strender">
      <div class="section-head">
        <div>
          <span class="badge">Strender</span>
          <h2>Strender og badepauser</h2>
        </div>
      </div>
      <div class="grid">${renderList(city.beaches, city, "beaches")}</div>
    </section>

    <section class="wrap" id="hidden-gems">
      <div class="section-head">
        <div>
          <span class="badge">Hidden gems</span>
          <h2>Smartere stopp når du vil litt utenfor løypa</h2>
        </div>
      </div>
      <div class="grid">${renderList(city.gems, city, "gems")}</div>
    </section>

    <section class="wrap" id="opplevelser">
      <div class="section-head">
        <div>
          <span class="badge">Opplevelser</span>
          <h2>Opplevelser i ${escapeHtml(city.name)}</h2>
        </div>
        <p class="lead">Billetter, guidede turer og dagsturer som gjør det enklere å få mer ut av dagene.</p>
      </div>
      <div class="activity-grid">${renderActivities(city)}</div>
    </section>

    <section class="wrap">
      <div class="section-head">
        <div>
          <span class="badge">Reis videre</span>
          <h2>Flere Spania-guider</h2>
        </div>
      </div>
      <div class="quick-links">
        ${links.map((item) => `<a href="/${item.path}/">${escapeHtml(item.name)}</a>`).join("")}
      </div>
    </section>
  </main>

  <footer class="footer">© 2026 Billig-reiser.no · Partnerlenker kan gi oss provisjon uten ekstra kostnad for deg.</footer>
</body>
</html>
`;
}

function renderIndex() {
  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Spania guide 2026 | Byguider, hotell og opplevelser | Billig-reiser.no</title>
  <meta name="description" content="Stor Spania-guide med egne byguider, hotellkort, restauranter, shopping, strender, hidden gems og Klook/GetYourGuide-opplevelser." />
  <link rel="canonical" href="https://billig-reiser.no/spania/" />
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Billig-reiser.no" />
  <meta property="og:title" content="Spania guide 2026 | Billig-reiser.no" />
  <meta property="og:description" content="Velg riktig Spania-by og finn hotell, mat, shopping, strender og opplevelser." />
  <meta property="og:image" content="${escapeHtml(P.barcelona)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/spania/spania-city.css?v=${SPAIN_CSS_VERSION}" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="theme-color" content="#020913" />
  <script defer src="/pwa-register.js?v=221"></script>
  <link rel="stylesheet" href="/app-features.css" />
  <script defer src="/app-features.js?v=221"></script>
</head>
<body>
  <nav class="spain-nav">
    <a class="brand-logo" href="/index.html"><img src="/assets/billig-reiser-logo-full-v116.png" alt="Billig-reiser.no" width="1200" height="360" /></a>
    <div class="spain-menu">
      <a href="/reisemagasinet.html">Magasinet</a>
      <a class="active" href="/spania/">Spania</a>
      <a href="#byer">Byguider</a>
      <a href="#slik-bruker-du">Slik velger du</a>
      <a href="/index.html">Forside</a>
    </div>
  </nav>

  <header class="hero-city" style="--hero-image:url('${cssUrl(P.valencia)}')">
    <div class="hero-inner">
      <div class="kicker">Spania · stor guide</div>
      <h1>Spania by for by.</h1>
      <p>Velg riktig by, riktig område og riktig hotelltype før du booker reisen.</p>
      <div class="hero-actions">
        <a class="btn primary" href="#byer">Se alle byguider</a>
        <a class="btn secondary" href="/index.html#travelSearch">Søk reise</a>
      </div>
    </div>
  </header>

  <main>
    <section class="wrap" id="slik-bruker-du">
      <div class="story-grid">
        <article class="story-box">
          <span class="badge">Reisevalg</span>
          <h2>Finn byen som passer reisen</h2>
          <p>Barcelona, Valencia og Málaga passer når du vil kombinere byliv med strand. Madrid og Sevilla er sterkere på kultur, mat og kveldsstemning. Øyene gir roligere dager, bassengliv og enklere familieferie.</p>
          <p>Hver byguide samler områdevalg, hotell, mat, shopping, strender, skjulte perler og opplevelser på ett sted.</p>
        </article>
        <aside class="facts-box">
          <span class="badge">I guiden</span>
          <ul>
            <li>12 store Spania-guider</li>
            <li>60 hotellvalg for ulike reisetyper</li>
            <li>Billetter, turer og dagsturer på hver byside</li>
            <li>Restauranter, shopping, strender og hidden gems</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="wrap" id="byer">
      <div class="section-head">
        <div>
          <span class="badge">Byguider</span>
          <h2>Velg Spania-by</h2>
        </div>
        <p class="lead">Start med reisestil. Barcelona og Valencia passer når du vil ha storby og strand. Malaga, Alicante og Benidorm er enkle solvalg. Madrid og Sevilla er sterkest på mat, kultur og kvelder.</p>
      </div>
      <div class="city-grid">
${cities.map((city) => `        <article class="city-card" style="--card-image:url('${cssUrl(cityPhoto(city, "hero", 0))}')">
          <div class="city-card-media"></div>
          <div class="city-card-body">
            <span class="badge">${escapeHtml(city.region)}</span>
            <h3>${escapeHtml(city.name)}</h3>
            <p>${escapeHtml(city.type)} · ${escapeHtml(city.best)}</p>
            <a href="/${city.path}/">Åpne guiden →</a>
          </div>
        </article>`).join("")}
      </div>
    </section>
  </main>

  <footer class="footer">© 2026 Billig-reiser.no · Partnerlenker kan gi oss provisjon uten ekstra kostnad for deg.</footer>
</body>
</html>
`;
}

function writeFile(relativePath, content) {
  const output = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, content);
}

function updateSitemap() {
  const sitemapPath = path.join(root, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) return;
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  const urls = cities.map((city) => `https://billig-reiser.no/${city.path}/`);
  const newEntries = urls
    .filter((url) => !sitemap.includes(`<loc>${url}</loc>`))
    .map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>0.75</priority>\n  </url>`)
    .join("\n");
  if (newEntries && sitemap.includes("</urlset>")) {
    sitemap = sitemap.replace("</urlset>", `${newEntries}\n</urlset>`);
    fs.writeFileSync(sitemapPath, sitemap);
  }
}

writeFile("spania/index.html", renderIndex());
cities.forEach((city) => writeFile(`${city.path}/index.html`, renderCityPage(city)));
updateSitemap();

console.log(`Generated ${cities.length} Spain city guides and refreshed spania/index.html.`);
