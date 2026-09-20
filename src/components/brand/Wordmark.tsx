import Image from "next/image";
type Size = "sm" | "md" | "lg";
const sizes = { sm: { mark: 34, text: "1rem" }, md: { mark: 44, text: "1.3rem" }, lg: { mark: 64, text: "clamp(1.6rem, 3vw, 2.6rem)" } };
export function IntelligenceNode({ size = 44 }: { size?: number; animated?: boolean }) {
  return <Image src="/brand/atx-mark.webp" width={size} height={size} alt="" aria-hidden="true" className="brand-mark" />;
}
export function Wordmark({ size = "md", withMark = true, className = "" }: { size?: Size; withMark?: boolean; className?: string }) {
  return <span className={`brand-wordmark ${className}`} style={{ fontSize: sizes[size].text }}>{withMark && <IntelligenceNode size={sizes[size].mark} />}<span>AiTroni<span className="brand-wordmark__x">X</span>us</span></span>;
}
