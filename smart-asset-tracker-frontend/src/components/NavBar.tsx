import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Extract the part of the email before the '@'
  const displayName = loggedInUser ? loggedInUser.split('@')[0] : '';

  return (
    <nav className='bg-black text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>S.M.R.T.</h1>
        <div className='space-x-4 flex items-center'>
          <Link to='/' className='hover:text-orange'>
            Home
          </Link>
          {loggedInUser && (
            <Link to='/dashboard' className='hover:text-orange'>
              Dashboard
            </Link>
          )}
          {!loggedInUser ? (
            <Link to='/login' className='hover:text-orange'>
              Login
            </Link>
          ) : (
            <>
              <FaUser className='text-orange' />
              <span className='text-orange'>{displayName}</span>
              <button
                onClick={handleLogout}
                className='text-red-500 hover:text-red-700'
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
