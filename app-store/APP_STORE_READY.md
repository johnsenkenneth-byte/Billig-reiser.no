# Billig Reiser - App Store-klargjoring

Denne pakken er klargjort som PWA/webapp og som web bundle for en native wrapper, for eksempel Capacitor i Xcode.

## Inkludert i pakken

- PWA-manifest med appnavn, kategori, ikoner, snarveier og splash/screenshot-referanser.
- Apple touch icon og Apple startup images i `assets/splash/`.
- Service worker med offline-cache, navigasjonsfallback, push-hendelser og notification-click.
- Appskuff med favoritter, nylig sett, prisvarsler, push-aktivering, install-status og budsjettverktøy.
- AI-reiseradgiver med stegvis flyt: reisemal, tidspunkt, budsjett og konkrete forslag.
- API-er for prisvarsel, push-subscribe, push-config og push-send.
- Store metadata og privacy-notater i denne mappen.

## Miljovariabler for produksjon

Prisvarsler:

```txt
PRICE_ALERT_WEBHOOK_URL=https://...
RESEND_API_KEY=...
PRICE_ALERT_TO=post@billig-reiser.no
PRICE_ALERT_FROM=Billig Reiser <reisevarsel@billig-reiser.no>
```

Push-varsler:

```txt
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:post@billig-reiser.no
PUSH_SEND_TOKEN=lang-tilfeldig-hemmelig-token
PUSH_SUBSCRIBE_WEBHOOK_URL=https://...
```

Generer VAPID-nokler etter `npm install`:

```bash
npx web-push generate-vapid-keys
```

`/api/push-send` krever `Authorization: Bearer $PUSH_SEND_TOKEN` og en lagret push-subscription i request body.

## Native wrapper for App Store

Apple App Store krever en native iOS-app, ikke bare en zip med nettsiden. Bruk for eksempel Capacitor:

1. Opprett Apple Developer-konto og Bundle ID, anbefalt `no.billigreiser.app`.
2. Lag Capacitor-prosjekt med `billig-reiser.no` som webinnhold.
3. Legg inn appikon, splash screen og status bar-innstillinger i Xcode.
4. Sett `NSCameraUsageDescription` bare hvis appen faktisk bruker kamera. Ikke legg inn unodvendige tillatelser.
5. Aktiver Push Notifications capability hvis push skal brukes i native wrapper.
6. Archive i Xcode, signer med riktig Team og last opp via App Store Connect.

## App Review-notater

Anbefalt tekst:

```txt
Billig Reiser hjelper brukere a finne fly, hotell, pakkereiser, leiebil, aktiviteter og reiseguider. Bestilling og betaling skjer hos eksterne partnere. Appen bruker e-post og frivillige push-varsler for prisvarsler. Ingen kjop gjores i appen.
```

## For innsending

- Support URL: `https://billig-reiser.no/kontakt.html`
- Privacy Policy URL: `https://billig-reiser.no/personvern.html`
- Marketing URL: `https://billig-reiser.no/`
- Category: Travel
- Age rating: 4+
- In-app purchases: Nei
- Account required: Nei
- External purchases: Ja, hos partnere via lenker

Det som fortsatt ma gjores utenfor kodepakken: Apple Developer-konto, App Store Connect-app, signering, screenshots fra faktisk native build, og eventuell juridisk gjennomgang av personvern/affiliate-tekst.
