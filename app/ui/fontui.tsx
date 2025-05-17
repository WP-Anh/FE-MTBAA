import {
  Prompt,
  Amatic_SC,
  Chakra_Petch,
  Geist,
  Geist_Mono,
} from "next/font/google";

export const prompt = Prompt({
  weight: "400",
  subsets: ["vietnamese"],
});

export const amaticSC400 = Amatic_SC({
  weight: "400",
  subsets: ["vietnamese"],
});

export const amaticSC700 = Amatic_SC({
  weight: "700",
  subsets: ["vietnamese"],
});

export const chakra_petch = Chakra_Petch({
  weight: "400",
  subsets: ["vietnamese"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
