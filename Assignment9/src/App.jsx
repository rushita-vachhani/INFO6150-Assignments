// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


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

function NavBar() {
  const { isAuthed, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Job Portal</Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/jobs">Job Listings</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        <Button color="inherit" component={Link} to="/companies">Companies</Button>
        {isAuthed
          ? <Button color="inherit" onClick={()=>{logout(); navigate('/')}}>Logout</Button>
          : <Button color="inherit" component={Link} to="/login">Login</Button>}
      </Toolbar>
    </AppBar>
  )
}

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
