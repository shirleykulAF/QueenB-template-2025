import React from "react";
import { Card, Typography, CardContent, CardMedia } from "@mui/material";

function MentorCard() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardMedia
        sx={{ height: 150, width: 100 }}
        image="https://i.pinimg.com/564x/8a/2a/bb/8a2abb6c8d8049e52314d791b9c20ac0.jpg"
        title="Mentor photo"
      />

      <CardContent>
        <Typography variant="h3">Mentor Name</Typography>
        <Typography variant="body1">Technologies</Typography>
      </CardContent>

    </Card>
  );
}
export default MentorCard;
