import React from "react";
import { Award, Trophy, ExternalLink } from "lucide-react";

const MOCK_DONORS = [
  { name: "vitalik.eth", address: "0x1234...abcd", amount: 3.2, tx: "0xFakeTxHashA" },
  { name: null, address: "0xBEEF...C0DE", amount: 2.1, tx: "0xFakeTxHashB" },
  { name: "donatorkitty.eth", address: "0xFeed...F00D", amount: 1.7, tx: "0xFakeTxHashC" },
];

const Leaderboard = ({ global = false, donors = MOCK_DONORS }) => (
  <div className="glass-card rounded-2xl shadow-lg bg-[#191927]/80 dark:bg-[#13131a]/95 p-6 mb-8 max-w-xl mx-auto">
    <div className="flex gap-2 items-center mb-4">
      {global ? <Trophy className="text-[#F7B731] w-6 h-6" /> : <Award className="text-sky-400 w-6 h-6" />}
      <h3 className="text-xl font-bold text-[#6F01Ec] dark:text-[#e4e4e7]">{global ? "Top Donors (Global)" : "Top Donors (This Campaign)"}</h3>
    </div>
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#03dac5] dark:text-[#03dac5]">
            <th className="font-semibold">Rank</th>
            <th className="font-semibold">Donor</th>
            <th className="font-semibold">Amount</th>
            <th className="font-semibold">Txn</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, i) => (
            <tr key={donor.address} className="hover:bg-[#262647]/70 dark:hover:bg-[#22223b]/80 transition-all text-gray-900 dark:text-[#e4e4e7]">
              <td className="py-2 font-semibold text-[#FFD700]">#{i + 1}</td>
              <td className="py-2 text-[#03dac5] font-mono flex items-center gap-1">
                {donor.name || donor.address}
              </td>
              <td className="py-2 font-semibold">{donor.amount} ETH</td>
              <td className="py-2">
                <a href={`https://sepolia.etherscan.io/tx/${donor.tx}`} target="_blank" rel="noopener noreferrer" className="inline-flex gap-1 items-center text-[#6F01Ec] underline">View<ExternalLink className="w-3 h-3 ml-1" /></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Leaderboard;
