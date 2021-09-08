// axios features
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // do something here
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export const getRequest = async (url, authToken = null) => {};

export const postRequest = async (url, authToken = null) => {};
