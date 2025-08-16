import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function MentorContactCard() {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{ height: 200, width: 200 }}
        image="https://i.pinimg.com/564x/8a/2a/bb/8a2abb6c8d8049e52314d791b9c20ac0.jpg"
        title="Mentor photo"
      />
      
      <CardContent>
        <Typography variant="h1">Mentor Name</Typography>
        <Typography variant="h3">Technologies</Typography>
        <Typography variant="p">
          Full-stack developer with 5 years of experience. Passionate about
          mentoring junior developers.
        </Typography>
      </CardContent>

      <CardActionArea sx={{display:"flex", alignItems: "center"}}>
        <Button>Whatsapp</Button>
        <Button>Email</Button>
        <Button>Linkdin</Button>
        <Button>Phone</Button>

      </CardActionArea>

    </Card>
  );
}

export default MentorContactCard;
