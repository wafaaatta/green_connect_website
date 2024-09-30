import React from 'react';
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const cityConfig = {
  france: {
    paris: { center: [48.8566, 2.3522], zoom: 12 },
    lyon: { center: [45.7640, 4.8357], zoom: 13 },
    marseille: { center: [43.2965, 5.3698], zoom: 13 },
    toulouse: { center: [43.6045, 1.4442], zoom: 13 },
    nice: { center: [43.7102, 7.2620], zoom: 13 },
    nantes: { center: [47.2184, -1.5536], zoom: 13 },
    strasbourg: { center: [48.5734, 7.7521], zoom: 13 },
    montpellier: { center: [43.6119, 3.8772], zoom: 13 },
  },
  egypt: {
    cairo: { center: [30.0444, 31.2357], zoom: 12 },
    alexandria: { center: [31.2156, 29.9553], zoom: 13 },
    giza: { center: [30.0131, 31.2089], zoom: 13 },
    shubra_el_kheima: { center: [30.1283, 31.2422], zoom: 13 },
    port_said: { center: [31.2653, 32.3019], zoom: 13 },
    suez: { center: [29.9668, 32.5498], zoom: 13 },
    luxor: { center: [25.6872, 32.6396], zoom: 13 },
    aswan: { center: [24.0889, 32.8998], zoom: 13 },
  },
};

interface City {
  country: string;
  city: string;
}

const ContactMap: React.FC<City> = ({ country, city }) => {


  console.log(country, city);
  
  const cityData = cityConfig['france']['lyon'];

  return (
    <section className="">
      <div className="mx-auto">
        {/* Map */}
        <MapContainer
        center={{
          lat: cityData.center[0],
          lng: cityData.center[1],
        }}
          zoom={cityData.zoom}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '100%', zIndex:0 }}
        >
          {/* OpenStreetMap tile layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Rectangle around selected city */}
          <Rectangle
            bounds={[
              [cityData.center[0] - 0.05, cityData.center[1] - 0.05],
              [cityData.center[0] + 0.05, cityData.center[1] + 0.05],
            ]}
            pathOptions={{
              color: '#aaaaaa',
              fillColor: '#aaaaaa',
              fillOpacity: 0.3,
              weight: 1,
            }}
          />
        </MapContainer>
      </div>
    </section>
  );
};

export default ContactMap;


