import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove} from "../../firebase";

const userColumns = [
  { field: "id", headerName: "ID", width: 160 },
  
    {
      field: "title",
      headerName: "Title",
      width: 160,
      
      },

      {
        field: "dateTime",
        headerName: "Date",
        width: 160,
        
        },
        {
            field: "linkURL",
            headerName: "Link URL",
            width: 160,
            renderCell: (params) => {
              const handleLinkClick = () => {
                window.location.href = params.value;
              };
          
              return (
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={handleLinkClick}
                >
                  {params.value}
                </span>
              );
            },
          }
          
];

const BlogTable = ({ searchQuery }) => {
 
  const [data, setData] = useState([]);


  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "blogs");
  
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
    const userRef = ref(database, `blogs/${id}`);
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
            <Link to={`/blogs/${params.row.id}`} style={{ textDecoration: 'none' }}>
               <div className="EditButton">Update</div>
               </Link>
            <Link to={`/blogs/delete/${params.row.id}`} style={{ textDecoration: 'none' }}>
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
        Blogs Data
        <Link to="/blogs/new" className="link">
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

export default BlogTable;
