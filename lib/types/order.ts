import { Address } from "./profile";

type orderItems = {
  productId: string;
  name: string;
  qty: number;
  currency: string;
};

export interface OrderSchema {
  userId: string | null;
  paymentMethod: "cod" | "prepaid";
  items: orderItems[];
  shippingAddress: Address | null;
  phone: string;
  fullName: string;
}

export type PaymentInitiateSchema = {
  gateway: "esewa" | "khalti";
  items: {
    imageSrc: string;
    name: string;
    price: string;
    productId: string;
    qty: number;
  }[];
  phone: string;
  orderId: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type paymentStatus = "pending" | "paid" | "failed" | "refunded";

export type Order = {
  id: string;
  placedAt: string;
  itemsSummary: string;
  total: string;
  status: OrderStatus;
  paymentStatus: paymentStatus;
};
export type ordersData = {
  _id: string;
  userId: string | null;
  customerName: string;
  shippingAddress: Address;
  phone: string;
  items: { productId: string; name: string; price: string; qty: number }[];
  subTotal: string;
  totalAmount: string;
  createdAt: string;
  orderStatus: OrderStatus;
  paymentStatus: paymentStatus;
};
