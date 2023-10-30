module.exports = {
  root: true,
  env: {
    node: true, //'module' is not defined.
    browser: true,
    es2020: true
  },
  extends: [
    "eslint:recommended",
    /**
     * 原因是eslint在使用了"plugin:react/recommended"
     * 对react检查时，会使用prop-types规则进行检查，
     * 在项目中使用的是ts，我们不会去引入prop-types
     * 去声明数据类型，所以会报错。这里有两种处理方法：
     */
    // "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-unused-vars": "off"
  }
};
