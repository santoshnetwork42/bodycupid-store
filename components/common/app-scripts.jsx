import React from "react";
import Script from "next/script";

import { HOTJAR_ID, HOTJAR_SNIPPET_VERSION } from "~/config";

function AppScripts() {
  const hotjar = !!(HOTJAR_ID && HOTJAR_SNIPPET_VERSION);

  return (
    <>
      {hotjar && (
        <Script
          dangerouslySetInnerHTML={{
            __html: `
          <script>
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SNIPPET_VERSION}};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          </script>
          `,
          }}
        />
      )}
    </>
  );
}

export default AppScripts;
