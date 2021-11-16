import React from 'react';
import pt from 'prop-types';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import '@espressive/legacy-css';
import '../styles/_app.scss';

import { AdminStructure } from '@espressive/cascara';
import { Header, Main, Nav, PropTable } from '../components';

// NOTE: Anything in the <Head> here is esentially a fallback. These tags can
// be overridden at the page level. <meta> type tags will need a key added
// to them in order for them to be updated, otherwise React will not know
// that the tag is changing. Below the viewport tag does not have a key added
// because that should never be changed. But the description does have a key
// since we will possibly want to change that on a per-page basis.

const propTypes = {
  Component: pt.func,
  pageProps: pt.shape({
    mdxDirSource: pt.arrayOf(
      pt.shape({
        description: pt.string,
        displayName: pt.string,
        docData: pt.shape({}),
        props: pt.shape({}),
      })
    ),
  }),
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const propTable = pageProps?.mdxDirSource?.[router?.query?.doc]?.docData;

  const theme = {
    color: {
      primary: '#b4104b',
      secondary: '#7f7f7f40',
    },
  };

  return (
    <AdminStructure
      header={
        <AdminStructure.Header
          logo={['images?.logo']}
          title={"Espressive's Functional Design System"}
        />
      }
      nav={<Nav {...pageProps} />}
      theme={theme}
    >
      <AdminStructure.Main>
        <Component {...pageProps} />
      </AdminStructure.Main>
      <AdminStructure.Drawer>
        <div style={{ padding: '2rem' }}>
          {propTable?.length > 0 &&
            propTable.map((componentProps) => (
              <AnimatePresence
                exitBeforeEnter
                key={router.query.mdx + componentProps}
              >
                <motion.div
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: 100 }}
                  initial={{ opacity: 0, translateX: 100 }}
                >
                  <PropTable docData={componentProps} />
                </motion.div>
              </AnimatePresence>
            ))}
        </div>
      </AdminStructure.Drawer>
    </AdminStructure>

    // <>
    //   <Head>
    //     <title>Cascara</title>
    //     <meta
    //       content="Espressive's Functional Design System"
    //       key='description'
    //       name='description'
    //     />
    //     <meta
    //       content='https://cascara.design/cascara_meta.png'
    //       key='image'
    //       property='og:image'
    //     />
    //     <meta content='width=device-width, initial-scale=1.0' name='viewport' />
    //   </Head>
    //   <Admin
    //     drawer={
    //       propTable?.length > 0 && (
    //         <Admin.Drawer>
    //           {propTable.map((componentProps) => (
    //             <AnimatePresence
    //               exitBeforeEnter
    //               key={router.query.mdx + componentProps}
    //             >
    //               <motion.div
    //                 animate={{ opacity: 1, translateX: 0 }}
    //                 exit={{ opacity: 0, translateX: 100 }}
    //                 initial={{ opacity: 0, translateX: 100 }}
    //               >
    //                 <PropTable docData={componentProps} />
    //               </motion.div>
    //             </AnimatePresence>
    //           ))}
    //         </Admin.Drawer>
    //       )
    //     }
    //     header={<Header {...pageProps} />}
    //     main={
    //       <Main>
    //         <Component {...pageProps} />
    //       </Main>
    //     }
    //     nav={<Nav {...pageProps} />}
    //   />
    // </>
  );
};

MyApp.propTypes = propTypes;

export default MyApp;
