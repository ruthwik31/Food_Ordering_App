import Shimmerui from "./shimmer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = () => {
  const { id } = useParams();
  //console.log("resid=" + id);
  const dummy = "Dummy data";
  const resInfo = useRestaurantMenu(id);
  //console.log(resInfo);

  const [showIndex, setShowIndex] = useState(0);
  if (resInfo === null) return <Shimmerui />;
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card || [];
  //console.log(itemCards);
  //console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR);
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories);
  return (
    <div className="text-center p-4">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>

      {categories.map((cat, index) => {
        return (
          <RestaurantCategory
            key={cat?.card?.card?.title}
            info={cat?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() =>
              setShowIndex((prevIndex) => (prevIndex === index ? false : index))
            
            }
          />
        );
      })}

      {/*
      <p className="font-bold text-lg">
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>
      
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name}-Rs.
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>*/}
    </div>
  );
};
export default RestaurantMenu;
