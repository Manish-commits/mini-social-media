import { useState } from "react";
import { Button } from "../App";
import loginImage from "../assets/login-image.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import Feed from "./Feeds";

export const HomeFeedcards = ({data}) => {
    console.log(data, 'data');
    
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  const handleLike = () => {
    setLiked((prev) => !prev);
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <div className="w-full bg-slate-700 text-white">
      <div className="w-full flex justify-between p-2">
        <div>{data?.name}</div>
        <div className="text-blue-400">Follow</div>
      </div>
      <div className="w-full ">
        <img src={data?.image} className="w-full object-cover h-[350px]" />
      </div>
      <div className="w-full flex justify-start items-center gap-4 p-2">
        <div
          onClick={handleLike}
          className="cursor-pointer flex gap-2 items-center"
        >
          {!liked ? (
            <CiHeart className="w-[32px] h-[32px]" />
          ) : (
            <FaHeart className="w-[32px] h-[32px]" />
          )}
          {likeCount}
        </div>
        <div>
          <FaRegComment className="w-[28px] h-[28px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Home = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const [signOut, loading, error] = useSignOut(auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  const handleLogout = async () => {
    const success = await signOut();
    
    if (success) {
        dispatch(logoutUser())
        localStorage.removeItem('user-info');
        alert("Signed out successfully");
      
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-200">
      <header className="w-full bg-white flex justify-between items-center fixed top-0 p-5 shadow-md">
        <p className="text-[24px] text-gray-700">Explore Feeds</p>
        <Button>Profile</Button>
        <div onClick={handleLogout}>
          <Button>Log out</Button>
        </div>
      </header>
      <div className="w-full flex flex-col gap-5 max-w-[350px] mx-auto pt-[150px]">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
