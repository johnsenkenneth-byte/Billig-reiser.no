export default async function handler(req, res) {
  return res.status(200).json({
    flights: [],
    message: "Amadeus API-route er klar. Legg AMADEUS_CLIENT_ID og AMADEUS_CLIENT_SECRET i Vercel Environment Variables når API skal aktiveres."
  });
}
