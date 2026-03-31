import type { Currency } from "@/app/_providers/CartContext";

export type MenuCategory =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "drinks"
  | "dessert";

export type MenuItem = {
  id: string;
  imageSrc: string;
  name: string;
  price: number;
  currency: Currency;
  timeToMake: string;
};

export type MenuCategoryOption = {
  key: MenuCategory;
  label: string;
};
