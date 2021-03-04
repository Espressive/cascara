import Link from 'next/link';
import { Admin } from '@espressive/cascara';
import Logo from './Logo';

const Header = () => {
  return (
    <Admin.Header>
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

export default Header;
