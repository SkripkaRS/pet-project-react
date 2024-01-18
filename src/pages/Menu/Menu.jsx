import React, { memo, useContext, useEffect, useState } from "react";
import { MENU_API } from "../../constants";
import { UserContext } from "../../context/UserContextInfo";
import MenuItem from "../MenuItem/MenuItem";
import "./Menu.css";

const Menu = () => {
  const { login } = useContext(UserContext);

  const [menu, setMenu] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMenu = async () => {
      if (login) {
        try {
          const res = await fetch(MENU_API);

          if (!res.ok) {
            throw new Error("Failed to fetch");
          }

          const { data } = await res.json();

          setMenu(data);

          setIsLoading(false);
        } catch (e) {
          console.error("error", e.message);
        }
      }
    };

    getMenu();
  }, [login]);

  if (!login) {
    return <h1>Please enter login</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>List of menu:</h1>
      {menu.map((menu) => (
        <div className="menu-container" key={menu.id}>
          <MenuItem menu={menu} />
        </div>
      ))}
    </div>
  );
};

export default memo(Menu);
