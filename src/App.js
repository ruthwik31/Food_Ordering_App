import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
//createBrowserRouter
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
//import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import UserContext from "./utils/UserContext.js";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Cart from "./components/Cart.js";

//chunking,code-splitting, lazy loading,dynammic bundleing,dynamic import

const About = lazy(() => import("./components/About.js"));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const data = {
      name: "RUTHWIK",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
          {/*<Footer />*/}
        </div>
      </UserContext.Provider>
    </Provider>
  );
};
const appRouter = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        path: "",
        element: <Body />,
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "restaurants/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<AppLayout />);
//root.render(<RouterProvider router={appRouter} />);
export default appRouter;
