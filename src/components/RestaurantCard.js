import { CDN_URL } from "../utils/constants";
//import { useContext } from "react";
//import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  //const { loggedInUser } = useContext(UserContext);
  const { name, avgRating, cuisines, sla, cloudinaryImageId } = resData?.info;
  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-grey-100 hover:bg-gray-400">
      <img
        className="rounded-lg w-full"
        alt="res-logo" /*specifies an alternate text for an image, if the image cannot be displayed*/
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-3 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>Rating: {avgRating}</h4>
      <h4>delivery Time:{sla?.slaString}</h4>
    </div>
  );
};
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
