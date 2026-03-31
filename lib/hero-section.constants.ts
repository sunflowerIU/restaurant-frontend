export type FoodFloat = {
  src: string;
  alt: string;
  className: string;
  size: number;
  drift: { x: number; y: number };
  wobble: { y: number; rot: number };
  driftDuration: number;
};

export const FOODS: FoodFloat[] = [
  {
    src: "/momo.png",
    alt: "Momo",
    size: 150,
    className:
      "left-[4%] top-[12%] md:left-[6%] md:top-[10%] opacity-90 rotate-[-10deg]",
    drift: { x: -28, y: 24 },
    wobble: { y: 18, rot: 10 },
    driftDuration: 10.5,
  },
  {
    src: "/chicken.png",
    alt: "Chicken",
    size: 170,
    className:
      "right-[6%] top-[8%] md:right-[8%] md:top-[6%] opacity-90 rotate-[10deg]",
    drift: { x: 26, y: 20 },
    wobble: { y: 16, rot: -10 },
    driftDuration: 11.5,
  },
  {
    src: "/chowmein.png",
    alt: "Chowmein",
    size: 190,
    className:
      "left-[10%] bottom-[8%] md:left-[14%] md:bottom-[10%] opacity-90 rotate-[6deg]",
    drift: { x: -22, y: -26 },
    wobble: { y: 20, rot: 8 },
    driftDuration: 12.2,
  },
  {
    src: "/momo.png",
    alt: "Momo plate",
    size: 120,
    className:
      "right-[16%] bottom-[12%] md:right-[18%] md:bottom-[10%] opacity-70 rotate-[-8deg]",
    drift: { x: 22, y: -22 },
    wobble: { y: 14, rot: 8 },
    driftDuration: 9.8,
  },
  {
    src: "/chowmein.png",
    alt: "Chowmein bowl",
    size: 120,
    className:
      "left-[44%] top-[6%] md:left-[42%] md:top-[4%] opacity-60 rotate-[14deg]",
    drift: { x: 0, y: 28 },
    wobble: { y: 12, rot: -10 },
    driftDuration: 13.2,
  },
];

export const NEON_ORB_CLASSES = [
  "left-[8%] top-[18%] h-72 w-72",
  "right-[10%] top-[22%] h-80 w-80",
  "left-[22%] bottom-[10%] h-96 w-96",
  "right-[18%] bottom-[12%] h-72 w-72",
];

export const BEAM_CLASSES = [
  "top-[16%] h-28 rotate-[10deg]",
  "top-[48%] h-24 rotate-[-12deg]",
  "top-[72%] h-20 rotate-[7deg]",
];

export const FEATURE_CHIPS = [
  "🥟 Handmade momo",
  "🌶️ Achar + spices",
  "🚚 Pickup & delivery",
];
