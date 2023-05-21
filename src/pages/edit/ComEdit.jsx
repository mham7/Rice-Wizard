import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue,update} from "../../firebase";
import { TextField } from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {Grid} from "@mui/material";
import {Container} from "@mui/material";
import { storage } from "../../firebase";
import { storageRef } from "../../firebase";
import { uploadBytes,getDownloadURL } from "../../firebase";
import { remove } from "../../firebase";
import { Delete } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

const Edit = () => {
  const [question, setQuestion] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState(null);
  const [uid,SetUID]=useState("");
  const [comm, setComm] = useState({});
  const id = window.location.href.split("/").pop(); // get the last part of the URL
  console.log(uid);
 

  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "community");
  
    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        user.id = childSnapshot.key;
        users.push(user);
      });
  
      // Find the user with the matching id
      const comm = users.find((user) => user.id === id);
      setComm(comm);
      setQuestion(comm?.question||"");
      setDate(comm?.date|| "");
      setImages(comm?.images|| "");
      SetUID(comm?.uid||"" );
  
    });
  }, [id]);
  
  console.log(comm);


 
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the community data?");
  if (confirmDelete) {
    const database = getDatabase();
    const userRef = ref(database, `community/${id}`);
    
    // Remove the user from the Realtime Database
    remove(userRef)
      .then(() => {
        // Remove the user from the `comm` state
        setComm({});
        window.alert("Community data deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        window.alert("An error occurred while deleting the community data.");
      });
  } else {
    // Cancelled deletion
    window.alert("Deletion cancelled.");
  }
    
    // Remove the user from the `data` state
    setComm(comm.filter((comm) => comm.id !== id));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Container maxWidth="md">
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant="h6" style={{ marginTop: '10px' }}>Delete Community Data</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Question"
          variant="outlined"
          fullWidth
          value={question}          
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          value={date}
          
        />
      </Grid>
      <Grid item xs={12} md={5}>
      <br />
      {images && (
        <img src={images} alt="" style={{ maxWidth: "70%" }} />
      ) }
    </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
      <IconButton aria-label="delete" size="large" onClick={handleDelete}>
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
