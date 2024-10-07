import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface TokenInfo {
  symbol: string;
  name: string;
  address: string;
  logoURI?: string;
  decimals: number;
}

export async function fetchAllSplTokens(): Promise<TokenInfo[]> {
  try {
    const response = await fetch("https://token.jup.ag/all");
    const data = await response.json();
    console.log(data);
    return data.map((token: any) => ({
      symbol: token.symbol,
      name: token.name,
      address: token.address,
      logoURI: token.logoURI,
      decimals: token.decimals,
    }));
  } catch (error) {
    console.error("Error fetching SPL tokens:", error);
    return [];
  }
}
