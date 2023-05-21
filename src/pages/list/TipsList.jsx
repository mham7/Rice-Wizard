import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Tipstable from "../../components/datatable/Tipstable"
import { useState } from "react"

const   TipsList = () => {
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
        <Tipstable searchQuery={searchQuery}/>
      </div>
    </div>
  )
}

export default TipsList