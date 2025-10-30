import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-black relative">
 {/* Dark White Dotted Grid Background */}
 <div
    className="absolute inset-0 z-0"
    style={{
      background: "#000000",
      backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
      `,
      backgroundSize: "30px 30px",
      backgroundPosition: "0 0",
    }}
  />


      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
