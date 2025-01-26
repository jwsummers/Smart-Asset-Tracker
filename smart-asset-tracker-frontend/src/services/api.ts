const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAssets = async () => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/assets`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }

  return response.json();
};


export const createAsset = async (asset: any, token: string): Promise<void> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/assets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create asset');
  }
};

export const updateAsset = async (id: number, assetData: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/api/assets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(assetData),
  });
  if (!response.ok) {
    throw new Error('Failed to update asset');
  }
  return await response.json();
};

export const deleteAsset = async (id: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/api/assets/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete asset');
  }
};

