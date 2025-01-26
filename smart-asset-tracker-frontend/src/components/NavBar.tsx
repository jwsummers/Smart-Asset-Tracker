import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const NavBar = () => {
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const displayName = loggedInUser ? loggedInUser.split('@')[0] : '';

  return (
    <nav className='bg-black text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>S.M.R.T.</h1>

        {/* Hamburger Icon for Mobile */}
        <button
          className='md:hidden text-white'
          onClick={toggleMenu}
          aria-label='Toggle navigation menu'
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-black md:bg-transparent z-10 p-4 md:p-0`}
        >
          <ul className='flex flex-col md:flex-row items-center w-full md:w-auto'>
            <li>
              <Link
                to='/'
                className='block hover:text-orange py-2 text-center'
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {loggedInUser && (
              <li>
                <Link
                  to='/dashboard'
                  className='block hover:text-orange py-2 text-center'
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!loggedInUser ? (
              <li>
                <Link
                  to='/login'
                  className='block hover:text-orange py-2 text-center'
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li className='flex items-center space-x-2 py-2 text-center'>
                  <FaUser className='text-orange' />
                  <span className='text-orange'>{displayName}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='block text-red-500 hover:text-red-700 py-2 text-center'
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
