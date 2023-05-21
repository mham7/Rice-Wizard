import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import BlogTable from "../../components/datatable/BlogTable"
import { useState } from "react"

const BlogList = () => {
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
        <BlogTable searchQuery={searchQuery}/>
      </div>
    </div>
  )
}

export default BlogList