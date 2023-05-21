import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove} from "../../firebase";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: 'images',
    headerName: 'Image',
    width: 90,
    renderCell: (params) => (
      <img src={params.value} style={{ maxWidth: '100%', maxHeight: '100%' }} />
    ),
  },
  
  
  {
    field: "question",
    headerName: "Question",
    width: 230,
  },

  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "postID",
    headerName: "Post ID",
    width: 90,
    
    },
    {
      field: "uid",
      headerName: "User's ID",
      width: 90,
      
      },
      {
        field: "date",
        headerName: "Date",
        width: 160,
        
        },
];

const Comtable = ({ searchQuery }) => {
 
  const [data, setData] = useState([]);


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
      setData(users);
      {{console.log(users)}}
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
            <Link to={`/community/${params.row.id}`} style={{ textDecoration: 'none' }}>
               <div className="deleteButton">Delete</div>
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
        Community Data
  
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

export default Comtable;
