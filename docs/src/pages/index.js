import hydrate from 'next-mdx-remote/hydrate';
import pt from 'prop-types';
import getMDXTree from '../lib/getMDXTree';
import { postFilePaths, POSTS_PATH } from '../lib/mdxUtils';
import MDX_COMPONENTS from '../lib/MDX_COMPONENTS';
import MDX_OPTIONS from '../lib/MDX_OPTIONS';
import { AdminStructure, Button, Section } from '@espressive/cascara';

const propTypes = {
  frontMatter: pt.shape({
    description: pt.string,
    title: pt.string,
  }),
  // eslint-disable-next-line react/forbid-prop-types -- AST can be any object
  source: pt.object,
};

const Home = ({ source, frontMatter }) => {
  const content = hydrate(source, { components: MDX_COMPONENTS });
  return (
    <>
      <AdminStructure.Drawer>
        <Section title='Feature Requests' titleAs='h4'>
          <p>
            Please file a Request For Comments (RFC) on any new components. The
            Cascara team will evaluate the request. Include a description of
            both the use case, and the problems the requested component or
            functionality might solve.
          </p>
          <Button
            as='a'
            content='File RFC'
            href='https://espressive.atlassian.net/secure/CreateIssueDetails.jspa?labels=RFC&priority=10001&pid=10042&issuetype=10001&summary=%5BRFC%5D%3A%20&description=Please%20complete%20this%20request%20for%20comment%2Fcomponent%20and%20leave%20%5BRFC%5D%20in%20the%20summary.'
            rel='noopener noreferrer'
            size='small'
            target='_blank'
          />
        </Section>
      </AdminStructure.Drawer>
      {content}
    </>
  );
};

const getStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');
  const renderToString = require('next-mdx-remote/render-to-string');

  const postFilePath = path.join(POSTS_PATH, '../', 'CHANGELOG.md');
  const source = fs.readFileSync(postFilePath);

  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components: MDX_COMPONENTS,
    mdxOptions: MDX_OPTIONS,
    scope: data,
  });

  return {
    props: {
      branch: process.env?.GIT_BRANCH,
      cascaraVersion: process.env?.npm_package_version,
      frontMatter: data,
      mdxTree: getMDXTree(),
      posts,
      source: mdxSource,
    },
    // Keep this here for updates to the MDX files
    revalidate: 1,
  };
};

Home.propTypes = propTypes;

export { getStaticProps };

export default Home;
