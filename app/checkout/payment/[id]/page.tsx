import PaymentPage from "@/components/payment/PaymentPage";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/order/get-for-payment/${id}`,
  );
  const order = await data.json();
  // console.log(order);

  if (!order.data) return notFound();

  return <PaymentPage order={order.data} />;
  //   return <div></div>;
}
