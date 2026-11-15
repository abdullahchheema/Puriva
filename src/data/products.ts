export type BottleSize = "500ml" | "1-5l" | "19l";

export type Product = {
  slug: BottleSize;
  /** Short volume label as printed on the bottle graphic */
  chip: string;
  /** Large display volume, e.g. "1.5" + "L" */
  amount: string;
  unit: string;
  name: string;
  /** Spoken form used in WhatsApp messages */
  spoken: string;
  tagline: string;
  summary: string;
  moment: string;
  useCases: { title: string; text: string }[];
  /** CSS colour pair used for the product's own visual identity */
  tint: { from: string; to: string; glow: string };
  silhouette: string;
};

export const products: Product[] = [
  {
    slug: "500ml",
    chip: "500ml",
    amount: "500",
    unit: "ml",
    name: "Puriva 500ml",
    spoken: "500ml bottle",
    tagline: "The carry bottle.",
    summary:
      "Compact and easy to grab. Made for hands, pockets and the moments between one place and the next.",
    moment: "On the go",
    useCases: [
      { title: "Personal carry", text: "One hand, one bottle, no thought required." },
      { title: "Travel and journeys", text: "Small enough for every seat-back pocket." },
      { title: "Events and meetings", text: "A tidy single serve for guests and teams." },
    ],
    tint: { from: "#12B5C4", to: "#0A6C8F", glow: "#2FE0D0" },
    silhouette: "Compact, easy to carry",
  },
  {
    slug: "1-5l",
    chip: "1500ml",
    amount: "1.5",
    unit: "L",
    name: "Puriva 1.5L",
    spoken: "1.5 litre bottle",
    tagline: "The table bottle.",
    summary:
      "The signature Puriva bottle. A generous size made for the dining table, the fridge door and the long part of the day.",
    moment: "At home",
    useCases: [
      { title: "Everyday home hydration", text: "Keep it on the table or in the fridge door for the whole household." },
      { title: "Shared meals", text: "Enough to pour for everyone without a second trip." },
      { title: "Desk and study", text: "A full day of water within arm's reach." },
    ],
    tint: { from: "#1347C9", to: "#0A2A7A", glow: "#3B82F6" },
    silhouette: "Tall, rounded shoulders, ribbed base",
  },
  {
    slug: "19l",
    chip: "19L",
    amount: "19",
    unit: "L",
    name: "Puriva 19L",
    spoken: "19 litre bottle",
    tagline: "The big bottle.",
    summary:
      "The largest Puriva size, for homes, offices and shared spaces that go through a lot of water.",
    moment: "For everyone",
    useCases: [
      { title: "Larger household needs", text: "One container to refill glasses, jugs and kettles." },
      { title: "Offices and shared spaces", text: "A practical choice for teams and common areas." },
      { title: "Gatherings and guests", text: "Plenty on hand when the house is full." },
    ],
    tint: { from: "#0B2E73", to: "#06183F", glow: "#1B7BE8" },
    silhouette: "Large 19-litre bottle, narrow neck, ribbed body",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const nav = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/products", label: "Products" },
  { href: "/custom-labels", label: "Custom Labels" },
  { href: "/quality-purity", label: "Quality & Purity" },
  { href: "/contact", label: "Contact" },
];

export const business = {
  name: "Puriva",
  email: "purivadrinkingwater@gmail.com",
  /** Pakistan mobile, shown the way it is dialled locally */
  phone: "0334 5146459",
  /** International format, digits only, as WhatsApp expects */
  whatsapp: "923345146459",
  whatsappDisplay: "+92 334 5146459",
  location: "Shahpur, Islamabad",
  instagram: { url: "https://www.instagram.com/puriva_drinkingwater", handle: "@puriva_drinkingwater" },
  tiktok: { url: "https://vt.tiktok.com/ZSpPxxXNh/" },
};

/** Opens a WhatsApp chat with Puriva and a ready-written message. */
export const waLink = (text: string) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
