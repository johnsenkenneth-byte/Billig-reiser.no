export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { originLocationCode, destinationLocationCode, departureDate, adults = "1" } = req.query;

    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      return res.status(400).json({ error: "Mangler fra, til eller dato." });
    }

    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      return res.status(200).json({
        flights: [],
        error: "Amadeus API-nøkler mangler. Legg AMADEUS_CLIENT_ID og AMADEUS_CLIENT_SECRET i Vercel når du får dem."
      });
    }

    const tokenResponse = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({ error: "Kunne ikke hente Amadeus token.", details: tokenData });
    }

    const searchParams = new URLSearchParams({
      originLocationCode: String(originLocationCode).toUpperCase(),
      destinationLocationCode: String(destinationLocationCode).toUpperCase(),
      departureDate,
      adults,
      currencyCode: "NOK",
      max: "6"
    });

    const flightResponse = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const flightData = await flightResponse.json();

    if (!flightResponse.ok) {
      return res.status(flightResponse.status).json({ error: "Kunne ikke hente flypriser fra Amadeus.", details: flightData });
    }

    const flights = (flightData.data || []).map((offer) => {
      const firstItinerary = offer.itineraries?.[0];
      const firstSegment = firstItinerary?.segments?.[0];
      const lastSegment = firstItinerary?.segments?.[firstItinerary.segments.length - 1];

      return {
        id: offer.id,
        from: firstSegment?.departure?.iataCode || originLocationCode,
        to: lastSegment?.arrival?.iataCode || destinationLocationCode,
        price: `${offer.price?.grandTotal || ""} ${offer.price?.currency || "NOK"}`,
        airline: offer.validatingAirlineCodes?.[0] || firstSegment?.carrierCode || "Ukjent",
        departure: firstSegment?.departure?.at || null,
        arrival: lastSegment?.arrival?.at || null,
        duration: firstItinerary?.duration || null
      };
    });

    return res.status(200).json({ flights });
  } catch (error) {
    console.error("Amadeus flight API error:", error);
    return res.status(500).json({ error: "Kunne ikke hente flypriser akkurat nå." });
  }
}
