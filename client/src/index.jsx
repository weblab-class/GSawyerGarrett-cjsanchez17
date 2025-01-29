import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import VibePage from "./components/pages/VibePage";
import SongCard from "./components/modules/SongCard";
import Library from "./components/pages/Library";
import Profile from "./components/pages/Profile";
import Browse from "./components/pages/Browse";
import AboutPage from "./components/pages/AboutPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
// import Library from "./components/pages/Library";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "472752248270-vm83ebo96c1urfj2jd3arufj7llciu6f.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<VibePage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/song/:id" element={<SongCard />} />
      <Route path="/about" element={<AboutPage />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
