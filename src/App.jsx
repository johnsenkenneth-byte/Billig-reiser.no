export default function App() {
  return (
    <div style={{padding:40,fontFamily:"Arial"}}>
      <h1>Billig-reiser.no ✈️</h1>
      <p>Din premium reiseside er live.</p>
      <a href="/api/flights?originLocationCode=OSL&destinationLocationCode=BCN&departureDate=2026-06-01" target="_blank">
        Test fly API
      </a>
    </div>
  );
}
