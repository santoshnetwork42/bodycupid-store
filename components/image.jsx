import Image from "next/image";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

// Backwards-compatible wrapper for next/image across Next 12 -> 14
export default function NextImage({ loader = "custom", ...rest }) {
  const {
    layout,
    objectFit,
    objectPosition,
    style,
    src,
    ...props
  } = rest || {};

  if (!src) return <></>;

  // Map legacy props to Next 13/14 API
  const mapped = { ...props };

  // layout="fill" -> fill
  if (layout === "fill") {
    mapped.fill = true;
  }

  // objectFit/objectPosition -> style
  if (objectFit || objectPosition || style) {
    mapped.style = {
      ...(style || {}),
      ...(objectFit ? { objectFit } : {}),
      ...(objectPosition ? { objectPosition } : {}),
    };
  }

  // Remove legacy-only props so they aren't forwarded
  delete mapped.layout;
  delete mapped.objectFit;
  delete mapped.objectPosition;
  delete mapped.effect; // ignore unsupported props silently

  if (loader === "local" || loader === "wp") {
    return <Image src={src} {...mapped} />;
  }

  return (
    <Image
      src={src}
      {...mapped}
      loader={({ src: s, width, quality }) =>
        getPublicImageURL(encodeURI(s), width, quality)
      }
    />
  );
}
