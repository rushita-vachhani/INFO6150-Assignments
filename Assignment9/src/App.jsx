import * as React from 'react';

import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Jobs from './pages/Jobs.jsx'
import Contact from './pages/Contact.jsx'
import Companies from './pages/Companies.jsx'
import Login from './pages/Login.jsx'
import { useAuth } from './state/AuthContext.jsx'
import NavBar from './components/NavBar.jsx';
import AuthRedirector from './components/AuthRedirector.jsx';

function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" />;
}


export default function App() {
  return (
    <Box sx={{ minHeight:'100vh', bgcolor:'#fafafa' }}>
      <AuthRedirector />
      <NavBar/>
      <Container sx={{ py:4 }}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Box>
  )
}
