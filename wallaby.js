module.exports = function(wallaby) {
  return {
    files: [
      'jest/setup-tests.ts',
      '.env.test',
      'tsconfig.json',
      'src/**/*.ts',
      '!src/**/__tests__/*.ts',
    ],
    tests: ['src/**/__tests__/*.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    // initial: 1,
    // regular: 1,
    testFramework: 'jest',
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript(),
    },
    preprocessors: {
      '**/*.js?(x)': file =>
        require('@babel/core').transform(file.content, {
          sourceMap: true,
          compact: false,
          filename: file.path,
          presets: [require('babel-preset-jest')],
        }),
    },
  };
};
