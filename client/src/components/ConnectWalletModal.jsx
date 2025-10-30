import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { useNavigate } from "react-router-dom";

const DOWNLOAD_METAMASK = "https://metamask.io/download/";

const ConnectWalletModal = ({ isProtectedRoute = false, isOpen = false, onClose: onCloseExternal }) => {
  const { address, connectMetamask, connectionStatus } = useStateContext();
  const navigate = useNavigate();
  const hasMetaMask = typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask;
  const handleMetaMask = async () => {
    if (hasMetaMask) {
      await connectMetamask();
      onClose?.();
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(DOWNLOAD_METAMASK)}`;

  const onClose = () => {
    if (onCloseExternal) {
      onCloseExternal();
    }
    if (isProtectedRoute) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (address && onCloseExternal) {
      onCloseExternal();
    }
  }, [address, onCloseExternal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white dark:bg-[#1f2033] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#6F01Ec] to-[#03dac5] bg-clip-text text-transparent">
            Connect Wallet
          </h2>
          {!isProtectedRoute && (
            <button onClick={onClose} className="px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-[#3a3b57] transition-colors text-sm">
              Close
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {connectionStatus === "connecting" ? "Connecting..." : "Choose your preferred wallet to get started"}
        </p>

        {/* MetaMask */}
        <div className="mb-4 p-4 rounded-xl bg-white/60 dark:bg-[#2b2c45]/60 hover:bg-white/80 dark:hover:bg-[#2b2c45]/80 transition-all border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="w-8 h-8" />
              <div>
                <div className="font-semibold">MetaMask</div>
                <div className="text-xs text-gray-500">Popular</div>
              </div>
            </div>
            {hasMetaMask ? (
              <button 
                onClick={handleMetaMask} 
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6F01Ec] to-[#03dac5] text-white font-semibold hover:opacity-90 transition-opacity"
                disabled={connectionStatus === "connecting"}
              >
                {connectionStatus === "connecting" ? "Connecting..." : "Connect"}
              </button>
            ) : (
              <a href={DOWNLOAD_METAMASK} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-[#03dac5] text-black font-semibold hover:opacity-90 transition-opacity">
                Install
              </a>
            )}
          </div>
          {!hasMetaMask && (
            <div className="mt-4 flex items-center gap-4 p-3 bg-gray-50 dark:bg-[#2b2c45] rounded-lg">
              <img src={qrUrl} alt="Download MetaMask QR" className="w-24 h-24 rounded-md" />
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <div className="font-medium mb-1">Get MetaMask</div>
                <div className="text-xs">Scan to download MetaMask mobile app or visit MetaMask website</div>
              </div>
            </div>
          )}
        </div>

        {/* WalletConnect placeholder */}
        <div className="mb-3 p-4 rounded-xl bg-white/40 dark:bg-[#2b2c45]/40 opacity-60 cursor-not-allowed border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <div>
                <div className="font-semibold">WalletConnect</div>
                <div className="text-xs text-gray-500">Coming Soon</div>
              </div>
            </div>
            <button disabled className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-[#3a3b57] text-gray-600">
              Soon
            </button>
          </div>
        </div>

        {/* Coinbase placeholder */}
        <div className="mb-1 p-4 rounded-xl bg-white/40 dark:bg-[#2b2c45]/40 opacity-60 cursor-not-allowed border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <div>
                <div className="font-semibold">Coinbase Wallet</div>
                <div className="text-xs text-gray-500">Coming Soon</div>
              </div>
            </div>
            <button disabled className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-[#3a3b57] text-gray-600">
              Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
