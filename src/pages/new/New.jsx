import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { getDatabase, ref, push} from "../../firebase";
import { TextField } from "@mui/material";
import {Typography} from "@mui/material";
import {Box} from "@mui/material";
import {Button} from "@mui/material";
import {Grid} from "@mui/material";
import {Container} from "@mui/material";
const New = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // create a new object to store form data
    const userData = {
      name: name,
      email: email,
      password: password,
      phonenumber: phonenumber,
    };

    // write form data to Firebase
    const db = getDatabase();
    push(ref(db, "users"), userData)
      .then(() => {
        console.log("Data was written to Firebase!");
        window.alert("New User Created Sucessfully"); 
        // reset form fields
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
      })
      .catch((error) => {
        console.error("Error writing data to Firebase: ", error);
        window.alert("Error, couldn't complete transaction"); 
      });
  };

  return (
    <div className="new">
  <Sidebar />
  <div className="newContainer">
    <Navbar />
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Add New User
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            style={{ backgroundColor: '#50c878', color: '#ffffff' }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Container>
  </div>
</div>

  );
};

export default New;
