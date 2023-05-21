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
import { push } from "../../firebase";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { uploadBytes,getDownloadURL } from "../../firebase";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
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
  const [titleID,settitleID]=useState("");
  const [forumID,setforumID]=useState("");
  const [comm, setComm] = useState({});
  const id = window.location.href.split("/").pop(); // get the last part of the URL
  console.log(uid);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000000); 
    const stref = storageRef(storage, 'pestdieseases/forums/'+ uniqueFilename);
    uploadBytes(stref, file).then((snapshot) => {
      console.log("Image uploaded successfully");
      getDownloadURL(stref).then((url) => {
        console.log("Image URL: ", url);
        setImgURL(url);});
    })
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  
    // create a new object to store form data
    const pestData = {
      title: forumCategory,
    };

    
  
    const db = getDatabase();
    const newPestRef = push(ref(db, "pestdieseases"), pestData);
    const newPestId = newPestRef.key;
    setTitle("");
    // Update the newly created child node with the titleID field
    update(ref(db, `pestdieseases/${newPestId}`), { titleID: newPestId });

      const objData = {
        Symptoms: Symptoms,
        "Presentive Measure": preven, 
        forumCategory: forumCategory,
        titleID: newPestId,
        "What caused it?":causes,
        forumTitle:forumTitle,
        imgURL:imgURL,
      };

      const newforumref =push(ref(db, `pestdieseases/${newPestId}`), objData);
      const newforumId = newforumref.key;
      setForumCategory("");
      setSymptoms("");
      setImgURL("");
      setCauses("");
      setForumTitle("");
      setPreven("");
      update(ref(db, `pestdieseases/${newPestId}/${newforumId}`), { forumID: newforumId })
      .then(() => {
        console.log("Data was written to Firebase!");
        window.alert("New Pest Disease Created Successfully"); 
        // reset form fields
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
      <Grid item xs={12} >
        <Typography variant="h6" style={{ marginTop: '10px' }}>Add Pest & Disease Data</Typography>
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
      multiline="true"
      variant="outlined"
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
      multiline="true"
      variant="outlined"
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
      multiline="true"
      variant="outlined"
      placeholder=""
      value={preven}
      onChange={(e) => setPreven(e.target.value)}
      style={{ marginTop: 5, width: 400, height:150 }}
      />
      </Grid>
      <Grid item xs={12} md={5}>
      <Typography variant="subtitle1">Picture</Typography>
      <input type="file"  onChange={handleImageUpload}/>
      <br />
      {imgURL && (
        <img src={imgURL} alt="" style={{  marginTop: 5,maxWidth: "70%" }} />
      ) }
    </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
      <IconButton aria-label="delete" size="large" onClick={handleSubmit}>
         <AddCircleOutlineIcon fontSize="large" style={{ color: '#6495ED' }}  />
          </IconButton>
      </Grid>
    </Grid>
  </Container>
      </div>
    </div>
  );
};

export default TipsObject;
