import Image, { type ImageProps } from "next/image";

/**
 * Photo uploaded through the admin panel. Photos from Vercel Blob go through Next's image optimiser; photos from
 * the local development store (/media/...) are served as they are.
 */
export function SiteImage({ src, alt, ...rest }: Omit<ImageProps, "src" | "alt"> & { src: string; alt: string }) {
  return <Image src={src} alt={alt} unoptimized={src.startsWith("/media/")} {...rest} />;
}
