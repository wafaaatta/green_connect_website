import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const cityConfig = {
  France: {
    Paris: { center: [48.8566, 2.3522], zoom: 12 },
    Lyon: { center: [45.7640, 4.8357], zoom: 13 },
    Marseille: { center: [43.2965, 5.3698], zoom: 13 },
    Toulouse: { center: [43.6045, 1.4442], zoom: 13 },
    Nice: { center: [43.7102, 7.2620], zoom: 13 },
    Nantes: { center: [47.2184, -1.5536], zoom: 13 },
    Strasbourg: { center: [48.5734, 7.7521], zoom: 13 },
    Montpellier: { center: [43.6119, 3.8772], zoom: 13 },
  },
  Egypt: {
    Cairo: { center: [30.0444, 31.2357], zoom: 12 },
    Alexandria: { center: [31.2156, 29.9553], zoom: 13 },
    Giza: { center: [30.0131, 31.2089], zoom: 13 },
    Shubra_El_Kheima: { center: [30.1283, 31.2422], zoom: 13 },
    Port_Said: { center: [31.2653, 32.3019], zoom: 13 },
    Suez: { center: [29.9668, 32.5498], zoom: 13 },
    Luxor: { center: [25.6872, 32.6396], zoom: 13 },
    Aswan: { center: [24.0889, 32.8998], zoom: 13 },
  },
};

const ContactMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState({
    country: 'France',
    city: 'Paris',
  });

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [country, city] = event.target.value.split('_');
    setSelectedCity({ country, city });
  };

  const cityData = cityConfig[selectedCity.country][selectedCity.city];

  return (
    <section className="">
      <div className="mx-auto">
        {/* Map */}
        <MapContainer
          center={cityData.center}
          zoom={cityData.zoom}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '100%', zIndex:0 }}
        >
          {/* OpenStreetMap tile layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Circle around selected city */}
          <Circle
            center={cityData.center}
            radius={4000} // Example radius of 5km
            pathOptions={{
              color: 'blue',
              fillColor: 'blue',
              fillOpacity: 0.1,
              weight: 1,
            }}
          />
        </MapContainer>
      </div>
    </section>
  );
};

export default ContactMap;
