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
    plugins: ['@babel/plugin-transform-modules-commonjs',
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      ["@babel/plugin-transform-class-properties", { "loose": true }]
    ], // Add this plugin
  };
};