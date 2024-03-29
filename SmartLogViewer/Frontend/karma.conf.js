// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/front-end_viewer'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'text-summary' },
        { type: 'json-summary' }
      ],
      check: {
        emitWarning: false,
        global: {
          statements: 0,
          branches: 0,
          functions: 0,
          lines: 0
        }
      },
      watermarks: {
        statements: [ 40, 50 ],
        functions: [ 40, 50 ],
        branches: [ 40, 50 ],
        lines: [ 40, 50 ]
      },
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome']
  });
};
