import * as React from 'react'
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material'
import jobPosts from '../seed/jobPosts.js'

export default function Jobs(){
  return (
    <>
      <Typography variant="h4" gutterBottom>Job Listings</Typography>
      <Grid container spacing={2}>
        {jobPosts.map(job => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card variant="outlined" sx={{ height:'100%', display:'flex', flexDirection:'column' }}>
              <CardContent sx={{ flexGrow:1 }}>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2" sx={{ mt:1, color:'text.secondary' }}>{job.description}</Typography>
                <Typography variant="caption" sx={{ display:'block', mt:1 }}>{job.lastUpdated}</Typography>
              </CardContent>
              <CardActions><Button size="small" href={job.applyLink} target="_blank">Apply</Button></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
