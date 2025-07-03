import NotFoundPage from "../components/404/not-found-page";
import META_TAGS from "../lib/meta_tags";
import Head from "next/head";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Head>
        <title>{META_TAGS.title}</title>
        <meta name="author" content={META_TAGS.author} />
        <meta name="description" content={META_TAGS.description} />
        {/* <meta name="keywords" content={meta_seo.keywords} /> */}
        {/* facebook */}
        <meta property="og:title" content={META_TAGS.title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={META_TAGS.image} />

        {/* twitter */}
        <meta name="twitter:title" content={META_TAGS.title} />
        <meta name="twitter:description" content={META_TAGS.description} />
        <meta name="twitter:image" content={META_TAGS.image} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* favicon */}
        <link rel="shortcut icon" href="/assets/meta/favicon.ico" type="image/x-icon" />
      </Head>
      <NotFoundPage />
    </>
  );
}
export default Page;
