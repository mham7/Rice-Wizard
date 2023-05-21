import React, { useState } from "react";
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar
          searchQuery={searchQuery}
          handleSearchInputChange={handleSearchInputChange}
        />
        <Datatable searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default List;