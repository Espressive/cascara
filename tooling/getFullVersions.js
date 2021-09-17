const { releases } = require('../versions');

const nextReleases = releases
  .filter(({ name }) => name !== 'docs')
  .map(({ name, newVersion }) => ({
    text: `New \`${name}@${newVersion}\` published`,
    type: 'mrkdwn',
  }));

console.log(JSON.stringify(nextReleases));
