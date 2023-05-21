
import React, { useState } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ searchQuery, handleSearchInputChange }) => {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      navigate('/login');
    }
      };
  

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <FullscreenExitOutlinedIcon
              className="icon"
              onClick={toggleFullscreen}
            />
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" onClick={toggleDropdown} />
            {isDropdownVisible && (
              <div className="dropdown-menu">
              <ul>
                <li>
                  <LogoutIcon style={{ marginRight: '0.5rem' , verticalAlign: 'middle', color: 'green' }}/>
                    <span style={{ verticalAlign: 'middle' }} onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;