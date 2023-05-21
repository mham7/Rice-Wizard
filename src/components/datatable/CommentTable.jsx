import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove,get} from "../../firebase";
const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "postID", headerName: "postID", width: 100 },
    { field: "commentID", headerName: "commentID", width: 100 },
    { field: "date", headerName: "date", width: 150 },
    { field: "uid", headerName: "User ID", width: 150 },
    { field: "comment", headerName: "comment", width: 200 },
    { field: "username", headerName: "User Name", width: 200 },
    
  ];
  
  

const CommentTable = ({ searchQuery }) => {
 
  const [data, setData] = useState([]);
  const[id,SetID]=useState([]);
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "answers");
    
    onValue(usersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const tableData = childSnapshot.val(); // Access the data within the table object
       // SetID(childSnapshot.key());
        Object.keys(tableData).forEach((tableKey) => {
          const userData = tableData[tableKey]; // Access the data within the user object
          userData.id = tableKey; // Assign the unique key as the user's id
          users.push(userData); // Add the user data to the users array
        });
      });
      setData(users);
      console.log(users); 
    });
  }, []);
  

  
 const handleDelete = (id) => {
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
        setData((prevData) => prevData.filter((user) => user.id !== id));
        
        // Break the loop since we found the matching table key
        return true;
      }
    });
  });
};
 
  
  
 
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
               <Link to={`/comments/${params.row.id}`} style={{ textDecoration: 'none' }}>
            <div
              className="deleteButton"
            >
              Delete
            </div>
            </Link>
          </div>
        );
      },
    },
  ];

  // Filter the data based on the search query
  const filteredData = data.filter((user) => {
    const values = Object.values(user);
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
        Comments Data   
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

export default CommentTable;
