// import { useState } from "react";
import { useState } from "react";
import { Button } from "../App";
import loginImage from "../assets/login-image.png";
// import { useNavigate } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthForm, loginUser } from "../store/authSlice";


const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin, 'islogin');
  
  const openRegister = () => {
    dispatch(toggleAuthForm());
  };

  return (
    <div className="w-full flex flex-col gap-5 border p-4 ">
      <h2 className="text-center text-white font-bold italic text-[24px] tracking-wider">
        Instagram
      </h2>
      {isLogin ? <Login /> : <Signup />}
      <div className="flex justify-center items-center text-white gap-4">
        <hr className="h-1 w-full" />
        OR
        <hr className="h-1 w-full" />
      </div>
      <GoogleAuth />
      <div className="text-white">
        <p className="text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-300 cursor-pointer text-[18px]"
            onClick={openRegister}
          >
            {" "}
            {isLogin ? " Sign up" : " Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

const Auth = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <div className="w-full flex gap-5 max-w-[800px] p-4">
        <div className="w-full px-10 hidden lg:block">
          <img
            src={loginImage}
            className="w-[250px] rotate-12 object-contain"
          />
        </div>
        <div className="w-full ">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
