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

const TipsDelete = () => {
  const[Title,setTitle]=useState("");
  const [Symptoms, setSymptoms] = useState("");
  const [forumTitle, setForumTitle] = useState("");
  const [causes, setCauses] = useState("");
  const [preven, setPreven] = useState("");
  const [forumCategory, setForumCategory] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [uid,SetUID]=useState("");
  const [forumID,setforumID]=useState("");
  const [comm, setComm] = useState({});
  const id = window.location.href.split("/").pop(); // get the last part of the URL
  console.log(uid);
  
 



  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "pestdieseases");
  
    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const user = Object.values(childSnapshot.val())[0];
        user.id = childSnapshot.key;
        
        SetUID(user.id);
        users.push(user);
      });
  
      // Find the user with the matching id
      const comm = users.find((user) => user.id === id);
      setComm(comm);
      setSymptoms(comm?.Symptoms||"");
      setForumTitle(comm?.forumTitle|| "");
      setforumID(comm?.forumID|| "");
      setImgURL(comm?.imgURL|| "");
      setPreven(comm ? comm['Presentive Measure'] || "" : "");
      setCauses(comm ? comm['What caused it?'] || "" : "");
      setForumCategory(comm?.forumCategory || "");

    
  
    });
  }, [id]);
  
  console.log(comm);


  const handleSubmit = (event) => {
    const database = getDatabase();
    const userRef = ref(database, `pestdieseases/${id}`);
    
    if (window.confirm('Are you sure you want to delete this Disease?')) {
      remove(userRef)
        .then(() => {
          window.alert('Disease deleted successfully');
        })
        .catch((error) => {
          window.alert('Unable to delete Disease');
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
        <Typography variant="h6" style={{ marginTop: '10px' }}>Delete Pest & Disease Data</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Disease Category"
          variant="outlined"
          fullWidth
          value={forumTitle}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Disease Name"
          variant="outlined"
          fullWidth
          value={forumCategory}
        />
      </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="subtitle1">Symptoms</Typography>
      <TextareaAutosize
      label="Symptoms"
      multiline
      variant="outlined"
      fullWidth
      placeholder=""
      value={Symptoms}
      style={{  marginTop: 5,width: 400, height:150 }}
      />
      </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="subtitle1">Causes</Typography>
      <TextareaAutosize
      label="Causes"
      multiline
      variant="outlined"
      fullWidth
      placeholder=""
      value={causes}
      style={{  marginTop: 5,width: 400, height:150 }}
      />
      </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="subtitle1">Preventive Measures</Typography>
      <TextareaAutosize
      label="Preventive Measures"
      multiline
      variant="outlined"
      fullWidth
      placeholder=""
      value={preven}
      style={{ marginTop: 5, width: 400 }}
      />
      </Grid>
      <Grid item xs={12} md={5}>
      <Typography variant="subtitle1">Picture</Typography>
      <br />
      {imgURL && (
        <img src={imgURL} alt="" style={{  marginTop: 3,maxWidth: "70%" }} />
      ) }
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

export default TipsDelete;
