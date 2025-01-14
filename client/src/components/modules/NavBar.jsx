// import React from "react";
// import { Link } from "react-router-dom";

// import "./NavBar.css";

// /**
//  * The navigation bar at the top of all pages. Takes no props.
//  */
// const NavBar = () => {
//   return (
//     <nav className="NavBar-container">
//       <div className="NavBar-title u-inlineBlock">Vibe</div>
//       <div classname="NavBar-linkContainer">
//         <div classname="NavBar-browse">
//           <Link to="/" className="NavBar-browse">
//             Browse
//           </Link>
//         </div>
//         <div classname="NavBar-profile">
//           <Link to="/profile/" className="NavBar-profile">
//             Profile
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title">Vibe</div>
      <div className="NavBar-linkContainer">
        {/* Left-aligned "Browse" link */}
        <Link to="/" className="NavBar-browse">
          Browse
        </Link>
      </div>

      {/* Profile link container on the far right */}
      <div className="NavBar-profileContainer">
        <Link to="/profile/" className="NavBar-profile">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
