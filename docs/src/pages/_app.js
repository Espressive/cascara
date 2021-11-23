import React from 'react';
import pt from 'prop-types';
import { useRouter } from 'next/router';

import '@espressive/legacy-css';
import '../styles/_app.scss';

import { AdminStructure } from '@espressive/cascara';
import { Nav, PropTable } from '../components';

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
          logo='https://cascara.design/cascara_meta.png'
          title="Espressive's Functional Design System"
        />
      }
      nav={<Nav {...pageProps} />}
      theme={theme}
    >
      <AdminStructure.Main>
        <Component {...pageProps} />
      </AdminStructure.Main>
      <AdminStructure.Drawer>
        <div>
          {propTable?.length > 0 &&
            propTable.map((componentProps, idx) => (
              <PropTable docData={componentProps} key={`${idx}`} />
            ))}
        </div>
      </AdminStructure.Drawer>
    </AdminStructure>
  );
};

MyApp.propTypes = propTypes;

export default MyApp;
