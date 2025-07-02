import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
  //let btnName = "Login";
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  console.log("Header rendered");
  useEffect(
    () => {
      console.log("useEffect rendered");
    } //,[btnNameReact]
  );
  return (
    <div className="flex justify-between bg-green-100 shadow-lg sm:bg-yellow-50 lg:bg-blue-50 mb-2">
      <div className="Logo-Container">
        <img className="w-45" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-5 m-2">
          <li className="px-4">onlineStatus:{onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-3">
            <Link to="">Home</Link>
          </li>
          <li className="px-3">
            <Link to="/about">About</Link>
          </li>
          <li className="px-3">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-3">Cart</li>
          <button
            className="login-btn"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
