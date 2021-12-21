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
            {cascaraVersion && (
              <a
                href={`https://github.com/Espressive/cascara/packages/361656?version=${cascaraVersion}`}
              >
                <Tag content={cascaraVersion} />
              </a>
            )}
            {branch && branch !== 'main' && branch !== 'master' && (
              <a href={`https://github.com/Espressive/cascara/tree/${branch}`}>
                <Tag content={branch} />
              </a>
            )}
          </Flex>
        </div>
      }
      title='Cascara'
    />
  );
};

Header.propTypes = propTypes;

export default Header;
