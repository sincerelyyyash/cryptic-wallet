import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { ethers } from "ethers";
import bs58 from "bs58";
import crypto from "crypto";

const ENCRYPTION_KEY = crypto.randomBytes(32);
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text: string): string => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const createMnemonic = (): string => {
  return generateMnemonic();
};

const isValidMnemonic = (mnemonic: string): boolean => {
  return validateMnemonic(mnemonic);
};

const generateWalletFromMnemonic = (
  pathType: string,
  mnemonic: string,
  accountIndex: number
): Wallet | null => {
  try {
    if (!isValidMnemonic(mnemonic)) {
      console.error("Invalid mnemonic.");
      return null;
    }

    const seedBuffer = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/${pathType}'/0'/${accountIndex}'`;
    const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));

    let publicKeyEncoded: string;
    let privateKeyEncoded: string;

    if (pathType === "501") {
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
      const keypair = Keypair.fromSecretKey(secretKey);

      privateKeyEncoded = encrypt(bs58.encode(secretKey));
      publicKeyEncoded = keypair.publicKey.toBase58();
    } else if (pathType === "60" || pathType === "137") {
      const privateKey = Buffer.from(derivedSeed).toString("hex");
      privateKeyEncoded = encrypt(privateKey);

      const wallet = new ethers.Wallet(privateKey);
      publicKeyEncoded = wallet.address;
    } else {
      console.error("Unsupported path type.");
      return null;
    }

    return {
      publicKey: publicKeyEncoded,
      privateKey: privateKeyEncoded,
      mnemonic,
      path,
    };
  } catch (error) {
    console.error("Failed to generate wallet. Please try again.");
    return null;
  }
};

