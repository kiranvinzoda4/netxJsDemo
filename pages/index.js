import Dashboard from "./dashboard";
import Login from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [token, setToken] = useState();

  return <Login />;
}
