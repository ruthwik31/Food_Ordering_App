import { useState, useEffect } from "react";
const User = (props) => {
  const [count, setCount] = useState(0); //useState hook to manage state
  useEffect(() => {
    const timer=setInterval(() => {
      console.log("Hai in User.js");
    }, 1000);
    console.log("useEffect")
    return () => {
      clearInterval(timer);
      console.log("useEffect Return");
    };
  }, []);
console.log("render");

  return (
    <div className="user-card">
      {/*<h2>Count:{count}</h2>
      <button
        onClick={() => {
          setCount(1);
        }}
      >
        count
      </button>*/}
      <h2>Name:{props.name}</h2>
      <h3>Age:21</h3>
      <h3>Location:Hyderabad</h3>
      <h3>Contact:8555821118</h3>
    </div>
  );
};
export default User;
