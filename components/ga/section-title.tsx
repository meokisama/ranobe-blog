import { Separator } from "@/components/ui/separator";

export default function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="w-full text-center flex flex-col items-center justify-center mt-32">
      <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
      <h2 className="text-4xl md:text-6xl font-black">{title}</h2>
      <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">{description}</p>
      <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
    </div>
  );
}
