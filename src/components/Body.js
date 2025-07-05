import RestaurantCard, { withPromotedLabel } from "./RestaurantCard.js";
//import resList from "../utils/mockdata.js";
import { useState, useEffect, useContext } from "react";
import Shimmerui from "./shimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";

const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

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
    //console.log(json);
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
  const { loggedInUser, setUserName } = useContext(UserContext);
  if (listOfRestaurants.length === 0) {
    return <Shimmerui />;
  }
  //ternary operator to check if the listOfRestaurants is empty
  //return listOfRestaurants.length === 0 ? (<Shimmerui />) : (
  return (
    <div className="p-4">
      <div className="filter">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              className="border border-black px-2 py-0.5 w-40 h-9 text-sm rounded"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />

            <button
              className="cursor-pointer bg-green-200 text-sm px-3 py-1 rounded hover:bg-green-300"
              onClick={() => {
                const filteredList = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredRestaurants(filteredList);
              }}
            >
              🔍search
            </button>
          </div>
          <button
            className=" bg-blue-100 px-4 py-2 text-sm rounded hover:bg-blue-200"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.1
              );
              setFilteredRestaurants(filteredList);
              //setListOfRestaurants(filteredList);
              //console.log(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">UserName:</label>
            <input
              type="text"
              className="border border-black px-2 py-1 text-sm rounded"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
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
