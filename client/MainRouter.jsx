import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./lib/Signin.jsx";
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";
import AddCar from "./car/AddCar.jsx";
import ListCar from "./car/ListCar.jsx";
import SearchPage from "./car/SearchPage.jsx";
import Ratings from "./car/Ratings.jsx";
import EditCar from "./car/EditCar.jsx";
import Menu from "./core/Menu";
import { Search } from "@material-ui/icons";

function MainRouter() {
  return (

    <div>
        
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/addCar" element={<AddCar />} />
        <Route path="/listCar" element={<ListCar />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/Ratings" element={<Ratings />} />
        <Route
          path="/listCar/edit/:carId"
          element={
            <PrivateRoute>
              <EditCar />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
      </Routes>
      
    </div>
  );
}

export default MainRouter;
