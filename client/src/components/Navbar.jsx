import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context";
import { logo } from "../assets";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { ConnectWallet, darkTheme, lightTheme } from "@thirdweb-dev/react";
import ThemeModes from "./ThemeModes";
import {
  Home as HomeIcon,
  Layers,
  Info,
  UserRound,
  LogOut,
  Trophy
} from "lucide-react";

const NAV_LINKS = [
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
  {
    name: "About",
    route: "/about",
    icon: <Info className="w-6 h-6" />,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: <UserRound className="w-6 h-6" />,
  },
  {
    name: "Disconnect",
    route: "/disconnect",
    icon: <LogOut className="w-6 h-6" />,
  },
];

const Navbar = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { address, themeMode } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[100px] shadow-md">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-sm placeholder:text-[#6e7682] text-black dark:text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#6F01Ec] flex justify-center items-center cursor-pointer shadow-md">
          {/* purposely left as is for now */}
          <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
      </div>

      {/* Desktop nav links */}
      <div className="sm:flex hidden flex-row justify-end gap-4 items-center">
        {NAV_LINKS.map(({ name, icon, route }) => (
          <NavLink to={route} key={name} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 glass-card rounded-xl font-semibold transition-colors duration-150 text-[#303050] dark:text-[#dedeea] hover:text-[#03dac5] ${isActive ? 'bg-[#e5e5e5] dark:bg-[#212132] text-[#6F01Ec]' : 'bg-[#f2f2f2]/70 dark:bg-[#232336]/60'}`}>
            {icon}
            <span className="hidden md:inline">{name}</span>
          </NavLink>
        ))}
        <ConnectWallet
          className={"!font-epilogue !bg-[#03dac5] !mr-5 !shadow-md !outline-none !font-semibold"}
          theme={
            (themeMode === "Light" && lightTheme({colors: {accentButtonBg: "#03dac5",primaryButtonBg: "#03dac5",accentText: "#03dac5",}})) ||
            (themeMode === "Dark" && darkTheme({colors: {accentButtonBg: "#03dac5",primaryButtonBg: "#03dac5",accentText: "#03dac5",}}))
          }
          modalTitle={"FundVerse"}
          modalSize={"wide"}
          showThirdwebBranding={false}
        />
        <NavLink to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#f0f0f0] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer overflow-hidden shadow-md">
            <Jazzicon
              className="w-[60%] h-[60%] object-contain"
              diameter={52}
              seed={jsNumberForAddress(`${address}`)}
            />
          </div>
        </NavLink>
      </div>

      {/* Mobile nav and nav drawer */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-14 h-14 rounded-xl bg-[#f0f0f0] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer shadow-md">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="w-4/5 h-4/5 object-contain" />
          </NavLink>
        </div>
        <button onClick={() => setToggleDrawer((prev) => !prev)} aria-label="menu" className="z-20">
          <svg className="w-10 h-10 text-[#6F01Ec]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={toggleDrawer ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
        </button>
        <div className={`absolute top-20 right-0 left-0 bg-[#f2f2f2] dark:bg-[#1c1c24] z-10 shadow-secondary py-4 rounded-xl ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>        
          <ul className="mb-4 flex flex-col items-center gap-3">
            {NAV_LINKS.map(({ name, icon, route }) => (
              <NavLink to={route} key={name} className={({ isActive }) => `flex items-center gap-2 w-11/12 justify-center px-4 py-3 glass-card rounded-xl font-semibold transition-colors duration-150 text-[#303050] dark:text-[#dedeea] hover:text-[#03dac5] ${isActive ? 'bg-[#e5e5e5] dark:bg-[#212132] text-[#6F01Ec]' : 'bg-[#f2f2f2]/70 dark:bg-[#232336]/60'}`} onClick={() => setToggleDrawer(false)}>
                {icon}
                <span>{name}</span>
              </NavLink>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-3 mx-2">
            <ConnectWallet
              className={"!font-epilogue !bg-[#03dac5] !mr-5 !shadow-md !outline-none !font-semibold"}
              theme={
                (themeMode === "Light" && lightTheme({colors: {accentButtonBg: "#03dac5",primaryButtonBg: "#03dac5",accentText: "#03dac5",}})) ||
                (themeMode === "Dark" && darkTheme({colors: {accentButtonBg: "#03dac5",primaryButtonBg: "#03dac5",accentText: "#03dac5",}}))
              }
              modalTitle={"FundVerse"}
              modalSize={"wide"}
              showThirdwebBranding={false}
            />
            <div className="flex justify-evenly items-center w-40">
              <ThemeModes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
