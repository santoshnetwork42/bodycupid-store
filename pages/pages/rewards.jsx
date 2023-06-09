import React, { useEffect } from "react";

function Rewards() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.glu) {
      window.glu.open(
        {
          typeId: "POPUP",
          elementHookId: "#app",
          css: ".__glu_container { height: 100% }",
        },
        {
          typeId: "WALLET",
        }
      );
    }
  }, [!!(typeof window !== "undefined" && window.glu)]);

  return (
    <>
      <div id="app"></div>
    </>
  );
}

export default Rewards;
