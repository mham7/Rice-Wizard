import "./edit.scss";
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
import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const BlogObject = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [linkURL, setLinkURL] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    // create a new object to store form data
    const BlogData = {
      title: title,
      dateTime: dateTime,
      linkURL: linkURL,
    };

    // write form data to Firebase
    const db = getDatabase();
    push(ref(db, "blogs"), BlogData)
      .then(() => {
        console.log("Data was written to Firebase!");
        window.alert("New Blog Created Sucessfully"); 
        // reset form fields
        setTitle("");
        setDateTime("");
        setLinkURL("");
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
            Add New Blogs
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Blog Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            type="date"
            fullWidth
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Link URL"
            variant="outlined"
            fullWidth
            value={linkURL}
            onChange={(e) => setLinkURL(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
        <IconButton aria-label="delete" size="large" onClick={handleSubmit}>
         <AddCircleOutlineIcon fontSize="large" style={{ color: '#6495ED' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  </div>
</div>

  );
};

export default BlogObject;
