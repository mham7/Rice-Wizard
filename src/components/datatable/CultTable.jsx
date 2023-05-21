import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove,get} from "../../firebase";
const userColumns = [
    { field: "categoryID", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "imgURL",
      headerName: "Title Image",
      width: 90,
      renderCell: (params) => (
        <img src={params.value} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      ),
    },
    { field: "description", headerName: "Description", width: 200 },
    { field: "heading", headerName: "Heading", width: 150 },
    {
      field: "image",
      headerName: "Content Image",
      width: 120,
      renderCell: (params) => (
        <img src={params.value} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      ),
    },
  ];
  
  

const CultTable = ({ searchQuery }) => {
 
  const [data, setData] = useState([]);
  const[titleID,SetTitleID]=useState([]);
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
            user.description=nestedData.description;
            user.image=nestedData.imgURL;
          }
        }
        user.id = childSnapshot.key;
        user.name = childSnapshot.val().name;
        user.imgURL = childSnapshot.val().imgURL;
        SetTitleID(user.titleID);
        users.push(user);
      });
      setData(users); 
    }); 
    //console.log(data);
  }, []);
  

  
  
  
  
  const handleDelete = (id) => {
    const database = getDatabase();
    const userRef = ref(database, `cultivationtips/${id}`);
    // Remove the user from the Realtime Database
    remove(userRef);
    
    // Remove the user from the `data` state
    setData(data.filter((user) => user.id !== id));
  };

  // Filter the data based on the search query
  const filteredData = data.filter((users) => {
    const values = Object.values(users);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/tips/${params.row.id}`} style={{ textDecoration: 'none' }}>
               <div className="EditButton">Update</div>
               </Link>
               <Link to={`/tips/delete/${params.row.id}`} style={{ textDecoration: 'none' }}>
            <div className="deleteButton">
              Delete
            </div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    
    <div className="datatable">
      <div className="datatableTitle">
        Cultivation Tips Data
        <Link to="/tips/new" className="link">
          Add New
        </Link>      
      </div>
      <DataGrid
     
        className="datagrid"
        rows={filteredData}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        
      />
    </div>
  );
};

export default CultTable;
