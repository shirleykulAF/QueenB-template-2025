import { Typography, Box } from "@mui/material"

function MentorTechnologies({mentor}){
    return (
        <Box marginTop={1} marginBottom={1}>
        <Typography variant="h4">Technologies:</Typography>
        <Typography variant="body1">{mentor.technologies.join(', ')}</Typography>
        </Box>
    )
}

export default MentorTechnologies