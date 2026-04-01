// file: app/orders/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import AppButton from "@/components/AppButton";

type OrderStatus = "Confirming" | "Preparing" | "Delivered" | "Cancelled";

type Order = {
  id: string;
  placedAt: string;
  itemsSummary: string;
  total: string;
  status: OrderStatus;
};

// ✅ move outside component (stable reference)
const ALL_ORDERS: Order[] = [
  {
    id: "NK-1027",
    placedAt: "Mar 18, 2026 • 8:12 PM",
    itemsSummary: "Spiced Chicken Plate ×1",
    total: "Rs 420",
    status: "Preparing",
  },
  {
    id: "NK-1024",
    placedAt: "Mar 14, 2026 • 7:20 PM",
    itemsSummary: "Steamed Momo ×1, Chowmein ×1",
    total: "Rs 670",
    status: "Delivered",
  },
  {
    id: "NK-1011",
    placedAt: "Feb 22, 2026 • 9:05 PM",
    itemsSummary: "Jhol Momo ×2",
    total: "Rs 720",
    status: "Cancelled",
  },
];

function StatusBadge({ status }: { status: OrderStatus }) {
  const cls =
    status === "Delivered"
      ? "bg-emerald-500/20 text-emerald-200"
      : status === "Preparing"
        ? "bg-cyan-500/20 text-cyan-200"
        : "bg-red-500/20 text-red-200";
  return <Badge className={cn(cls, "hover:bg-opacity-20")}>{status}</Badge>;
}

function matchesStatus(order: Order, tab: string) {
  if (tab === "all") return true;
  return order.status.toLowerCase() === tab;
}

function OrdersCards({ orders }: { orders: Order[] }) {
  return (
    <div className="grid gap-3">
      {orders.map((o) => (
        <Card
          key={o.id}
          className="rounded-3xl border-white/10 bg-white/[0.03]"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{o.id}</p>
                <p className="mt-1 text-xs text-white/55">{o.placedAt}</p>
              </div>
              <StatusBadge status={o.status} />
            </div>

            <Separator className="my-4 bg-white/10" />

            <p className="text-sm text-white/70">{o.itemsSummary}</p>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{o.total}</p>
              <Button
                asChild
                variant="outline"
                className="h-9 rounded-2xl border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              >
                <Link href={`/orders/${encodeURIComponent(o.id)}`}>View</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {orders.length === 0 && (
        <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
          <CardContent className="p-8 text-center text-white/60">
            No orders found.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
      <CardContent className="p-0">
        <div className="overflow-auto">
          <div className="min-w-[340px] px-3 py-4 sm:min-w-[560px] sm:px-5 md:min-w-[800px]">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-gray-700/50 backdrop-blur">
                <TableRow className="border-white/10">
                  <TableHead className="text-white/70">Order</TableHead>
                  <TableHead className="text-white/70">Placed</TableHead>
                  <TableHead className="text-white/70">Items</TableHead>
                  <TableHead className="text-white/70">Total</TableHead>
                  <TableHead className="text-right text-white/70">
                    Status
                  </TableHead>
                  <TableHead className="w-[120px] text-right text-white/70">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id} className="border-white/10">
                    <TableCell className="font-medium text-white">
                      {o.id}
                    </TableCell>
                    <TableCell className="text-white/65">
                      {o.placedAt}
                    </TableCell>
                    <TableCell className="text-white/65">
                      {o.itemsSummary}
                    </TableCell>
                    <TableCell className="text-white/75">{o.total}</TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.06]"
                      >
                        <Link href={`/orders/${encodeURIComponent(o.id)}`}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {orders.length === 0 && (
                  <TableRow className="border-white/10">
                    <TableCell
                      colSpan={6}
                      className="py-12 text-center text-white/55"
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OrdersPage() {
  const [tab, setTab] = React.useState<
    "all" | "preparing" | "delivered" | "cancelled"
  >("all");
  const [q, setQ] = React.useState("");
  const dq = React.useDeferredValue(q);

  // ✅ deps only include what can actually change
  const filtered = React.useMemo(() => {
    const s = dq.trim().toLowerCase();
    return ALL_ORDERS.filter((o) => matchesStatus(o, tab)).filter((o) => {
      if (!s) return true;
      return (
        o.id.toLowerCase().includes(s) ||
        o.itemsSummary.toLowerCase().includes(s) ||
        o.status.toLowerCase().includes(s)
      );
    });
  }, [dq, tab]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <div className="mb-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(0,220,255,0.22)]" />
            My Orders
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Your orders
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60 md:text-base">
            Track your recent orders and statuses.
          </p>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by order ID or item…"
            className="h-11 w-full rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/45 sm:max-w-md"
          />
          <AppButton href="/menu" variant="secondary" size="lg">
            Order Again
          </AppButton>
        </div>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as typeof tab)}
          className="w-full"
        >
          <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.03] p-2">
            <div className="flex w-max items-center gap-2">
              <TabsTrigger
                value="all"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="preparing"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Preparing
              </TabsTrigger>
              <TabsTrigger
                value="delivered"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Delivered
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Cancelled
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value={tab} className="mt-5">
            <div className="md:hidden">
              <OrdersCards orders={filtered} />
            </div>
            <div className="hidden md:block">
              <OrdersTable orders={filtered} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
