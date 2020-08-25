import { Fragment } from 'react';
import { Admin } from '@espressive/cascara';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavSection from './NavSection';

const docPath = (path) => path.replace('../packages/cascara/src', '/docs');

const Nav = ({ mdxTree }) => {
  const router = useRouter();

  return (
    <Admin.Nav>
      {mdxTree?.map((item) =>
        item.size ? (
          <Fragment key={item.name}>
            <NavSection content={item.name} />
            <ul style={{ listStyle: 'none' }}>
              {item.children.map((item) =>
                item.size ? (
                  <li
                    key={item.name}
                    style={
                      item.name === router?.query?.mdx[1]
                        ? { listStyle: 'disc' }
                        : undefined
                    }
                  >
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
    </Admin.Nav>
  );
};

export default Nav;
