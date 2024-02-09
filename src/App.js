import styles from "./App.module.scss";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import cartImage from "../src/assets/icons/cart.png";
import { lazy, Suspense } from "react";

const HomeLazy = lazy(() => import("./pages/Home/Home"));
const MenuLazy = lazy(() => import("./pages/Menu/Menu"));
const CartLazy = lazy(() => import("./pages/Cart/Cart"));
const LoginLazy = lazy(() => import("./pages/Login/Login"));
const UsersLazy = lazy(() => import("./pages/Users/Users"));
const NewOrderLazy = lazy(() => import("./pages/NewOrder/NewOrder"));
const OrderDetailsLazy = lazy(() =>
  import("./components/OrderDetails/OrderDetails"),
);

function App(): React.FC {
  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>Pizza day</span>
        </div>
        <img
          className={styles.cartImage}
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
      <Suspense fallback={<h1>Loading ...</h1>}>
        <Routes>
          <Route path="/" element={<HomeLazy />}></Route>
          <Route path="/menu" element={<MenuLazy />}></Route>
          <Route path="/cart" element={<CartLazy />}></Route>
          <Route path="/login" element={<LoginLazy />}></Route>
          <Route path="/users" element={<UsersLazy />}></Route>
          <Route path="/order/new" element={<NewOrderLazy />}></Route>
          <Route path="/order/:id" element={<OrderDetailsLazy />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
