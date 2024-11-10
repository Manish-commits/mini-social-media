import { useState } from "react";
import { auth, fireStore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";

const getUserWithEmailPassword = () => {
    const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
    const dispatch = useDispatch();


  const signup = async (inputs) => {
    console.log(inputs);
    
    if (!inputs.email || !inputs.password || !inputs.name) {
      console.log("fill the details");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      console.log(newUser, 'new');
      
      if (!user && error) {
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          name: inputs.name,
          posts: [],
          createdAt: new Date(),
        };

        console.log(userDoc, 'doc');
        

        await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        dispatch(loginUser(userDoc));
      }
      alert('account created')
    } catch (err) {
      console.log(err);
    }
  };
  return { loading, error, signup };
};

const Signup = () => {
  const [formVal, setFormVal] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  const {loading, error, signup} = getUserWithEmailPassword();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVal((prevFormVal) => ({ ...prevFormVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formVal)
   
  };

  return (
    <div className="w-full flex justify-center items-center bg-black">
      <form
        className="w-full max-w-[650px] flex flex-col gap-4 p-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-white"> New Sign up/Register</h2>
        <div>
          <input
            name="name"
            placeholder="Enter name "
            className="w-full p-2 border border-gray-50 rounded-md"
            value={formVal.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="username"
            placeholder="Create username"
            className="w-full p-2 border border-gray-50 rounded-md"
            value={formVal.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Enter email address"
            className="w-full p-2 border border-gray-50 rounded-md"
            value={formVal.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter 6-digit password"
            className="w-full p-2 border border-gray-50 rounded-md "
            value={formVal.password}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          className="w-full text-center p-2 rounded-md bg-blue-400 text-white cursor-pointer"
          value={"Sign up"}
        />
      </form>
    </div>
  );
};

export default Signup;
