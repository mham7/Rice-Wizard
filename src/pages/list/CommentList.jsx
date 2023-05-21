import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import CommentTable from "../../components/datatable/CommentTable"
import { useState } from "react"

const CommentList = () => {
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
         handleSearchInputChange={handleSearchInputChange}
        />
        <CommentTable searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default CommentList