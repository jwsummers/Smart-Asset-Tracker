import { useEffect, useState } from 'react';
import { getAssets } from '../services/api';
import AddAsset from '../components/AddAsset';
import ArcGISMap from '../components/MapView';

const Dashboard = () => {
  const [assets, setAssets] = useState<any[]>([]);

  const fetchAssets = async () => {
    const data = await getAssets();
    setAssets(data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-lightGray text-navy rounded-md shadow-lg">
      <h2 className="text-center text-3xl mb-6">Assets Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Asset Form */}
        <AddAsset onAssetAdded={fetchAssets} />

        {/* Current Assets List */}
        <div>
          <h3 className="text-lg font-bold mb-4">Current Assets</h3>
          <ul className="space-y-4">
            {assets.map((asset) => (
              <li
                key={asset.id}
                className="p-4 bg-white text-navy rounded-md shadow"
              >
                <strong>{asset.name}</strong> ({asset.type}) - {asset.status}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ArcGIS Map */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Asset Map</h3>
        <ArcGISMap assets={assets} />
      </div>
    </div>
  );
};

export default Dashboard;
