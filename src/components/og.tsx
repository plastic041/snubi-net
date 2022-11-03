import Head from "next/head";
import { type Og } from "~/typings/og";

type OgHeadProps = {
  og: Og;
};
export const OgHead = ({ og }: OgHeadProps) => {
  return (
    <Head>
      <title>{og.title}</title>
      <meta name="title" content={og.title} />
      <meta name="description" content={og.description} />
      <meta name="copyright" content="snubi" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={og.url} />
      <meta property="og:title" content={og.description} />
      <meta property="og:description" content={og.url} />
      <meta property="og:image" content={og.image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={og.url} />
      <meta property="twitter:title" content={og.title} />
      <meta property="twitter:description" content={og.description} />
      <meta property="twitter:image" content={og.image} />
    </Head>
  );
};
