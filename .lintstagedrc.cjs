module.exports = {
  '**/*.{js,jsx,ts,tsx,json}': 'prettier --cache --write',
  '**/*.{html,jsx,tsx}': 'markuplint --fix',
};
