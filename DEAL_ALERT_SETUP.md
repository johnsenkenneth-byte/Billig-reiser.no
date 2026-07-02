# Reisevarsel på e-post

Forsiden har nå et skjema som sender til `/api/deal-alert-signup`.
Appskuffen har i tillegg prisvarsler som sender til `/api/price-alert-signup`, og push-klargjøring via `/api/push-subscribe`, `/api/push-config` og `/api/push-send`.

For at registreringene faktisk skal lagres eller sendes, må du legge inn minst én av disse løsningene i Vercel:

## Anbefalt: webhook

Lag en webhook i Make, Zapier eller lignende, og lagre verdien som miljøvariabel:

```txt
DEAL_ALERT_WEBHOOK_URL=https://...
```

Webhooken får JSON med blant annet:

```json
{
  "email": "kunde@epost.no",
  "airport": "OSL",
  "interest": "restplass",
  "source": "frontpage-deal-alert",
  "createdAt": "2026-06-24T12:00:00.000Z"
}
```

## Alternativ: Resend-varsel til deg

Hvis du vil få hver registrering på e-post, legg inn:

```txt
RESEND_API_KEY=...
DEAL_ALERT_TO=din@epost.no
DEAL_ALERT_FROM=Billig Reiser <reisevarsel@dittdomene.no>
```

`DEAL_ALERT_FROM` må være et domene som er verifisert i Resend.

## Prisvarsler

Legg inn egen webhook hvis prisvarsler skal rutes separat fra nyhets-/reisevarsel:

```txt
PRICE_ALERT_WEBHOOK_URL=https://...
PRICE_ALERT_TO=din@epost.no
PRICE_ALERT_FROM=Billig Reiser <reisevarsel@dittdomene.no>
```

Hvis `PRICE_ALERT_WEBHOOK_URL` ikke finnes, brukes `DEAL_ALERT_WEBHOOK_URL` som fallback.

## Push-varsler

Push krever VAPID-nøkler og et sikkert sendetoken:

```txt
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:post@billig-reiser.no
PUSH_SEND_TOKEN=lang-hemmelig-token
PUSH_SUBSCRIBE_WEBHOOK_URL=https://...
```

Etter `npm install` kan VAPID-nøkler genereres med:

```bash
npx web-push generate-vapid-keys
```

`/api/push-send` kan brukes av en prisovervåkingsjobb eller Make/Zapier-flow for å sende faktisk push til en lagret subscription.
