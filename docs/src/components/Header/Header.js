import pt from 'prop-types';
import Link from 'next/link';
import { Admin } from '@espressive/cascara';
import Logo from './Logo';
import Tag from '../Tag';

const propTypes = {
  branch: pt.string,
  cascaraVersion: pt.string,
};

const Header = ({ branch, cascaraVersion }) => {
  return (
    <Admin.Header>
      <div style={{ float: 'right', lineHeight: '4em', padding: '0 1em' }}>
        <Tag content={cascaraVersion} />
        &nbsp;
        {branch !== 'main' && <Tag content={branch} />}
      </div>
      <Link href='/'>
        <a>
          <h1
            style={{
              border: 0,
              clip: 'rect(0, 0, 0, 0)',
              height: '1px',
              margin: '-1px',
              overflow: 'hidden',
              padding: 0,
              position: 'absolute',
              whiteSpace: 'nowrap',
              width: '1px',
            }}
          >
            {'Cascara'}
          </h1>
          <Logo
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              height: '100%',
              padding: '1em',
              width: '12em',
            }}
          />
        </a>
      </Link>
    </Admin.Header>
  );
};

Header.propTypes = propTypes;

export default Header;
