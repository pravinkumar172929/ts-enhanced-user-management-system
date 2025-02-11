import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Home = lazy(() => import("./pages/Home/Home"));
const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
const AddUser = lazy(() => import("./pages/AddUser/AddUser"));
const EditUser = lazy(() => import("./pages/EditUser/EditUser"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute allowedRoles={["Admin", "User"]} />}>
            <Route path="/user/:id" element={<UserProfile />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
