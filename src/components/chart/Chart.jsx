import "./chart.scss";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue ,remove} from "../../firebase";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Chart = ({ aspect, title }) => {

  const [userCount, setUserCount] = useState(0);
const [commCount,setCommCount]=useState(0);
const [tipsCount,setTipsCount]=useState(0);
const [pestsCount,setPestsCount]=useState(0);
const[ansCount, setAnsCount]=useState(0);
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
  const usersRef = ref(database, "blogs");

  // Listen for changes in the users data
  onValue(usersRef, (snapshot) => {
    const users = snapshot.val();
    const count = Object.keys(users).length;
    setPestsCount(count);
  });
}, []);


useEffect(() => {
  const database = getDatabase();
  const usersRef = ref(database, "answers");

  // Listen for changes in the users data
  onValue(usersRef, (snapshot) => {
    const users = snapshot.val();
    const count = Object.keys(users).length;
    setAnsCount(count);
  });
}, []);

const data = [
  { name: "Users", Total: userCount },
  { name: "Tips", Total: tipsCount },
  { name: "Posts", Total: commCount },
  { name: "Blogs", Total: pestsCount },
  { name: "Answers", Total: ansCount },
];
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#478778" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#478778" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
