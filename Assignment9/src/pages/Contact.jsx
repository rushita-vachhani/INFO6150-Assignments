import * as React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import PrimaryButton from "../components/PrimaryButton.jsx";
import heroImg from "../assets/image2.jpg";

export default function Contact() {
  return (
    <>
      {/* Title */}
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
        CONTACT
      </Typography>

      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            overflow: "hidden",
            width: "100%",
            maxWidth: "1100px", 
          }}
        >
          {/* Left: Image */}
          <Box
            component="img"
            src={heroImg}
            alt="Contact illustration"
            sx={{
              width: { xs: "100%", md: "55%" },
              height: { xs: 240, md: "auto" },
              objectFit: "contain", 
              bgcolor: "#ffffff",
              p: 2, 
            }}
          />

          {/* Right: Form */}
          <CardContent
            sx={{
              flex: 1,
              p: { xs: 3, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "#fafafa",
            }}
          >
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              Get in Touch
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Have questions about JobBest, jobs, or companies? Reach out and our
              team will respond as soon as possible.
            </Typography>

            <Stack spacing={2}>
              <TextField label="Your Name" fullWidth />
              <TextField label="Your Email" type="email" fullWidth />
              <TextField label="Subject" fullWidth />
              <TextField label="Message" fullWidth multiline rows={4} />
              <PrimaryButton
                type="submit"
                sx={{ alignSelf: "flex-start", px: 4 }}
              >
                SEND
              </PrimaryButton>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
