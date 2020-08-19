import fs from 'fs';
import path from 'path';

const isDoc = (filename) => filename.endsWith('.doc.mdx');

const isSpec = (filename) => filename.endsWith('.spec.mdx');

// Gets component MDX files assuming a single 'spec' or 'doc' MDX file per directory
// and only single level recursion
const getComponentMDXFiles = (componentPath) => {
  const componentsDirectory = path.join(process.cwd(), componentPath);

  const componentDirs = fs
    .readdirSync(componentsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  componentDirs.map((filename) => {
    let mdxFiles = [];

    const componentPath = path.join(componentsDirectory, filename);

    const componentMDXFiles = fs
      .readdirSync(componentPath)
      .filter((file) => file.match(/.*\.(mdx)/gi));

    if (componentMDXFiles.length > 0) {
      mdxFiles.push({
        component: filename,
        doc: componentMDXFiles.find(isDoc) || null,
        spec: componentMDXFiles.find(isSpec) || null,
      });
    }

    return mdxFiles;
  });
};

// Gets a list of all MDX files in a directory regardless of extension or count.
// No recursion
const getMDXFileList = (dir) => {
  const MDXDirectory = path.join(process.cwd(), dir);
  const MDXFiles = fs
    .readdirSync(MDXDirectory)
    .filter((file) => file.match(/.*\.(mdx)/gi));

  return MDXFiles;
};

export { getComponentMDXFiles, getMDXFileList };
