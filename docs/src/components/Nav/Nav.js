import { Fragment } from 'react';
import { Admin } from '@espressive/cascara';
import { useRouter } from 'next/router';
import NavSection from './NavSection';
import NavList from './NavList';
import NavItem from './NavItem';

const docPath = (path) => path.replace('../packages/cascara/src', '/docs');

const Nav = ({ mdxTree, posts }) => {
  const router = useRouter();

  return (
    <Admin.Nav>
      <NavList>
        <NavItem
          as='/'
          content='Home'
          href='/'
          isActive={router?.asPath === '/'}
        />
      </NavList>

      <NavSection content='Principles' />

      <NavList>
        {posts?.map((post) => {
          const fileAsPath = `/${post.filePath.replace(/\.mdx?$/, '')}`;

          return (
            // Do not render the index.mdx file here
            post.filePath !== 'index.mdx' && (
              <NavItem
                as={fileAsPath}
                content={post?.data?.title || post.filePath}
                href={`/[slug]`}
                isActive={router?.asPath === fileAsPath}
                key={post.filePath}
              />
            )
          );
        })}
      </NavList>

      {/* <hr style={dividerStyle} /> */}
      {mdxTree?.map((item) =>
        item.size ? (
          <Fragment key={item.name}>
            <NavSection content={item.name} />
            <NavList>
              {item.children.map((item) => {
                const activeComponent = router?.query?.mdx?.[1];
                return item.size ? (
                  <NavItem
                    as={docPath(item.path)}
                    content={item.name}
                    href='/docs/[[...mdx]]'
                    isActive={item.name === activeComponent}
                    key={item.name}
                  />
                ) : null;
              })}
            </NavList>
          </Fragment>
        ) : null
      )}
    </Admin.Nav>
  );
};

export default Nav;
