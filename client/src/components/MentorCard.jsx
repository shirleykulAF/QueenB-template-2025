import React, { useState } from "react";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import MentorDialog from "./MentorDialog";

function MentorCard({mentor}) {
  const [open, setOpen] = useState(false);
  
  const [MentorInfo, setMentorInfo] = useState([])

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
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

        {/* click on mentor card will open dialog with the mentor contact card */}
      <MentorDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
export default MentorCard;
