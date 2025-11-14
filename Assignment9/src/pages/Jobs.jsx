import * as React from 'react';
import { Container, Grid, Card, CardContent, CardActions, Typography } from '@mui/material';
import jobPosts from '../seed/jobPosts.js';
import PrimaryButton from '../components/PrimaryButton.jsx';

export default function Jobs() {
  return (
    <>
    
          <Typography variant="h3" fontWeight={800} sx={{ textAlign: "center", mb: { xs: 6, md: 2 } }} gutterBottom>
            JOB LISTINGS
          </Typography>
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Grid container spacing={2}>
          {jobPosts.map(job => (
            <Grid item xs={12} key={job.id}>
              <Card
                variant="outlined"
                sx={{ width: '100%', p: 2, borderRadius: 2, display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1, mb: -2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{job.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{job.description}</Typography>

                  <Typography variant="body2">
                    <strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Salary:</strong> {job.salary}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {job.lastUpdated}
                  </Typography>
                </CardContent>

                <CardActions>
                  <PrimaryButton
                    href={job.applyLink}
                    target="_blank"
                    rel="noreferrer"
                    size="small"
                    aria-label={`Apply for ${job.title}`}
                  >
                    APPLY NOW
                  </PrimaryButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
    </>
  );
}
