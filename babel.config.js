// module.exports = {
//   presets: [
//     [
//       'espressive',
//       {
//         targets: {
//           node: 'current',
//         },
//       },
//     ],
//   ],
// };

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
  ],
};
