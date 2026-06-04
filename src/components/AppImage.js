"use client";

import Image from "next/image";
import { getImageSrc, isStaticImageImport } from "@/utils/image";

/**
 * Drop-in replacement for <img> that works with Next.js static imports.
 * When className is set, uses a native <img> so CSS controls size (CRA behavior).
 */
export default function AppImage({
  src,
  alt = "",
  className,
  style,
  width,
  height,
  priority,
  onClick,
  ...rest
}) {
  if (!src) return null;

  const useCssSizing = Boolean(className) && !width && !height;

  if (!isStaticImageImport(src) || useCssSizing) {
    const url = getImageSrc(src);
    if (!url) return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        className={className}
        style={style}
        onClick={onClick}
        {...rest}
      />
    );
  }

  const imgWidth = width || src.width;
  const imgHeight = height || src.height;

  return (
    <Image
      src={src}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      className={className}
      style={{ maxWidth: "100%", height: "auto", ...style }}
      unoptimized
      priority={priority}
      onClick={onClick}
      {...rest}
    />
  );
}
