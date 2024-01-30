import "./App.css";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import cartImage from "../src/assets/icons/cart.png";
import Users from "./pages/Users/Users";
import NewOrder from "./pages/NewOrder/NewOrder";

function App(): React.FC {
  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="app">
      <div className="header">
        <div className="title">
          <span>Pizza day</span>
        </div>
        <img
          className="cart-image"
          onClick={handleNavigateToCart}
          src={cartImage}
          alt=""
        />
      </div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/order/new" element={<NewOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
