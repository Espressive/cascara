import { Fragment } from 'react';
import { Admin } from '@espressive/cascara';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavSection from './NavSection';

const docPath = (path) => path.replace('../packages/cascara/src', '/docs');

const dividerStyle = {
  borderBottom: 'none',
  borderTop: '1px solid var(--color-transparent-grey)',
};
const listStyle = { listStyle: 'none' };
const activeListItemStyle = { listStyle: 'disc' };

const Nav = ({ mdxTree, posts }) => {
  const router = useRouter();

  return (
    <Admin.Nav>
      <ul style={listStyle}>
        <li style={router?.asPath === '/' ? activeListItemStyle : undefined}>
          <Link as='/' href='/'>
            <a>Home</a>
          </Link>
        </li>
      </ul>

      <hr style={dividerStyle} />

      <NavSection content='Principles' />
      <ul style={listStyle}>
        {posts?.map((post) => {
          const fileAsPath = `/${post.filePath.replace(/\.mdx?$/, '')}`;

          return (
            // Do not render the index.mdx file here
            post.filePath !== 'index.mdx' && (
              <li
                key={post.filePath}
                style={
                  router?.asPath === fileAsPath
                    ? activeListItemStyle
                    : undefined
                }
              >
                <Link as={fileAsPath} href={`/[slug]`}>
                  <a>{post?.data?.title || post.filePath}</a>
                </Link>
              </li>
            )
          );
        })}
      </ul>

      <hr style={dividerStyle} />
      {mdxTree?.map((item) =>
        item.size ? (
          <Fragment key={item.name}>
            <NavSection content={item.name} />
            <ul style={listStyle}>
              {item.children.map((item) => {
                const activeComponent = router?.query?.mdx?.[1];
                return item.size ? (
                  <li
                    key={item.name}
                    style={
                      item.name === activeComponent
                        ? activeListItemStyle
                        : undefined
                    }
                  >
                    <Link as={docPath(item.path)} href='/docs/[[...mdx]]'>
                      <a>{item.name}</a>
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </Fragment>
        ) : null
      )}
    </Admin.Nav>
  );
};

export default Nav;
