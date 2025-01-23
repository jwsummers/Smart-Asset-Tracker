import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDemoLogin = async () => {
    try {
      const response = await fetch('/api/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Unable to login as demo user');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-96'>
        <h1 className='text-2xl font-bold mb-6 text-center'>
          Welcome to S.M.R.T.
        </h1>
        <p className='text-gray-600 text-center mb-4'>
          Track, manage, and visualize your assets
        </p>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label className='block mb-1 font-medium'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full border p-2 rounded focus:ring focus:ring-orange focus:outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              className='w-full border p-2 rounded focus:ring focus:ring-orange focus:outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-navy text-white p-2 rounded hover:bg-orange transition-colors'
          >
            Login
          </button>
        </form>
        <div className='mt-4 text-center'>
          <button
            onClick={handleDemoLogin}
            className='bg-orange text-white px-4 py-2 rounded shadow hover:bg-navy transition-colors'
          >
            Login as Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
