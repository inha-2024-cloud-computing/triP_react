import { Form, Link, useActionData, useNavigation } from "react-router-dom";

import React, { useState } from "react";

const SignupForm = () => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const validatePassword = (value) => {
    if (value.length >= 5 && /[a-zA-Z]/.test(value) && /\d/.test(value)) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError(
        "Password must contain at least 5 alphabets and numbers."
      );
      return false;
    }
  };

  const validatePhone = (value) => {
    if (/^\d+$/.test(value)) {
      setPhoneError("");
      return true;
    } else {
      setPhoneError("Phone must contain only numbers.");
      return false;
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    if (value) {
      validatePassword(value);
    } else {
      setPasswordError("");
    }
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setPhone(value);
    if (value) {
      validatePhone(value);
    } else {
      setPhoneError("");
    }
  };

  return (
    // <div className=" inline-block text-center w-full">
    //   <Form method="POST" className=" items-center">
    //     <h1>회원가입</h1>
    //     <p>
    //       <label htmlFor="email">Email</label>
    //       <input id="email" type="email" name="email" required />
    //     </p>
    //     <p>
    //       <label htmlFor="password">Password</label>
    //       <input id="password" type="password" name="password" required />
    //     </p>
    //     <p>
    //       <label htmlFor="name">Name</label>
    //       <input id="name" type="text" name="name" required />
    //     </p>
    //     <p>
    //       <label htmlFor="company_name">Company Name</label>
    //       <input id="company_name" type="text" name="company_name" required />
    //     </p>
    //     <p>
    //       <label htmlFor="phone">Phone</label>
    //       <input id="phone" type="text" name="phone" required />
    //     </p>
    //     <div>
    //       <button>회원가입</button>
    //     </div>
    //   </Form>
    //   <Link to="/login">로그인</Link>
    // </div>
    <div
      className="min-h-screen flex items-center justify-center bg-purple-200"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="w-full max-w-xs">
        <Form
          method="POST"
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <h1 className="mb-2 text-center">회원가입</h1>
            {/* Email 필드 */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="email"
              required
            />
            {/* Password 필드 */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            )}
            {/* Name 필드 */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              사용자명
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            {/* Phone 필드 */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              전화번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {phoneError && (
              <p className="text-red-500 text-xs italic">{phoneError}</p>
            )}

            {/* 제출 버튼 */}
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting || passwordError || phoneError}
              >
                {isSubmitting ? "Saving..." : "가입하기"}
              </button>
            </div>
          </div>
        </Form>
        <Link className="flex items-center justify-center mt-4" to="/login">
          로그인 화면으로..
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
