import React, { useEffect } from "react";
import TagManager from "react-gtm-module";

import { GTM_ID } from "~/config";
import { useIsInteractive } from "~/utils/contexts/navbar";

export default function Scripts() {
  const isInteractive = useIsInteractive();

  useEffect(() => {
    if (isInteractive) {
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, [isInteractive]);

  return <></>;
}
