module.exports = function(config) {
  config.set({
    files: [
      'public/lib/**/*.js',
      'public/assets/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'test/*.js': ['webpack']
    },
    browser: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['progress', 'html'],
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
      },
      resolve: {
        extensions: ['','.js']
      }
    },
    webpackServer: {
      noInfo: true
    },
    plugins: [
      require('karma-webpack'),
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter'
    ]
  });
};
