import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import ProtectedRoute from "../components/ProtectedRoute";

const Profile = () => {
  const { address, contract, getUserCampaigns, userCampaigns } = useStateContext();
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    let isMounted = true; // prevents state updates after unmount

    const run = async () => {
      if (contract && address && isMounted) {
        setLoadingUser(true);
        await getUserCampaigns();
        setLoadingUser(false);
      }
    };

    run();

    return () => {
      isMounted = false; // cleanup
    };
  }, [contract, address]); // ✅ removed 'campaigns' to prevent re-fetch loop

  return (
    <ProtectedRoute>
      <DisplayCampaigns
        title="My Campaigns"
        isLoading={loadingUser}
        campaigns={userCampaigns}
      />
    </ProtectedRoute>
  );
};

export default Profile;
