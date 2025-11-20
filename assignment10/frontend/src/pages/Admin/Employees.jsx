import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

export default function Employees() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <Paper sx={{ p: 3 }}>
      <h2>All Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((u, idx) => (
            <TableRow key={idx}>
              <TableCell>{u.fullName}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
