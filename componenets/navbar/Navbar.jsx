import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import logo from "../../logos/swot.png";
import DialogBox from "../../small components/dialogbox";

const Navbar = ({ theme, setTheme }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleGoogleLoginSuccess = (data) => {
    console.log("User data:", data);
    const photoURL = data.picture;
    const name = data.name;
    setUserPhoto(photoURL);
    setUserName(name);
    const userId = data.sub; // Extract user ID from data object
    createSession(userId);
    setIsAuthenticated(true);
    console.log(userId);
  };

  const createSession = (userId) => {
    console.log(userId);
    const sessionId = generateSessionId(userId);
    sessionStorage.setItem("sessionId", sessionId);
    sessionStorage.setItem("userId", userId);
    console.log(sessionId);
  };
  const generateSessionId = (userId) => {
    return "sessionId_" + userId;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sessionId");
    sessionStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUserPhoto(null);
  };
  const handleDashboardClick = (event) => {
    if (!isAuthenticated) {
      event.preventDefault();
      // Open the dialog box when Dashboard is clicked and the user is not authenticated
      setIsDialogOpen(true);
      document.body.classList.add("dialog-open", "blur");
    }
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    document.body.classList.remove("dialog-open", "blur");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logo" src={logo} alt="logo" />
      </div>
      
      <ul className="nav_link">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={handleDashboardClick}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to='/whiteboard'>
            Whiteboard
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <img
              src={userPhoto}
              alt="User Profile"
              onClick={handleLogout}
              className="photo"
            />
          </li>
        ) : (
          <li>
            <LoginSocialGoogle
              client_id="273986111435-vij2d27g021jlag7tdp4chsas3bmr17t.apps.googleusercontent.com"
              discoveryDocs="claims_supported"
              access_type="online"
              onResolve={({ provider, data }) => {
                console.log(provider, data);
                handleGoogleLoginSuccess(data);
              }}
              onReject={({ error }) => {
                console.log(error);
              }}
              className={"google-button"} // Add conditional class
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
          </li>
        )}
      </ul>
      {isDialogOpen && <DialogBox onClose={handleCloseDialog} />}
    </nav>
  );
};

export default Navbar;
