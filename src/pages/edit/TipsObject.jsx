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

const TipsObject = () => {
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
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const stref = storageRef(storage, 'pestdieseases/forums/'+ file.name);
    uploadBytes(stref, file).then((snapshot) => {
      console.log("Image uploaded successfully");
      getDownloadURL(stref).then((url) => {
        console.log("Image URL: ", url);
        setImgURL(url);});
    })
  };



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
    event.preventDefault();
  
    // Update the "forumTitle" field in the "comm" object
   // const updatedComm = { ...comm, forumTitle };
  
    // Get a reference to the user's data in the database
    setTitle(forumCategory);
    const database = getDatabase();
    const userRef = ref(database, `pestdieseases/${id}/${forumID}`);
  
    update(userRef, {
        forumTitle,forumCategory,Symptoms,imgURL,'Presentive Measure': preven,
        'What caused it?': causes,
      }).then(() => {
        console.log("User updated successfully");
        window.alert("User updated successfully"); 
      }).catch((error) => {
        console.log("Error updating user: ", error);
        window.alert("Error Updating Data"); 
    });

      // Update the "Other Info" field outside of the userRef
      const otherInfoRef = ref(database, `pestdieseases/${id}`);
      update(otherInfoRef, { 'title':forumCategory });
  };
  


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Container maxWidth="md">
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant="h6" style={{ marginTop: '10px' }}>Update Pest & Disease Data</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Disease Category"
          variant="outlined"
          fullWidth
          value={forumTitle}
          onChange={(e) => setForumTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Disease Name"
          variant="outlined"
          fullWidth
          value={forumCategory}
          onChange={(e) => setForumCategory(e.target.value)}
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
      onChange={(e) => setSymptoms(e.target.value)}
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
      onChange={(e) => setCauses(e.target.value)}
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
      onChange={(e) => setPreven(e.target.value)}
      style={{ marginTop: 5, width: 400 }}
      />
      </Grid>
      <Grid item xs={12} md={5}>
      <Typography variant="subtitle1">Picture</Typography>
      <input type="file"  onChange={handleImageUpload}/>
      <br />
      {imgURL && (
        <img src={imgURL} alt="" style={{  marginTop: 3,maxWidth: "70%" }} />
      ) }
    </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
      <IconButton aria-label="delete" size="large" onClick={handleSubmit}>
         <SaveAsIcon fontSize="large" style={{ color: '	#00A36C' }} />
          </IconButton>
      </Grid>
    </Grid>
  </Container>
      </div>
    </div>
  );
};

export default TipsObject;
