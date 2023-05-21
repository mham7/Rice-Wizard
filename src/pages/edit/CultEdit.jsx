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

const CultEdit = () => {
  const[name,setName]=useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [Title, setTitle] = useState("");
  const [categoryID,SetCategoryID]= useState("");
  const [imgURL, setImgURL] = useState(null);
  const [image, setImage] = useState(null);
  const [uid,SetUID]=useState("");
  const [forumID,setforumID]=useState("");
  const [comm, setComm] = useState({});
  const[titleID,SetTitleID]=useState([]);
  const id = window.location.href.split("/").pop(); // get the last part of the URL
  console.log(uid);
  
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


  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "cultivationtips");
  
    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
          const user = Object.values(childSnapshot.val())[0];
          for (let key in user) {
            if (typeof user[key] === 'object') {
              const nestedData = {};
              for (let nestedKey in user[key]) {
                nestedData[nestedKey] = user[key][nestedKey];
              }
              user.heading = nestedData.heading;
              user.forumID=nestedData.forumID;
              user.description=nestedData.description;
              user.image=nestedData.imgURL;
            }
          }
          user.id = childSnapshot.key;
          user.name = childSnapshot.val().name;
          user.imgURL = childSnapshot.val().imgURL;
          console.log(user.titleID);
          users.push(user);
        });
  
      // Find the user with the matching id
      const comm = users.find((user) => user.id === id);
      setComm(comm);
      setName(comm?.name||"");
      setHeading(comm?.heading||"");
      setTitle(comm?.title|| "");
      SetTitleID(comm?.titleID || "");
      setDescription(comm?.description|| "");
      setImgURL(comm?.imgURL|| "");
      setImage(comm?.image|| "");
      SetCategoryID(comm?.categoryID || "");
      setforumID(comm?.forumID||"");
      //console.log(comm);
    });
  }, [id]);

  console.log(forumID);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Update the "forumTitle" field in the "comm" object
   // const updatedComm = { ...comm, forumTitle };

    // Get a reference to the user's data in the database
    const database = getDatabase();
    const userRef = ref(database, `cultivationtips/${id}/${titleID}`);
  
    update(userRef, {
        'title': Title,
      }).then(() => {
        console.log("User updated successfully");
        window.alert("User updated successfully"); 
      }).catch((error) => {
        console.log("Error updating user: ", error);
        window.alert("Error Updating Data"); 
    });

      // Update the "Other Info" field outside of the userRef
      const otherInfoRef = ref(database, `cultivationtips/${id}`);
      update(otherInfoRef, {name,imgURL });
      const cultRef = ref(database, `cultivationtips/${id}/${titleID}/${forumID}`);
      update(cultRef, {'category':name,'description':description,heading,'imgURL':image, });
  };
  


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Container maxWidth="md">
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant="h6" style={{ marginTop: '10px' }}>Update Cultivation Tips</Typography>
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
         <SaveAsIcon fontSize="large"   style={{ color: '	#00A36C' }}/>
          </IconButton>
      </Grid>
    </Grid>
  </Container>
      </div>
    </div>
  );
};

export default CultEdit;
