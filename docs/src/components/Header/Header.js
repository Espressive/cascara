import { Admin } from '@espressive/cascara';
import Logo from './Logo';

const Header = ({ data }) => {
  return (
    <Admin.Header>
      <Logo
        style={{
          display: 'inline-block',
          height: '100%',
          padding: '1em',
          width: '12em',
        }}
      />
    </Admin.Header>
  );
};

export default Header;
