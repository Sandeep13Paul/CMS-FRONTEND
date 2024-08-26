import { Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/User/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Profile from './Components/User/Profile';
import Logout from './Components/Logout';
import AddContacts from './Components/User/AddContacts';
import ShowContacts from './Components/User/ShowContacts';
// import OAuthSuccess from './Components/OAuthSuccess';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        {/* <Route path="/oauth2/success" element={<OAuthSuccess />} /> */}
        {/* Protect the dashboard and profile routes */}
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/add" 
          element={
            <ProtectedRoute>
              <AddContacts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/show" 
          element={
            <ProtectedRoute>
              <ShowContacts />
            </ProtectedRoute>
          } 
        />
    </Routes>
  );
};

export default AppRoutes;
