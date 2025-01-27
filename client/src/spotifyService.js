import axios from "axios";

const CLIENT_ID = "c708b6906aeb425ab539cf51c38157d4";
const CLIENT_SECRET = "5a1c3ea5e2de419b91b640b371a6149d";
let accessToken = "";

// Function to get an access token from Spotify API
const getAccessToken = async () => {
  if (accessToken) return accessToken;

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;
  return accessToken;
};

// Function to fetch songs based on tags
export const searchSongsByTag = async (tag) => {
  const token = await getAccessToken();

  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: tag,
      type: "track",
      limit: 20,
    },
  });

  return response.data.tracks.items;
};
