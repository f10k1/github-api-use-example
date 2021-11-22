import axios from "axios";

const beAxios = axios.create({
    baseURL: "https://api.github.com/",
});
export default beAxios;