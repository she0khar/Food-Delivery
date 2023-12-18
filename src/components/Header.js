import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const cart = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);
  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="flex -mt-4   ">
      <Link to="/body">
        <img
          className="h-40 w-40 ml-16 -mt-4 cursor-pointer "
          src="/logoo.jpg "
          alt="logo"
        />
      </Link>
      <img
        className="h-10 w-10 self-center ml-16 rounded-l-lg relative cursor-pointer p-2 -mr-12 "
        src="/search.png"
        alt="search"
      />

      <input
        className="border border-gray-200 w-1/2 self-center h-14  shadow-md px-16 rounded-lg"
        type="text"
        placeholder="Search"
        value={searchTxt}
        onChange={(e) => {
          setSearchTxt(e.target.value);
        }}
      ></input>
      <button
        className="border border-gray-200 h-14 shadow-md text-gray-400 self-center rounded-lg ml-2 p-2"
        onClick={() => {
          console.log(searchTxt);
        }}
      >
        Search
      </button>
      <button className="text-xl text-gray-400 self-center ml-10">
        <Link to="/grocery">Grocery</Link>
      </button>
      <div className="ml-10 self-center flex p-2">
        
        {user && (
          <img
            className="h-10 w-10 p-1 "
            src={user.photoURL}
            alt="user"
          />
        )}
        <button
          className="text-xl text-gray-400 self-center "
          onClick={handleSignOut}
        >
          <Link to="/">{user ? "Logout" : "Login"}</Link>
        </button>
      </div>

      <button className="text-xl text-gray-400 self-center ml-2">
        <Link className="flex" to="/cart">
          <img className="h-11 w-11 p-1" src="/cart.jpg" alt="cart" />
          <h1 className="self-center rounded-full -mt-8 ml-3 p-1 absolute h-7 w-6  text-green-500 font-bold  ">
            {cart.length}
          </h1>
        </Link>
      </button>
    </div>
  );
};
export default Header;
