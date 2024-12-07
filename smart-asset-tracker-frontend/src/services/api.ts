const API_URL = 'http://localhost:5000/api';

export const getAssets = async () => {
  const response = await fetch(`${API_URL}/assets`);
  return response.json();
};

export const createAsset = async (asset: any) => {
  const response = await fetch(`${API_URL}/assets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asset),
  });
  return response.json();
};
