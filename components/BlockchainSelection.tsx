
"use client";

import { FC } from 'react';
import { Button } from './ui/button';

const blockchainOptions = [
  { label: "Solana", pathType: "501", icon: "/sol.svg" },
  { label: "Ethereum", pathType: "60", icon: "/eth.svg" },
  { label: "Polygon", pathType: "137", icon: "/polygon.svg" },
];

interface BlockchainSelectionPhaseProps {
  onBlockchainSelect: (pathType: string) => void;
}

export const BlockchainSelectionPhase: FC<BlockchainSelectionPhaseProps> = ({ onBlockchainSelect }) => {
  return (
    <div className="flex flex-col gap-4 items-center text-center max-w-lg p-4">
      <h2 className="font-medium text-2xl md:text-3xl">Cryptic supports multiple Blockchains</h2>
      <h3 className="font-medium text-lg md:text-xl">Which one do you want to use?</h3>
      <div className="flex flex-col gap-4 mt-4">
        {blockchainOptions.map((option) => (
          <Button
            key={option.pathType}
            className="w-full md:w-48 h-12 hover:bg-gray-100 text-md dark:hover:bg-gray-300 border bg-white text-black flex items-center gap-2 justify-center"
            onClick={() => onBlockchainSelect(option.pathType)}
          >
            <img src={option.icon} alt={option.label} className="h-6 w-6" />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
