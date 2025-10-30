import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context";
import { logo } from "../assets";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Home as HomeIcon, Layers, Trophy } from "lucide-react";

const CENTER_LINKS = [
  {
    name: "Home",
    route: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    name: "Campaigns",
    route: "/campaigns",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    name: "Leaderboard",
    route: "/leaderboard",
    icon: <Trophy className="w-6 h-6 text-[#FFD700]" />,
  },
];

const Navbar = () => {
  const { address, disconnect } = useStateContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef();

  // Sticky + glass on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showDropdown]);

  return (
    <nav className={`sticky top-0 z-40 w-full transition-all ${isScrolled ? "bg-white/60 dark:bg-[#19192a]/60 shadow-xl backdrop-blur-xl" : "bg-white/30 dark:bg-[#181824]/40"} py-2 px-2 flex items-center justify-between glass-card`} style={{backdropFilter: "blur(15px)"}}>
      {/* Logo (left) */}
      <NavLink to="/" className="flex items-center shrink-0">
        <img src={logo} alt="FundVerse Logo" className="w-12 h-12 hover:scale-105 transition-transform" />
      </NavLink>
      {/* Center nav links */}
      <div className="hidden md:flex mx-auto gap-4">
        {CENTER_LINKS.map(({ name, route, icon }) => (
          <NavLink
            to={route}
            key={name}
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-3 rounded-2xl text-base font-semibold glass-card shadow-sm transition-all duration-150 hover:text-[#03dac5] dark:hover:text-[#03dac5] hover:scale-105 ${isActive ? 'bg-[#e5e5e5] dark:bg-[#212132] text-[#6F01Ec]' : 'bg-white/40 dark:bg-[#292940]/50 text-[#2c2838] dark:text-[#dadada]'} `
            }
          >
            {icon}
            <span className="hidden sm:inline">{name}</span>
          </NavLink>
        ))}
      </div>
      {/* User circle (right) */}
      <div className="relative shrink-0">
        <button
          className="w-12 h-12 rounded-full bg-[#dedede] dark:bg-[#2a2b43] flex items-center justify-center border-2 border-[#6F01Ec] transition-all focus:outline-none focus:ring-4 focus:ring-[#03dac597] overflow-hidden"
          onClick={() => setShowDropdown((prev) => !prev)}
          title="Account Menu"
        >
          <Jazzicon diameter={46} seed={jsNumberForAddress(`${address || '0x0'}`)} />
        </button>
        {/* Dropdown */}
        {showDropdown && (
          <div ref={dropdownRef} className="absolute right-0 mt-3 bg-white dark:bg-[#232336] min-w-[260px] rounded-xl shadow-2xl border border-[#ccccdf38] p-4 z-50 glass-card animate-fade-in-up">
            <div className="flex flex-col items-center gap-2">
              <Jazzicon diameter={40} seed={jsNumberForAddress(`${address || '0x0'}`)} />
              <span className="block text-xs text-[#6F01Ec] font-bold">Account</span>
              <span className="font-mono text-xs break-all text-gray-700 dark:text-[#e4e4e7]">{address ? address : "No wallet connected"}</span>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <NavLink
                to="/profile"
                className="w-full py-2 px-3 font-semibold glass-card transition hover:bg-[#03dac5] hover:text-black rounded text-center"
                onClick={() => setShowDropdown(false)}
              >
                My Profile
              </NavLink>
              <button
                className="w-full py-2 px-3 font-semibold glass-card transition hover:bg-[#e00b0b] hover:text-white rounded text-center"
                onClick={() => {
                  setShowDropdown(false);
                  setTimeout(disconnect, 150);
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile hamburger: hidden for this task, could extend for full mobile experience if needed */}
    </nav>
  );
};

export default Navbar;
