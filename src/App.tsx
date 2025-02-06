import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";

const Home = lazy(() => import("./pages/Home/Home"));
const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
const AddUser = lazy(() => import("./pages/AddUser/AddUser"));
const EditUser = lazy(() => import("./pages/EditUser/EditUser"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user/:id" element={<UserProfile />}></Route>
            <Route path="/add-user" element={<AddUser />}></Route>
            <Route path="/edit-user/:id" element={<EditUser />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
