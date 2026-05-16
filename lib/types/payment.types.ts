import { Address } from "./profile";

export type PaymentGateway = "esewa" | "khalti";

export type OrderItem = {
  productId: string;
  name: string;
  qty: number;
  price: string;
  imageSrc: string;
};

export type OrderType = {
  id: string;
  orderStatus: "pending";
  createdAt: string;
  shippingAddress: Address;
  phone: string;
  subTotal: number;
  shippingFee: number;
  totalAmount: number;
  items: OrderItem[];
};
