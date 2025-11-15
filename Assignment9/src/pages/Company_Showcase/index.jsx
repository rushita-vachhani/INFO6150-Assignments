import * as React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";


import { useAuth } from '../../state/AuthContext.jsx';
import { BASE_URL } from '../../services/api.js';
import appleImg from '../../assets/apple.png';
import googleImg from '../../assets/google.png';
import metaImg from '../../assets/meta.png';
import jpmorganImg from '../../assets/jp.png';
import tcsImg from '../../assets/tcs.png';

const MOCK_COMPANIES = [
  {
    id: "apple",
    name: "Apple",
    img: appleImg,
  },
  {
    id: "google",
    name: "Google",
    img: googleImg,
  },
  {
    id: "meta",
    name: "Meta",
    img: metaImg,
  },
  {
    id: "jpmorgan",
    name: "J.P. Morgan",
    img: jpmorganImg,
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    img: tcsImg,
  },
];

export default function Companies() {
  const { api } = useAuth();
  const [companies, setCompanies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    api
      .get("/user/getAll")
      .then((res) => {
        if (!mounted) return;
        const users = res.data?.users || [];

        // Map API data to company cards
        const mapped = users.map((u, idx) => {
          const image =
            u.imagePath && u.imagePath.length
              ? u.imagePath.startsWith("http")
                ? u.imagePath
                : `${BASE_URL}${u.imagePath.startsWith("/") ? "" : "/"}${u.imagePath}`
              : appleImg;

          return {
            id: u.email || `company-${idx}`,
            name: u.fullName || "Unnamed Company",
            img: image,
          };
        });

        setCompanies([...MOCK_COMPANIES, ...mapped]);
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [api]);

  return (
    <>
      {/* Page title */}
      <Typography
        variant="h3"
        fontWeight={800}
        sx={{
          textAlign: "center",
          mb: { xs: 6, md: 4 },
          mt: { xs: 2, md: 4 },
        }}
        gutterBottom
      >
        COMPANY SHOWCASE
      </Typography>

      <Container maxWidth="lg" sx={{ px: 0 }}>
        {/* Loading skeleton */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : companies.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
            <Typography>No companies available yet.</Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
          >
            {companies.map((company) => (
              <Grid
                item
                xs={12} sm={6} md={4}
                key={company.id}
              >
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={company.img}
                    alt={company.name}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                      bgcolor: "#fff",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#004d40" }}
                    >
                      {company.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Building the future together.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
