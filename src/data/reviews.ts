export type Review = {
  /** What the customer wrote, in any language (English, Urdu, Roman Urdu). */
  quote: string;
  name: string;
  /** Business or organisation, if the customer agrees to name it. */
  business?: string;
  role?: string;
};

/**
 * Real customer reviews only. Add an entry here once a customer has agreed to
 * be quoted, and it appears on the home page and the Reviews page.
 */
export const reviews: Review[] = [];

/** Organisations Puriva told us it currently supplies. Shown as plain names, not logos. */
export const supplied = ["NUST", "FAST", "Iqra University"];

/** The kinds of customers Puriva supplies across Pakistan. */
export const customerTypes = ["Universities", "Shops", "Restaurants", "Cash & carries"];
