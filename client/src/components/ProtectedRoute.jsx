import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { useNavigate } from 'react-router-dom';
import ConnectWalletModal from './ConnectWalletModal';

const ProtectedRoute = ({ children }) => {
  const { address, connectionStatus } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only show modal if user is not connected and not in the process of connecting
    if (!address && connectionStatus !== "connecting") {
      setShowModal(true);
    }
  }, [address, connectionStatus]);

  if (!address) {
    return (
      <>
        {children}
        <ConnectWalletModal 
          isProtectedRoute={true} 
          isOpen={showModal} 
          onClose={() => {
            setShowModal(false);
            navigate('/');
          }}
        />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;