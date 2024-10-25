import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Dashboard from './Pages/Dashboard/Dashboard';
import Usaha from './Pages/Usaha/Usaha';
import Mitra from './Pages/Mitra/Mitra';
import Client from './Pages/Client/Client';
import Login from './Pages/Login/Login.tsx';
import ForgotPass from './Pages/Password/ForgotPass.tsx';
import NewPass from './Pages/Password/NewPass.tsx';
import SuccessPage from './Pages/SuccessPage/SuccessPage.tsx';
import PrivateRoute from './components/auth/PrivateRoute.js';
import LoginRedirect from './components/loginredirect.jsx';
import KategoriBantuan from './Pages/kategori_bantuan/Bantuan_PerKTR.jsx';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Adjust based on your authentication method

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/newpassword" element={<NewPass />} />
        <Route path="/success" element={<SuccessPage />} />
        
        <Route element={<Layout />}>
          <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
          <Route path="usaha" element={<PrivateRoute element={<Usaha />} isAuthenticated={isAuthenticated} />} />
          <Route path="kelolamitra" element={<PrivateRoute element={<Mitra />} isAuthenticated={isAuthenticated} />} />
          <Route path="kelolaclient" element={<PrivateRoute element={<Client />} isAuthenticated={isAuthenticated} />} />
          <Route
            path="/kategori/:category"
            element={<PrivateRoute element={<KategoriBantuan />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
