import type { ReactNode } from "react";
import { SiTekton } from "react-icons/si";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import InputSearch from "../components/InputSearch";
import NavBar from "../components/NavBar";

type MainLayoutProps = {
  children: ReactNode;
  filters?: ReactNode;
  side?: ReactNode;
  onSearch?: (query: string) => void;
  onLogoClick?: () => void;
};

const MainLayout = ({
  children,
  filters,
  side,
  onSearch,
  onLogoClick,
}: MainLayoutProps) => {
  return (
    <div className="grid h-screen w-screen lg:grid-cols-[2fr_5fr_3fr] grid-rows-[auto_1fr] mx-auto max-w-[1460px]">
      <div className="bg-white relative font-inter border border-gray-200 text-xl font-semibold flex items-center gap-2 p-2">
        <span className="p-2">
          <SiTekton className="w-10 h-10" />
        </span>
        <h1 className="text-2xl font-semibold ">HIRONAGHLE</h1>
        {onLogoClick && (
          <button
            type="button"
            onClick={onLogoClick}
            className="absolute cursor-pointer right-0 top-4 w-7 h-7 bg-white border-b border-t border-l border-gray-300 flex items-center justify-center"
            aria-label="Back to all"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>
        )}
      </div>
      <nav className="bg-white col-span-2 border border-gray-200 w-full flex items-center gap-2 p-2">
        <div className="flex-2">
          {onSearch ? <InputSearch onSearch={onSearch} /> : null}
        </div>
        <div className="w-full flex items-center gap-2 flex-1">
          <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center">
            <CiBellOn size={20} color="gray" />
          </div>
          <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center">
            <TfiEmail size={20} color="gray" />
          </div>
        </div>
      </nav>
      <div className="bg-white grid grid-cols-[1fr_3fr]">
        <div className="bg-white border border-gray-200">
          <NavBar />
        </div>
        <div className="bg-white">{filters}</div>
      </div>
      <div className="bg-white border border-gray-200 p-2 ">{children}</div>
      <div className="bg-white">{side}</div>
    </div>
  );
};

export default MainLayout;
