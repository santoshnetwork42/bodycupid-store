import "~/public/sass/style.scss";

import Providers from "./providers";
import dynamic from "next/dynamic";
const ClientLayout = dynamic(() => import("~/components/layout"), { ssr: false });

export const metadata = {
  title: "WOW Health",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout navbar={{}} footer={{}} hideHeader={false}>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
