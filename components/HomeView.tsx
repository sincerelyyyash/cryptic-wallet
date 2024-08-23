
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { generateWalletFromMnemonic } from "@/utils/generateWallet";
import { Onboard } from "./Onboard";
import { MnemonicInputView } from "./MnemonicInput";
import { WalletView } from "./WalletView";
import { motion } from "framer-motion";

const NUMBER_OF_ACCOUNTS = 5;

export function WalletHome() {
  const [stage, setStage] = useState<"initial" | "mnemonicInput" | "walletsList">("initial");
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const [walletIndex, setWalletIndex] = useState<number>(0);
  const [walletVisibility, setWalletVisibility] = useState<Record<number, boolean>>({});
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedWallets = localStorage.getItem('wallets');
    if (savedWallets) {
      const parsedWallets = JSON.parse(savedWallets);
      setWallets(parsedWallets);
      setStage(parsedWallets.length > 0 ? "walletsList" : "initial");
    } else {
      setStage("initial");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  const handleProceed = () => {
    router.push("/wallet");
  };

  const handleCreateWallet = () => {
    setStage("mnemonicInput");
  };

  const handleImportWallet = () => {
    setStage("mnemonicInput");
  };

  const handleMnemonicImport = (mnemonicInput: string) => {
    if (!mnemonicInput) {
      toast({
        title: "Invalid mnemonic",
        description: "Mnemonic cannot be empty.",
      });
      return;
    }

    const generatedWallets = [];
    for (let i = 0; i < NUMBER_OF_ACCOUNTS; i++) {
      const newWallet = generateWalletFromMnemonic("501", mnemonicInput, i);
      if (newWallet) {
        generatedWallets.push(newWallet);
      }
    }

    if (generatedWallets.length > 0) {
      setWallets(generatedWallets);
      setMnemonic(mnemonicInput);
      setWalletIndex(0);
      setStage("walletsList");
    } else {
      toast({
        title: "Failed to import wallets",
        description: "Please check your mnemonic and try again.",
      });
    }
  };

  const handleAddWallet = () => {
    if (mnemonic) {
      const newWalletIndex = walletIndex + 1;
      const newWallet = generateWalletFromMnemonic("501", mnemonic, newWalletIndex);
      if (newWallet) {
        setWallets((prevWallets) => [...prevWallets, newWallet]);
        setWalletIndex(newWalletIndex);
        setWalletVisibility((prevVisibility) => ({
          ...prevVisibility,
          [newWalletIndex]: false
        }));
        toast({
          title: "New wallet added",
        });
      }
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
      });
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "There was an error copying to the clipboard.",
      });
    });
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setWalletVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index]
    }));
  };

  const deleteWallet = (index: number) => {
    const updatedWallets = wallets.filter((_, i) => i !== index);
    setWallets(updatedWallets);
    setWalletVisibility((prevVisibility) => {
      const { [index]: _, ...rest } = prevVisibility;
      return rest;
    });
    toast({
      title: "Wallet deleted",
    });

    if (updatedWallets.length === 0) {
      setStage("initial");
    } else {
      setWalletIndex(prevIndex => Math.min(prevIndex, updatedWallets.length - 1));
    }
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex flex-col justify-center items-center max-h-full w-full p-4">
      {stage === "initial" && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Onboard
            onCreateWallet={handleCreateWallet}
            onImportWallet={handleImportWallet}
          />
        </motion.div>
      )}

      {stage === "mnemonicInput" && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <MnemonicInputView
            onMnemonicSubmit={handleMnemonicImport}
          />
        </motion.div>
      )}

      {stage === "walletsList" && (
        <motion.div
          className="w-full"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <WalletView
            wallets={wallets}
            walletVisibility={walletVisibility}
            setWalletVisibility={setWalletVisibility}
            copyToClipboard={copyToClipboard}
            deleteWallet={deleteWallet}
            togglePrivateKeyVisibility={togglePrivateKeyVisibility}
            addNewWallet={handleAddWallet}
          />
        </motion.div>
      )}
    </div>
  );
}

