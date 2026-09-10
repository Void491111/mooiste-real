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
        "absolute inset-0 grid place-items-center bg-muted",
        isOut && "opacity-45 grayscale"
      )}
    >
      {src ? (
        <Image 
          src={src}
          alt={name}
          fill
          sizes="(max-width: 1024px) 40vw, 240px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ): (
        <span className="text-5xl font-bold text-muted-foreground">
          {name.slice(0,1)}
        </span>
      )}
    </div>
  );
}