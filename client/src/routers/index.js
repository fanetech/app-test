import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Navbar from "../components/Navbar";
import Article from "../pages/Article";
import Creer from "../pages/Creer";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

function index(props) {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article" element={<Article />} />
          <Route path="/creer" element={<Creer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default index;
