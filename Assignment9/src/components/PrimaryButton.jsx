
import { Button } from "@mui/material";
export default function PrimaryButton(props) {
  return (
    <Button
      variant="contained"
      sx={{
        textTransform: "none",
        borderRadius: 2,
        bgcolor: "#004d40",
        "&:hover": { bgcolor: "#53b5a4ff" },
      }}
      {...props}
    />
  );
}
