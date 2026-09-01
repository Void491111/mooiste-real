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
        "relative grid aspect-4/3 place-items-center overflow-hidden rounded-card",
        isOut && "opacity-45",
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 1024px) 40vw, 220px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="grid size-20 place-items-center rounded-card bg-muted-foreground/15 text-3xl font-bold text-muted-foreground/60 transition-transform duration-500 ease-out group-hover:scale-110">
          {name.slice(0, 1)}
        </div>
      )}
    </div>
  );
}