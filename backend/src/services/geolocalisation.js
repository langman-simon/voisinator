/*Function made by AI*/
export const getGeocodeFromAdress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "Voisinator thomas.anckaert2@gmail.com" },
  });

  if (!response.ok) {
    throw new Error(`Error while geolocalising : ${response.status}`);
  }

  const results = await response.json();
  if (results.length === 0) return null; // adresse not found

  return {
    latitude: parseFloat(results[0].lat),
    longitude: parseFloat(results[0].lon),
  };
};