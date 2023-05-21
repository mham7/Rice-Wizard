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
import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Delete } from "@mui/icons-material";
import {remove} from "../../firebase"

const BlogDelete = () => {
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [linkURL, setLinkURL] = useState("");
  const [blog, setBlog] = useState({});
  const id = window.location.href.split("/").pop(); // get the last part of the URL
  console.log(id);
  
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "blogs");
  
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
      setBlog(user);
      setTitle(user?.title||"");
      setDateTime(user?.dateTime|| "");
      setLinkURL(user?.linkURL|| "");
    });
  }, [id]);
  
  console.log(blog);

  const handleSubmit = (event) => {
    const database = getDatabase();
    const userRef = ref(database, `blogs/${id}`);
    
    if (window.confirm('Are you sure you want to delete this blog?')) {
      remove(userRef)
        .then(() => {
          window.alert('Blog deleted successfully');
        })
        .catch((error) => {
          window.alert('Unable to delete Blog');
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
        <Typography variant="h6" style={{ marginTop: '10px' }}>Update Blogs Data</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          fullWidth
          type="date"
          value={dateTime}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Link URL"
          variant="outlined"
          fullWidth
          value={linkURL}
        />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
      <IconButton aria-label="delete" size="large" onClick={handleSubmit}>
         <Delete fontSize="large" style={{color:'	#DE3163'}}/>
          </IconButton>
      </Grid>
    </Grid>
  </Container>
      </div>
    </div>
  );
};

export default BlogDelete;
