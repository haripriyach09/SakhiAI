import Image from "next/image";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({
  className = "",
}: BrandLogoProps) {
  return (
    <Image
      src="/sakhiAI-logo.png"
      alt="SakhiAI"
      width={1920}
      height={768}
      className={`h-auto max-w-full object-contain ${className}`}
    />
  );
}
