module.exports = {
  '**/*.{js,jsx,ts,tsx}': 'eslint --fix',
  '**/*.{js,jsx,ts,tsx,json}': 'prettier --write',
  '**/*.{html,jsx,tsx}': 'markuplint --fix',
};
