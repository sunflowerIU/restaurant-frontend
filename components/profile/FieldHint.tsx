import * as React from "react";

type FieldHintProps = {
  children: React.ReactNode;
};

export default function FieldHint({ children }: FieldHintProps) {
  return <p className="text-xs text-white/45">{children}</p>;
}
