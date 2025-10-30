import React from "react";
import { Leaderboard } from "../components";
import { Trophy } from "lucide-react";

const GLOBAL_DONORS = [
  { name: "vitalik.eth", address: "0x1234...abcd", amount: 7.2, tx: "0xFakeTxHashA" },
  { name: "alice.eth", address: "0xBEEF...C0DE", amount: 6.9, tx: "0xFakeTxHashB" },
  { name: null, address: "0xFeed...F00D", amount: 6.25, tx: "0xFakeTxHashG" },
];

const TOP_CAMPAIGN = {
  title: "Water for All",
  donors: [
    { name: "alice.eth", address: "0xFFFF...8888", amount: 3.9, tx: "0xTx1" },
    { name: null, address: "0xAAAA...1234", amount: 2.85, tx: "0xTx2" },
  ],
};

const GlobalLeaderboard = () => (
  <div className="w-full min-h-[70vh] flex flex-col items-center px-2 py-4">
    <section className="w-full max-w-2xl mx-auto bg-[#181824]/90 dark:bg-[#232336]/95 rounded-2xl glass-card shadow p-8 my-6 text-center flex flex-col items-center">
      <Trophy className="w-12 h-12 text-[#FFD700] mb-3" />
      <h1 className="text-3xl font-extrabold text-[#6F01Ec] mb-2">Global Donor Leaderboard</h1>
      <p className="text-md md:text-lg text-gray-300 mb-1">Celebrating the most generous contributors in FundVerse history!</p>
    </section>
    {/* <Leaderboard global donors={GLOBAL_DONORS} /> */}
    <section className="w-full max-w-2xl mx-auto bg-[#191927]/80 dark:bg-[#212132]/95 rounded-2xl glass-card shadow p-8 my-6 text-center flex flex-col items-center">
      <h2 className="text-2xl font-extrabold mb-3 text-[#03dac5]">Most Generous Campaign</h2>
      <div className="font-bold text-[#f7b731] text-xl mb-2">{TOP_CAMPAIGN.title}</div>
      <Leaderboard global={false} donors={TOP_CAMPAIGN.donors} />
    </section>
  </div>
);

export default GlobalLeaderboard;
