const path = require('path');

const buildCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(' ');

  return [`prettier --fix ${files}`, `markuplint ${files}`, `eslint --max-warnings=0 ${files}`];
};

module.exports = {
  'src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}': buildCommand,
};
