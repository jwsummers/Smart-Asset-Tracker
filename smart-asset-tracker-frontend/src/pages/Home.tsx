import { FaMapMarkerAlt, FaFilter, FaLock } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiArcgis } from 'react-icons/si';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    try {
      await demoLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to log in as demo user:', error);
      alert('Unable to log in as demo user. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='flex flex-col items-center justify-center bg-gradient-to-br from-navy to-orange-500 text-white p-12'>
          <h1 className='text-5xl font-bold mb-4 text-center'>
            Welcome to S.M.R.T.
          </h1>
          <p className='text-lg mb-8 text-center max-w-2xl'>
            Smart Monitoring and Resource Tracking (S.M.R.T.) is your go-to
            solution for monitoring, managing, and visualizing assets in
            real-time. Designed with simplicity and efficiency in mind.
          </p>
          <div className='flex space-x-6'>
            <Link
              to='/login'
              className='bg-orange hover:transform hover:scale-105 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold'
            >
              Login
            </Link>
            <button
              onClick={handleDemoLogin}
              className='bg-white hover:transform hover:scale-105 text-navy px-6 py-3 rounded-lg shadow-lg text-lg font-semibold'
            >
              Demo
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className='bg-gray-100 py-16'>
          <div className='container mx-auto'>
            <h2 className='text-3xl font-semibold text-center mb-12 text-navy'>
              Features at a Glance
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Feature Cards */}
              {[
                {
                  icon: <FaMapMarkerAlt size={40} />,
                  title: 'Interactive Mapping',
                  desc: 'Visualize assets on a detailed, interactive map.',
                },
                {
                  icon: <FaFilter size={40} />,
                  title: 'Filters & Search',
                  desc: 'Quickly find assets using advanced filters.',
                },
                {
                  icon: <FaLock size={40} />,
                  title: 'Secure & Scalable',
                  desc: 'Built with security and scalability in mind.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className='bg-orange p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center text-center'
                >
                  <div className='text-orange-600 mb-4'>{feature.icon}</div>
                  <h3 className='text-xl font-bold text-navy mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className='bg-white py-16'>
          <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-semibold text-navy mb-8'>
              Powered by Cutting-Edge Technologies
            </h2>
            <p className='mb-12 text-gray-600'>
              Built with the best tools and frameworks for modern web
              development.
            </p>
            <div className='flex justify-center space-x-12'>
              {/* Tech Stack Logos */}
              {[
                { icon: <SiReact size={50} />, name: 'React' },
                { icon: <SiTailwindcss size={50} />, name: 'Tailwind CSS' },
                { icon: <SiArcgis size={50} />, name: 'ArcGIS' },
              ].map((tech, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <div className='text-orange'>{tech.icon}</div>
                  <span className='text-navy mt-2'>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='bg-navy text-white p-4 text-center'>
        <p>&copy; 2024 S.M.R.T. - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
