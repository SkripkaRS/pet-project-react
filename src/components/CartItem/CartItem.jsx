import React, { memo } from "react";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/slices/cartSlice";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { id, name, unitPrice, quantity } = item;

  const dispatch = useDispatch();

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart">
      <div className="cart-info">
        <div className="cart-description">
          <div className="quantity">{quantity}</div>
          <span>&#215;</span>
          <div className="name">{name}</div>
        </div>
      </div>
      <div className="cart-action">
        <div className="price">{unitPrice * quantity} &euro;</div>
        <button
          disabled={quantity === 1}
          onClick={handleDecrementQuantity}
          className="action-btn decrement">
          -
        </button>
        <div className="quantity">{quantity}</div>
        <button
          onClick={handleIncrementQuantity}
          className="action-btn increment">
          +
        </button>
        <button onClick={handleRemoveFromCart} className="action-btn">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default memo(CartItem);
