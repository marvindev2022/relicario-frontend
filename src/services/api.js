import axios from "../../build/node_modules/axios";

export default axios.create({
  baseURL: "https://relicario-backend.herokuapp.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
