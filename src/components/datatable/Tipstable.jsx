import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove,get} from "../../firebase";
const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 100 },
    { field: "titleID", headerName: "Title ID", width: 100 },
    { field: "Presentive Measure", headerName: "Preventive Measure", width: 300 },
    { field: "Symptoms", headerName: "Symptoms", width: 250 },
    { field: "What caused it?", headerName: "Causes", width: 300 },
    { field: "forumTitle", headerName: "Forum Title", width: 100 },
    { field: "forumCategory", headerName: "Forum Category", width: 150 },
    {
      field: "imgURL",
      headerName: "Image",
      width: 90,
      renderCell: (params) => (
        <img src={params.value} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      ),
    },
  ];
  
  

const Tipstable = ({ searchQuery }) => {
 
  const [data, setData] = useState([]);
  const[row,SetRow]=useState("");
 
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "pestdieseases");
  
    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        
        const user = Object.values(childSnapshot.val())[0];
        user.id = childSnapshot.key;
        user.title = childSnapshot.val().title;
        
        users.push(user);
      });
      setData(users);
      console.log(users.forumID);
    });
      
    
  }, []);

  
  
  
  
  const handleDelete = (id) => {
    const database = getDatabase();
    const userRef = ref(database, `community/${id}`);
    // Remove the user from the Realtime Database
    remove(userRef);
    
    // Remove the user from the `data` state
    setData(data.filter((user) => user.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/pests/${params.row.id}`} style={{ textDecoration: 'none' }}>
               <div className="EditButton">Update</div>
               </Link>
               <Link to={`/pests/delete/${params.row.id}`} style={{ textDecoration: 'none' }}>
            <div className="deleteButton">
              Delete
            </div>
            </Link>
          </div>
        );
      },
    },
  ];

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
  

  return (
    
    <div className="datatable">
      <div className="datatableTitle">
        Pest & Disease Data
        <Link to="/pests/new" className="link">
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

export default Tipstable;
