"use client";

import * as React from "react";
import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatMoney, useCart } from "@/app/_providers/CartContext";

import type { MenuItem } from "../app/menu/types";

export default function MenuTable({ items }: { items: MenuItem[] }) {
  const { lines, addItem } = useCart();
  const [q, setQ] = React.useState("");
  const dq = React.useDeferredValue(q);
  const cartItemIds = React.useMemo(
    () => new Set(lines.map((l) => l.id)),
    [lines],
  );

  const filtered = React.useMemo(() => {
    const s = dq.trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) => x.name.toLowerCase().includes(s));
  }, [dq, items]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search items…"
          className="h-11 w-full rounded-2xl border-white/10 bg-white/4 text-white placeholder:text-white/45 sm:max-w-md"
        />
        <div className="text-sm text-white/55">
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
        </div>
      </div>

      <Card className="flex-1 min-h-0 rounded-3xl border-white/10 bg-white/3">
        <CardContent className="h-full min-h-0 p-0">
          <ScrollArea className="h-full w-full">
            <div className="min-w-[340px] px-3 py-4 sm:min-w-[560px] sm:px-5 md:min-w-[800px]">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-gray-700/50   backdrop-blur">
                  <TableRow className="border-white/10">
                    <TableHead className="hidden w-[110px] text-white/70 sm:table-cell">
                      Image
                    </TableHead>
                    <TableHead className="text-white/70">Item</TableHead>
                    <TableHead className="w-[96px] text-white/70 sm:w-[120px]">
                      Price
                    </TableHead>
                    <TableHead className="hidden w-[150px] text-white/70 md:table-cell">
                      Time
                    </TableHead>
                    <TableHead className="w-[96px] text-right text-white/70 sm:w-[120px]">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filtered.map((x) => {
                    const isAdded = cartItemIds.has(x.id);
                    return (
                      <TableRow key={x.id} className="border-white/10">
                        <TableCell className="hidden sm:table-cell">
                          <div className="relative h-12 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/2">
                            <Image
                              src={x.imageSrc}
                              alt={x.name}
                              fill
                              className="object-contain p-2"
                              sizes="64px"
                              loading="lazy"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-white">
                          {x.name}
                        </TableCell>
                        <TableCell className="text-white/75">
                          {formatMoney(x.currency, x.price)}
                        </TableCell>
                        <TableCell className="hidden text-white/65 md:table-cell">
                          {x.timeToMake}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="h-9 rounded-xl px-3 sm:px-4"
                            onClick={() => addItem(x)}
                            disabled={isAdded}
                          >
                            {isAdded ? "Added" : "Add"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {filtered.length === 0 && (
                    <TableRow className="border-white/10">
                      <TableCell
                        colSpan={5}
                        className="py-12 text-center text-white/55"
                      >
                        No items found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
