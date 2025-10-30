import React from "react";
import { NavLink } from "react-router-dom";
import ThemeModes from "./ThemeModes";
import {
  Home as HomeIcon,
  Layers,
  Trophy,
  Info,
  UserRound,
  LogOut
} from "lucide-react";

const SIDEBAR_LINKS = [
  { name: "Home", route: "/", icon: <HomeIcon className="w-6 h-6" /> },
  { name: "Campaigns", route: "/campaigns", icon: <Layers className="w-6 h-6" /> },
  { name: "Leaderboard", route: "/leaderboard", icon: <Trophy className="w-6 h-6 text-[#FFD700]" /> },
  { name: "About", route: "/about", icon: <Info className="w-6 h-6" /> },
  { name: "Profile", route: "/profile", icon: <UserRound className="w-6 h-6" /> },
  { name: "Disconnect", route: "/disconnect", icon: <LogOut className="w-6 h-6" /> },
];

const Sidebar = () => {
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] select-none">
      <NavLink to="/">
        <div className="w-[52px] h-[52px] flex justify-center items-center rounded-full bg-[#f0f0f0] dark:bg-[#2c2f32] shadow-md mb-8">
          <span className="font-extrabold text-2xl text-[#6F01Ec]">F</span>
        </div>
      </NavLink>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 shadow-md">
        <div className="flex flex-col justify-center items-center gap-3 w-full">
          {SIDEBAR_LINKS.map(({ name, icon, route }) => (
            <NavLink
              key={name}
              to={route}
              className={({ isActive }) => `flex flex-col items-center justify-center py-3 w-full glass-card rounded-xl transition-all duration-200 text-[#232336] dark:text-[#dedeea] ${isActive ? 'bg-[#e5e5e5] dark:bg-[#212132] text-[#6F01Ec]' : 'bg-transparent hover:bg-[#d1d9ef]/40 dark:hover:bg-[#232336]/50'}`}
              title={name}
            >
              {icon}
              <span className="sr-only">{name}</span>
            </NavLink>
          ))}
        </div>
        <div className="flex items-center justify-center flex-col gap-1 mt-8">
          <ThemeModes />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
