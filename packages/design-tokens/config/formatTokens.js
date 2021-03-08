module.exports = ({ dictionary, options }) => {
  return JSON.stringify(
    {
      '@name': process.env.npm_package_name,
      '@version': process.env.npm_package_version,
      properties: { ...dictionary.properties },
    },
    null,
    2
  );
};
