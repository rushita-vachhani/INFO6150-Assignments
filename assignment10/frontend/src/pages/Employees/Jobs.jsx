import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../redux/slices/jobSlice";
import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";

export default function EmployeeJobs() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <Paper sx={{ p: 3 }}>
      <h2>Available Jobs</h2>

      <Grid container spacing={2}>
        {items.map((job, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2">{job.company}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {job.description}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <b>Salary:</b> ${job.salary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
