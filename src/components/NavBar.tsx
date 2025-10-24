import { useState } from "react";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { CiHome, CiSettings, CiShoppingCart } from "react-icons/ci";
const NavBar = () => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const navItems = [
    { name: "Home", href: "/", icon: CiHome, id: 0 },
    { name: "Cart", href: "/cart", icon: CiShoppingCart, id: 1 },
    { name: "Saved", href: "/saved", icon: MdOutlineBookmarkAdded, id: 2 },
    { name: "Settings", href: "/settings", icon: CiSettings, id: 3 },
  ];

  return (
    <ul className="flex flex-col space-y-8 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <li
            key={item.id}
            className={`flex items-center justify-center gap-2  py-2 rounded-lg cursor-pointer ${
              activeItem === item.id
                ? "bg-black text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <Icon size={30} color={activeItem === item.id ? "white" : "gray"} />
          </li>
        );
      })}
    </ul>
  );
};

export default NavBar;
