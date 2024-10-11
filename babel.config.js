module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-env',
      ['@babel/preset-react', {
        "runtime": "automatic"
      }], 
      '@babel/preset-typescript'
    ],
    plugins: ['@babel/plugin-transform-modules-commonjs'], // Add this plugin
  };
};
