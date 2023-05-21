import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue,update } from "../../firebase";
import { useParams , useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import {Typography} from "@mui/material";
import {Box} from "@mui/material";
import {Button} from "@mui/material";
import {Grid} from "@mui/material";
import {Container} from "@mui/material";
import {remove} from "../../firebase"
import { Delete } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState({});
  const id = window.location.href.split("/").pop(); // get the last part of the URL
  console.log(id);
  
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "users");
  
    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        user.id = childSnapshot.key;
        users.push(user);
      });
  
      // Find the user with the matching id
      const user = users.find((user) => user.id === id);
      setUser(user);
      setName(user?.name||"");
      setEmail(user?.email|| "");
      setPassword(user?.password|| "");
      setPhoneNumber(user?.phonenumber|| "");
    });
  }, [id]);
  
  console.log(user);


  const handleSubmit = (event) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${id}`);
    
    if (window.confirm('Are you sure you want to delete this user?')) {
      remove(userRef)
        .then(() => {
          window.alert('User deleted successfully');
        })
        .catch((error) => {
          window.alert('Unable to delete user');
          console.error(error);
        });
    }
  };
  
  


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Container maxWidth="md">
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant="h6" style={{ marginTop: '10px' }}>Delete User's Data</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            readOnly: true,
          }}
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
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
      <IconButton aria-label="delete" size="large" onClick={handleSubmit}>
         <Delete fontSize="large" style={{color:'	#DE3163'}} />
          </IconButton>
      </Grid>
    </Grid>
  </Container>
      </div>
    </div>
  );
};

export default Edit;
