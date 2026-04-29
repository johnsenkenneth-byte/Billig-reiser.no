export default async function handler(req, res) {
  return res.status(200).json({
    flights: [],
    error: "Amadeus API-route er klar. Legg API-nøkler i Vercel når du får dem."
  });
}
