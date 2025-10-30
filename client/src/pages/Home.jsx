import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { DisplayCampaigns, CustomButton, ConnectWalletModal } from "../components";
import { ChevronDown } from "lucide-react";

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

  // First pick requested titles in the given order if available
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

  // Fill with two random others (not already selected) to make total 9
  const remaining = validCampaigns.filter((c) => !selectedMap.has(c.id));
  // Shuffle remaining
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
          <div className="text-4xl font-bold text-[#03dac5] mb-20 uppercase">Trending Campaigns</div>
          {trendingCampaigns.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {trendingCampaigns.map((c) => (
                <div key={c.id} className="glass-card bg-[#24243e]/90 dark:bg-[#191927]/95 p-4 rounded-xl min-w-[260px] max-w-xs w-full shadow-lg">
                  <img src={c.image} alt={c.title} className="rounded-lg w-full h-32 object-cover mb-2" />
                  <div className="font-semibold text-lg text-gray-900 dark:text-[#e4e4e7] mb-1">{c.title}</div>
                  <div className="text-xs text-[#03dac5]">by {c.name}</div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 truncate">{c.description?.slice(0, 60)}...</div>
                  <CustomButton title="Details" btnType="button" styles="bg-[#03dac5] mt-4 w-full text-sm text-black shadow" handleClick={() => navigate(`/campaign-details/${c.id}`)} />
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 dark:text-[#aaa]">No trending campaigns yet.</span>
          )}
        </div>
      </div>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={validCampaigns}
      />
    </div>
  );
};

export default Home;
