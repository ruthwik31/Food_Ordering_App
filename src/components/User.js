import { useState, useEffect } from "react";
const User = (props) => {
  const [count, setCount] = useState(0); //useState hook to manage state
  useEffect(() => {
    const timer=setInterval(() => {
      //console.log("Hai in User.js");
    }, 1000);
    //console.log("useEffect")
    return () => {
      clearInterval(timer);
      //console.log("useEffect Return");
    };
  }, []);
//console.log("render");

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
      <h2 className="underline">{props.name}</h2>
      <p>
        Welcome to HungryDine – your go-to destination for ordering delicious
        food online with ease and speed. At HungryDine, we believe that great
        food should be just a click away. Whether you're craving local
        favorites, fast food, or gourmet meals, we've got you covered. Our
        platform connects hungry users with the best restaurants around them,
        offering a seamless and delightful food ordering experience.
      </p>
    </div>
  );
};
export default User;
