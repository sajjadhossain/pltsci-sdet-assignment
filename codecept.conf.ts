import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './test/*_test.ts',
  output: '',
  helpers: {
    REST: {
      endpoint: 'http://localhost:8080/v1/'
    },
    JSONResponse: {}
  },
  include: {
    I: './test/steps/steps_file'
  },
  gherkin: {
    features: './test/features/*.feature',
    steps: [
        './test/steps/definitions.ts'
    ]
  },
  name: 'pltsci-sdet-assignment',
  fullPromiseBased: true
}