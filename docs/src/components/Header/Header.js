import pt from 'prop-types';

import { AdminStructure, Flex } from '@espressive/cascara';
import Tag from '../Tag';

const propTypes = {
  branch: pt.string,
  cascaraVersion: pt.string,
};

const Header = ({ branch, cascaraVersion }) => {
  return (
    <AdminStructure.Header
      logo='/cascara_logo.svg'
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
