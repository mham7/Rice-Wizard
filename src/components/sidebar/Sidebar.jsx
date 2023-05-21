import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CommentIcon from '@mui/icons-material/Comment';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PestControlOutlinedIcon from '@mui/icons-material/PestControlOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Rice Wizard Admin</span>
        </Link>
      </div>
      <hr />
      <div className="down">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">DATA</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/community" style={{ textDecoration: "none" }}>
            <li>
              <PeopleOutlinedIcon className="icon" />
              <span>Community</span>
            </li>
          </Link>
          <Link to="/tips" style={{ textDecoration: "none" }}>
          <li>
            <AgricultureOutlinedIcon className="icon" />
            <span>Cultivation Tips</span>
          </li>
          </Link>
          <Link to="/pests" style={{ textDecoration: "none" }}>
          <li>
            <PestControlOutlinedIcon className="icon" />
            <span>Pests and Disease</span>
          </li>
          </Link>
          <Link to="/blogs" style={{ textDecoration: "none" }}>
          <li>
            <ArticleOutlinedIcon className="icon" />
            <span>Blogs</span>
          </li>
          </Link>
          <Link to="/comments" style={{ textDecoration: "none" }}>
          <li>
            <CommentIcon className="icon" />
            <span>Comments</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/login"style={{textDecoration: "none"}}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
