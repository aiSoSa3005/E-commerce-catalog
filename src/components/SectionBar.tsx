import { useState } from "react";

const SectionBar = () => {
  const [activeSection, setActiveSection] = useState("new-arrival");
  const activeSections = [
    {
      id: "new-arrival",
      name: "New Arrival",
    },
    {
      id: "trendy",
      name: "Trendy",
    },
    {
      id: "popular",
      name: "Popular",
    },
  ];
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  return (
    <div className="flex items-center justify-between">
      <ul className="flex items-center text-xl font-semibold px-4 py-2 space-x-16 w-full ">
        {activeSections.map((section) => (
          <li
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`cursor-pointer ${
              activeSection === section.id ? "border-b-3 border-black" : ""
            } text-black p-1 `}
          >
            {section.name}
          </li>
        ))}
      </ul>
      <select
        className="border border-gray-300 rounded-md px-2 py-1 xl:mr-6 2xl:mr-24"
        name=""
        id=""
      >
        <option value="1">Sort by</option>
        <option value="2">Price: Low to High</option>
        <option value="3">Price: High to Low</option>
        <option value="4">Newest First</option>
        <option value="5">Oldest First</option>
      </select>
    </div>
  );
};

export default SectionBar;
