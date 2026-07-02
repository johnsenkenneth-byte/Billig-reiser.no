# App Privacy-utkast

Dette er et praktisk utkast for App Store Connect. Bekreft alltid mot faktisk produksjonsoppsett for analytics, annonser, affiliatepartnere og e-postleverandor.

## Data som kan samles inn

- Kontaktinfo: e-postadresse ved frivillig reisevarsel/prisvarsel.
- Brukerinnhold: valgte reiseruter, reisemal, makspris og varselpreferanser.
- Identifikatorer: push-subscription endpoint og push-nokler nar brukeren aktiverer push.
- Bruksdata: side, tidspunkt, user agent og IP i serverlogger/API-logger.
- Diagnostikk: tekniske logger hos hosting- og API-leverandor.

## Bruk

- Appfunksjonalitet: levere prisvarsler, push-varsler, lagrede valg og offline-opplevelse.
- Analyse/forbedring: Vercel Insights eller tilsvarende hvis aktivert.
- Affiliate-lenker: brukeren sendes til eksterne partnere for bestilling og betaling.

## Ikke inkludert med mindre det legges til senere

- Helse- eller treningsdata.
- Finansielle betalingsdata i appen.
- Presis GPS-posisjon.
- Kontaktliste, bilder, mikrofon eller kamera.

## Anbefalt personverntekst

Oppdater `personvern.html` dersom produksjonsoppsettet tar i bruk push, Resend, Make/Zapier eller annen lagring av prisvarsler. Nevn spesielt:

- hvilke varseldata som lagres,
- hvor lenge de lagres,
- hvordan brukeren kan be om sletting,
- at bestilling/betaling skjer hos eksterne partnere.
