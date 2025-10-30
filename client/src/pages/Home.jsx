import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { DisplayCampaigns, CustomButton } from "../components";

const Home = () => {
  const { campaigns, isLoading } = useStateContext();
  const navigate = useNavigate();

  // Optionally, filter trending by most funded, latest, or random for mock/demo
  const trendingCampaigns = campaigns?.slice(0, 3) ?? [];

  return (
    <>
      <section className="w-full bg-gradient-to-br from-[#181824]/80 via-[#22223f]/90 to-[#13131a]/95 rounded-2xl shadow mb-10 py-12 px-2 md:px-12 flex flex-col items-center justify-center text-center min-h-[260px]">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#03dac5] via-[#6F01Ec] to-[#03dac5] text-transparent bg-clip-text mb-6">Empower change with transparency</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Fund projects that matter — powered by blockchain trust.
        </p>
        <CustomButton
          btnType="button"
          title="Create Campaign"
          styles="bg-[#6F01Ec] text-white px-8 py-3 rounded-lg !font-semibold text-lg shadow-lg mb-8"
          handleClick={() => navigate("/create-campaign")}
        />
        <div className="mt-4 mb-1">
          <h2 className="text-2xl font-bold text-[#03dac5] mb-3">Trending Campaigns</h2>
          {trendingCampaigns.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {trendingCampaigns.map((c) => (
                <div key={c.id} className="glass-card bg-[#24243e]/90 dark:bg-[#191927]/95 p-4 rounded-xl min-w-[260px] max-w-xs w-full shadow-lg">
                  <img src={c.image} alt={c.title} className="rounded-lg w-full h-32 object-cover mb-2" />
                  <div className="font-semibold text-lg text-gray-100 mb-1">{c.title}</div>
                  <div className="text-xs text-[#03dac5]">by {c.name}</div>
                  <div className="mt-2 text-sm text-gray-400 truncate">{c.description?.slice(0, 60)}...</div>
                  <CustomButton title="Details" btnType="button" styles="bg-[#03dac5] mt-4 w-full text-sm text-black shadow" handleClick={() => navigate(`/campaign-details/${c.id}`)} />
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">No trending campaigns yet.</span>
          )}
        </div>
      </section>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </>
  );
};

export default Home;
