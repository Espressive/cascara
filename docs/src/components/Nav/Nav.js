import pt from 'prop-types';
import { useRouter } from 'next/router';

import { AdminStructure } from '@espressive/cascara';

import NavLinkNext from './NavLinkNext';
import Tag from '../Tag';
import formatLabel from '../../lib/formatLabel';

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
    label: 'Change Log',
    linkComponent: NavLinkNext,
    linkComponentProps: {
      href: rootPath,
      isActive: router?.asPath === rootPath,
    },
  };

  const gettingStartedLink = {
    label: gettingStartedLabel,
    linkComponent: NavLinkNext,
    linkComponentProps: {
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
          label: formatLabel(post?.data?.title || post?.filePath),
          linkComponent: NavLinkNext,
          linkComponentProps: {
            href: linkPath,
            isActive: router.asPath === linkPath,
          },
          post: post?.meta?.status && <Tag content={post?.meta?.status} />,
        };
      }),
  };

  // add tags!
  const mdxTreeSection = mdxTree
    ? mdxTree
        ?.filter((branch) => branch.size)
        .map((item) => ({
          label: formatLabel(item.name),
          links: item?.children.map((child) => {
            return {
              label: child?.meta?.title || child.name,
              linkComponent: NavLinkNext,
              linkComponentProps: {
                href: child.path.replace('../packages/cascara/src', '/docs'),
                isActive: child.name === router?.query?.mdx?.[1],
              },
              post: child?.meta?.status && (
                <Tag content={child?.meta?.status} />
              ),
            };
          }),
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
