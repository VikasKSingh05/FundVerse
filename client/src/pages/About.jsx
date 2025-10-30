import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16 min-h-[60vh]">
      <section className="w-full max-w-3xl glass-card bg-[#181824]/80 dark:bg-[#232336]/90 rounded-2xl shadow-lg p-8 mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#03dac5] via-[#6F01Ec] to-[#03dac5] dark:text-white">About FundVerse</h1>
        <p className="text-lg text-[#5eead4] dark:text-[#5eead4] mb-2 font-semibold">Empower change with transparency. Fund projects that matter — powered by blockchain trust.</p>
        <p className="text-base md:text-lg text-gray-700 dark:text-[#e4e4e7] mb-2">
          FundVerse is a blockchain-based crowdfunding platform designed to bring transparent, trustless, and community-driven funding to everyone. Built on Ethereum, FundVerse leverages smart contracts to ensure every transaction, donation, and withdrawal is open, auditable, and secure.
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="glass-card bg-[#1e293b]/70 dark:bg-[#13131a]/80 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[#6F01Ec] mb-2">Our Mission</h2>
          <p className="text-gray-700 dark:text-[#e4e4e7]">Enable anyone, anywhere to raise and support meaningful causes, with unprecedented transparency, autonomy, and trust enabled by blockchain technology.</p>
        </div>
        <div className="glass-card bg-[#1e293b]/70 dark:bg-[#13131a]/80 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[#03dac5] mb-2">Technology</h2>
          <p className="text-gray-700 dark:text-[#e4e4e7]">FundVerse uses Ethereum smart contracts and Thirdweb SDK to provide secure, decentralized campaign creation, fundraising, and fund management. Every monetary flow can be linked and verified on-chain.</p>
        </div>
        <div className="glass-card bg-[#1e293b]/70 dark:bg-[#13131a]/80 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-[#eab308] mb-2">Blockchain Transparency</h2>
          <p className="text-gray-700 dark:text-[#e4e4e7]">Every donation and withdrawal triggers on-chain events, visible on the Ethereum blockchain. Users can verify transactions using campaign IDs, see live event logs, and even click to view activity on Etherscan.</p>
        </div>
      </div>
      <section className="w-full max-w-3xl glass-card bg-[#25243f]/70 dark:bg-[#13131a]/80 rounded-2xl shadow-lg p-8 mt-10 text-center">
        <h3 className="text-2xl font-bold text-[#6F01Ec] mb-2">Our Philosophy</h3>
        <p className="text-gray-700 dark:text-[#e4e4e7]">We believe in decentralization, trustless collaboration, and putting the power into the hands of communities. By prioritizing transparency and accessibility, FundVerse aims to reshape how people support causes and build a more equitable future.</p>
      </section>
    </div>
  );
};

export default About;
