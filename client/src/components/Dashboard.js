import React from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import UserManagement from "./UserManagement";
import Form from "./Form";
import Footer from "./Footer";
function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              👑 QueenB - Example Bar
            </Typography>
          </Toolbar>
        </AppBar>
        <UserManagement />
      </Box>
      <Form />
      <Footer />
    </>
  );
}

export default App;
