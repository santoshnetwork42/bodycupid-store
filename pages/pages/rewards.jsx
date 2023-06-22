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
            elementHookId: "#gluappbc",
            css: ".__glu_container { height: 100% }",
          },
          {
            typeId: "WALLET",
          }
        );
      }
    })();

    return () => {
      (async function () {
        const glu = await awaitGlobal("glu");
        if (glu) {
          glu.close();
        }
      })();
    };
  }, []);

  return <div id="gluappbc"></div>;
}

export default Rewards;
