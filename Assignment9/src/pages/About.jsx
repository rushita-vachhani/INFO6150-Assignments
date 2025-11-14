import * as React from 'react'
import { Typography, Paper } from '@mui/material'
export default function About(){
  return (
    <Paper sx={{ p:3 }}>
      <Typography variant="h4" gutterBottom>About</Typography>
      <Typography>This portal is built with React, React Router, Axios and Material UI for Assignment 9 (Rushitaben Vachhani).</Typography>
    </Paper>
  )
}
