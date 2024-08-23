
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

interface MnemonicInputViewProps {
  onMnemonicSubmit: (mnemonic: string) => void;
}

export const MnemonicInputView = ({ onMnemonicSubmit }: MnemonicInputViewProps) => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(""));
  const { toast } = useToast();

  const handleWordChange = (index: number, value: string) => {
    const updatedWords = [...mnemonicWords];
    updatedWords[index] = value.trim();
    setMnemonicWords(updatedWords);
  };

  const handleSubmit = () => {
    const mnemonic = mnemonicWords.join(" ").trim();
    if (mnemonic.split(" ").length !== 12 || mnemonicWords.some(word => word === "")) {
      toast({
        title: "Invalid Input",
        description: "Please enter all 12 words of your mnemonic phrase.",
        variant: "destructive",
      });
      return;
    }
    onMnemonicSubmit(mnemonic);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 md:p-8 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-medium text-center">Enter Your 12-Word Mnemonic Phrase</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {mnemonicWords.map((word, index) => (
          <input
            key={index}
            type="text"
            value={word}
            onChange={(e) => handleWordChange(index, e.target.value)}
            className="border p-2 rounded-lg text-center text-sm md:text-base"
            placeholder={`Word ${index + 1}`}
          />
        ))}
      </div>
      <Button onClick={handleSubmit} className="mt-4 w-full md:w-auto">Import Wallet</Button>
    </div>
  );
};

