const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <nav className='bg-navy text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-orange'>S.M.R.T.</h1>
        <div className='space-x-4'>
          <a href='/' className='hover:text-orange'>
            Home
          </a>
          <a href='/dashboard' className='hover:text-orange'>
            Dashboard
          </a>
          {/* Optionally display a logout link if logged in */}
          {isLoggedIn && (
            <a href='/logout' className='hover:text-orange'>
              Logout
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
