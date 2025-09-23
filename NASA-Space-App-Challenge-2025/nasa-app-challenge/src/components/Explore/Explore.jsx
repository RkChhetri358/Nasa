import React, { useEffect, useState } from "react";
import AOS from "aos";
import OpenSeadragonViewer from "../OpenSeadragon/OpenSeadragonViewer";

export default function Explore() {
  const [planet, setPlanet] = useState("mars"); // default view = Mars

  useEffect(() => {
    AOS.init({ duration: 5000 });
  }, []);

  // Moon tiles
const moonTileSource = {
  width: 21600,
  height: 10800,
  tileSize: 256,
  minLevel: 0,
  maxLevel: 7,
  getTileUrl: (level, x, y) =>
    `https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
};
  // Mars tiles
  const marsTileSource = {
    width: 65536,
    height: 32768,
    tileSize: 256,
    minLevel: 0,
    maxLevel: 7,
    getTileUrl: (level, x, y) =>
      `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`
  };
// the following contains mercury tiles 
  // Mercury tiles
  const mercuryTileSource = {
    width: 98304, // adjust based on actual dataset
    height: 49152, // adjust based on actual dataset
    tileSize: 256,
    minLevel: 0,
    maxLevel: 7,
    getTileUrl: (level, x, y) =>
      `https://trek.nasa.gov/tiles/Mercury/EQ/Mercury_MESSENGER_MDIS_Basemap_BDR_Mosaic_Global_166m/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,

  };

  const currentTileSource =
    planet === "mars"
      ? marsTileSource
      : planet === "moon"
      ? moonTileSource
      : mercuryTileSource;

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
            <button
              onClick={() => setPlanet("mars")}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: planet === "mars" ? "#d9534f" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Mars
            </button>
            <button
              onClick={() => setPlanet("moon")}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: planet === "moon" ? "#5bc0de" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Moon
            </button>
            <button
              onClick={() => setPlanet("mercury")}
              style={{
                padding: "8px 16px",
                backgroundColor: planet === "mercury" ? "#f0ad4e" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Mercury
            </button>
          </div>
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
              ? "Red Planet Mars"
              : planet === "moon"
              ? "Earth's Moon"
              : "Mercury"}
          </div>
        </div>
      </div>
    </>
  );
}
