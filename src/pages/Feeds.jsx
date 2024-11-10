import { useEffect, useState } from "react";
import { HomeFeedcards } from "./Home";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const fetchUsers = async () => {
    setLoading(true);
    const skip = (page - 1) * limit;

    try {
      const res = await fetch(
        `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}&select=name,image`
      );
      console.log(res);
      
      const data = await res.json();
      console.log(data);
      
      setUsers((prevUsers) => [...prevUsers, ...data.recipes]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(users, 'users');
  

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleScroll = () => {
    if (loading) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="feed">
      <div className="flex flex-col gap-5"> 
      {users.map((user) => (
        <HomeFeedcards key={user.name} data={user}/>
      ))}
      </div>
      {loading && <p className="text-center text-gray-500 mt-4">Loading more users...</p>}
    </div>
  );
};

export default Feed;
