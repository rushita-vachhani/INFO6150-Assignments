import * as React from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Jobs from './pages/Jobs.jsx'
import Contact from './pages/Contact.jsx'
import Companies from './pages/Companies.jsx'
import Login from './pages/Login.jsx'
import { useAuth } from './state/AuthContext.jsx'
import NavBar from "./components/NavBar.jsx";

// function NavBar() {
//   const { isAuthed, logout } = useAuth()
//   const navigate = useNavigate()
//   return (
//     <AppBar position="static">
//       <Toolbar sx={{ gap: 2 }}>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>Job Portal</Typography>
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/about">About</Button>
//         <Button color="inherit" component={Link} to="/jobs">Job Listings</Button>
//         <Button color="inherit" component={Link} to="/contact">Contact</Button>
//         <Button color="inherit" component={Link} to="/companies">Companies</Button>
//         {isAuthed
//           ? <Button color="inherit" onClick={()=>{logout(); navigate('/')}}>Logout</Button>
//           : <Button color="inherit" component={Link} to="/login">Login</Button>}
//       </Toolbar>
//     </AppBar>
//   )
// }

function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth()
  return isAuthed ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Box sx={{ minHeight:'100vh', bgcolor:'#fafafa' }}>
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
