import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../redux/slices/cartSlice.js";
import "./MenuItem.css";

const MenuItem = ({ menu }) => {
  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = menu;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(menu));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(id));
  };

  const cartItems = useSelector((state) => state.cart.items);

  const isPizzaInCart = cartItems.some((item) => item.id === id);

  const formattedIngredients = ingredients
    .map(
      (ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
    )
    .join(", ");

  return (
    <div className="menu">
      <div className="menu-info">
        <img src={imageUrl} alt="" />
        <div className="description">
          <div className="name">{name}</div>
          <div className="ingridients">{formattedIngredients}</div>
          {!soldOut ? (
            <div className="price">{unitPrice} &euro;</div>
          ) : (
            <span>sold out</span>
          )}
        </div>
      </div>
      <div className="menu-action">
        {!isPizzaInCart ? (
          <button
            disabled={soldOut}
            onClick={handleAddToCart}
            className="action-btn">
            add to card
          </button>
        ) : (
          <button onClick={handleRemoveFromCart} className="action-btn">
            remove from card
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(MenuItem);
