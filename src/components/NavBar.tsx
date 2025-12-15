import { MdOutlineBookmarkAdded } from "react-icons/md";
import { CiHome, CiSettings, CiShoppingCart } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { name: "Home", to: "/", icon: CiHome, id: 0 },
    { name: "Cart", to: "/cart", icon: CiShoppingCart, id: 1 },
    { name: "Saved", to: "/saved", icon: MdOutlineBookmarkAdded, id: 2 },
    { name: "Settings", to: "/settings", icon: CiSettings, id: 3 },
  ];

  return (
    <ul className="flex flex-col space-y-8 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 py-2 rounded-lg cursor-pointer ${
                  isActive ? "bg-black text-white" : "bg-white text-gray-500"
                }`
              }
            >
              {({ isActive }) => (
                <Icon size={30} color={isActive ? "white" : "gray"} />
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavBar;
