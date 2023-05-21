import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove} from "../../firebase";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "phonenumber",
    headerName: "Phonenumber",
    width: 160,
  },
  {
    field: "password",
    headerName: "Password",
    width: 160,
  },
];

const Datatable = ({ searchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "users");

    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        user.id = childSnapshot.key;
        users.push(user);
      });
      setData(users);
    });
  }, []);

  const handleDelete = (id) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${id}`);
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
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: 'none' }}>
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
        User's Data
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

export default Datatable;
