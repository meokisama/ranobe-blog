import Image from "next/image";

// The two fixed decorative background layers (light-mode only) shared by the
// home and blog pages. `dim` lowers the beams layer opacity (used on the home
// page); other pages use the default.
export default function PageBackground({ dim = false }: { dim?: boolean }) {
  return (
    <>
      <Image
        src="/sneaker.webp"
        alt="background image"
        width={1308}
        height={1000}
        className="fixed w-full h-auto z-1 dark:invert dark:hidden select-none pointer-events-none"
      />
      <Image
        src="/beams.jpg"
        alt="background image"
        width={1308}
        height={1000}
        className={`fixed w-full h-full z-1 dark:invert dark:hidden select-none pointer-events-none ${dim ? "opacity-40" : "opacity-50"}`}
      />
    </>
  );
}
