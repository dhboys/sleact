import React, { FC } from "react";
import loadable from "@loadable/component";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
const Login = loadable(() => import("@pages/LogIn"));
const Signup = loadable(() => import("@pages/SignUp"));

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
