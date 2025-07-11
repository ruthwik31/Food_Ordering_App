import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import {
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  //console.log(cartItems);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-black text-white rounded-lg "
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 && (
          <h1>Cart is Empty. Don't Keep me starving</h1>
        )}
        <ItemList
          items={cartItems}
          showQuantityControls={true}
          onIncrement={(id) => dispatch(incrementQuantity(id))}
          onDecrement={(id) => dispatch(decrementQuantity(id))}
        />
      </div>
    </div>
  );
};
export default Cart;
