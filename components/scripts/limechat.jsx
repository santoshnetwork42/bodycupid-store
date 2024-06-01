import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";

function LimeChat() {
  const router = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [whatsappButton, setWhatsappButton] = useState(null);

  useEffect(() => {
    setIsHome(router.pathname === "/");
  }, [router.pathname]);
  console.log("here");
  const ele = document.getElementsByClassName("WhatsAppButton__root");

  useEffect(() => {
    if (ele) {
      const array = Array.prototype.slice.call(ele);
      if (array.length) {
        if (!isHome) {
          array?.forEach((e) => {
            e.remove();
          });
        }
      } else {
        if (isHome && whatsappButton) {
          whatsappButton.renderButton();
        }
      }
    }
  }, [router, isHome, whatsappButton]);

  const handleScriptLoad = () => {
    console.log("Limechat script loaded");
    let whatsAppBtn = new LimeChatWhatsapp({
      phoneNumber: "918147657386",
      prefill_text: "Hey, Let's chat about Body Cupid.",
      button_message_mobile: "Chat with us",
      button_message_desktop: "Chat with us",
      display_on: "both",
      widget_type_desktop: "icon",
      widget_type_mobile: "icon",
      display_size_desktop: 44,
      position_desktop: "right",
      bottom_margin_desktop: 48,
      left_margin_desktop: 48,
      right_margin_desktop: 48,
      display_size_mobile: 44,
      position_mobile: "right",
      bottom_margin_mobile: 70,
      left_margin_mobile: 24,
      right_margin_mobile: 24,
      show_pop_up: true,
      pop_up_message_position: "side",
      pop_up_message_text: "Hey, Let's chat!",
      pop_up_image: " ",
      pop_up_delay: 3,
      pdp_prefill_text: "Hey! I would like to know about ",
      pages_to_display: [
        "homepage",
        "cart",
        "blogs",
        "products",
        "collections",
        "checkout",
        "pages",
      ],
      includeVariant: false,
      isShopify: false,
    });
    if (whatsAppBtn) {
      setWhatsappButton(whatsAppBtn);
      whatsAppBtn.renderButton();
    }
  };

  return (
    <>
      <Script
        data-cfasync="false"
        src={`https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/LC_whatsapp_widget.js`}
        onLoad={handleScriptLoad}
      />
    </>
  );
}

export default LimeChat;
