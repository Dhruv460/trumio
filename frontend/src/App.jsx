import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/registerForm";
import Header from "./components/header";
import Feed from "./components/feed";
import Post from "./components/post";
import ProfilePage from "./components/profilePage";
import Home from "./components/home";
import AccountTypePage from "./components/askrole";
import CompleteProfilePage from "./components/reg2";
import LoginForm from "./components/login";
import ChatAi from "./components/chatAi";
import ProtectedRoute from "./components/protectedRoute";
import CompleteProfilePasswordPage from "./components/reg3";
import AboutUs from "./components/About";
import Footer from "./components/footer";
import ProjectDetail from "./components/projectDetail";
import ProjectBids from "./components/bid";
import Feedback from "./components/feedback";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log("Token has changed:", token);
  }, [token]);

  return (
    <>
      <Router>
        {token && <Header />}
        {/* <Header /> */}
        <Routes>
          <Route path="/role" element={<AccountTypePage />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/register" element={<CompleteProfilePage />} />
          <Route path="/reg_3" element={<CompleteProfilePasswordPage />} />
          <Route path="/" element={<AboutUs />} />
          <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
          <Route
            path="/feedback"
            element={<ProtectedRoute element={<Feedback />} />}
          />
          <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
          <Route path="/project/:id" element={<ProjectDetail />} />{" "}
          {/* Add this line */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route path="/signin" element={<LoginForm />} />
          <Route
            path="/chatAi"
            element={<ProtectedRoute element={<ChatAi />} />}
          />
          <Route
            path="/mybids"
            element={<ProtectedRoute element={<ProjectBids />} />}
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
