import Head from 'next/head';

const MDXLayout = (frontMatter) => {
  const Page = ({ children: content }) => {
    return (
      <>
        <Head>
          <title>{frontMatter.title || 'Cascara'}</title>
          <link href='/favicon.ico' rel='icon' />
        </Head>
        <h1>{frontMatter.title}</h1>
        {content}
      </>
    );
  };

  return Page;
};
export default MDXLayout;
