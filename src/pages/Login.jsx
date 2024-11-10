import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formVal, setFormVal] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVal((prevFormVal) => ({ ...prevFormVal, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        formVal.email,
        formVal.password
      );

      if (loggedInUser) {
        const userDoc = {
          uid: loggedInUser.user.uid,
          email: formVal.email,
        };

        // Dispatch the user data to Redux
        dispatch(loginUser(userDoc));
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        navigate("/");
        alert("Login successful");
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Enter email address"
            className="w-full p-2 border border-gray-50 rounded-md"
            value={formVal.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="w-full p-2 border border-gray-50 rounded-md"
            value={formVal.password}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="w-full text-center p-2 rounded-md bg-blue-400 text-white cursor-pointer"
          value={"Sign in"}
        />
      </form>
    </div>
  );
};

export default Login;
