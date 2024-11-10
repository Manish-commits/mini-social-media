import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

export const Button = ({children }) => {
  return <button className="border bg-white border-gray-300 rounded-lg p-4 shadow-lg">{children}</button>
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated, 'isAuthenticated');
  

  return (
    <>
      <Routes>
        <Route path="/" element={ isAuthenticated ? <Home /> : <Navigate to="login" />}/>
        <Route path="/login" element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}/>
        <Route path="/:username" element={<Profile />}/>
      </Routes>
    </>
  )
}

export default App
