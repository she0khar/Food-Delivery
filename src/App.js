import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Login from "./components/Login";
import ResMenu from "./components/ResMenu";

import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";

import Cart from "./components/Cart";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, []);
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login />, errorElement: <Error /> },
    { path: "/body", element: <Body /> },
    { path: "/about", element: <About /> },
    {
      path: "/restaurants/:resId",
      element: <ResMenu />,
    },

    {
      path: "/grocery",
      element: (
        <Suspense fallback={<h1>...loading</h1>}>
          <Grocery />
        </Suspense>
      ),
    },
    { path: "/cart", element: <Cart /> },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
