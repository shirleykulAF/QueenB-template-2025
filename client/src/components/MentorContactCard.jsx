import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import MentorFullName from "./mentor/MentorFullName";
import MentorTechnologies from "./mentor/MentorTechnologies";


function MentorContactCard({ mentor }) {
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
        image={mentor.profileImage}
        title="Mentor photo"
      />

      <CardContent>
        <MentorFullName mentor={mentor} />

        <MentorTechnologies mentor={mentor} />

        <Typography variant="h5">
          Years of experience: {mentor.yearsOfExperience}
        </Typography>

        <p></p>

        <Typography variant="h4">About Me:</Typography>
        <Typography variant="p">{mentor.description}</Typography>
      </CardContent>

      <CardActionArea sx={{ display: "flex", alignItems: "center" }}>
        <Button>Whatsapp</Button>
        <Button>Email</Button>
        <Button>Linkdin</Button>
        <Button>Phone</Button>
      </CardActionArea>
    </Card>
  );
}

export default MentorContactCard;
