const API_URL = 'http://localhost:5000/api';

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

