import axios from "axios"

export const api = axios.create({
  baseURL: "https://evolution.bigdates.com.br:3720",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralize error handling when the main API is integrated
    return Promise.reject(error)
  },
)
