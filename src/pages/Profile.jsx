import { Button } from "../App";
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  return (
    <div className="w-full min-h-screen max-w-[650px] mx-auto">
        <header className="w-full flex justify-between items-center p-5 shadow-md">
        <p className="text-[24px] text-gray-700">Explore Feeds</p>
        <Button>Profile</Button>
      </header>
        <div className="flex flex-col gap-5 mt-10 bg-slate-200">

            <div className="w-full flex items-center gap-4" >
                <div className="">
                    <RxAvatar className="bg-green-200 rounded-full w-[100px] h-[100px]"/>
                </div>
                <div className="flex flex-col">
                    <p>name</p>
                    <div>3 posts</div>
                    <div>Details here</div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4"> 
            <div>kjbjbk</div>
            <div>kjbjbk</div>
            <div>kjbjbk</div>
            <div>kjbjbk</div>
            <div>kjbjbk</div>
            <div>kjbjbk</div>
            <div>kjbjbk</div>
            </div>
        </div>
    </div>
  )
}

export default Profile