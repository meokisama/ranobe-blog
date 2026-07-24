import Image from "next/image";

// The fixed decorative background layers shared by the home and blog pages.
// Light mode uses two illustrations; dark mode swaps in a soft coloured glow
// plus a faint grid so it is not pitch black. `dim` lowers the beams layer
// opacity (used on the home page); other pages use the default.
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
      <div className="dark-aurora fixed inset-0 z-1 hidden dark:block select-none pointer-events-none" />
      <div className="dark-grid fixed inset-0 z-1 hidden dark:block select-none pointer-events-none opacity-[0.06]" />
    </>
  );
}
