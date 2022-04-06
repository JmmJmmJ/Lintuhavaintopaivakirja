import axios from "axios";
const baseUrl = "/api/havainnot";

let token = window.localStorage.getItem("userToken");

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`,
    },
  };

  const request = axios.get(baseUrl, config);

  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`,
    },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const del = (id) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`,
    },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

const update = (id, newObject) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `${token}`,
    },
  };
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

export default { getAll, create, del, update, setToken };
