import React from "react";

const DOWNLOAD_METAMASK = "https://metamask.io/download/";

const ConnectWalletModal = ({ isOpen, onClose, address, connectMetamask }) => {
  if (!isOpen) return null;

  const hasMetaMask = typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask;
  const handleMetaMask = async () => {
    if (hasMetaMask) {
      await connectMetamask();
      onClose?.();
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(DOWNLOAD_METAMASK)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white dark:bg-[#1f2033] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#6F01Ec]">Connect a Wallet</h2>
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-gray-200 dark:bg-[#2b2c45] text-sm">Close</button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Select a wallet to continue. {address ? "You are connected." : "No wallet connected."}</p>

        {/* MetaMask */}
        <div className="mb-4 p-3 rounded-xl glass-card bg-white/60 dark:bg-[#2b2c45]/60">
          <div className="flex items-center justify-between">
            <div className="font-semibold">MetaMask</div>
            {hasMetaMask ? (
              <button onClick={handleMetaMask} className="px-3 py-1 rounded-md bg-[#03dac5] text-black font-semibold">Connect</button>
            ) : (
              <a href={DOWNLOAD_METAMASK} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md bg-[#03dac5] text-black font-semibold">Get</a>
            )}
          </div>
          {!hasMetaMask && (
            <div className="mt-3 flex items-center gap-3">
              <img src={qrUrl} alt="Download MetaMask QR" className="w-24 h-24 rounded-md" />
              <div className="text-xs text-gray-600 dark:text-gray-300">Scan to download MetaMask, then return and press Connect.</div>
            </div>
          )}
        </div>

        {/* WalletConnect placeholder */}
        <div className="mb-3 p-3 rounded-xl glass-card bg-white/40 dark:bg-[#2b2c45]/40 opacity-60 cursor-not-allowed">
          <div className="flex items-center justify-between">
            <div className="font-semibold">WalletConnect</div>
            <button disabled className="px-3 py-1 rounded-md bg-gray-300 dark:bg-[#3a3b57] text-gray-600">Soon</button>
          </div>
        </div>

        {/* Coinbase placeholder */}
        <div className="mb-1 p-3 rounded-xl glass-card bg-white/40 dark:bg-[#2b2c45]/40 opacity-60 cursor-not-allowed">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Coinbase Wallet</div>
            <button disabled className="px-3 py-1 rounded-md bg-gray-300 dark:bg-[#3a3b57] text-gray-600">Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
