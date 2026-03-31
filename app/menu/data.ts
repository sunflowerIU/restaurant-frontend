import type { MenuCategory, MenuCategoryOption, MenuItem } from "./types";

export const CATEGORIES: MenuCategoryOption[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "dessert", label: "Dessert" },
  { key: "drinks", label: "Drinks" },
];

export const MENU: Record<MenuCategory, MenuItem[]> = {
  breakfast: [
    {
      id: "bf-1",
      imageSrc: "/momo.png",
      name: "Breakfast Momo (Mini)",
      price: 220,
      currency: "Rs",
      timeToMake: "10–15 min",
    },
    {
      id: "bf-2",
      imageSrc: "/chowmein.png",
      name: "Light Chowmein",
      price: 250,
      currency: "Rs",
      timeToMake: "12–18 min",
    },
  ],
  lunch: [
    {
      id: "l-1",
      imageSrc: "/momo.png",
      name: "Steamed Momo Platter",
      price: 320,
      currency: "Rs",
      timeToMake: "15–25 min",
    },
    {
      id: "l-2",
      imageSrc: "/chowmein.png",
      name: "Street Chowmein Bowl",
      price: 350,
      currency: "Rs",
      timeToMake: "10–18 min",
    },
  ],
  dinner: [
    {
      id: "d-1",
      imageSrc: "/chicken.png",
      name: "Spiced Chicken Plate",
      price: 420,
      currency: "Rs",
      timeToMake: "12–20 min",
    },
    {
      id: "d-2",
      imageSrc: "/momo.png",
      name: "Jhol Momo (Spicy)",
      price: 360,
      currency: "Rs",
      timeToMake: "18–28 min",
    },
  ],
  dessert: [
    {
      id: "ds-1",
      imageSrc: "/momo.png",
      name: "Sweet Momo (Special)",
      price: 280,
      currency: "Rs",
      timeToMake: "12–18 min",
    },
  ],
  drinks: [
    {
      id: "dr-1",
      imageSrc: "/chowmein.png",
      name: "Masala Soda (House)",
      price: 120,
      currency: "Rs",
      timeToMake: "2–4 min",
    },
    {
      id: "dr-2",
      imageSrc: "/chicken.png",
      name: "Lassi (Sweet)",
      price: 160,
      currency: "Rs",
      timeToMake: "3–6 min",
    },
  ],
};
