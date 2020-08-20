import { Fragment } from 'react';
import { Admin } from '@espressive/cascara';
import Link from 'next/link';
import NavSection from './NavSection';

const docPath = (path) => path.replace('../packages/cascara/src', '/docs');

const Nav = ({ mdxTree }) => {
  return (
    <Admin.Nav>
      {mdxTree?.map((item) =>
        item.size ? (
          <Fragment key={item.name}>
            <NavSection content={item.name} />
            <ul>
              {item.children.map((item) =>
                item.size ? (
                  <li key={item.name}>
                    <Link as={docPath(item.path)} href='/docs/[[...mdx]]'>
                      <a>{item.name}</a>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </Fragment>
        ) : null
      )}

      {/* {mdxPages?.specs && (
        <>
          <h4>Specs</h4>
          <ul>
            {mdxPages.specs.map((file) => {
              return (
                <li key={file}>
                  <Link href={`/components/specs/${file}`}>
                    <a>{file}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )} */}
    </Admin.Nav>
  );
};

export default Nav;
