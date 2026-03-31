import { useMemo } from "react";

export default function HeroHeadline({
  text,
  highlight,
  lettersRef,
}: {
  text: string;
  highlight: string;
  lettersRef: React.MutableRefObject<HTMLSpanElement[]>;
}) {
  const parts = useMemo(() => {
    const idx = text.indexOf(highlight);
    if (idx === -1) return [{ type: "plain" as const, value: text }];
    return [
      { type: "plain" as const, value: text.slice(0, idx) },
      { type: "highlight" as const, value: highlight },
      { type: "plain" as const, value: text.slice(idx + highlight.length) },
    ];
  }, [text, highlight]);

  const pushLetterRef = (el: HTMLSpanElement | null) => {
    if (!el) return;
    lettersRef.current.push(el);
  };

  return (
    <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
      {parts.map((p) => {
        const isHighlight = p.type === "highlight";
        const partKey = `${p.type}-${p.value}`;

        return (
          <span key={partKey}>
            {(() => {
              const words = p.value.split(" ");

              return words.map((word, wi) => {
                const letters = splitGraphemes(word);
                const wordKey = `${partKey}-word-${wi}`;

                return (
                  <span
                    key={wordKey}
                    className={[
                      "inline-block",
                      wi < words.length - 1 ? "mr-[0.28em]" : "",
                    ].join(" ")}
                  >
                    {letters.map((letter, li) => (
                      <span
                        key={`${wordKey}-letter-${letter}-${word.indexOf(letter, li)}`}
                        ref={pushLetterRef}
                        className={[
                          "inline-block  ",
                          isHighlight
                            ? "hero-neon-letter text-destructive"
                            : "",
                        ].join(" ")}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                );
              });
            })()}
          </span>
        );
      })}
    </h1>
  );
}

function splitGraphemes(text: string): string[] {
  // Handles emojis/combined characters better than text.split("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Seg = (globalThis as any).Intl?.Segmenter;
  if (Seg) {
    const seg = new Seg(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s: { segment: string }) => s.segment);
  }
  return Array.from(text);
}
