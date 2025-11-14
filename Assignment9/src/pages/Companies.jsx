import * as React from 'react'
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useAuth } from '../state/AuthContext.jsx'
import { BASE_URL } from '../services/api.js'

export default function Companies(){
  const { api } = useAuth()
  const [items,setItems] = React.useState([])

  React.useEffect(() => {
    let mounted = true
    api.get('/user/getAll').then(res => {
      const users = res.data.users || []
      const mapped = users.map(u => ({
        id: u.email,
        name: u.fullName,
        img: u.imagePath ? (u.imagePath.startsWith('http') ? u.imagePath : `${BASE_URL}${u.imagePath}`) : null
      }))
      if (mounted) setItems(mapped)
    }).catch(console.error)
    return () => { mounted = false }
  }, [api])

  return (
    <>
      <Typography variant="h4" gutterBottom>Company Showcase</Typography>
      <Grid container spacing={2}>
        {items.map(it => (
          <Grid item xs={12} sm={6} md={4} key={it.id}>
            <Card>
              <CardMedia component="img" height="200"
                image={it.img || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={it.name}/>
              <CardContent><Typography variant="h6">{it.name}</Typography></CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
