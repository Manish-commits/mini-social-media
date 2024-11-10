import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Button } from "../App";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

const GoogleAuth = () => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try{
        const res = await signInWithGoogle();
        console.log(res, 'res');
        

        if (res) {
            const userDoc = {
              uid: res.user.uid,
              email: res.user.email,
              username: res.user.email.split('@')[0],
              name: res.user.displayName,
              profilePic: res.user.photoURL,
              posts: [],
              createdAt: Date.now(),
            };
        dispatch(loginUser(userDoc));
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        alert("Google login successful");
        };
    } catch(err){
        console.log(err);
        
    }
}

  return (
    <div className="w-full text-center mx-auto cursor-pointer">
      <div onClick={handleGoogleLogin}>
        <Button>Login with Google</Button>
      </div>
    </div>
  );
};

export default GoogleAuth;
