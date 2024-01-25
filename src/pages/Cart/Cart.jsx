import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import { clearCart } from "../../redux/slices/cartSlice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const handleNavigateToMenu = () => {
    navigate("/menu");
  };

  const handleOrder = () => {
    console.log("Order");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cartItems.length) return <h1>Cart is empty</h1>;

  return (
    <div className="cart-container">
      <div className="back-btn">
        <span onClick={handleNavigateToMenu}>Back to Menu</span>
      </div>
      {cartItems.map((item) => (
        <div className="item-container" key={item.id}>
          <CartItem item={item} />
        </div>
      ))}
      <div className="cart-action">
        <button className="order-btn" onClick={handleOrder}>
          ORDER PIZZAS
        </button>
        <button className="clear-btn" onClick={handleClearCart}>
          CLEAR CART
        </button>
      </div>
    </div>
  );
};

export default Cart;
