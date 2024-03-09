import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import GTM from "react-gtm-module";

import Wisepops from "~/components/scripts/wisepops.jsx";
import { GTM_ID } from "~/config";
import { useIsInteractive } from "~/utils/contexts/navbar";
import Affise from "./scripts/Affise/Affise";

export default function Scripts() {
  const isInteractive = useIsInteractive();

  useEffect(() => {
    if (isInteractive) {
      GTM.initialize({ gtmId: GTM_ID });
    }
  }, [isInteractive]);

  if (!isInteractive) return <></>;

  return (
    <>
      <Analytics />
      <Wisepops />
      <Affise />
    </>
  );
}
