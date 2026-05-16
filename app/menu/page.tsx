// file: app/menu/page.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import * as React from "react";

import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import MenuTable from "../../components/MenuTable";
import { MenuItem, MenuType } from "./types";

export default function Page() {
  const [activeCategory, setActiveCategory] = React.useState<string>("");

  const [menu, setMenu] = React.useState<MenuType[]>([]);

  const [isLoading, setIsLoading] = React.useState<true | false>(true);

  // console.log(menu);
  console.log(menu.find((item) => item.name === activeCategory)?.items);

  const activeCategoryData: MenuItem[] =
    menu.find((item) => item.name === activeCategory)?.items ?? [];

  React.useEffect(() => {
    async function getMenu() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/menu`,
          {
            next: { revalidate: 3600 },
          },
        );
        const menu = await response.json();
        setMenu(menu.data);
        setActiveCategory(menu.data[0].name);
        setIsLoading(false);
        console.log(menu);
      } catch (error) {
        setIsLoading(false);
        return toast.error("error fetching menu");
      }
    }
    getMenu();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="relative h-dvh overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.90),rgba(2,6,12,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      {/* layout: header + content; page itself does NOT scroll */}
      <div className="relative mx-auto flex h-full max-w-6xl min-h-0 flex-col px-4 pt-20 sm:px-6">
        {/* top bar (compact so it fits) */}
        <div className="flex items-end justify-between gap-3 pb-4">
          <div className="min-w-0">
            <h1 className="mt-2 truncate text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Explore categories
            </h1>
          </div>
        </div>

        {/* tabs area fills remaining height; only table scrolls */}
        <Tabs
          value={activeCategory}
          onValueChange={(v) => {
            setActiveCategory(v);
          }}
          className="flex h-full min-h-0 flex-col"
        >
          <div className="md:hidden">
            <Select
              value={activeCategory}
              onValueChange={(v) => setActiveCategory(v)}
            >
              <SelectTrigger className="h-11 w-full rounded-2xl border-white/10 bg-white/3 px-4 text-white backdrop-blur data-placeholder:text-white/60 text-md [&_svg]:text-white/70">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                align="start"
                sideOffset={8}
                avoidCollisions={false}
                className="p-2 bg-rgba(0,220,255,0.10) text-white backdrop-blur-xl"
              >
                {menu.map((c) => (
                  <SelectItem
                    key={c.id}
                    value={c.name}
                    className="text-md border-b mb-2 border-destructive/20 "
                  >
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* scalable tabs: horizontal-only scroll, never vertical */}
          <TabsList
            className={cn(
              "hidden md:flex",
              "h-auto w-full justify-start gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap",
              "rounded-2xl border border-white/10 bg-white/3 p-2",
            )}
          >
            <div className="flex w-max items-center gap-2">
              {menu.map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.name}
                  className={cn(
                    "shrink-0 rounded-xl px-4 py-2 text-white/70",
                    "data-[state=active]:bg-white/10 data-[state=active]:text-white",
                  )}
                >
                  {c.name}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>

          {/* Content must be min-h-0 so inner ScrollArea can scroll */}
          <div className="mt-4 flex-1 min-h-0">
            <div className="h-full min-h-0 md:hidden">
              <MenuTable items={activeCategoryData} />
            </div>

            {menu.map((c) => (
              <TabsContent
                key={c.id}
                value={c.name}
                className="hidden h-full min-h-0 md:block"
              >
                <MenuTable items={activeCategoryData} />
              </TabsContent>
            ))}
          </div>
        </Tabs>

        {/* bottom padding not needed since no page scroll */}
        <div className="h-5" />
      </div>
    </main>
  );
}
