import awaitGlobal from "await-global";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { LIMECHAT_BASE_URL, LIMECHAT_WEBSITE_TOKEN } from "~/config";

function LimeChat() {
  const router = useRouter();

  const isLimechatShow =
    router.asPath === "/" || router.asPath === "/collections/all";

  useEffect(() => {
    const wootBubbleHolder =
      document && document.querySelector(".woot--bubble-holder");
    if (wootBubbleHolder) {
      if (isLimechatShow) {
        wootBubbleHolder.classList.remove("woot--bubble-holder-hidden");
      } else {
        wootBubbleHolder.classList.add("woot--bubble-holder-hidden");
      }
    }
  }, [router.asPath]);

  const handleScriptLoad = () => {
    awaitGlobal("chatwootSDK").then((sdk) => {
      sdk?.run({
        websiteToken: LIMECHAT_WEBSITE_TOKEN,
        baseUrl: LIMECHAT_BASE_URL,
      });
    });
  };

  return (
    <>
      {isLimechatShow && (
        <Script
          data-cfasync="false"
          src={`https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/LC_sdk/v1/sdk.js`}
          onLoad={handleScriptLoad}
        />
      )}
    </>
  );
}

export default LimeChat;
