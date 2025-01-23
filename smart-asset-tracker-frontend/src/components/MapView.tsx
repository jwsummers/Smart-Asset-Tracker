import { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

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
      // Create a map instance
      const map = new Map({
        basemap: 'osm',
      });

      // Create a map view
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-98.5795, 39.8283], // Center on the USA
        zoom: 4,
      });

      // Create a graphics layer for displaying assets
      const graphicsLayer = new GraphicsLayer();

      // Add assets as graphics to the layer
      assets.forEach((asset) => {
        const point = {
          type: 'point',
          longitude: asset.longitude,
          latitude: asset.latitude,
          spatialReference: { wkid: 4326 },
        };

        const symbol = {
          type: 'simple-marker',
          color: asset.status.toLowerCase() === 'active' ? 'green' : 'orange',
          outline: {
            width: 0.5,
            color: 'white',
          },
        };

        const popupTemplate = {
          title: asset.name,
          content: `
            <p><strong>Type:</strong> ${asset.type}</p>
            <p><strong>Status:</strong> ${asset.status}</p>
          `,
        };

        const graphic = new Graphic({
          geometry: point,
          symbol: symbol,
          attributes: asset,
          popupTemplate: popupTemplate,
        });

        graphicsLayer.add(graphic);
      });

      // Add the graphics layer to the map
      map.add(graphicsLayer);

      // Cleanup on component unmount
      return () => {
        view.destroy();
      };
    }
  }, [assets]);

  return <div ref={mapDiv} className='h-96 w-full rounded-md shadow'></div>;
};

export default ArcGISMap;
