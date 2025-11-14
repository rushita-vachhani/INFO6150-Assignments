import * as React from 'react'
import { Typography, Paper } from '@mui/material'
export default function Home(){
  return (
    <Paper sx={{ p:3 }}>
      <Typography variant="h4" gutterBottom>Welcome to the Job Portal</Typography>
      <Typography>Browse jobs, learn about us, and explore companies. Login to view the company showcase.</Typography>
    </Paper>
  )
}
