import { Form, Link, useActionData, useNavigation } from "react-router-dom";

import { useEffect, useState } from "react";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigation = useNavigation();

  //const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    const isValid =
      password.trim().length >= 5 &&
      /\d/.test(password.trim()) &&
      /[A-Za-z]/.test(password.trim());
    setIsPasswordValid(isValid);
  }, [password]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    // <div className=" inline-block text-center w-full">
    //   <Form method="POST" className=" items-center">
    //     <h1>로그인</h1>
    //     <p>
    //       <label htmlFor="email">Email</label>
    //       <input id="email" type="email" name="email" required />
    //     </p>
    //     <p>
    //       <label htmlFor="password">Password</label>
    //       <input id="password" type="password" name="password" required />
    //     </p>
    //     <div>
    //       <button>Log in</button>
    //     </div>
    //   </Form>
    //   <Link to="/signup">회원가입</Link>
    // </div>
    <div
      className=" min-h-screen flex items-center justify-center bg-purple-200"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="w-full max-w-xs">
        <Form
          method="POST"
          className="bg-white shadow-md rounde px-8 pt-6 pb-8 mb-4 rounded-lg"
        >
          <div className=" mb-4">
            <h1 className="mb-2 text-center">로그인</h1>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                name="email"
                placeholder="email"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"></div>
            </div>
            {!isPasswordValid && password && (
              <p className="text-red-700 text-xs italic">
                Password must contain at least 5 alphabets and numbers.
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSubmitting} // || !isPasswordValid}
            >
              {isSubmitting ? "Loging In..." : "로그인"}
            </button>
          </div>
        </Form>
        <Link to="/signup">
          <div className="flex items-center justify-center">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              회원가입
            </button>
          </div>
        </Link>
        {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm leading-5">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span className="sr-only">Sign in with Google</span>
                <img
                  src="/path-to-your/google-icon.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="ml-3">Sign in with Google</span>
              </button>
            </div>
          </div>
  
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 ZZIGDA. All rights reserved.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
