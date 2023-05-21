import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Comtable from "../../components/datatable/Comtable"
import { useState } from "react"
const ComList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar searchQuery={searchQuery}
          handleSearchInputChange={handleSearchInputChange}/>
        <Comtable searchQuery={searchQuery}/>
      </div>
    </div>
  )
}

export default ComList