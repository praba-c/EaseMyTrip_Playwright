module.exports = {
  default: {
    require: [
      'steps/*.ts',
      'support/World.ts'
    ],

    format: ['progress', 'json:reports/cucumber-report.json'],
    paths: ['features/*.feature'],
    requireModule: ['ts-node/register'],
    parallel: 1,
    timeout: 600000
  }
};
