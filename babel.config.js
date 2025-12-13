module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    // Reanimated plugin must be listed last
    ['module-resolver', {
      root: ['./'],
      alias: {
        '@src': './src',
        '@components': './src/components',
        '@screens': './src/screen',
        '@styles': './src/style',
        '@assets': './src/assest',
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }],
    'react-native-reanimated/plugin',
  ],
};
