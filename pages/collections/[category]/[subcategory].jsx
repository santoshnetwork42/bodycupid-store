import React from "react";
import Head from "next/head";

import Category from "~/components/partials/collections/category";

function Categories() {
  return (
    <main className="main">
      <Head>
        <title>Wow life science - Shop Page</title>
      </Head>

      <h1 className="d-none">Wow life science - Shop Page</h1>

      <Category />
    </main>
  );
}

export default React.memo(Categories);
