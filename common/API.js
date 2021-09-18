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

export const getRequest = async (url, authToken = null) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    return err;
  }
};

export const postRequest = async (url, authToken = null) => {};
