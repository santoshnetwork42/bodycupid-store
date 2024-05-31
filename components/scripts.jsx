import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import GTM from "react-gtm-module";

import Wisepops from "~/components/scripts/wisepops.jsx";
import { GTM_ID, WISEPOPS_KEY, LIMECHAT_ENABLED } from "~/config";
import { useIsInteractive } from "~/utils/contexts/navbar";
import Affise from "./scripts/Affise/Affise";
import LimeChat from "~/components/scripts/limechat";

export default function Scripts() {
  const isInteractive = useIsInteractive();

  useEffect(() => {
    if (isInteractive) {
      GTM.initialize({ gtmId: GTM_ID });
    }
  }, [isInteractive]);

  return (
    <>
      <Analytics />
      <Affise />
      {!!LIMECHAT_ENABLED && <LimeChat />}
      {!!isInteractive && <>{!!WISEPOPS_KEY && <Wisepops />}</>}
    </>
  );
}
