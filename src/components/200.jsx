import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Success = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor={theme.palette.background.default}
      padding={4}
    >
      <Typography
        variant="h4"
        component="h1"
        color={theme.palette.success.main}
        textAlign="center"
        gutterBottom
      >
        Success!!
      </Typography>
      <Typography
        variant="body1"
        color={theme.palette.text.secondary}
        textAlign="center"
      >
        Silahkan Login Kembali
      </Typography>
    </Box>
  );
};

export default Success;
