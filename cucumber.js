module.exports = {
  default: {
    require: [
      'steps/*.ts',
      'support/World.ts'
    ],

    format: ['progress', 'html:reports/cucumber-report.html'],
    paths: ['features/*.feature'],
    requireModule: ['ts-node/register'],
    parallel: 1,
    timeout: 600000
  }
};
