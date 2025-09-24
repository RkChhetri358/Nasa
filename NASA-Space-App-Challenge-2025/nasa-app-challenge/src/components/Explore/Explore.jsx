import React, { useEffect, useState } from "react";
import AOS from "aos";
import OpenSeadragonViewer from "../OpenSeadragon/OpenSeadragonViewer";

export default function Explore() {
  const [planet, setPlanet] = useState("mars");
  const [marsView, setMarsView] = useState("global");
  const [moonView, setMoonView] = useState("global");
  const [mercuryView, setMercuryView] = useState("global");

  useEffect(() => {
    AOS.init({ duration: 5000 });
  }, []);

  const proxy = "https://corsproxy.io/?";

  const marsTileSources = {
    global: {
      width: 65536,
      height: 32768,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
    valles: {
      width: 32768,
      height: 16384,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Mars/EQ/Valles_Marineris/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
    olympus: {
      width: 32768,
      height: 16384,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Mars/EQ/Olympus_Mons/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
  };

  const moonTileSources = {
    global: {
      width: 21600,
      height: 10800,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
    north: {
      width: 21600,
      height: 10800,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Moon/NP/LRO_North_Pole/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
    south: {
      width: 21600,
      height: 10800,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Moon/SP/LRO_South_Pole/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
  };

  const mercuryTileSources = {
    global: {
      width: 98304,
      height: 49152,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Mercury/EQ/Mercury_MESSENGER_MDIS_Basemap_BDR_Mosaic_Global_166m/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
    north: {
      width: 98304,
      height: 49152,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Mercury/NP/Mercury_North_Pole/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
    south: {
      width: 98304,
      height: 49152,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Mercury/SP/Mercury_South_Pole/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
  };

  const currentTileSource =
    planet === "mars"
      ? marsTileSources[marsView]
      : planet === "moon"
      ? moonTileSources[moonView]
      : mercuryTileSources[mercuryView];

  return (
    <>
      <div style={{ padding: "20px" }}>
        <center>
          <h1>Welcome to Embiggen Your Eyes!</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "18px" }}>
            Explore the wonders of the universe through high-resolution imagery. Dive deep into Mars, the Moon, and Mercury with our interactive viewer powered by OpenSeadragon.
          </p>
        </center>
      </div>

      <div className="OpenSeaDragon" style={{ padding: "20px" }}>
        <center>
          <h1>
            Explore the{" "}
            {planet === "mars"
              ? "Red Planet Mars"
              : planet === "moon"
              ? "Moon"
              : "Mercury"}
          </h1>
          <div style={{ margin: "15px" }}>
            {["mars", "moon", "mercury"].map((p) => (
              <button
                key={p}
                onClick={() => setPlanet(p)}
                style={{
                  marginRight: "10px",
                  padding: "8px 16px",
                  backgroundColor: planet === p ? "#337ab7" : "#555",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {planet === "mars" && (
            <select
              value={marsView}
              onChange={(e) => setMarsView(e.target.value)}
              style={{ marginBottom: "20px", padding: "6px 12px", fontSize: "16px" }}
            >
              <option value="global">Global Map</option>
              <option value="borth">North</option>
              <option value="south">South</option>
            </select>
          )}

          {planet === "moon" && (
            <select
              value={moonView}
              onChange={(e) => setMoonView(e.target.value)}
              style={{ marginBottom: "20px", padding: "6px 12px", fontSize: "16px" }}
            >
              <option value="global">Global Map</option>
              <option value="north">North Pole</option>
              <option value="south">South Pole</option>
            </select>
          )}

          {planet === "mercury" && (
            <select
              value={mercuryView}
              onChange={(e) => setMercuryView(e.target.value)}
              style={{ marginBottom: "20px", padding: "6px 12px", fontSize: "16px" }}
            >
              <option value="global">Global Map</option>
              <option value="north">North Pole</option>
              <option value="south">South Pole</option>
            </select>
          )}
        </center>

        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <OpenSeadragonViewer tileSource={currentTileSource} />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              pointerEvents: "none",
              fontSize: "16px",
            }}
          >
            {planet === "mars"
              ? `Mars – ${marsView}`
              : planet === "moon"
              ? `Moon – ${moonView}`
              : `Mercury – ${mercuryView}`}
          </div>
        </div>
      </div>
    </>
  );
} 