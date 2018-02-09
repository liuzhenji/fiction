module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    // VUE语法错误
    'vue/no-parsing-error': 0,
    // 处理异常
    'handle-callback-err': 0,
    // 数组默认构造器
    'no-array-constructor': 0,
    'no-new-object': 0,
    // 单引号 警告
    'quotes': [1, 'single'],
    'spaced-comment': 0,
    // 强制分号
    'semi': ['error', 'always'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0
  },
  globals: {
    'getCurrentPages': true
  }
}
