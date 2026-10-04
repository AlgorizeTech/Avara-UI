// Card shape and sample cards for WalletBlock. Kept out of the component file
// so it stays a components-only module (React Fast Refresh).

export interface WalletCardItem {
  id?: string;
  name: string;
  balance: string;
  currency?: string;
  gradientLight?: string;
  gradientDark?: string;
  textColorLight?: string;
  textColorDark?: string;
  subtextColorLight?: string;
  subtextColorDark?: string;
  hasChip?: boolean;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  tag?: string;
  issuer?: string;
  backSignatureLabel?: string;
  backSubtitle?: string;
  backNotice?: string;
}

// 3 authentic cards matching the reference design
export const DEFAULT_WALLET_CARDS: WalletCardItem[] = [
  {
    id: "card-1",
    name: "Pounds",
    balance: "€46,000.00",
    currency: "GBP",
    gradientLight: "from-amber-400 via-amber-400 to-amber-500",
    gradientDark: "from-amber-400 via-amber-500 to-amber-600",
    textColorLight: "text-amber-950",
    textColorDark: "text-amber-950",
    subtextColorLight: "text-amber-900/80",
    subtextColorDark: "text-amber-950/70",
    cardNumber: "•••• 9142",
    expiry: "08/29",
    cvv: "614",
    tag: "SAVINGS",
    issuer: "PINSTACK",
  },
  {
    id: "card-2",
    name: "Pounds",
    balance: "€46,000.00",
    currency: "GBP",
    gradientLight: "from-fuchsia-500 via-purple-500 to-violet-600",
    gradientDark: "from-fuchsia-600 via-purple-600 to-violet-700",
    textColorLight: "text-white",
    textColorDark: "text-white",
    subtextColorLight: "text-white/80",
    subtextColorDark: "text-white/70",
    cardNumber: "•••• 3058",
    expiry: "11/28",
    cvv: "832",
    tag: "CURRENT",
    issuer: "PINSTACK",
  },
  {
    id: "card-3",
    name: "Euros",
    balance: "€46,000.00",
    currency: "EUR",
    gradientLight: "from-blue-600 via-indigo-600 to-blue-700",
    gradientDark: "from-blue-600 via-indigo-600 to-blue-800",
    textColorLight: "text-white",
    textColorDark: "text-white",
    subtextColorLight: "text-blue-100/80",
    subtextColorDark: "text-blue-200/70",
    hasChip: true,
    cardNumber: "•••• 4829",
    expiry: "09/30",
    cvv: "429",
    tag: "PRIMARY",
    issuer: "PINSTACK",
  },
];
