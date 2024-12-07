const NavBar = () => {
    return (
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Smart Asset Tracker</h1>
          <div className="space-x-4">
            <a href="/" className="hover:text-orange">Home</a>
            <a href="/dashboard" className="hover:text-orange">Dashboard</a>
            <a href="/login" className="hover:text-orange">Login</a>
          </div>
        </div>
      </nav>
    );
  };
  

export default NavBar;
