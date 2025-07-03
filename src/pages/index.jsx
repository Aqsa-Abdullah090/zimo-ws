import Head from "next/head";
import HoldingPage from "../components/holding/holdingPage";
import META_TAGS from "../lib/meta_tags";

export default function Page() {
  const { title, author, desc, image } = META_TAGS.pages.main;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content={author} />
        <meta name="description" content={desc} />

        {/* Open Graph (Facebook) */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />

        {/* Twitter Cards */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* favicon */}
        <link
          rel="shortcut icon"
          href="/assets/meta/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="/assets/meta/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <HoldingPage />
    </>
  );
}
