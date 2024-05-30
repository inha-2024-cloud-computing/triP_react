import React from "react";
import LoginForm from "../components/LoginForm";
import { json, redirect } from "react-router-dom";
import { useRouteError } from "react-router-dom";
function Login() {
  const error = useRouteError;
  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(
    "https://zzigda-proto-dot-helloworld-app-410701.du.r.appspot.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }

  const resData = await response.json();
  const token = resData.token;
  const userId = resData.userId;

  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 5);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/projects");
}
