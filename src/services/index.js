import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "",
  responseType: "json"
});

export const viewerBase = axios.create({
  baseURL: `https://developer.api.autodesk.com/`,
  responseType: "json"
});

export const cancelSource = axios.CancelToken.source();
