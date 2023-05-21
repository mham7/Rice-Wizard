import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove} from "../../firebase";

const Featured = () => {
  const [predCount, setPredCount] = useState(0);
  const [ammount,SetAmmount]=useState(0);
  useEffect(() => {
    const database = getDatabase();
    const usersRef = ref(database, "predictionHistory");
  
    // Listen for changes in the history data
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const count = Object.keys(users).length;
      setPredCount(count);
      const milestone=(count/100)*100;
      SetAmmount(milestone);
    });
  }, []);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Predictions done by users</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
        <CircularProgressbar
          value={ammount}
          text={ammount +'%'}
          strokeWidth={5}
          styles={{
            path: {
              stroke: 'green',
            },
            text: {
              fill: 'green',
              fontSize: '20px',
            },
          }}
        />
        </div>
        <p className="title">Total amount of sucessful predictions done by users. Note first milestone is 100</p>
        <p className="amount">{predCount}</p>
        <p className="desc">
          Predictions are done by users, admin cannot view or interfere with that data
        </p>
          </div>
          </div>
    
  );
};

export default Featured;
