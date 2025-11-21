import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";

export default function Employees() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",          // full width
          px: { xs: 1, md: 4 },   // horizontal padding for screens
        }}
        >

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #e0e0e0",
            bgcolor: "#fafafa",
            width: "100%",        
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            User Directory
          </Typography>

          {/* Loading State */}
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={50} sx={{ mb: 1 }} />
              ))}
            </>
          ) : (
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((u, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f0f7ff",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>

                    <TableCell>
                      <Chip
                        label={u.type === "admin" ? "Admin" : "Employee"}
                        color={u.type === "admin" ? "primary" : "success"}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>
    </>
  );
}
