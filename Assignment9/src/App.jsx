import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container, Box } from '@mui/material'
// import Home from './pages/Home.jsx'
import Home from './pages/Home';
import About from './pages/About/index.jsx'
import Jobs from './pages/Jobs';
import Contact from './pages/Contact';
import Companies from './pages/Company_Showcase';
import Login from './pages/Login/index.jsx'
import { useAuth } from './state/AuthContext.jsx'
// import NavBar from './components/NavBar/index.jsx';
import NavBar from './components/NavBar';
import AuthRedirector from './components/AuthRedirector/index.jsx';

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
