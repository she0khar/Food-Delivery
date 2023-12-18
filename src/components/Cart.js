import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

import { empty_link } from "./constants";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";

const Cart = () => {
  const emailData = useRef(null);
  const passData = useRef(null);
  const nameData = useRef(null);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const man = useSelector((store) => store.user);

  const cartItems = useSelector((store) => store.cart.items);

  const manageSignIn = () => {
    setLogin(true);
    setSignUp(false);
  };
  const manageSignUp = () => {
    setSignUp(true);
    setLogin(false);
  };
  const handleSignIn = () => {
    if (signUp) {
      createUserWithEmailAndPassword(
        auth,
        emailData?.current?.value,
        passData?.current?.value,
        nameData?.current?.value
      )
        .then((userCredential) => {
          // Signed up

          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameData?.current?.value,
            photoURL: "/user-profile-icon-free-vector.jpg",
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailData?.current?.value,
        passData?.current?.value,
        nameData?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  const clearCar = () => {
    dispatch(clearCart());
  };

  //   const resInfo = useMenu(resId);
  //   const resName = resInfo?.cards[0]?.card?.card?.info;
  //   console.log(cartItems);
  const uniqueElements = [...new Set(cartItems)];

  const elementCounts = uniqueElements.map((value) => [
    value,
    cartItems.filter((str) => str === value).length,
  ]);

  return (
    <>
      <Header />
      <div className="text-center w-full h-screen  p-10 bg-gray-100  ">
        {cartItems.length === 0 ? (
          <div className="">
            <img className=" mx-[35%] w-[30%]" src={empty_link} alt="empty" />
            <h1 className="font-bold text-gray-500 mt-3 text-3xl p-2">
              Your cart is empty
            </h1>
          </div>
        ) : (
          <div className="flex justify-between ">
            <div className="border w-[55%] text-left  ">
              <div className="p-8 bg-white">
                <h1 className="font-semibold text-xl">Account</h1>

                {man ? (
                  <div>
                    <h1 className="font-semibold text-xl my-5 text-gray-600 ">
                      Logged In as:
                      <span className="font-bold text-xl mx-3 text-black">
                        {man.displayName} ✅
                      </span>
                    </h1>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-gray-500 mt-2">
                      To place your order now, log in to your existing account
                      or sign up
                    </h2>
                    <div className="my-7">
                      <button
                        className="border-2 border-green-400 mx-4 w-48 text-sm p-2 text-green-600"
                        onClick={manageSignIn}
                      >
                        <h1>Have an account?</h1>
                        <h1 className="font-bold">LOG IN</h1>
                      </button>
                      <button
                        className="border-2 border-green-400 mx-4 w-48 text-sm p-2 bg-green-600 text-white"
                        onClick={manageSignUp}
                      >
                        <h1>New?</h1>
                        <h1 className="font-bold">SIGN UP</h1>
                      </button>

                      {(login || signUp) && (
                        <div className="my-4 flex flex-col">
                          {login && (
                            <h1>
                              Enter login details or
                              <span
                                className="text-orange-400 cursor-pointer ml-1"
                                onClick={manageSignUp}
                              >
                                create an account
                              </span>
                            </h1>
                          )}
                          {signUp && (
                            <h1>
                              Enter details or
                              <span
                                className="text-orange-400 cursor-pointer ml-1"
                                onClick={manageSignIn}
                              >
                                login to your account
                              </span>
                            </h1>
                          )}
                          {signUp && (
                            <input
                              ref={nameData}
                              type="text"
                              placeholder="enter name"
                              className="border p-4 my-3 w-2/3 border-gray-400"
                            />
                          )}
                          <input
                            ref={emailData}
                            type="text"
                            placeholder="email"
                            className="p-4 border my-3 w-2/3 border-gray-400"
                          />
                          <input
                            ref={passData}
                            type="password"
                            placeholder="enter password"
                            className="p-4 border my-3 w-2/3 border-gray-400"
                          />
                          <button
                            onClick={handleSignIn}
                            className="border w-2/3 my-3 p-4 bg-green-500 text-white font-bold"
                          >
                            {login ? "LOGIN" : "SIGN UP"}
                          </button>
                          <h1 className="text-xs">
                            By clicking on {login ? "Login" : "Sign Up"}, I
                            accept the Terms & Conditions & Privacy Policy
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className=" w-1/3 border overflow-y-scroll no-scrollbar text-left bg-white  p-4 ">
              <div className="flex justify-between">
                <h1 className="font-bold">Your orders</h1>
                <button className="font-semibold" onClick={clearCar}>
                  Clear Cart
                </button>
              </div>
              {elementCounts
                ? elementCounts.map((item) => (
                    <div>
                      <div className="flex my-5  ">
                        <h1 className="w-64 font-semibold">
                          {item[0]?.card?.info?.name}
                        </h1>
                        <div className="border border-gray-200 self-center h-7 flex ">
                          <button
                            className=" text-gray-500 w-5"
                            onClick={() => {
                              dispatch(removeItem());
                            }}
                          >
                            -
                          </button>
                          <h1 className="  text-green-700 font-bold  w-6 px-1 ">
                            {item?.[1]}
                          </h1>
                          <button className="  -ml-1 w-5 font-bold text-green-500">
                            +
                          </button>
                        </div>
                        <h1 className="w-10 ml-8 text-gray-500 ">
                          ₹{item[0]?.card?.info?.price / 100}
                        </h1>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
