import { useState } from 'react';
import { createAsset } from '../services/api';

const AddAsset = ({ onAssetAdded }: { onAssetAdded: () => void }) => {
  const [asset, setAsset] = useState({
    name: '',
    type: '',
    status: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to add an asset.');
      return;
    }

    try {
      // Pass the token and asset data to the API
      await createAsset(asset, token);

      alert('Asset added successfully!');
      setAsset({
        name: '',
        type: '',
        status: '',
        latitude: '',
        longitude: '',
      });

      onAssetAdded(); // Callback to refresh the asset list
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('Failed to add asset. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 bg-white text-navy rounded-md shadow-md'
    >
      <h2 className='text-lg font-bold mb-4'>Add New Asset</h2>
      <div className='space-y-4'>
        <input
          type='text'
          name='name'
          value={asset.name}
          onChange={handleChange}
          placeholder='Asset Name'
          className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          required
        />
        <select
          name='type'
          value={asset.type}
          onChange={handleChange}
          className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          required
        >
          <option value=''>Select Type</option>
          <option value='Vehicle'>Vehicle</option>
          <option value='Equipment'>Equipment</option>
          <option value='Building'>Building</option>
        </select>
        <input
          type='text'
          name='status'
          value={asset.status}
          onChange={handleChange}
          placeholder='Status (e.g., Active, Inactive)'
          className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          required
        />
        <input
          type='number'
          name='latitude'
          value={asset.latitude}
          onChange={handleChange}
          placeholder='Latitude'
          className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          required
        />
        <input
          type='number'
          name='longitude'
          value={asset.longitude}
          onChange={handleChange}
          placeholder='Longitude'
          className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
          required
        />
        <button
          type='submit'
          className='bg-orange text-white px-4 py-2 rounded-md hover:bg-black'
        >
          Add Asset
        </button>
      </div>
    </form>
  );
};

export default AddAsset;
