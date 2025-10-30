import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { DisplayCampaigns, CustomButton, ConnectWalletModal } from "../components";
import { ChevronDown } from "lucide-react";
import { SmartSeva } from "../assets";
import blockchain from "../assets/blockchain.jpg";

const isMeaningfulTitle = (titleRaw) => {
  if (typeof titleRaw !== "string") return false;
  const title = titleRaw.trim();
  if (title.length < 3) return false;
  if (/https?:\/\//i.test(title)) return false;
  if (!/[a-zA-Z].*[a-zA-Z]/.test(title)) return false;
  if (!/[aeiou]/i.test(title)) return false;
  const digits = (title.match(/\d/g) || []).length;
  if (digits / title.length > 0.3) return false;
  const badWords = /^(test|testing|asdf|qwer|xxxx|aaaa|lorem|ipsum|na|untitled|sample|demo)$/i;
  if (badWords.test(title)) return false;
  const words3plus = (title.match(/\b[a-zA-Z]{3,}\b/g) || []).length;
  if (words3plus < 2) return false;
  if (!/[a-zA-Z0-9]/.test(title)) return false;
  return true;
};

const isValidCampaign = (c) => {
  const hasTitle = isMeaningfulTitle(c?.title);
  const hasDesc = typeof c?.description === "string" && c.description.trim().length > 10;
  const hasImage = typeof c?.image === "string" && /^https?:\/\//.test(c.image) && /(\.(png|jpg|jpeg|gif|webp)$)/i.test(c.image);
  return hasTitle && hasDesc && hasImage;
};

const normalize = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

const Home = () => {
  const { campaigns, isLoading, address, connectMetamask, disconnect } = useStateContext();
  const navigate = useNavigate();
  const [showWallet, setShowWallet] = useState(false);

  const requestedTitles = [
    "Tree Plantation Programme",
    "The Dream of a Better Tomorrow",
    "Funds for girl education",
    "Palestine : Help Us",
    "Animals Shaving",
    "Hospital bill",
    "Education aid",
  ].map(normalize);

  const validCampaigns = (campaigns || []).filter(isValidCampaign).slice(0, 9);

  const selectedMap = new Map();
  const selectedExact = [];
  for (const req of requestedTitles) {
    const found = validCampaigns.find(
      (c) => normalize(c.title) === req || normalize(c.title).includes(req)
    );
    if (found && !selectedMap.has(found.id)) {
      selectedMap.set(found.id, true);
      selectedExact.push(found);
    }
  }

  const remaining = validCampaigns.filter((c) => !selectedMap.has(c.id));
  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }
  const needed = Math.max(0, 9 - selectedExact.length);
  const filler = remaining.slice(0, needed);

  const finalCampaigns = [...selectedExact, ...filler].slice(0, 9);
  const trendingCampaigns = finalCampaigns.slice(0, 3);

  const handleCreate = () => {
    if (!address) {
      setShowWallet(true);
      return;
    }
    navigate("/create-campaign");
  };

  const handleGetStarted = async () => {
    if (address) {
      await disconnect();
    } else {
      setShowWallet(true);
    }
  };

  return (
    <div className="mt-[200px] min-h-screen w-full relative">
      <ConnectWalletModal isOpen={showWallet} onClose={() => setShowWallet(false)} address={address} connectMetamask={connectMetamask} />
      <div className=" flex flex-col items-center justify-center text-center">
        <div className="text-4xl md:text-5xl font-extrabold text mb-6 dark:text-white uppercase">Empower change with transparency</div>
        <p className="text-lg md:text-xl text-gray-700 dark:text-[#e4e4e7] mb-10 mt-4 font-semibold">
          Fund projects that matter — powered by blockchain trust.
        </p>
        <img src={blockchain} alt="blockchain" className="w-20 h-20 object-cover absolute top-20 right-[400px]" />
        <img src={blockchain} alt="blockchain" className="w-20 h-20 object-cover absolute top-20 left-[400px]" />
        <div className="flex items-center gap-3">
          <CustomButton
            btnType="button"
            title="Create Campaign"
            styles="bg-[#6F01Ec] !text-white px-8 py-3 rounded-lg !font-semibold text-lg shadow-lg"
            handleClick={handleCreate}
          />
          <CustomButton
            btnType="button"
            title={address ? "Disconnect" : "Get Started"}
            styles={`${address ? "bg-[#e00b0b]" : "bg-[#03dac5]"} !text-black px-6 py-3 rounded-lg !font-semibold text-lg shadow-lg`}
            handleClick={handleGetStarted}
          />
        </div>
        <ChevronDown className="w-12 h-12 text-[#6F01Ec] mt-40 animate-bounce mb-40" />
        <div className="mt-4 mb-1">


      {/* About Section */}
      <section className=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 bg-white/10 dark:bg-[#1f2033]/60 border border-white/10 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <img src={SmartSeva} alt="SmartSeva" className="w-28 h-28 rounded-2xl shadow-lg" />
            <div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-[#6F01Ec] via-[#9b5cf6] to-[#03dac5] bg-clip-text text-transparent mb-10">About SmartSeva</div>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl mb-10">
                SmartSeva is a transdivarent, blockchain-powered crowdfunding platform. Create, fund, and track campaigns with on-chain visibility,
                auditable histories, and a community-first model. Every donation and withdrawal is recorded on-chain for trustless verification.
              </div>
            </div>
          </div>

          {/* Simple illustrative charts */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl p-5 bg-white/20 dark:bg-white/5 border border-white/10">
              <div className="text-[#03dac5] font-semibold mb-2 text-lg">Donations Over Time</div>
              <div className="h-24 flex items-end gap-2">
                {[20,40,30,60,50,70,90].map((h,i)=> (
                  <div key={i} className="w-6 bg-gradient-to-t from-[#6F01Ec] to-[#03dac5] rounded" style={{height:`${h}%`}}></div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-5 bg-white/20 dark:bg-white/5 border border-white/10">
              <div className="text-[#03dac5] font-semibold mb-2 text-lg">Top Categories</div>
              <ul className=" text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Education</li>
                <li>• Health</li>
                <li>• Environment</li>
                <li>• Humanitarian</li>
              </ul>
            </div>
            <div className="rounded-xl p-5 bg-white/20 dark:bg-white/5 border border-white/10">
              <div className="text-[#03dac5] font-semibold mb-2 text-lg">Transparency</div>
              <p className=" text-gray-700 dark:text-gray-300">All activity is verifiable on-chain. Visit Etherscan from any campaign to review its transaction history.</p>
            </div>
          </div>
        </div>
      </section>

                {/* Trending Campaigns */}
                  <div className="text-4xl font-bold text-[#ffffff] mb-20 uppercase mt-60">Trending Campaigns</div>
                  {trendingCampaigns.length > 0 ? (
                    <div className="flex flex-wrap gap-6 justify-center">
                      {trendingCampaigns.map((c) => (
                        <div key={c.id} className="glass-card bg-[#24243e]/90 dark:bg-[#191927]/95 p-4 rounded-xl min-w-[260px] max-w-xs w-full shadow-lg">
                          <img src={c.image} alt={c.title} className="rounded-lg w-full h-32 object-cover mb-2" />
                          <div className="font-semibold text-lg text-gray-900 dark:text-[#e4e4e7] mb-1">{c.title}</div>
                          <div className="text-xs text-[#03dac5]">by {c.name}</div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 truncate">{c.description?.slice(0, 60)}...</div>
                          <CustomButton title="Details" btnType="button" styles="bg-[#6F01Ec] mt-4 w-full text-sm text-white" handleClick={() => navigate(`/campaign-details/${c.id}`)} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-[#aaa]">No trending campaigns yet.</span>
                  )}
                </div>
              </div>
      {/* All Campaigns (optional, can be added back) */}
      {/* <DisplayCampaigns title="All Campaigns" isLoading={isLoading} campaigns={finalCampaigns} /> */}
    </div>
  );
};

export default Home;
