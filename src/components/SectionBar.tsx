import { useState } from "react";

interface SectionBarProps {
  onSectionChange: (section: string) => void;
}
const SectionBar = ({ onSectionChange }: SectionBarProps) => {
  const [activeSection, setActiveSection] = useState("");
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
    onSectionChange(sectionId);
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
        className="border border-gray-300 outline-none rounded-md px-2 py-1 xl:mr-6 2xl:mr-24"
        name=""
        id=""
      >
        <option value="">Sort by</option>
        <option value="price-low-to-high">Price: Low to High</option>
        <option value="price-high-to-low">Price: High to Low</option>
        <option value="newest-first">Newest First</option>
        <option value="oldest-first">Oldest First</option>
      </select>
    </div>
  );
};

export default SectionBar;
