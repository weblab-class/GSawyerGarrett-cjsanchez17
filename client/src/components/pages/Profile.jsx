import React, { useContext } from "react";
import { UserContext } from "../App"; // Assuming UserContext stores user data

const Profile = () => {
  const { user } = useContext(UserContext); // Assuming user object contains Google profile data

  return (
    <div className="profile-container">
      {user && user.picture ? (
        <img src={user.picture} alt="Profile" className="profile-image" />
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
