// Import necessary components and functions from react-router-dom.

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import { Navbar } from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/private"
        element={
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;