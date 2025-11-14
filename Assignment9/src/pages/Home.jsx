import * as React from 'react';
import { Box, Typography, Button, TextField, Stack, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E0F7FA 0%, #FFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
      }}
    >
      {/* HERO SECTION */}
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Find your job <span style={{ color: '#1976d2' }}>better and faster</span>
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Discover thousands of opportunities that fit your passion and skills.
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          bgcolor: 'white',
          borderRadius: 5,
          boxShadow: 3,
          width: { xs: '100%', sm: 500 },
          p: 1,
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search by skill, company, or job"
          InputProps={{ disableUnderline: true, sx: { pl: 2 } }}
        />
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          sx={{ borderRadius: 3, px: 3 }}
          onClick={() => navigate('/jobs')}
        >
          Search
        </Button>
      </Stack>

      {/* SECONDARY SECTION */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 10, maxWidth: 900 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, textAlign: 'left' }}>
            <Typography variant="h4" fontWeight={700}>
              Find your passion and achieve success
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Explore roles that match your interests and talents. A high salary isn’t the only priority—
              fulfillment and growth matter too. Start your journey today!
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 3 }}
              onClick={() => navigate('/jobs')}
            >
              Browse Jobs
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/4961/4961755.png"
            alt="Career growth illustration"
            sx={{ width: '100%', maxWidth: 400 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
