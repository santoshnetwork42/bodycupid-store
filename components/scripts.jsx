import React, { useEffect } from "react";
import TagManager from "react-gtm-module";
import { Analytics } from "@vercel/analytics/react";

import { GTM_ID } from "~/config";
import { useIsInteractive } from "~/utils/contexts/navbar";
import Wisepops from "~/components/scripts/wisepops.jsx";
import Affise from "./scripts/Affise/Affise";

export default function Scripts() {
  const isInteractive = useIsInteractive();

  useEffect(() => {
    if (isInteractive) {
      TagManager.initialize({ gtmId: GTM_ID });
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
