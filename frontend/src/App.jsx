import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/registerForm";
import Header from "./components/header";
import Feed from "./components/feed";
import Post from "./components/post";
import ProfilePage from "./components/profilePage";
import Home from "./components/home";
import AccountTypePage from "./components/askrole";
import CompleteProfilePage from "./components/reg2";
function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Router>
        {/* {token && <Header />} */}
        <Header />
        <Routes>
          {/* <Route path="/" element={<AccountTypePage />} /> */}
          // ye route bana rha nye h isme design accha h aur bas abhi role teen
          se do krne ki bakchodi chal rhi to home ki jagah ye use krnege bad me
          dekh lo ek bar uncomment krke
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<CompleteProfilePage />} /> */}{" "}
          // register ki jagah ye use krenge
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />\{" "}
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
