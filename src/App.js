import { ColorModeContext } from "./theme";
import {useMode} from "./theme";
import {Route, Routes, useLocation} from "react-router-dom"; // Removed BrowserRouter here
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Forgotpass from "./scenes/forgotpass";
import Usaha from "./scenes/usaha";
import Mitras from "./scenes/users/users/mitras";
import Users from "./scenes/users/users/client";
import Serabutan from "./scenes/kategori bantuan/serabutan";
import Elektronik from "./scenes/kategori bantuan/elektronik";
import Rumah from "./scenes/kategori bantuan/rumah";
import Kendaraan from "./scenes/kategori bantuan/kendaraan";
import Personal from "./scenes/kategori bantuan/personal";
import LoginRedirect from "./components/loginredirect";
import NewKendaraan from "./scenes/form/kendaraan";
import NewElektronik from "./scenes/form/elektronik";
import NewSerabutan from "./scenes/form/serabutan";
import NewRumah from "./scenes/form/rumah";
import PrivateRoute from "./components/PrivateRoute";
import Newpass from "./scenes/newpass";
import Success from "./components/200";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const hiddenPaths = ['/login', '/forgotpassword', '/success', '/newpassword', '/serabutan/create', '/elektronik/create', '/kendaraan/create', '/rumah/create', '/kendaraan/create', '/elektronik/create', '/personal/create', '/password-reset/:token'];

  const showSidebarAndTopbar = !hiddenPaths.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showSidebarAndTopbar && <Sidebar />}
          <main className="content">
            <Routes>
              <Route path="/" element={<LoginRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<Forgotpass />} />
              <Route path="/password-reset/:token" element={<Newpass />} />
              <Route path="/success" element={<Success />} />

              {/* Protect the routes that require authentication */}
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route
                path="/usaha"
                element={<PrivateRoute element={<Usaha />} />}
              />
              <Route
                path="/client"O
                element={<PrivateRoute element={<Users />} />}
              />
              <Route
                path="/mitras"
                element={<PrivateRoute element={<Mitras />} />}
              /> q 
              <Route
                path="/serabutan"
                element={<PrivateRoute element={<Serabutan />} />}
              />
              <Route
                path="/elektronik"
                element={<PrivateRoute element={<Elektronik />} />}
              />
              <Route
                path="/rumah"
                element={<PrivateRoute element={<Rumah />} />}
              />
              <Route
                path="/kendaraan"
                element={<PrivateRoute element={<Kendaraan />} />}
              />
              <Route
                path="/personal"
                element={<PrivateRoute element={<Personal />} />}
              />
              <Route
                path="/kendaraan/create"
                element={<PrivateRoute element={<NewKendaraan />} />}
              />
              <Route
                path="/elektronik/create"
                element={<PrivateRoute element={<NewElektronik />} />}
              />
              <Route
                path="/serabutan/create"
                element={<PrivateRoute element={<NewSerabutan />} />}
              />
              <Route
                path="/rumah/create"
                element={<PrivateRoute element={<NewRumah />} />}
              />
              <Route
                path="/personal/create"
                element={<PrivateRoute element={<NewRumah />} />}
              />
            </Routes>
          </main>   
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
