import Image from "next/image";

type MenuThumbProps = {
  src: string | null;
  name: string;
  size?: number;
};

export function MenuThumb({ src, name, size = 40 }: MenuThumbProps) {
  // Menu tanpa gambar tetap dapat kotak seukuran yang sama, berisi
  // huruf pertama namanya. Tanpa ini, baris tabel jadi tidak rata.
  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className="grid shrink-0 place-items-center rounded-card bg-muted text-sm text-muted-foreground"
      >
        {name.charAt(0).toUpperCase() || "?"}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-card object-cover"
    />
  );
}