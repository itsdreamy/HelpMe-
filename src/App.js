import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Dashboard from './Pages/Dashboard/Dashboard';
import Usaha from './Pages/Usaha/Usaha';
import Mitra from './Pages/Mitra/Mitra';
import Client from './Pages/Client/Client';
import Login from './Pages/Login/Login.tsx';
import ForgotPass from './Pages/Password/ForgotPass.tsx'
import NewPass from './Pages/Password/NewPass.tsx';
import SuccessPage from './Pages/SuccessPage/SuccessPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/newpassword" element={<NewPass />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usaha" element={<Usaha />} />
          <Route path="mitra" element={<Mitra />} />
          <Route path="client" element={<Client />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
