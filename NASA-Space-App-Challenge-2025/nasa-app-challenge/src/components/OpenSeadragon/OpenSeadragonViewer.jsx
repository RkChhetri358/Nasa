import { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";
import "./OpenSeadragonViewer.css";

export default function OpenSeadragonViewer({ tileSource, maxZoom = 10 }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!tileSource || !tileSource.getTileUrl) return;

    if (viewerRef.current && viewerRef.current.viewer) {
      viewerRef.current.viewer.destroy();
      viewerRef.current.viewer = null;
    }

    const viewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      tileSources: {
        height: tileSource.height,
        width: tileSource.width,
        tileSize: tileSource.tileSize,
        minLevel: tileSource.minLevel,
        maxLevel: tileSource.maxLevel,
        getTileUrl: tileSource.getTileUrl,
      },
      crossOriginPolicy: "Anonymous",
      showNavigator: true,
      navigatorPosition: "BOTTOM_RIGHT",
      navigatorBackground: "rgba(0,0,0,0.6)",
      navigatorBorderColor: "#00ffff",
      navigatorDisplayRegionColor: "#00ffff",
      showRotationControl: true,
      animationTime: 1.2,
      blendTime: 0.6,
      minZoomLevel: 0,
      maxZoomPixelRatio: maxZoom,
    });

    viewer.addHandler("open", () => {
      viewer.viewport.zoomTo(0.3);
      viewer.viewport.panTo(new OpenSeadragon.Point(0.5, 0.5));
    });

    viewer.addHandler("tile-load-failed", (event) => {
      console.error("❌ Tile failed:", {
        level: event.tile.level,
        x: event.tile.x,
        y: event.tile.y,
        url: event.tile.getUrl(),
      });
    });

    viewerRef.current.viewer = viewer;

    return () => viewer.destroy();
  }, [tileSource, maxZoom]);

  return <div ref={viewerRef} className="osd-container" />;
}