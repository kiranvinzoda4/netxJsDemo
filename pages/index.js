import Dashboard from "./dashboard";
import Login from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [token, setToken] = useState();
  // useEffect(() => {
  //   // Set a value in localStorage
  //   localStorage.setItem("token", "myValue");
  // }, []);
  return <Login />;
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  if (token) {
    console.log(token);
    return <Dashboard />;
  } else {
    return <SignUp />;
  }
}
