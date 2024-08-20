import { useState } from 'react';
import { Button } from './ui/button';

interface MnemonicDisplayProps {
  mnemonicWords: string[];
  copyToClipboard: (content: string) => void;
  onProceed: () => void;
}

export const MnemonicView = ({
  mnemonicWords,
  copyToClipboard,
  onProceed,
}: MnemonicDisplayProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg border border-primary/10 p-4 md:p-8">
      <div className="flex flex-col my-2 w-full justify-between items-center text-center">
        <h2 className="text-xl md:text-3xl font-medium tracking-tighter">
          Your Secret Phrase
        </h2>
        <h4 className="text-md">
          Write it down, store it in a safe place, and NEVER share it with anyone.
        </h4>
      </div>
      <div
        className="flex flex-col w-full items-center justify-center"
        onClick={() => copyToClipboard(mnemonicWords.join(' '))}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-4 md:my-8">
          {mnemonicWords.map((word, index) => (
            <p
              key={index}
              className="border text-sm md:text-md bg-gray-100 hover:bg-gray-200 transition-all duration-300 rounded-lg p-2 md:p-4 dark:bg-black"
            >
              {word}
            </p>
          ))}
        </div>
        <div className="text-xs md:text-base text-primary/50 flex w-full gap-2 items-center group-hover:text-primary/80 transition-all duration-300">
          Click anywhere to copy
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="saved-secret-phrase"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="cursor-pointer w-4 h-4"
        />
        <label htmlFor="saved-secret-phrase" className="text-sm md:text-md">
          I saved my secret recovery phrase.
        </label>
      </div>
      <Button
        onClick={onProceed}
        disabled={!isChecked}
        className="w-full mt-4 md:w-48 h-12 text-md"
      >
        Proceed
      </Button>
    </div>
  );
};

