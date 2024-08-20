
"use client";

import { FC } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from 'framer-motion';

interface WalletListProps {
  wallets: any[];
  walletVisibility: Record<number, boolean>;
  setWalletVisibility: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  copyToClipboard: (content: string) => void;
  deleteWallet: (index: number) => void;
  togglePrivateKeyVisibility: (index: number) => void;
  addNewWallet: () => void;
}

export const WalletView: FC<WalletListProps> = ({
  wallets,
  walletVisibility,
  setWalletVisibility,
  copyToClipboard,
  deleteWallet,
  togglePrivateKeyVisibility,
  addNewWallet
}) => {
  const { toast } = useToast();

  const truncateKey = (key: string) => {
    const isSmallScreen = window.innerWidth < 640;
    return isSmallScreen ? `${key.slice(0, 20)}...` : (key.length > 44 ? `${key.slice(0, 44)}...` : key);
  };

  const walletVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4">
      <h2 className="font-medium text-2xl md:text-3xl">Your Wallets</h2>
      <Button onClick={addNewWallet} className="mt-4 w-full sm:w-48">
        Add Another Wallet
      </Button>
      <div className="flex flex-col gap-4 mt-4">
        <AnimatePresence>
          {wallets.map((wallet, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={walletVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-2 p-4 border rounded-lg shadow-md w-full"
            >
              <h3 className="text-2xl md:text-3xl font-medium">Wallet {index + 1}</h3>
              <p className="my-2">
                <h3 className="font-medium text-lg md:text-xl">Public Key:</h3>
                <span
                  className="ml-2 cursor-pointer text-sm dark:text-white break-words"
                  onClick={() => copyToClipboard(wallet.publicKey)}
                >
                  {truncateKey(wallet.publicKey)}
                </span>
              </p>
              <p>
                <h3 className="font-medium text-lg md:text-xl">Private Key:</h3>
                <span className="ml-2 cursor-pointer text-sm break-words" onClick={() => copyToClipboard(wallet.privateKey)}>
                  {walletVisibility[index] ? truncateKey(wallet.privateKey) : "********************************************"}
                </span>
                <label className="inline-flex items-center ml-4">
                  <Switch
                    checked={walletVisibility[index] || false}
                    onCheckedChange={() => togglePrivateKeyVisibility(index)}
                    className="h-6 w-12 bg-black dark:bg-white"
                  />
                </label>
              </p>
              <Button
                onClick={() => deleteWallet(index)}
                className="mt-4 w-full sm:w-48 bg-white dark:bg-black border border-red-500 text-red-500 hover:bg-red-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Delete Wallet
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

