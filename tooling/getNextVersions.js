const { releases } = require('../versions');

const nextReleases = releases
  .filter(({ name }) => name !== 'docs')
  .filter(({ changesets }) => Boolean(changesets.length))
  .map(({ name }) => ({
    text: `New \`${name}@next\` published`,
    type: 'mrkdwn',
  }));

console.log(JSON.stringify(nextReleases));
