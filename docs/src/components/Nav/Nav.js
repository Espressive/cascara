import pt from 'prop-types';
import { useRouter } from 'next/router';

import { AdminStructure } from '@espressive/cascara';
import NavItem from './NavItem';

const propTypes = {
  mdxTree: pt.arrayOf(pt.shape()),
  posts: pt.arrayOf(pt.shape()),
};

const Nav = ({ mdxTree, posts }) => {
  const router = useRouter();

  const rootPath = '/';
  const gettingStartedPath = '/getting-started';
  const gettingStartedLabel = 'Getting Started';

  const changeLogLink = {
    label: "What's new?",
    linkComponent: NavItem,
    linkComponentProps: {
      content: 'Change Log',
      href: rootPath,
      isActive: router?.asPath === rootPath,
    },
  };

  const gettingStartedLink = {
    label: gettingStartedLabel,
    linkComponent: NavItem,
    linkComponentProps: {
      content: gettingStartedLabel,
      href: gettingStartedPath,
      isActive: router?.asPath === gettingStartedPath,
    },
  };

  const conceptsSection = {
    label: 'Concepts',
    links: posts
      ?.filter(
        (post) => !['index.mdx', 'getting-started.mdx'].includes(post.filePath)
      )
      .map((post) => {
        const linkPath = `/${post.filePath.replace(/\.mdx?$/, '')}`;

        return {
          label: post?.data?.title,
          linkComponent: NavItem,
          linkComponentProps: {
            content: post?.data?.title || post?.filePath,
            href: linkPath,
            isActive: router.asPath === linkPath,
            key: post.filePath,
            status: post?.meta?.status,
          },
        };
      }),
  };

  const mdxTreeSection = mdxTree
    ? mdxTree
        ?.filter((branch) => branch.size)
        .map((item) => ({
          label: item.name,
          links: item?.children.map((child) => ({
            label: child?.meta?.title || child.name,
            linkComponent: NavItem,
            linkComponentProps: {
              content: child?.meta?.title || child.name,
              href: child.path.replace('../packages/cascara/src', '/docs'),
              isActive: child.name === router?.query?.mdx?.[1],
              status: item?.meta?.status,
            },
          })),
        }))
    : [];

  const navLinks = [
    changeLogLink,
    gettingStartedLink,
    conceptsSection,
    ...mdxTreeSection,
  ];

  return <AdminStructure.Nav links={navLinks} />;
};

Nav.propTypes = propTypes;

export default Nav;
