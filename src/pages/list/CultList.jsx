import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import CultTable from "../../components/datatable/CultTable"
import { useState } from "react"

const CultList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}/>
        <CultTable searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}

export default CultList