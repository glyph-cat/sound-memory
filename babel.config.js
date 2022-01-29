module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-typescript'],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  },
  // Moved out of `env/test` to support linting
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {
      loose: true,
    }]
  ],
}
