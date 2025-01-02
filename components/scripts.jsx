import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import GTM from "react-gtm-module";

import LimeChat from "~/components/scripts/limechat";
import Wisepops from "~/components/scripts/wisepops.jsx";
import { GTM_ID, LIMECHAT_ENABLED, WISEPOPS_KEY } from "~/config";
import { useIsInteractive } from "~/utils/contexts/navbar";
import Affise from "./scripts/Affise/Affise";

export default function Scripts() {
  const isInteractive = useIsInteractive();
  const [gtmInitialized, setGtmInitialized] = useState(false);

  useEffect(() => {
    if (!gtmInitialized) {
      GTM.initialize({ gtmId: GTM_ID });
      setGtmInitialized(true);
    }
  }, [gtmInitialized]);

  if (!isInteractive) {
    return null;
  }

  return (
    <>
      <Analytics />
      <Affise />
      {!!LIMECHAT_ENABLED && <LimeChat />}
      {!!isInteractive && <>{!!WISEPOPS_KEY && <Wisepops />}</>}
      {!!LIMECHAT_ENABLED && <LimeChat />}
    </>
  );
}
