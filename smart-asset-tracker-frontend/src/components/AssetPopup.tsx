import { useState } from 'react';
import { updateAsset, deleteAsset } from '../services/api';

const AssetPopup = ({ asset, onUpdate, onDelete }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAsset, setEditedAsset] = useState(asset);

  const handleEdit = async () => {
    try {
      await updateAsset(editedAsset.id, editedAsset);
      alert('Asset updated successfully!');
      onUpdate(); // Refresh asset list/map
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating asset:', error);
      alert('Failed to update asset. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this asset?')) {
      try {
        await deleteAsset(asset.id);
        alert('Asset deleted successfully!');
        onDelete(); // Refresh asset list/map
      } catch (error) {
        console.error('Error deleting asset:', error);
        alert('Failed to delete asset.');
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedAsset({ ...editedAsset, [e.target.name]: e.target.value });
  };

  return (
    <div className='p-4 bg-white text-navy rounded-md shadow-md'>
      {isEditing ? (
        <>
          <h3 className='text-lg font-bold mb-4'>Edit Asset</h3>
          <div className='space-y-4'>
            <input
              type='text'
              name='name'
              value={editedAsset.name}
              onChange={handleChange}
              placeholder='Asset Name'
              className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
            />
            <select
              name='type'
              value={editedAsset.type}
              onChange={handleChange}
              className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
            >
              <option value='Vehicle'>Vehicle</option>
              <option value='Equipment'>Equipment</option>
              <option value='Building'>Building</option>
            </select>
            <input
              type='text'
              name='status'
              value={editedAsset.status}
              onChange={handleChange}
              placeholder='Status (e.g., Active, Inactive)'
              className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
            />
            <input
              type='number'
              name='latitude'
              value={editedAsset.latitude}
              onChange={handleChange}
              placeholder='Latitude'
              className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
            />
            <input
              type='number'
              name='longitude'
              value={editedAsset.longitude}
              onChange={handleChange}
              placeholder='Longitude'
              className='w-full p-2 border border-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-orange'
            />
            <button
              onClick={handleEdit}
              className='bg-orange text-white px-4 py-2 rounded-md hover:bg-black'
            >
              Save Changes
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className='text-lg font-bold'>{asset.name}</h3>
          <p>Type: {asset.type}</p>
          <p>Status: {asset.status}</p>
          <p>
            Location: {asset.latitude}, {asset.longitude}
          </p>
          <div className='mt-4 space-x-4'>
            <button
              onClick={() => setIsEditing(true)}
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className='bg-red-500 text-white px-4 py-2 rounded-md'
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetPopup;
