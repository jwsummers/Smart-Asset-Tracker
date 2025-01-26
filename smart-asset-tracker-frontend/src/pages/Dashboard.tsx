import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssets, updateAsset, deleteAsset } from '../services/api';
import AddAsset from '../components/AddAsset';
import ArcGISMap from '../components/MapView';
import EditAssetModal from '../components/EditAssetModal';

const Dashboard = () => {
  interface Asset {
    id: string; // IDs are strings from the backend
    name: string;
    type: string;
    status: string;
    latitude: number;
    longitude: number;
  }

  const [assets, setAssets] = useState<Asset[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
  const focusAssetRef = useRef<{ focusAsset: (id: string) => void } | null>(
    null
  );
  const navigate = useNavigate();

  const fetchAssets = async () => {
    const data = await getAssets();
    setAssets(data);
  };

  const openModal = (asset: Asset) => {
    setCurrentAsset(asset);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentAsset(null);
    setIsModalOpen(false);
  };

  const scrollToMap = () => {
    const mapElement = document.querySelector('#map-container');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdate = async (updatedAsset: Asset) => {
    try {
      // Convert ID to number for the API call
      const assetId = parseInt(updatedAsset.id, 10);

      // Parse latitude and longitude as numbers if needed
      updatedAsset.latitude = Number(updatedAsset.latitude);
      updatedAsset.longitude = Number(updatedAsset.longitude);

      await updateAsset(assetId, updatedAsset);
      alert('Asset updated successfully!');
      fetchAssets();
      closeModal();
    } catch (error) {
      console.error('Error updating asset:', error);
      alert('Failed to update asset.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      try {
        const assetId = parseInt(id, 10); // Convert ID to number for the API call
        await deleteAsset(assetId);
        alert('Asset deleted successfully!');
        fetchAssets();
      } catch (error) {
        console.error('Error deleting asset:', error);
        alert('Failed to delete asset.');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      fetchAssets();
    }
  }, []);

  return (
    <div className='container mx-auto p-6 bg-lightGray text-navy rounded-md shadow-lg'>
      <h2 className='text-center text-3xl mb-6'>Assets Dashboard</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Add Asset Form */}
        <AddAsset onAssetAdded={fetchAssets} />

        {/* Current Assets List */}
        <div>
          <h3 className='text-lg font-bold mb-4'>Current Assets</h3>
          <div className='h-80 overflow-y-auto p-4 bg-white rounded-md shadow-md'>
            <ul className='space-y-4'>
              {assets.map((asset) => (
                <li
                  key={asset.id}
                  className='p-4 bg-white text-navy rounded-md shadow'
                >
                  <div>
                    <strong>{asset.name}</strong> ({asset.type}) -{' '}
                    {asset.status}
                    <p>
                      Location: {asset.latitude}, {asset.longitude}
                    </p>
                  </div>
                  <div className='mt-2 flex space-x-4'>
                    <button
                      onClick={() => openModal(asset)}
                      className='bg-navy text-white px-4 py-2 rounded-md hover:bg-blue-900'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700'
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        focusAssetRef.current?.focusAsset(asset.id);
                        scrollToMap();
                      }}
                      className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ArcGIS Map */}
      <div className='mt-6 overflow-hidden rounded-lg border border-gray-300'>
        <h3 className='text-lg font-bold mb-4'>Asset Map</h3>
        <ArcGISMap assets={assets} ref={focusAssetRef} />
      </div>
      {isModalOpen && currentAsset && (
        <EditAssetModal
          asset={currentAsset}
          onClose={closeModal}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
