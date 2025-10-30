import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigateDetails = (campaign) => {
    navigate(`/campaign-details/${campaign.id}`);
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-lg text-black dark:text-white text-left">
        {title} ({campaigns?.length})
      </h1>
      <motion.div
        className="flex flex-wrap mt-[20px] gap-[26px]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
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
        <AnimatePresence>
          {!isLoading && campaigns?.length > 0 &&
            campaigns?.map((campaign) => (
              <motion.div
                key={uuidv4()}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              >
                <FundCard
                  {...campaign}
                  handleClick={() => handleNavigateDetails(campaign)}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DisplayCampaigns;
