import * as React from 'react'
import { Paper, Stack, TextField, Button, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Login(){
  const { api, login } = useAuth()
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [error,setError] = React.useState('')
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    try{
      const res = await api.post('/auth/login', { email, password })
      login(res.data.token)
      navigate('/companies')
    }catch(err){
      setError(err?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <Paper sx={{ p:3, maxWidth:420, mx:'auto' }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <Stack spacing={2}>
        <TextField label="Email" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
        <TextField label="Password" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/>
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained">Sign in</Button>
      </Stack>
    </Paper>
  )
}
