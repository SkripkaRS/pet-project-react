import React, { memo, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "../../components/MenuItem/MenuItem";
import { UserContext } from "../../context/UserContextInfo";
import { getMenuItems } from "../../redux/slices/menuSlice";
import "./Menu.css";

const Menu = () => {
  const { login } = useContext(UserContext);

  const dispatch = useDispatch();

  const { menuItems, isError, isLoading } = useSelector((state) => state.menu);

  useEffect(() => {
    if (login) {
      dispatch(getMenuItems());
    }
  }, [login, dispatch]);

  if (!login) {
    return <h1>Please enter login</h1>;
  }

  if (isError) {
    return <h1>Error message</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>List of menu:</h1>
      {!!menuItems &&
        menuItems.map((menu) => (
          <div className="menu-container" key={menu.id}>
            <MenuItem menu={menu} />
          </div>
        ))}
    </div>
  );
};

export default memo(Menu);
