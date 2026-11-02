export type BottleSize = "500ml" | "1l" | "1-5l" | "10l";

export type Product = {
  slug: BottleSize;
  /** Short volume label as printed on the bottle graphic */
  chip: string;
  /** Large display volume, e.g. "1.5" + "L" */
  amount: string;
  unit: string;
  name: string;
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
    slug: "1-5l",
    chip: "1500ml",
    amount: "1.5",
    unit: "L",
    name: "Puriva 1.5L",
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
    slug: "1l",
    chip: "1000ml",
    amount: "1",
    unit: "L",
    name: "Puriva 1L",
    tagline: "The everyday bottle.",
    summary:
      "A slimmer litre that fits a bag, a car door or a desk. The size most likely to go wherever you go.",
    moment: "Through the day",
    useCases: [
      { title: "Work and school bags", text: "Slim enough to slip into a side pocket." },
      { title: "Car and commute", text: "Sits neatly in a door pocket or cup holder." },
      { title: "Gym and sport", text: "A full litre for training and recovery." },
    ],
    tint: { from: "#0E86C8", to: "#0B4F8F", glow: "#22C7E6" },
    silhouette: "Slim body, same label language",
  },
  {
    slug: "500ml",
    chip: "500ml",
    amount: "500",
    unit: "ml",
    name: "Puriva 500ml",
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
    silhouette: "Compact, sport-style cap",
  },
  {
    slug: "10l",
    chip: "10L",
    amount: "10",
    unit: "L",
    name: "Puriva 10L",
    tagline: "The household jug.",
    summary:
      "A broad, stable container with a carry handle, built for larger household needs and shared spaces.",
    moment: "For everyone",
    useCases: [
      { title: "Larger household needs", text: "One container to refill glasses, jugs and kettles." },
      { title: "Gatherings and guests", text: "Plenty on hand when the house is full." },
      { title: "Shared spaces", text: "A practical choice for small offices and common areas." },
    ],
    tint: { from: "#0B2E73", to: "#06183F", glow: "#1B7BE8" },
    silhouette: "Wide, squat jug with carry handle",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const nav = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/products", label: "Products" },
  { href: "/quality-purity", label: "Quality & Purity" },
  { href: "/contact", label: "Contact" },
];

/** Placeholders to be replaced with real business details. */
export const business = {
  email: "hello@your-domain.example",
  phone: "+00 000 000 0000",
  address: ["Your street address", "City, Country"],
  hours: "Opening hours to be added",
};
