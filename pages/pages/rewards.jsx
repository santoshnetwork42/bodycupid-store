import React, { useEffect } from "react";
import awaitGlobal from "await-global";

function Rewards() {
  useEffect(() => {
    (async function () {
      const glu = await awaitGlobal("glu");
      if (glu) {
        glu.open(
          {
            typeId: "EMBEDDED",
            elementHookId: "#gluapp",
            css: ".__glu_container { height: 100% }",
          },
          {
            typeId: "WALLET",
          }
        );
      }
    })();
  }, []);

  return <div id="gluapp"></div>;
}

export default Rewards;
