import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import UserContext from "../context/userContext";
import SearchBar from "../components/SearchBar";
import SearchedMovie from "../components/SearchedMovie";
import Playlist from "../components/Playlist";
import AuthContext from "../context/authContext";

function Dashboard() {
  //   const [loggedIn, setLoggedIn] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserContext);
  async function authenticateToken() {
    const token = localStorage.getItem("token");
    const req = await fetch(`/authenticate`, {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await req.json();
    if (data.status) {
      setLoggedIn(true);
      setUserData({
        token,
        user: data.data,
      });
    } else {
      //invalid token
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        authenticateToken();
      }
    } else {
      setLoggedIn(false);
      window.location.href = "/login";
    }
  }, []);
  return (
    <div>
      {loggedIn && (
        <div>
          {" "}
          <h1>DashBoard</h1>
          {/* Search */}
          <SearchBar />
          {/* Display the searched result with add option to playlist name and public or private option */}
          {/* Display playlists */}
          <SearchedMovie />
          <Playlist />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
