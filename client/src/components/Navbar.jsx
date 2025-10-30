import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context";
// import { logo } from "../assets";
import {SmartSeva} from "../assets";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ConnectWalletModal from "./ConnectWalletModal";

const CENTER_LINKS = [
  { name: "Home", route: "/" },
  { name: "Campaigns", route: "/campaigns" },
  { name: "Leaderboard", route: "/leaderboard" },
];

const Navbar = () => {
  const { address, disconnect, connectMetamask } = useStateContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <nav className={`sticky top-0 z-40 w-full transition-all ${isScrolled ? "bg-white/60 dark:bg-[#19192a]/60 shadow-xl backdrop-blur-xl" : "bg-white/30 dark:bg-[#181824]/40"} py-4 px-10 flex items-center justify-between glass-card`} style={{ backdropFilter: "blur(15px)" }}>
      <NavLink to="/" className="flex items-center shrink-0">
        <img src={SmartSeva} alt="SmartSeva Logo" className="w-12 h-12 hover:scale-105 transition-transform" />
        <span className="text-2xl font-bold text-[#6F01Ec]">Smart</span>
        <span className="text-2xl font-bold text-[#aeaeae]">Seva</span>
      </NavLink>
      <div className="hidden md:flex mx-auto gap-3">
        {CENTER_LINKS.map(({ name, route }) => (
          <NavLink
            to={route}
            key={name}
            className={({ isActive }) =>
              `px-6 py-3 rounded-2xl text-base font-semibold transition-all duration-150 focus:outline-none focus:ring-4 ring-[#6F01Ec33] ${
                isActive
                  ? "bg-[#6F01Ec] text-white shadow-lg"
                  : "bg-white/50 dark:bg-[#2b2b48]/60 text-[#1f1f2e] dark:text-[#e5e7eb] hover:bg-white/70 dark:hover:bg-[#35355a] hover:shadow"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
      <div className="relative shrink-0">
        <button
          className="w-12 h-12 rounded-full bg-[#dedede] dark:bg-[#2a2b43] flex items-center justify-center border-2 border-[#6F01Ec] transition-all focus:outline-none focus:ring-4 focus:ring-[#03dac597] overflow-hidden"
          onClick={() => setShowDropdown((prev) => !prev)}
          title="Account Menu"
        >
          <Jazzicon diameter={46} seed={jsNumberForAddress(`${address || '0x0'}`)} />
        </button>
        {showDropdown && (
          <div ref={dropdownRef} className="absolute right-0 mt-3 bg-white dark:bg-[#232336] min-w-[260px] rounded-xl shadow-2xl border border-[#ccccdf38] p-4 z-50 glass-card animate-fade-in-up">
            <div className="flex flex-col items-center gap-2">
              <Jazzicon diameter={40} seed={jsNumberForAddress(`${address || '0x0'}`)} />
              <span className="block text-[#c1ec01] font-bold text-xl">Account</span>
              <span className="font-mono text-xs break-all text-gray-700 dark:text-[#e4e4e7]">{address ? address : "No wallet connected"}</span>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <NavLink
                to="/profile"
                className="w-full py-2 px-3 font-semibold glass-card transition hover:bg-[#2ab7a9] hover:text-black rounded text-center dark:text-white"
                onClick={() => setShowDropdown(false)}
              >
                My Profile
              </NavLink>
              {/* <button
                className={`w-full py-2 px-3 font-semibold glass-card transition rounded text-center dark:text-white ${address ? 'hover:bg-[#e00b0b] hover:text-white' : 'hover:bg-[#03dac5] hover:text-black'}`}
                onClick={() => {
                  setShowDropdown(false);
                  setTimeout(() => {
                    if (address) disconnect();
                    else setShowWalletModal(true);
                  }, 150);
                }}
              >
                {address ? 'Disconnect' : 'Connect'}
              </button> */}
            </div>
          </div>
        )}
        <ConnectWalletModal 
          isOpen={showWalletModal} 
          onClose={() => setShowWalletModal(false)} 
        />
      </div>
    </nav>
  );
};

export default Navbar;
