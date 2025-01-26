import { useState } from 'react';

interface EditAssetModalProps {
  asset: {
    id: string;
    name: string;
    type: string;
    status: string;
    latitude: number;
    longitude: number;
  };
  onClose: () => void;
  onSave: (updatedAsset: {
    id: string;
    name: string;
    type: string;
    status: string;
    latitude: number;
    longitude: number;
  }) => void;
}

const EditAssetModal = ({ asset, onClose, onSave }: EditAssetModalProps) => {
  const [updatedAsset, setUpdatedAsset] = useState({ ...asset });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedAsset((prev) => ({
      ...prev,
      [name]:
        name === 'latitude' || name === 'longitude' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(updatedAsset);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Edit Asset</h2>
        <div className='space-y-4'>
          <input
            type='text'
            name='name'
            value={updatedAsset.name}
            onChange={handleChange}
            placeholder='Asset Name'
            className='w-full p-2 border rounded-md'
          />
          <select
            name='type'
            value={updatedAsset.type}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          >
            <option value='Vehicle'>Vehicle</option>
            <option value='Equipment'>Equipment</option>
            <option value='Building'>Building</option>
          </select>
          <select
            name='status'
            value={updatedAsset.status}
            onChange={handleChange}
            className='w-full p-2 border rounded-md'
          >
            <option value=''>Select Status</option>
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
            <option value='In Service/Repair'>In Service/Repair</option>
          </select>
          <input
            type='number'
            name='latitude'
            value={updatedAsset.latitude}
            onChange={handleChange}
            placeholder='Latitude'
            className='w-full p-2 border rounded-md'
          />
          <input
            type='number'
            name='longitude'
            value={updatedAsset.longitude}
            onChange={handleChange}
            placeholder='Longitude'
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div className='mt-4 flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-400 text-white rounded-md'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAssetModal;
