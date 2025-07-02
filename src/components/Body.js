import RestaurantCard, { withPromotedLabel } from "./RestaurantCard.js";

//import resList from "../utils/mockdata.js";
import { useState, useEffect } from "react";
import Shimmerui from "./shimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const RestaurantCardPromoted = withPromotedLabel;
RestaurantCard;

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      //https://corsproxy.io/?
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    //console.log(
    //json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    //);

    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
    //console.log(restaurants);
  };
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1>Looks like you are offline, please check your internet connection</h1>
    );
  }
  if (listOfRestaurants.length === 0) {
    return <Shimmerui />;
  }
  //ternary operator to check if the listOfRestaurants is empty
  //return listOfRestaurants.length === 0 ? (<Shimmerui />) : (
  return (
    <div className="body">
      <div className="filter">
        <div className="search mx-2 px-3 ">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="cursor-pointer px-4 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            search
          </button>

          <button
            className=" cursor-pointer border border-solid px-4 bg-green-100 m-4"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.3
              );
              setFilteredRestaurants(filteredList);
              //setListOfRestaurants(filteredList);
              //console.log(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
            className="link-style"
          >
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
