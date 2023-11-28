const config = {
  extends: ['markuplint:recommended'],
  excludeFiles: ['./**/*.{test,spec,stories}.[jt]sx'],
  parser: {
    '.[jt]sx': '@markuplint/jsx-parser',
  },
  specs: {
    '.[jt]sx': '@markuplint/react-spec',
  },
};

module.exports = config;
