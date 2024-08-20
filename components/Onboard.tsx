
"use client";

import { FC } from 'react';
import { Button } from './ui/button';

interface InitialPhaseProps {
  onCreateWallet: () => void;
  onImportWallet: () => void;
}

export const Onboard: FC<InitialPhaseProps> = ({ onCreateWallet, onImportWallet }) => {
  return (
    <div className="flex flex-col gap-4 items-center text-center max-w-lg">
      <Logo />
      <h1 className="font-medium text-3xl md:text-5xl">Welcome to Cryptic</h1>
      <h3 className="font-medium text-xl md:text-2xl">Let's get started.</h3>
      <div className="flex flex-col gap-4 mt-8 md:mt-12">
        <Button className="w-full md:w-48 h-12 text-md" onClick={onCreateWallet}>
          Create a new Wallet
        </Button>
        {/* <Button className="w-full md:w-48 h-12 text-md bg-gray-900 text-white hover:text-black" onClick={onImportWallet}> */}
        {/*   Import Wallet */}
        {/* </Button> */}
      </div>
    </div>
  );
};


function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-12 w-12 md:h-24 md:w-24 bg-blue-500 p-2 rounded-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
    </svg>
  );
}

