import Image from "next/image";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function NextImage({ loader = "custom", ...props }) {
  if (!props.src) return <></>;
  if (loader === "local" || loader === "wp") return <Image {...props} />;
  return (
    <Image
      {...props}
      loader={({ src, width, quality }) =>
        getPublicImageURL(encodeURI(src), width, quality)
      }
    />
  );
}
