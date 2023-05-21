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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Delete } from "@mui/icons-material";
import {remove} from "../../firebase"

const CommentDelete = () => {
    const [username, setUserName] = useState("");
    const [date, setDate] = useState("");
    const [comment, setComment] = useState("");
  const [ans, setAns] = useState({});
  const id = window.location.href.split("/").pop(); // get the last part of the URL
  console.log(id);
  
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "answers");

    onValue(usersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const tableData = childSnapshot.val();
        Object.keys(tableData).forEach((tableKey) => {
          const userData = tableData[tableKey];
          userData.id = tableKey;
          users.push(userData);
        });
      });

      setAns(users);

      const foundUser = users.find((user) => user.commentID === id);
      if (foundUser) {
        setUserName(foundUser.username);
        setComment(foundUser.comment);
      }
    });
  }, [id]);
  

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
  
    if (confirmDelete) {
      const database = getDatabase();
      const usersRef = ref(database, "answers");
  
      onValue(usersRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const tableData = childSnapshot.val();
          const tableId = childSnapshot.key;
  
          if (tableData.hasOwnProperty(id)) {
            const objectRef = ref(database, `answers/${tableId}/${id}`);
  
            // Remove the object from the Realtime Database
            remove(objectRef);
  
            // Remove the object from the `data` state
            setAns((prevData) => prevData.filter((user) => user.id !== id));
            setUserName("");
            setDate("");
            setComment("");
  
            // Break the loop since we found the matching table key
            return true;
          }
        });
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
        <Typography variant="h6" style={{ marginTop: '10px' }}>Delete Comments</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          value={username}
        />
      </Grid>
      <Grid item xs={12} md={6}>
    </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="subtitle1">Comment</Typography>
      <TextareaAutosize
      label="Comment"
      multiline
      variant="outlined"
      fullWidth
      placeholder=""
      value={comment}
      style={{ marginTop: 5, width: 400 , fontSize:18}}
      />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
      <IconButton aria-label="delete" size="large" onClick={handleDelete}>
         <Delete fontSize="large" style={{color:'	#DE3163'}}/>
          </IconButton>
      </Grid>
    </Grid>
  </Container>
      </div>
    </div>
  );
};

export default CommentDelete;
