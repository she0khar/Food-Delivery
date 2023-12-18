import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameData=useRef(null);
  const emailData = useRef(null);
  const passData = useRef(null);
  const [err, setErr] = useState(null);
  const [signIn, setSignIn] = useState(true);
  const toggle = () => {
    setSignIn(!signIn);
  };
  const handleSignIn = () => {
  
    const msg = checkData(emailData?.current?.value, passData?.current?.value);
    
    setErr(msg);
    if (msg) return;
    if (!signIn) {
      createUserWithEmailAndPassword(
        auth,
        emailData?.current?.value,
        passData?.current?.value,
        nameData?.current?.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameData?.current?.value , photoURL: "/user-profile-icon-free-vector.jpg"
          }).then(() => {
            const{uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            }))
            // Profile updated!
            // ...
            navigate("/body");
          }).catch((error) => {
            // An error occurred
            // ...
          });
          
         
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          // ..
          setErr(errorCode);
          navigate("/error");
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailData?.current?.value,
        passData?.current?.value,
       
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/body");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          setErr(errorCode);
          navigate("/error");
        });
  
  };

 
    }
  return (
    <div className="w-1/3 p-8 mx-[33%] h-auto border rounded-lg shadow-lg ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">
          {signIn ? "Login" : "Sign up"}
        </h1>
        <h1 className="text-xl ">
          <Link to="/body">❌</Link>
        </h1>
      </div>
      <h2 className="mt-5">
        or
        <span
          onClick={toggle}
          className="text-orange-400 font-bold ml-1 cursor-pointer"
        >
          {signIn ? "Create an account" : "Log in to your account"}
        </span>
      </h2>
      <form
        className="my-10 flex flex-col  "
        onSubmit={(e) => e.preventDefault()}
      >
        {!signIn && (
          <input ref={nameData} className="border my-3 p-5" type="text" placeholder="Name" />
        )}
        <input
          ref={emailData}
          className="border p-5 my-3"
          type="text"
          placeholder="Email or Phone Number"
        />
        <input
          ref={passData}
          className="border p-5 my-3"
          type="password"
          placeholder="Password"
        />
        <h1 className="text-red-400 p-2 font-bold">{err}</h1>
        <button
          className="bg-orange-400 mt-10 text-white border h-16"
          onClick={handleSignIn}
        >
          {signIn ? "Login" : "Sign up"}
        </button>
        <h3 className="text-sm font-bold text-gray-500">
          {signIn
            ? "By clicking on Login, I accept the Terms & Conditions & Privacy Policy"
            : "By creating an account, I accept the Terms & Conditions & Privacy Policy"}
        </h3>
      </form>
    </div>
  );
};
export default Login;
