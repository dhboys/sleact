import React from "react";
import axios from "axios";

const useAxios = axios.create({
  baseURL: "localhost:3095",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json; charset=UTF-8",
  },
  withCredentials: true,
});

export default useAxios;
