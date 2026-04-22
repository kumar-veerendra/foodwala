import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import Loader from "../../../components/ui/Loader";

const Map = () => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([28.4128, 77.0897], 15);

    const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    });

    tileLayer.addTo(map);

    tileLayer.on("load", () => setLoading(false));

    L.marker([28.4128, 77.0897]).addTo(map)
      .bindPopup(
        `<b>Biryani By Kilo</b><br>
         Unit 205&206, 2nd floor, Vatika Professional Point,<br>
         Golf Course Ext Rd, Sector 66, Gurugram, Haryana 122002<br>
         ⭐ 4.1 (20 reviews)`
      )
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "80%", margin: "0 auto" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: "rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            borderRadius: "10px",
          }}
        >
          <Loader size={50} color="#9a0606" /> {/* ✅ reusable loader */}
        </div>
      )}

      <div
        ref={mapRef}
        id="map"
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default Map;
