import React from "react";
import SignupForm from "../components/SignupForm";
import { json, redirect } from "react-router-dom";
const Signup = () => {
  return (
    <>
      <SignupForm />
    </>
  );
};

export default Signup;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("name"),
    phone: data.get("phone"),
  };

  const response = await fetch(
    "https://zzigda-proto-dot-helloworld-app-410701.du.r.appspot.com/auth/signup",
    {
      method: "PUT",
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

  alert("회원가입 성공");
  return redirect("/login");
}
