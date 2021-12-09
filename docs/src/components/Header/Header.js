import pt from 'prop-types';

import { AdminStructure, Flex } from '@espressive/cascara';
// import Logo from './Logo';
import Tag from '../Tag';

/**
 * TODO: Convert logo into an SVG file
 */

const propTypes = {
  branch: pt.string,
  cascaraVersion: pt.string,
};

const Header = ({ branch, cascaraVersion }) => {
  return (
    <AdminStructure.Header
      logo='https://cascara.design/cascara_meta.svg'
      post={
        <div>
          <Flex>
            <Tag content={cascaraVersion} />
            {branch !== 'main' && <Tag content={branch} />}
          </Flex>
        </div>
      }
      title='Cascara'
    />
  );
};

Header.propTypes = propTypes;

export default Header;
