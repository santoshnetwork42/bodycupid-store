import React from "react";
import Head from "next/head";

function NextHead({ siteName, title, description, image }) {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <link rel="canonical" id="canonical" href="#" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {/* <meta name="keywords" content={pageContents?.metakeywords} /> */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      {!!image && <meta property="og:image" content={image} />}
    </Head>
  );
}

export default NextHead;
