import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {useContext} from "react";
import { ColorModeContext, tokens } from "../../theme";
import { styled } from "@mui/material/styles";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const styledBox = styled(Box)``;
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return <Box display="flex" alignItems="right" p={2} justifyContent="right">
                <Box display="flex">
                    <IconButton onClick={colorMode.toggleColorMode}>{theme.palette.mode === 'dark' ? (<LightModeOutlinedIcon/>) : (<DarkModeOutlinedIcon/>)}</IconButton>
                </Box>
                </Box>
}

export default Topbar;