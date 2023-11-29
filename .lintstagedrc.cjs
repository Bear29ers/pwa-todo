const path = require('path');

const buildCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(' ');

  return [`eslint --max-warnings=0 ${files}`, `prettier --write ${files}`, `markuplint ${files}`];
};

module.exports = {
  'src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}': buildCommand,
};
