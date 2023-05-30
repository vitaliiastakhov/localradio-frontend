const { configure, presets } = require('eslint-kit');
module.exports = configure({
  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react({
      version: '18.2',
    }),
    presets.nextJs(),
    presets.effector(),
  ],
  extend: {
    plugins: ['unused-imports', 'storybook'],
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'effector/no-watch': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/destructuring-assignment': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
});
