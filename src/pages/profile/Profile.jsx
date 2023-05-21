import "./Profile.scss";
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
import { adminUID } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { updatePassword } from "firebase/auth";
const Profile = () => {
  const uid=adminUID;
  const admin = JSON.parse(localStorage.getItem('user'));
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  
  useEffect(() => {
    // Retrieve email and password from local storage
    console.log(admin);
    const storedEmail = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');

    const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);

    const email = user.email;

    //console.log(email);
    setEmail(email);
    //console.log(email);
  }, []);

  const handleSubmit = async () => {

    try {
      // Sign in with the user's email and old password
      const credential = await signInWithEmailAndPassword(auth, email, password);

        // Proceed to update the password
        if (newpassword === repassword) {
            updatePassword(admin.user, newpassword)
             .then(() => {
                window.alert('Password updated successfully!');
             })
             .catch((error) => {
                 window.alert('Failed to update password:', error);});

        } else {
          // Passwords do not match, handle the error
          window.alert('Passwords do not match.');
        }
       
    } catch (error) {
      // Handle any errors that occur during the process
      window.alert('Incorrect old password.');
    }
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
            Edit Profile
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Old Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Reconfirm new Password"
            variant="outlined"
            fullWidth
            type="password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Grid>

        
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="contained"
            style={{ backgroundColor: '#50c878', color: '#ffffff' }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  </div>
</div>

  );
};

export default Profile;
