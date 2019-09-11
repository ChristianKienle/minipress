
module.exports = {
	"extends": "@zeit/eslint-config-node",
	"env": {
		"es6": true,
		"node": true
  },
  "rules": {
    "semi": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
    "arrow-body-style": ["error", "as-needed"],
    "no-eq-null": "off",
    "indent": ["error", 2],
    quotes: ["error", "single"]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.test.js"
      ],
      env: {
        jest: true
      },
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ],
};