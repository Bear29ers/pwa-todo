const config = {
  '**/*.{js,jsx,ts,tsx}': 'eslint',
  '**/*.{js,jsx,ts,tsx,json}': 'prettier --write',
  '**/*.{html,jsx,tsx}': 'markuplint --fix',
};

module.exports = config;
