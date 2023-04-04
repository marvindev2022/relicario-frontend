import axios from "axios";

export default axios.create({
  baseURL: "https://relicario-backend.herokuapp.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
