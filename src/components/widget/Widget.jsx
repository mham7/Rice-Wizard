import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PeopleIcon from '@mui/icons-material/People';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove} from "../../firebase";
const Widget = ({ type }) => {
  let data;
  const [userCount, setUserCount] = useState(0);
  const [commCount,setCommCount]=useState(0);
  const [tipsCount,setTipsCount]=useState(0);
  const [pestsCount,setPestsCount]=useState(0);

  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "users");

    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const count = Object.keys(users).length;
      setUserCount(count);
    });
  }, []);

  
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "community");

    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const count = Object.keys(users).length;
      setCommCount(count);
    });
  }, []);
  
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "cultivationtips");

    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const count = Object.keys(users).length;
      setTipsCount(count);
    });
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "pestdieseases");

    // Listen for changes in the users data
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const count = Object.keys(users).length;
      setPestsCount(count);
    });
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: <a href="/users" style={{ textDecoration: 'none' }}>View all Users</a>,
        count:userCount,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green",
            }}
          />
        ),
      };
      break;
    case "ans":
      data = {
        title: "COMMUNITY",
        link: <a href="/community" style={{ textDecoration: 'none' }}>View all Community Posts</a>,
        count:commCount,
        icon: (
          <PeopleIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green",
            }}
          />
        ),
      };
      break;
    case "tips":
      data = {
        title: "CULTIVATION TIPS",
        link: <a href="/tips" style={{ textDecoration: 'none' }}>View all Cultivation Tips</a>,
        count:tipsCount,
        icon: (
          <TipsAndUpdatesIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "pests":
      data = {
        title: "PESTS AND DISEASE",
        link: <a href="/pests" style={{ textDecoration: 'none' }}>View all Pests & Diseases</a>,
        count:pestsCount,
        icon: (
          <CoronavirusIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
        {data.count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;