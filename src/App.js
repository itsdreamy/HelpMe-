import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Dashboard from './Pages/Dashboard/Dashboard';
import UserMitra from './Pages/UserMitra/UserMitra.jsx';
import Mitra from './Pages/Mitra/Mitra';
import Client from './Pages/Client/Client';
import Login from './Pages/Login/Login.tsx';
import ForgotPass from './Pages/Password/ForgotPass.tsx';
import NewPass from './Pages/Password/NewPass.tsx';
import SuccessPage from './Pages/SuccessPage/SuccessPage.tsx';
import PrivateRoute from './components/auth/PrivateRoute.js';
import LoginRedirect from './components/loginredirect.jsx';
import MasalahPerKTR from './Pages/kategori_bantuan/Masalah_PerKTR.jsx';
import KategoriBantuan from './Pages/kategori_bantuan/KelolaBantuan.jsx';
import NotFound from './Pages/NotFoundPage.jsx';
import KelolaKategori from './Pages/kategori_bantuan/KelolaKategori.jsx';

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
        <Route path="*" element={<NotFound />} />
        
        <Route element={<Layout />}>
          <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
          <Route path="usahamitra" element={<PrivateRoute element={<Mitra />} isAuthenticated={isAuthenticated} />} />
          <Route path="usermitra" element={<PrivateRoute element={<UserMitra />} isAuthenticated={isAuthenticated} />} />
          <Route path="kelolaclient" element={<PrivateRoute element={<Client />} isAuthenticated={isAuthenticated} />} />
          <Route path="kelolakategori" element={<PrivateRoute element={<KelolaKategori />} isAuthenticated={isAuthenticated} />} />
          <Route
            path="/kategori/:category/bantuan"
            element={<PrivateRoute element={<KategoriBantuan />} />}
          />
          <Route
            path="/kategori/:category/masalah"
            element={<PrivateRoute element={<MasalahPerKTR />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
