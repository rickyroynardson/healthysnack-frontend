import Head from "next/head";

interface HeadMetaDataProps {
  title?: string;
}

export const HeadMetaData: React.FC<HeadMetaDataProps> = ({ title }) => {
  const defaultTitle = "Healthysnack";

  return (
    <Head>
      <title>{title ? title + " - " + defaultTitle : defaultTitle}</title>
    </Head>
  );
};
