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
import { push } from "../../firebase";
import IconButton from '@mui/material/IconButton';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CultObject = () => {
  const[name,setName]=useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [Title, setTitle] = useState("");
  const [categoryID,SetCategoryID]= useState("");
  const [imgURL, setImgURL] = useState(null);
  const [image, setImage] = useState(null);
  const [forumID,setforumID]=useState("");
  const [comm, setComm] = useState({});
  const[titleID,SetTitleID]=useState([]);
  // get the last part of the URL
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const stref = storageRef(storage, 'CultivationTips/'+ file.name);
    uploadBytes(stref, file).then((snapshot) => {
      console.log("Image uploaded successfully");
      getDownloadURL(stref).then((url) => {
        console.log("Image URL: ", url);
        setImgURL(url);});
    })
  };

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    const stref = storageRef(storage, 'CultivationTips/forums/'+ file.name);
    uploadBytes(stref, file).then((snapshot) => {
      console.log("Image uploaded successfully");
      getDownloadURL(stref).then((url) => {
        console.log("Image URL: ", url);
        setImage(url);});
    })
  };


 

 
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // create a new object to store form data
    const cultData = {
      name,imgURL,
    };

    
  
    const db = getDatabase();
    const newCultRef = push(ref(db, "cultivationtips"), cultData);
    const newCultId = newCultRef.key;
    //setName("");
    setImgURL("");
    // Update the newly created child node with the titleID field
    update(ref(db, `cultivationtips/${newCultId}`), { categoryID: newCultId });
    
    const objData = {
        title:Title,
        categoryID:newCultId,  
      };

      const CatData = {
        category:name,
        title:Title,
        description:description,
        heading:heading,
        imgURL:image,

      };

      const newforumref =push(ref(db, `cultivationtips/${newCultId}`), objData);
      const newTitleId = newforumref.key;
      setTitle("");
      update(ref(db, `cultivationtips/${newCultId}/${newTitleId}`), { titleID: newTitleId });
    

      const newcatref =push(ref(db, `cultivationtips/${newCultId}/${newTitleId}`), CatData);
      const newcatId = newcatref.key;
      update(ref(db, `cultivationtips/${newCultId}/${newTitleId}/${newcatId}`), { titleID: newTitleId,categoryID:newCultId,forumID:newcatId })
      .then(() => {
        console.log("Data was written to Firebase!");
        window.alert("New Cultivation Tip Created Successfully"); 
        // reset form fields
        setImage("");
        setHeading("");
        setDescription("");
        setName("");
        setTitle("");
        
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
        <Typography variant="h6" style={{ marginTop: '10px' }}>Add Cultivation Tips</Typography>
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
          label="Title"
          variant="outlined"
          fullWidth
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Heading"
          variant="outlined"
          fullWidth
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
      <Typography variant="subtitle1">Title Image</Typography>
      <input type="file"  onChange={handleImageUpload}/>
      <br />
      {imgURL && (
        <img src={imgURL} alt="" style={{  marginTop: 5,maxWidth: "70%" }} />
      ) }
    </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="subtitle1">Description</Typography>
      <TextareaAutosize
      label="Description"
      multiline
      variant="outlined"
      fullWidth
      placeholder=""
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      style={{ marginTop: 5, width: 400, maxHeight: 200, overflowY: "auto" }}
      rowsMax={1000} 
      />
      </Grid>
      <Grid item xs={12} md={4}>
      <Typography variant="subtitle1">Content Image</Typography>
      <input type="file"  onChange={handleImgUpload}/>
      <br />
      {image && (
        <img src={image} alt="" style={{  marginTop: 5,maxWidth: "70%" }} />
      ) }
    </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
      <IconButton aria-label="delete" size="large" onClick={handleSubmit}>
         <AddCircleOutlineIcon fontSize="large"  style={{ color: '#6495ED' }}/>
          </IconButton>
      </Grid>
    </Grid>
  </Container>
      </div>
    </div>
  );
};

export default CultObject;
