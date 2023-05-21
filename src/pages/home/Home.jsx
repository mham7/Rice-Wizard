import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="ans" />
          <Widget type="tips" />
          <Widget type="pests" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
