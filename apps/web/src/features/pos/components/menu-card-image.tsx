"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type MenuCardImageProps = {
  src: string | null;
  name: string;
  isOut: boolean;
};

export function MenuCardImage({ src, name, isOut }: MenuCardImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-4/3 shrink-0 overflow-hidden bg-brand-soft",
        isOut && "opacity-40 grayscale",
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 1024px) 40vw, 200px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-3xl font-bold text-white/25">
          {name.slice(0, 2)}
        </span>
      )}
    </div>
  );
}