import { Typography } from "@mui/material";

function getFullName({ mentor }) {
  return mentor.firstName + " " + mentor.lastName;
}

function MentorFullName({ mentor }) {
  return <Typography variant="h3">{getFullName({ mentor })}</Typography>;
}

export default MentorFullName