import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import UserNavbar from './User/UserNavbar';
import Sidebar from './User/Sidebar';

const Layout = ({ children }) => {

  const [userLayout, setUserLayout] = useState(() => window.localStorage.getItem('token'));

  useEffect(() => {
    // Step 2: Set up an effect to re-check the token on each render
    const token = window.localStorage.getItem('token');
    setUserLayout(token);
  }, [window.localStorage.getItem('token')]);

  return (
    <div>
      <header className='mb-24'>
        {
          userLayout !== null ? (
            <div>
              <UserNavbar />
              <Sidebar />
            </div>
          ) : (
            <Navbar />
          )
        }
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
