import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { Typography } from "@mui/joy";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7oJLxqCLJWkTuiYZ_zX7KQKrzjQpI0mU",
  authDomain: "habeshascore.firebaseapp.com",
  projectId: "habeshascore",
  storageBucket: "habeshascore.appspot.com",
  messagingSenderId: "696160739269",
  appId: "1:696160739269:web:f00b910748bcdfa69375ac",
  measurementId: "G-XB3JTXWEVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
      console.log(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <Box padding={6}>
      <Typography >Users</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Club</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>{user.club ? user.club : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default UsersTable;
