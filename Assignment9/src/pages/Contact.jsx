import heroImg from '../assets/image2.jpg';
import PrimaryButton from "../components/PrimaryButton.jsx";

import { Typography, Paper, TextField, Button, Stack } from '@mui/material'
export default function Contact(){
  return (
    <Paper sx={{ p:3 }}>
      <Typography variant="h3" fontWeight={800} sx={{ textAlign: "center", mb: { xs: 6, md: 2 } }} gutterBottom>CONTACT</Typography>

      
      <Stack spacing={2} sx={{ maxWidth:480 }}>
        <TextField label="Your Email" fullWidth />
        <TextField label="Message" fullWidth multiline rows={4} />
        <PrimaryButton type="submit">SEND</PrimaryButton>

        
      </Stack>
    </Paper>
  )
}
