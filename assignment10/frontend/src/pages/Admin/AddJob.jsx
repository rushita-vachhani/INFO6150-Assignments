import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/slices/jobSlice";
import { TextField, Button, Paper } from "@mui/material";

export default function AddJob() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    company: "",
    title: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitJob = async () => {
    await dispatch(createJob(form));
    alert("Job created!");
    setForm({ company: "", title: "", description: "", salary: "" });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <h2>Add New Job</h2>

      <TextField
        name="company"
        label="Company"
        fullWidth
        sx={{ mb: 2 }}
        value={form.company}
        onChange={handleChange}
      />

      <TextField
        name="title"
        label="Job Title"
        fullWidth
        sx={{ mb: 2 }}
        value={form.title}
        onChange={handleChange}
      />

      <TextField
        name="description"
        label="Description"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        value={form.description}
        onChange={handleChange}
      />

      <TextField
        name="salary"
        label="Salary"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={form.salary}
        onChange={handleChange}
      />

      <Button variant="contained" onClick={submitJob}>
        Submit
      </Button>
    </Paper>
  );
}
