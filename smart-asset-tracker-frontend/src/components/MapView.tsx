import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

interface Asset {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
  status: string;
}

interface ArcGISMapProps {
  assets: Asset[];
}

const ArcGISMap = forwardRef(({ assets }: ArcGISMapProps, ref) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapViewRef = useRef<MapView | null>(null);
  const graphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const [highlightedGraphic, setHighlightedGraphic] = useState<Graphic | null>(
    null
  );

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'osm',
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-98.5795, 39.8283],
        zoom: 4,
      });

      mapViewRef.current = view;

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      graphicsLayerRef.current = graphicsLayer;

      return () => {
        view.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (graphicsLayerRef.current) {
      const graphicsLayer = graphicsLayerRef.current;
      graphicsLayer.removeAll();

      assets.forEach((asset) => {
        const point = {
          type: 'point',
          longitude: asset.longitude,
          latitude: asset.latitude,
          spatialReference: { wkid: 4326 },
        };

        const symbol = {
          type: 'simple-marker',
          color:
            highlightedGraphic?.attributes?.id === asset.id
              ? 'blue'
              : asset.status.toLowerCase() === 'active'
              ? 'green'
              : 'orange',
          size: highlightedGraphic?.attributes?.id === asset.id ? 12 : 8,
          outline: {
            width: 1,
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
          symbol,
          attributes: asset,
          popupTemplate,
        });

        graphicsLayer.add(graphic);
      });
    }
  }, [assets, highlightedGraphic]);

  useImperativeHandle(ref, () => ({
    focusAsset: (id: string) => {
      if (mapViewRef.current && graphicsLayerRef.current) {
        const graphics = graphicsLayerRef.current.graphics;
        const graphic = graphics.find((g) => g.attributes.id === id);

        if (graphic) {
          const pointGeometry = graphic.geometry as __esri.Point; // Explicitly cast to Point
          setHighlightedGraphic(graphic); // Update the highlighted graphic
          mapViewRef.current.goTo(pointGeometry).then(() => {
            mapViewRef.current?.popup?.open({
              features: [graphic],
              location: pointGeometry,
            });
          });
        }
      }
    },
  }));

  return (
    <div
      id='map-container'
      ref={mapDiv}
      className='h-[500px] w-full rounded-md shadow'
    ></div>
  );
});

export default ArcGISMap;
