
"use client";

import { useState } from "react";
import { MnemonicView } from "./MnemonicView";
import { Button } from "./ui/button";
import { createMnemonic, generateWalletFromMnemonic } from "@/utils/generateWallet";
import { useToast } from "@/components/ui/use-toast"

const blockchainOptions = [
  { label: "Solana", pathType: "501", icon: "/sol.svg" },
  { label: "Ethereum", pathType: "60", icon: "/eth.svg" },
  { label: "Polygon", pathType: "137", icon: "/polygon.svg" },
];

export function Onboard() {
  const [stage, setStage] = useState<"initial" | "selectBlockchain" | "showMnemonic">("initial");
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [wallet, setWallet] = useState<any>(null);

  const { toast } = useToast();

  const handleCreateWallet = () => {
    setStage("selectBlockchain");
  };

  const handleBlockchainSelection = (pathType: string) => {
    const newMnemonic = createMnemonic();
    const newWallet = generateWalletFromMnemonic(pathType, newMnemonic, 0);

    if (newWallet) {
      setMnemonic(newMnemonic);
      setWallet(newWallet);
      setStage("showMnemonic");
    }
  };

  const handleImportWallet = () => {
    // Implement Import Wallet functionality
  };

  return (
    <div className="flex flex-col justify-center items-center max-h-full w-full p-4">
      {stage === "initial" && (
        <div className="flex flex-col gap-4 items-center text-center max-w-lg">
          <Logo />
          <h1 className="font-medium text-3xl md:text-5xl">Welcome to Cryptic</h1>
          <h3 className="font-medium text-xl md:text-2xl">Let's get started.</h3>
          <div className="flex flex-col gap-4 mt-8 md:mt-12">
            <Button className="w-full md:w-48 h-12 text-md" onClick={handleCreateWallet}>
              Create a new Wallet
            </Button>
            <Button className="w-full md:w-48 h-12 text-md bg-gray-900 text-white hover:text-black" onClick={handleImportWallet}>
              Import Wallet
            </Button>
          </div>
        </div>
      )}

      {stage === "selectBlockchain" && (
        <div className="flex flex-col gap-4 items-center text-center max-w-lg p-4">
          <h2 className="font-medium text-2xl md:text-3xl">Cryptic supports multiple Blockchains</h2>
          <h3 className="font-medium text-lg md:text-xl">Which one do you want to use?</h3>
          <div className="flex flex-col gap-4 mt-4">
            {blockchainOptions.map((option) => (
              <Button
                key={option.pathType}
                className="w-full md:w-48 h-12 text-md hover:text-white dark:hover:text-black border bg-white text-black flex items-center gap-2 justify-center"
                onClick={() => handleBlockchainSelection(option.pathType)}
              >
                <img src={option.icon} alt={option.label} className="h-6 w-6" />
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {stage === "showMnemonic" && mnemonic && wallet && (
        <MnemonicView
          mnemonicWords={mnemonic.split(' ')}
          copyToClipboard={(content) => {
            navigator.clipboard.writeText(content).then(() => {
              toast({
                title: "Secret phrase copied",
              });
            });
          }}
        />
      )}
    </div>
  );
}

function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-12 w-12 md:h-24 md:w-24 bg-blue-500 p-2 rounded-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
    </svg>
  );
}

