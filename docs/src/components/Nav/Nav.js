import { Admin } from '@espressive/cascara';
import Link from 'next/link';

const Nav = ({ mdxPages }) => {
  return (
    <Admin.Nav>
      {mdxPages?.layout && (
        <>
          <h4>Layouts</h4>
          <ul>
            {mdxPages.layout.map((file) => (
              <li key={file.component}>
                <Link href={`/components/layout/${file.component}`}>
                  <a>{file.component}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {mdxPages?.ui && (
        <>
          <h4>UI</h4>
          <ul>
            {mdxPages.ui.map((file) => (
              <li key={file.component}>
                <Link href={`/components/ui/${file.component}`}>
                  <a>{file.component}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {mdxPages?.specs && (
        <>
          <h4>Specs</h4>
          <ul>
            {mdxPages.specs.map((file) => {
              return (
                <li key={file}>
                  <Link href={`/components/specs/${file}`}>
                    <a>{file}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Admin.Nav>
  );
};

export default Nav;
