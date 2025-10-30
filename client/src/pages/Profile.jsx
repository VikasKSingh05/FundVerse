import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = () => {
  const { address, contract, campaigns, getUserCampaigns, userCampaigns } = useStateContext();
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoadingUser(true);
      await getUserCampaigns();
      setLoadingUser(false);
    };
    run();
  }, [contract, address, campaigns]);

  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={loadingUser}
      campaigns={userCampaigns}
    />
  );
};

export default Profile;
