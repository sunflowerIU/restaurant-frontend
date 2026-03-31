// file: app/(providers)/cart/cart-context.tsx
"use client";

import * as React from "react";

export type Currency = "Rs" | "$";

export type CartLine = {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  currency: Currency;
  qty: number;
};

export type CartState = {
  lines: CartLine[];
};

export type AddToCartItem = {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  currency: Currency;
};

export type CartActions = {
  addItem: (item: AddToCartItem) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export type CartComputed = {
  count: number;
  totalByCurrency: Record<string, number>;
};

export type CartContextValue = CartState & CartActions & CartComputed;

const STORAGE_KEY = "nk_cart_v1";

const CartCtx = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = React.useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider />");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({ lines: [] });

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (parsed?.lines) setState({ lines: parsed.lines });
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const addItem = React.useCallback((item: AddToCartItem) => {
    setState((prev) => {
      const idx = prev.lines.findIndex((l) => l.id === item.id);
      if (idx >= 0) {
        const next = [...prev.lines];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return { lines: next };
      }
      return {
        lines: [
          ...prev.lines,
          {
            id: item.id,
            name: item.name,
            imageSrc: item.imageSrc,
            price: item.price,
            currency: item.currency,
            qty: 1,
          },
        ],
      };
    });
  }, []);

  const inc = React.useCallback((id: string) => {
    setState((prev) => ({
      lines: prev.lines.map((l) =>
        l.id === id ? { ...l, qty: l.qty + 1 } : l,
      ),
    }));
  }, []);

  const dec = React.useCallback((id: string) => {
    setState((prev) => {
      const next = prev.lines
        .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0);
      return { lines: next };
    });
  }, []);

  const remove = React.useCallback((id: string) => {
    setState((prev) => ({ lines: prev.lines.filter((l) => l.id !== id) }));
  }, []);

  const clear = React.useCallback(() => setState({ lines: [] }), []);

  const count = React.useMemo(
    () => state.lines.reduce((sum, l) => sum + l.qty, 0),
    [state.lines],
  );

  const totalByCurrency = React.useMemo(() => {
    const totals: Record<string, number> = {};
    for (const l of state.lines) {
      totals[l.currency] = (totals[l.currency] ?? 0) + l.price * l.qty;
    }
    return totals;
  }, [state.lines]);

  const value: CartContextValue = {
    ...state,
    addItem,
    inc,
    dec,
    remove,
    clear,
    count,
    totalByCurrency,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function formatMoney(currency: Currency, value: number) {
  if (currency === "Rs") return `Rs ${value.toFixed(0)}`;
  return `$${value.toFixed(2)}`;
}
