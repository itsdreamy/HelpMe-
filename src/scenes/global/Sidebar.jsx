import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { logout, aboutMe } from "../../api/authApi";
import { listCategory } from "../../api/mockData";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import StoreOutlinedIcon from '@mui/icons-material/Store';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import Preloader from '../../components/Preloader'; 
import { BASE_URL } from "../../api/api";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon

// Component for sidebar items
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const [logoutLoading, setLogoutLoading] = useState(false); // State for logout loading
  const [openDialog, setOpenDialog] = useState(false); // State for dialog open/close
  const [newCategoryName, setNewCategoryName] = useState(""); // State for new category name
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLogoutLoading(true); // Start loading
    const data = await logout();
    setLogoutLoading(false); // Stop loading
    if (data) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await aboutMe();
      if (data && data.user) {
        setUsername(data.user.username);
        setRole(data.user.role);
        setProfile(BASE_URL + "/" + data.user.image_profile);
      }
    };

    const fetchCategoryList = async () => {
      const data = await listCategory();
      if (data && data.data) {
        setCategories(data.data);
      }
    };

    const loadData = async () => {
      await fetchUserData();
      await fetchCategoryList();
      setLoading(false); // Stop loading when data is fetched
    };

    loadData();
  }, []);

  const categoryIcons = [
    // <PrivacyTipIcon />,
    <CarCrashIcon />,
    <HomeOutlinedIcon />,
    <ElectricBoltIcon />,
    <SettingsAccessibilityIcon />
  ];

  const icons = [
    <PrivacyTipOutlinedIcon />
  ];

  // Handler for opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Handler for closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCategoryName(""); // Reset the input field
  };

  // Handler for submitting the new category
  const handleAddCategory = () => {
    // Logic to add the new category
    // You can adjust this according to how you handle categories
    const newCategory = {
      id: categories.length + 1, // Example ID, adjust as needed
      name: newCategoryName,
    };
    setCategories([...categories, newCategory]);
    handleCloseDialog();
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: isCollapsed ? "5px 20px" : "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {loading ? (
        <Preloader loading={loading} /> // Show Preloader if loading
      ) : logoutLoading ? ( // Show Preloader if logging out
        <Preloader loading={logoutLoading} />
      ) : (
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold" }}
                    color={colors.grey[100]}
                  >
                    HelpMe !
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={profile}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {username}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {role}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<DashboardOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Mitra
              </Typography>
              <Item
                title="Kelola Usaha Mitra"
                to="/usaha"
                icon={<StoreOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              {/* Users Section */}
              {!isCollapsed && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Users
                </Typography>
              )}
              <Item
                title="Kelola Mitra"
                to="/mitras"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Kelola Client"
                to="/client"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              {/* Dynamic Category Section */}
              {!isCollapsed && (
                <Box display="flex" alignItems="center" sx={{ m: "15px 0 5px 20px" }}>
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ flexGrow: 1 }}
                  >
                    Kategori Bantuan
                  </Typography>
                  <IconButton onClick={handleOpenDialog}>
                    <AddCircleOutlineIcon sx={{ color: colors.grey[300] }} />
                  </IconButton>
                </Box>
              )}

              {/* Collapsed state - show only icon */}
              {isCollapsed && (
                <IconButton onClick={handleOpenDialog} sx={{ m: "15px 0 5px 10px" }}>
                  <AddCircleOutlineIcon sx={{ color: colors.grey[300] }} />
                </IconButton>
              )}

              {categories
                .filter(category => category.id >=2) // Filter for id >= 2
                .map((category, index) => (
                  <Item
                    key={category.id}
                    title={"Bantuan " + category.name}
                    to={`/${category.name.toLowerCase()}`}
                    icon={categoryIcons[index % categoryIcons.length]} // Dynamic icons
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}

              {/* Logout Section */}
              {!isCollapsed && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Logout
                </Typography>
              )}
              <MenuItem
                title="Logout"
                icon={<LogoutOutlinedIcon />}
                onClick={handleLogout}
                style={{ color: colors.grey[100] }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Box>
          </Menu>
        </ProSidebar>
      )}

      {/* Dialog for Adding Kategori Bantuan */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Tambah Kategori Bantuan
          <IconButton onClick={handleCloseDialog} style={{ float: 'right' }}>
            <CloseIcon color="white" style={{ marginTop: "-7px" }}/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label="Nama Kategori"
              color="white"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <Button
            variant="contained"
            onClick={handleAddCategory}
            disabled={!newCategoryName.trim()} // Disable if input is empty
            sx={{
              backgroundColor: 'white', // Set background color to white
              color: 'black', // Set text color to black
            }}
          >
            Submit
          </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* Optional: Additional actions */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
