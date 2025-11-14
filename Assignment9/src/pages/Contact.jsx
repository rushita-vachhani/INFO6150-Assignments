import * as React from 'react'
import { Typography, Paper, TextField, Button, Stack } from '@mui/material'
export default function Contact(){
  return (
    <Paper sx={{ p:3 }}>
      <Typography variant="h4" gutterBottom>Contact</Typography>
      <Stack spacing={2} sx={{ maxWidth:480 }}>
        <TextField label="Your Email" fullWidth />
        <TextField label="Message" fullWidth multiline rows={4} />
        <Button variant="contained">Send</Button>
      </Stack>
    </Paper>
  )
}
