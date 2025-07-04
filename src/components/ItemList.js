import { ITEM_IMG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
//import React from "react";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
} from "../utils/cartSlice";
const ItemList = ({
  items,
  showQuantityControls = false,
  onIncrement,
  onDecrement,
}) => {
  //console.log(items);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
    //dispatch an action
    dispatch(addItem(item));
    //console.log(items);
  };
  return (
    <div>
      {items.map((item) => {
        const info = item.card.info;
        const rawPrice =
          info.finalPrice ?? info.defaultPrice ?? info.price ?? 0;
        const cartItem = cartItems.find((ci) => ci.card.info.id === info.id);
        const quantity = cartItem?.quantity || 0;
        return (
          <div
            key={info.id || info.name}
            className="p-2 m-2 border-b-2 text-left flex justify-between items-start"
          >
            <div className="w-3/5 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold">
                  {info.name}
                  {item.quantity ? `(x${item.quantity})` : ""}
                </h3>
                <p className="text-sm text-gray-600">₹{rawPrice / 100}</p>
                <h3 className="text-sm text-gray-500">{info.avgRating}</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">{info.description}</p>
            </div>

            <div className="relative w-32 h-32 m-3">
              <img
                src={ITEM_IMG + info.imageId}
                className="w-full h-full object-cover rounded-lg"
                alt={info.name}
              />
              {!showQuantityControls ? (
                // ✅ Menu mode: Show Add button + quantity below
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  {quantity === 0 ? (
                    // Show "Add" if quantity is 0
                    <button
                      className="bg-white text-green-600 px-4 py-1 shadow-md text-sm font-semibold rounded-md hover:bg-gray-100"
                      onClick={() => handleAddItem(item)}
                    >
                      Add
                    </button>
                  ) : (
                    // Show quantity controls if item is already in cart
                    <div className=" flex items-center gap-2">
                      <button
                        className=" bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => dispatch(decrementQuantity(info.id))}
                      >
                        −
                      </button>
                      <span className="text-sm font-bol">{quantity}</span>
                      <button
                        className="transition-all duration-300 ease-in-out
 bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => dispatch(incrementQuantity(info.id))}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // ✅ Cart mode: Show quantity controls
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex gap-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => onDecrement(info.id)}
                  >
                    −
                  </button>
                  <span className="text-sm font-bold">{quantity}</span>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => onIncrement(info.id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
