import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import AddUser from "./pages/AddUser/AddUser";
import EditUser from "./pages/EditUser/EditUser";
BrowserRouter;

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/:id" element={<UserProfile />}></Route>
          <Route path="/add-user" element={<AddUser />}></Route>
          <Route path="/edit-user/:id" element={<EditUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
