import type { Currency } from "@/app/_providers/CartContext";

// export type MenuCategory =
//   | "breakfast"
//   | "lunch"
//   | "dinner"
//   | "drinks"
//   | "dessert";

export type MenuItem = {
  id: string;
  categoryId: string;
  isAvailable: boolean;
  imageSrc: string;
  name: string;
  price: number;
  currency: string;
  timeToMake: string;
};

export type MenuType = {
  displayOrder: number;
  isActive: boolean;
  items: MenuItem[];
  name: string;
  id: string;
};

// export type MenuCategoryOption = {
//   key: MenuCategory;
//   label: string;
// };
