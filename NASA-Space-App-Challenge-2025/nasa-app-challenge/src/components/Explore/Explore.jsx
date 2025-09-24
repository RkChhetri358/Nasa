import React, { useEffect, useState } from "react";
import AOS from "aos";
import OpenSeadragonViewer from "../OpenSeadragon/OpenSeadragonViewer";

export default function Explore() {
  const [planet, setPlanet] = useState("mars");
  const [viewMode, setViewMode] = useState("2d"); // "2d" or "3d"

  const [marsView, setMarsView] = useState("global");
  const [moonView, setMoonView] = useState("global");
  const [mercuryView, setMercuryView] = useState("global");
  const [venusView, setVenusView] = useState("global");

  useEffect(() => {
    AOS.init({ duration: 5000 });
  }, []);

  const proxy = "https://corsproxy.io/?";

  // Mars
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

  // Moon
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

  // Venus
  const venusTileSources = {
    global: {
      width: 23040,
      height: 11520,
      tileSize: 256,
      minLevel: 0,
      maxLevel: 7,
      getTileUrl: (level, x, y) =>
        `${proxy}https://trek.nasa.gov/tiles/Venus/EQ/Venus_Magellan_C3-MDIR_Global_Mosaic_2025m/1.0.0/default/default028mm/${level}/${y}/${x}.jpg`,
    },
  };

  // Mercury
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

  // Active tile source
  const currentTileSource =
    planet === "mars"
      ? marsTileSources[marsView]
      : planet === "moon"
      ? moonTileSources[moonView]
      : planet === "mercury"
      ? mercuryTileSources[mercuryView]
      : venusTileSources[venusView];

  // 3D URLs (NASA Eyes)
  const planet3DUrls = {
    mars: "https://eyes.nasa.gov/apps/solar-system/#/mars?embed=true",
    moon: "https://eyes.nasa.gov/apps/solar-system/#/moon?embed=true",
    mercury: "https://eyes.nasa.gov/apps/solar-system/#/mercury?embed=true",
    venus: "https://eyes.nasa.gov/apps/solar-system/#/venus?embed=true",
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <center>
          <h1>Welcome to Embiggen Your Eyes!</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "18px" }}>
            Explore the wonders of the universe through high-resolution imagery
            and interactive 3D globes. Switch between 2D maps and 3D globes for
            Mars, the Moon, Mercury, and Venus.
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
              : planet === "mercury"
              ? "Mercury"
              : "Venus"}
          </h1>

          {/* Planet Buttons */}
          <div style={{ margin: "15px" }}>
            {["mars", "moon", "mercury", "venus"].map((p) => (
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

          {/* Mode Toggle */}
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => setViewMode("2d")}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: viewMode === "2d" ? "#28a745" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              2D Map
            </button>
            <button
              onClick={() => setViewMode("3d")}
              style={{
                padding: "8px 16px",
                backgroundColor: viewMode === "3d" ? "#28a745" : "#555",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              3D Globe
            </button>
          </div>

          {/* Extra view selectors only in 2D mode */}
          {viewMode === "2d" && planet === "mars" && (
            <select
              value={marsView}
              onChange={(e) => setMarsView(e.target.value)}
              style={{
                marginBottom: "20px",
                padding: "6px 12px",
                fontSize: "16px",
              }}
            >
              <option value="global">Global Map</option>
              <option value="valles">Valles Marineris</option>
              <option value="olympus">Olympus Mons</option>
            </select>
          )}

          {viewMode === "2d" && planet === "moon" && (
            <select
              value={moonView}
              onChange={(e) => setMoonView(e.target.value)}
              style={{
                marginBottom: "20px",
                padding: "6px 12px",
                fontSize: "16px",
              }}
            >
              <option value="global">Global Map</option>
              <option value="north">North Pole</option>
              <option value="south">South Pole</option>
            </select>
          )}

          {viewMode === "2d" && planet === "mercury" && (
            <select
              value={mercuryView}
              onChange={(e) => setMercuryView(e.target.value)}
              style={{
                marginBottom: "20px",
                padding: "6px 12px",
                fontSize: "16px",
              }}
            >
              <option value="global">Global Map</option>
              <option value="north">North Pole</option>
              <option value="south">South Pole</option>
            </select>
          )}

          {viewMode === "2d" && planet === "venus" && (
            <select
              value={venusView}
              onChange={(e) => setVenusView(e.target.value)}
              style={{
                marginBottom: "20px",
                padding: "6px 12px",
                fontSize: "16px",
              }}
            >
              <option value="global">Global Map</option>
            </select>
          )}
        </center>

        {/* Viewer */}
        <div style={{ position: "relative", width: "100%", height: "600px" }}>
          {viewMode === "2d" ? (
            <OpenSeadragonViewer tileSource={currentTileSource} />
          ) : (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <iframe
                src={`${planet3DUrls[planet]}&embed=true`}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
              ></iframe>

              {/* Overlay to hide NASA Eyes header + menu */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "70px", // adjust as needed
                  backgroundColor: "black",
                  zIndex: 10,
                }}
              ></div>
            </div>
          )}

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
            {planet.toUpperCase()} – {viewMode === "2d" ? "2D Map" : "3D Globe"}
          </div>
        </div>
      </div>
    </>
  );
}
