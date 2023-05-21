import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Edit from "./pages/edit/Edit";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import ComList from "./pages/list/ComList";
import ComEdit from "./pages/edit/ComEdit"
import TipsList from "./pages/list/TipsList"
import BlogEdit from "./pages/edit/BlogEdit";
import TipsEdit from "./pages/edit/TipsEdit";
import TipsObject from "./pages/edit/TipsObject";
import CultList from "./pages/list/CultList";
import CultEdit from "./pages/edit/CultEdit";
import CultObject from "./pages/edit/CultObject";
import BlogList from "./pages/list/BlogList";
import BlogObject from "./pages/edit/BlogObject"
import CommentList from "./pages/list/CommentList"
import Profile from "./pages/profile/Profile";
import TipsDelete from "./pages/edit/TipsDelete";
import CultDelete from "./pages/edit/CultDelete";
import BlogDelete from "./pages/edit/BlogDelete";
import CommentDelete from "./pages/edit/CommentDelete";

function App() {
  
  const {currentUser}=useContext(AuthContext);
  const RequiredAuth=({children})=>{
    return currentUser ? (children) : <Navigate to ="/login"/>

  }
  
  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login/>} />
            <Route index element={<RequiredAuth><Home /></RequiredAuth>} />
            <Route path="users">
              <Route index element={<RequiredAuth><List /></RequiredAuth>} />
              <Route path=":userID" element={<RequiredAuth><Edit/></RequiredAuth>} />
              <Route
                path="new"
                element={<RequiredAuth><New title="Add New User" /></RequiredAuth>}
              />
            </Route>
            <Route path="community">
              <Route index element={<RequiredAuth><ComList/></RequiredAuth>} />
              <Route path=":comID" element={<RequiredAuth><ComEdit/></RequiredAuth>} />
            </Route>
            <Route path="pests">
              <Route index element={<RequiredAuth><TipsList/></RequiredAuth>} />
              <Route path=":pestsID" element={<RequiredAuth><TipsObject/></RequiredAuth>} />
              <Route
                path="new"
                element={<RequiredAuth><TipsEdit title="Add New Pests" /></RequiredAuth>}
              />
               <Route path="delete/:deleteID" element={<RequiredAuth><TipsDelete/></RequiredAuth>} />
            </Route>
            <Route path="tips">
              <Route index element={<RequiredAuth><CultList/></RequiredAuth>} />
              <Route path=":tipsID" element={<RequiredAuth><CultEdit/></RequiredAuth>} />
              <Route
                path="new"
                element={<RequiredAuth><CultObject title="Add New Cultivation Tips" /></RequiredAuth>}
              />
               <Route path="delete/:deleteID" element={<RequiredAuth><CultDelete/></RequiredAuth>} />
            </Route>
            <Route path="blogs">
              <Route index element={<RequiredAuth><BlogList/></RequiredAuth>} />
              <Route path=":BlogID" element={<RequiredAuth><BlogEdit/></RequiredAuth>} />
              <Route
                path="new"
                element={<RequiredAuth><BlogObject title="Add New Blogs" /></RequiredAuth>}
              />
              <Route path="delete/:deleteID" element={<RequiredAuth><BlogDelete/></RequiredAuth>} />
            </Route>

            <Route path="comments">
              <Route index element={<RequiredAuth><CommentList/></RequiredAuth>} />
              <Route path=":commentID" element={<RequiredAuth><CommentDelete/></RequiredAuth>} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
