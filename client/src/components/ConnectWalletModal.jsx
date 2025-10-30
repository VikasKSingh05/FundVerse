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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      {/* Modal Card */}
      <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-gradient-to-br from-white/80 to-white/60 dark:from-[#1a1b2b]/90 dark:to-[#22233a]/90 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-sm tracking-widest text-[#ffffff]">SMARTSEVA</div>
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-[#6F01Ec] via-[#9b5cf6] to-[#03dac5] bg-clip-text text-transparent">Connect a wallet</h2>
          </div>
          {!isProtectedRoute && (
            <button onClick={onClose} className="px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 text-sm text-white hover:bg-white/80 dark:hover:bg-white/20 transition-colors">Close</button>
          )}
        </div>  

        {/* Body */}
        <div className="p-5">
          <p className="text-sm text-white dark:text-white mb-5">
            {connectionStatus === "connecting" ? "Connecting to wallet…" : "Choose your preferred wallet to get started."}
          </p>

          {/* Wallet list */}
          <div className="grid grid-cols-1 gap-3">
            {/* MetaMask Card */}
            <div className="group rounded-xl border border-white/15 bg-white/70 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 transition-colors">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* <img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="w-8 h-8" /> */}
                  <div>
                    <div className="font-semibold text-white">MetaMask</div>
                    <div className="text-[11px] uppercase tracking-wide text-white">Popular</div>
                  </div>
                </div>
                {hasMetaMask ? (
                  <button
                    onClick={handleMetaMask}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6F01Ec] to-[#03dac5] text-white font-semibold shadow hover:opacity-90 transition-opacity"
                    disabled={connectionStatus === "connecting"}
                  >
                    {connectionStatus === "connecting" ? "Connecting…" : "Connect"}
                  </button>
                ) : (
                  <a
                    href={DOWNLOAD_METAMASK}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#03dac5] text-black font-semibold shadow hover:opacity-90 transition-opacity"
                  >
                    Install
                  </a>
                )}
              </div>
              {!hasMetaMask && (
                <div className="px-4 pb-4">
                  <div className="mt-2 flex items-center gap-4 p-3 rounded-lg bg-gray-50/80 dark:bg-white/5">
                    <img src={qrUrl} alt="Download MetaMask QR" className="w-24 h-24 rounded-md" />
                    <div className="text-xs text-white dark:text-white">
                      <div className="font-semibold mb-1">Get MetaMask</div>
                      Scan to download the MetaMask app or visit their website, then return and press Connect.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* WalletConnect (Coming soon) */}
            <div className="opacity-60 cursor-not-allowed rounded-xl border border-white/15 bg-white/50 dark:bg-white/5">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">W</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">WalletConnect</div>
                    <div className="text-[11px] uppercase tracking-wide text-white">Coming soon</div>
                  </div>
                </div>
                <button disabled className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-white/10 text-gray-700 dark:text-white">Soon</button>
              </div>
            </div>

            {/* Coinbase (Coming soon) */}
            <div className="opacity-60 cursor-not-allowed rounded-xl border border-white/15 bg-white/50 dark:bg-white/5">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Coinbase Wallet</div>
                    <div className="text-[11px] uppercase tracking-wide text-white">Coming soon</div>
                  </div>
                </div>
                <button disabled className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-white/10 text-gray-700 dark:text-white">Soon</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <div className="text-[11px] text-white dark:text-white">
            By connecting a wallet you agree to our Terms and acknowledge that your wallet address will be used to interact with the SmartSeva app.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
