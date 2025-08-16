import React, { useState } from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import MentorSignUp from "./mentorSignUp";
import MentitSignUp from "./MentitSignUp";
import Footer from "./Footer";
import Header from "./Header/Header";
import registrationImg from "../assets/loginImg.svg";

const RegistrationPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Header />
      <Box
        bgcolor="background.default"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={4}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              flex: 1,
              textAlign: "center",
              pt: "200px",
            }}
          >
            <img
              src={registrationImg}
              alt="Registration Illustration"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "600px",
                objectFit: "contain",
              }}
            />
          </Box>

          <Box sx={{ flex: 1, width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box p={3}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  centered
                  sx={{ mb: 3 }}
                >
                  <Tab
                    label="Register as Mentor"
                    icon={<PersonAdd />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Register as Mentee"
                    icon={<PersonAdd />}
                    iconPosition="start"
                  />
                </Tabs>

                {tabValue === 0 && <MentorSignUp />}
                {tabValue === 1 && <MentitSignUp />}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default RegistrationPage;
