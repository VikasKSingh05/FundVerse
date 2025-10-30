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
    <div className="w-full">
      <h1 className="font-epilogue font-semibold text-lg text-black dark:text-white text-left">
        {title} ({campaigns?.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[20px] justify-items-center">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-24 h-24 object-contain "
          />
        )}
        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-sm leading-8 text-[#4e4e4e] dark:text-[#818183] ">
            You have not created any campaigns yet
          </p>
        )}
        {!isLoading && campaigns?.length > 0 &&
          campaigns?.map((campaign) => (
            <div key={campaign.id} className="w-full max-w-[320px]">
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
