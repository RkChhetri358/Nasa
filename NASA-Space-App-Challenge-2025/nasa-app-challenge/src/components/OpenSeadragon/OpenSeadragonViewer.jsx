import { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";

export default function OpenSeadragonViewer({ tileSource, maxZoom = 10 }) {
  const viewerRef = useRef(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const overlayRefs = useRef([]);

  const fetchTileFeatures = async (level, x, y) => {
    try {
      const res = await fetch(
        `/proxy/${tileSource.planet}/${tileSource.view}/${level}/${y}/${x}.jpg?detect=true`
      );
      const data = await res.json();

      data.features.forEach((f) => {
        const div = document.createElement("div");
        div.style.border = `2px solid ${
          f.type === "crater" ? "red" : f.type === "volcano" ? "orange" : "yellow"
        }`;
        div.style.position = "absolute";
        div.style.backgroundColor = "rgba(255,255,255,0.1)";
        div.title = f.type;

        viewerRef.current.viewer.addOverlay({
          element: div,
          location: new OpenSeadragon.Rect(
            f.xmin_norm * tileSource.width,
            f.ymin_norm * tileSource.height,
            (f.xmax_norm - f.xmin_norm) * tileSource.width,
            (f.ymax_norm - f.ymin_norm) * tileSource.height
          ),
        });

        overlayRefs.current.push(div);
      });
    } catch (err) {
      console.error("Error fetching features:", err);
    }
  };

  useEffect(() => {
    if (!tileSource) return;

    if (viewerRef.current && viewerRef.current.viewer) {
      viewerRef.current.viewer.destroy();
      viewerRef.current.viewer = null;
      overlayRefs.current = [];
    }

    const viewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      tileSources: tileSource,
      crossOriginPolicy: "Anonymous",
      showNavigator: true,
      minZoomLevel: 0,
      maxZoomPixelRatio: maxZoom,
    });

    // Default zoom
    viewer.addHandler("open", () => viewer.viewport.zoomTo(0.3));

    // Fetch features for visible tiles on pan/zoom
    const handleUpdate = () => {
      if (!showFeatures) return;

      // Clear previous overlays
      overlayRefs.current.forEach((el) => el.remove());
      overlayRefs.current = [];

      // Determine visible tiles (simplified: level 0 for example)
      fetchTileFeatures(0, 0, 0); 
    };

    viewer.addHandler("viewport-change", handleUpdate);

    viewerRef.current.viewer = viewer;

    return () => viewer.destroy();
  }, [tileSource, maxZoom, showFeatures]);

  return (
    <div>
      <button
        onClick={() => setShowFeatures((prev) => !prev)}
        style={{ marginBottom: "10px" }}
      >
        {showFeatures ? "Hide AI Features" : "Show AI Features"}
      </button>
      <div ref={viewerRef} style={{ width: "100%", height: "80vh" }} />
    </div>
  );
}
