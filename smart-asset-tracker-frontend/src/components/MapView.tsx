import { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

interface Asset {
  latitude: number;
  longitude: number;
  name: string;
  type: string;
  status: string;
}

const ArcGISMap = ({ assets }: { assets: Asset[] }) => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webMap = new WebMap({
        basemap: "streets-navigation-vector", // Choose a basemap style
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webMap,
        center: [-98.5795, 39.8283], // Center map on the USA
        zoom: 4,
      });

      // Add points for each asset
      assets.forEach((asset) => {
        const point = new Point({
          longitude: asset.longitude,
          latitude: asset.latitude,
        });

        const symbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: "blue",
          outline: {
            color: "white",
            width: 1,
          },
        };

        // Create the popup template
        const popupTemplate = {
          title: asset.name,
          content: `
            <p><strong>Type:</strong> ${asset.type}</p>
            <p><strong>Status:</strong> ${asset.status}</p>
            <p><strong>Coordinates:</strong> [${asset.latitude}, ${asset.longitude}]</p>
          `,
        };

        // Create the Graphic object with the popup
        const graphic = new Graphic({
          geometry: point,
          symbol: symbol,
          popupTemplate: popupTemplate,
        });

        view.graphics.add(graphic);
      });

      return () => {
        view.destroy();
      };
    }
  }, [assets]);

  return <div ref={mapDiv} className="h-96 w-full rounded-md shadow"></div>;
};

export default ArcGISMap;
