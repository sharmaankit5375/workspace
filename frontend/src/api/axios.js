import axios from "axios";
import { v4 as uuid } from "uuid";
import { getToken } from "../auth/auth.service";

const api = axios.create({ baseURL: process.env.API_URL || "http://localhost:3000" });

api.interceptors.request.use(config => {
    config.headers["x-correlation-id"] = uuid();
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
