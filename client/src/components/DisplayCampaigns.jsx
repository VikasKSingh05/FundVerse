import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigateDetails = (campaign) => {
    navigate(`/campaign-details/${campaign.id}`);
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-lg text-black dark:text-white text-left">
        {title} ({campaigns?.length || 0})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <div className="flex justify-center w-full">
            <img
              src={loader}
              alt="loader"
              className="w-24 h-24 object-contain"
            />
          </div>
        )}

        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-sm leading-8 text-[#4e4e4e] dark:text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns?.length > 0 &&
          campaigns.map((campaign) => (
            <div key={campaign.id}>
              <FundCard
                {...campaign}
                handleClick={() => handleNavigateDetails(campaign)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
