export type Scene = "turquoise" | "sunset" | "dusk" | "shallows" | "open" | "glass";

/**
 * A photo slot. Until `src` is set, the site shows an art-directed seascape
 * (`scene`) and, in preview mode, a label describing the shot to supply.
 * To use a real photo: put the file in /public/photos and set `src`.
 */
export type Photo = {
  src?: string;
  alt: string;
  scene: Scene;
  /** Brief for the photographer / what to replace the placeholder with. */
  shot: string;
};

export type Experience = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  photo: Photo;
  /** e.g. "3 hours". Leave undefined until confirmed. */
  duration?: string;
  /** e.g. "From $850". Only set when the price is confirmed. */
  startingPrice?: string;
  /** e.g. "Up to 6 guests". Only set when confirmed. */
  guests?: string;
  featured?: boolean;
};

export type Vessel = {
  slug: string;
  name: string;
  model?: string;
  /** Maximum guests, once confirmed. */
  capacity?: number;
  length?: string;
  tagline: string;
  description: string;
  amenities: string[];
  /** Experience slugs this vessel runs. */
  experiences: string[];
  pricing?: string;
  photo: Photo;
  gallery: Photo[];
  isPlaceholder: boolean;
};
