import React, { memo } from "react";
import "./MenuItem.css";

const MenuItem = ({ menu }) => {
  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = menu;

  const formattedIngredients = ingredients.map(
    (ingredient) => ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
  ).join(", ");

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
        <button className="action-btn">add to card</button>
      </div>
    </div>
  );
};

export default memo(MenuItem);
